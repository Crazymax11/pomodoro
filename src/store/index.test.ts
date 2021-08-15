import { allSettled, fork } from 'effector';
import {
  completePureTime,
  drop,
  pauseTimer,
  startPureTime,
  startResting,
  toIdle,
  unpauseTimer,
  startPomodoro,
  tick,
} from './index';

import { $currentEntry } from './currentEntry';

import { $stats } from './stats';
import { $timerState } from './timer';
import { minutes, seconds } from '../Features/utils';
import { TimerState } from '../Features/Timer/types';
import { TimeEntryType } from '../Features/types';

import { domain } from './domain';

jest.mock('../Features/Timer/dingAlert');

describe('pomodoro state', () => {
  it('должен вернуть Idle стейт в самом начале', () => {
    const scope = fork(domain);
    expect(scope.getState($timerState)).toEqual(TimerState.Idle);
    expect(scope.getState($currentEntry)).toEqual(null);
  });

  it('при старте помидорки должен вернуть тип "помидорка"', async () => {
    const scope = fork(domain);

    await allSettled(startPomodoro, { scope, params: seconds(5) });

    expect(scope.getState($timerState)).toEqual(TimerState.Active);
    expect(scope.getState($currentEntry)?.type).toEqual(TimeEntryType.Pomodoro);
  });

  it('При паузе помидорки должен вернуть паузу', async () => {
    const scope = fork(domain);

    await allSettled(startPomodoro, { scope, params: seconds(5) });
    await allSettled(tick, { scope, params: seconds(1) });
    await allSettled(pauseTimer, { scope });

    expect(scope.getState($timerState)).toEqual(TimerState.Paused);
    expect(scope.getState($currentEntry)?.type).toEqual(TimeEntryType.Pomodoro);
    expect(scope.getState($currentEntry)?.completedTime).toEqual(seconds(1));
  });

  it('При сбросе помидорки после старта переходим в Idle', async () => {
    const scope = fork(domain);
    await allSettled(startPomodoro, { scope, params: minutes(25) });
    await allSettled(drop, { scope });

    expect(scope.getState($timerState)).toEqual(TimerState.Idle);
    expect(scope.getState($currentEntry)?.type).toEqual(undefined);
    expect(scope.getState($stats).entries.length).toEqual(0);
  });

  it('При сбросе помидорки после паузы должно должен быть Idle', async () => {
    const scope = fork(domain);
    await allSettled(startPomodoro, { scope, params: minutes(25) });
    await allSettled(tick, { scope, params: seconds(1) });
    await allSettled(pauseTimer, { scope });
    await allSettled(drop, { scope });

    expect(scope.getState($timerState)).toEqual(TimerState.Idle);
    expect(scope.getState($currentEntry)?.type).toEqual(undefined);
    expect(scope.getState($stats).entries.length).toEqual(0);
  });

  it('Если анпаузнуть помидорку то она активна', async () => {
    const scope = fork(domain);
    await allSettled(startPomodoro, { scope, params: minutes(25) });
    await allSettled(tick, { scope, params: seconds(1) });
    await allSettled(pauseTimer, { scope });
    await allSettled(unpauseTimer, { scope });

    expect(scope.getState($timerState)).toEqual(TimerState.Active);
    expect(scope.getState($currentEntry)?.type).toEqual(TimeEntryType.Pomodoro);
    expect(scope.getState($currentEntry)?.completedTime).toEqual(seconds(1));
  });

  it('Если завершить помидорку, то должно быть предложено отдохнуть', async () => {
    const scope = fork(domain);
    await allSettled(startPomodoro, { scope, params: minutes(25) });
    await allSettled(tick, { scope, params: minutes(25) });

    expect(scope.getState($timerState)).toEqual(TimerState.SuggestResting);
    expect(scope.getState($currentEntry)?.type).toEqual(undefined);
    expect(scope.getState($stats).entries.length).toEqual(1);
    expect(scope.getState($stats).entries[0].completedTime).toEqual(minutes(25));
  });

  it('Если предложено отдохнуть, можно отказаться', async () => {
    const scope = fork(domain);
    await allSettled(startPomodoro, { scope, params: minutes(25) });
    await allSettled(tick, { scope, params: minutes(25) });
    await allSettled(toIdle, { scope });

    expect(scope.getState($timerState)).toEqual(TimerState.Idle);
    expect(scope.getState($currentEntry)?.type).toEqual(undefined);
  });

  it('Если запустили отдых, то запущен отдых', async () => {
    const scope = fork(domain);
    await allSettled(startResting, { scope, params: minutes(5) });

    expect(scope.getState($timerState)).toEqual(TimerState.Active);
    expect(scope.getState($currentEntry)?.type).toEqual(TimeEntryType.Rest);
  });

  it('Можно запаузить отдых', async () => {
    const scope = fork(domain);
    await allSettled(startResting, { scope, params: minutes(5) });
    await allSettled(tick, { scope, params: seconds(1) });
    await allSettled(pauseTimer, { scope });

    expect(scope.getState($timerState)).toEqual(TimerState.Paused);
    expect(scope.getState($currentEntry)?.type).toEqual(TimeEntryType.Rest);
  });

  it('Можно восстановить отдых', async () => {
    const scope = fork(domain);
    await allSettled(startResting, { scope, params: minutes(5) });
    await allSettled(tick, { scope, params: seconds(1) });
    await allSettled(pauseTimer, { scope });
    await allSettled(unpauseTimer, { scope });

    expect(scope.getState($timerState)).toEqual(TimerState.Active);
    expect(scope.getState($currentEntry)?.type).toEqual(TimeEntryType.Rest);
  });

  it('Можно сбросить отдых', async () => {
    const scope = fork(domain);
    await allSettled(startResting, { scope, params: minutes(5) });
    await allSettled(drop, { scope });

    expect(scope.getState($timerState)).toEqual(TimerState.Idle);
    expect(scope.getState($currentEntry)?.type).toEqual(undefined);
    expect(scope.getState($stats).entries.length).toEqual(0);
  });

  it('Можно завершить отдых', async () => {
    const scope = fork(domain);
    await allSettled(startResting, { scope, params: minutes(5) });
    await allSettled(tick, { scope, params: minutes(5) });

    expect(scope.getState($timerState)).toEqual(TimerState.SuggestResting);
    expect(scope.getState($currentEntry)?.type).toEqual(undefined);
    expect(scope.getState($stats).entries[0].type).toEqual(TimeEntryType.Rest);
  });

  it('Можно начать отрезок времени', async () => {
    const scope = fork(domain);
    await allSettled(startPureTime, { scope });

    expect(scope.getState($timerState)).toEqual(TimerState.Active);
    expect(scope.getState($currentEntry)?.type).toEqual(TimeEntryType.Time);
  });
  it('Можно паузить отрезок времени', async () => {
    const scope = fork(domain);
    await allSettled(startPureTime, { scope });
    await allSettled(tick, { scope, params: seconds(1) });
    await allSettled(pauseTimer, { scope });

    expect(scope.getState($timerState)).toEqual(TimerState.Paused);
    expect(scope.getState($currentEntry)?.type).toEqual(TimeEntryType.Time);
  });
  it('Можно восстановить отрезок времени', async () => {
    const scope = fork(domain);
    await allSettled(startPureTime, { scope });
    await allSettled(tick, { scope, params: seconds(1) });
    await allSettled(pauseTimer, { scope });
    await allSettled(unpauseTimer, { scope });

    expect(scope.getState($timerState)).toEqual(TimerState.Active);
    expect(scope.getState($currentEntry)?.type).toEqual(TimeEntryType.Time);
  });
  it('Можно сбросить отрезок времени', async () => {
    const scope = fork(domain);
    await allSettled(startPureTime, { scope });
    await allSettled(drop, { scope });

    expect(scope.getState($timerState)).toEqual(TimerState.Idle);
    expect(scope.getState($currentEntry)?.type).toEqual(undefined);
    expect(scope.getState($stats).entries.length).toEqual(0);
  });
  it('Можно завершить отрезок времени', async () => {
    const scope = fork(domain);
    await allSettled(startPureTime, { scope });
    await allSettled(tick, { scope, params: minutes(5) });
    await allSettled(completePureTime, { scope });

    expect(scope.getState($timerState)).toEqual(TimerState.SuggestResting);
    expect(scope.getState($currentEntry)?.type).toEqual(undefined);
    expect(scope.getState($stats).entries[0].type).toEqual(TimeEntryType.Time);
    expect(scope.getState($stats).entries[0].completedTime).toEqual(minutes(5));
  });

  it('Если завершить 2 помидорки, 2 отрезка времени и 1 отдых то стата верная', async () => {
    const scope = fork(domain);
    await allSettled(startPomodoro, { scope, params: minutes(25) });
    await allSettled(tick, { scope, params: minutes(25) });
    await allSettled(startResting, { scope, params: minutes(5) });
    await allSettled(tick, { scope, params: minutes(5) });
    await allSettled(startPomodoro, { scope, params: minutes(25) });
    await allSettled(tick, { scope, params: minutes(25) });
    await allSettled(startResting, { scope, params: minutes(5) });
    await allSettled(tick, { scope, params: minutes(5) });
    await allSettled(startPureTime, { scope });
    await allSettled(tick, { scope, params: minutes(5) });
    await allSettled(completePureTime, { scope });
    await allSettled(startPureTime, { scope });
    await allSettled(tick, { scope, params: minutes(5) });
    await allSettled(completePureTime, { scope });

    expect(scope.getState($timerState)).toEqual(TimerState.SuggestResting);
    expect(scope.getState($currentEntry)?.type).toEqual(undefined);
    expect(scope.getState($stats).entries.length).toEqual(6);
  });

  it('Если паузнуть помидорку и потом завершить, то стата верная', async () => {
    const scope = fork(domain);

    await allSettled(startPomodoro, { scope, params: minutes(25) });
    await allSettled(tick, { scope, params: minutes(20) });
    await allSettled(pauseTimer, { scope });
    await allSettled(unpauseTimer, { scope });
    await allSettled(tick, { scope, params: minutes(5) });

    expect(scope.getState($currentEntry)?.type).toEqual(undefined);
    expect(scope.getState($stats).entries[0].completedTime).toEqual(minutes(25));
  });
});
