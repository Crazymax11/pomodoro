import { createStore } from '../../../store';
import { getTodayStats } from '../../Stats/store/selectors';

import { TimeEntryType } from '../../types';
import { minutes, seconds } from '../../utils';
import { dingAlert } from '../dingAlert';
import { TimerState } from '../types';
import {
  CompleteCurrent,
  DropCurrent,
  idle,
  PauseCurrent,
  startPomodoro,
  startPureTime,
  startResting,
  UnpauseCurrent,
} from './actions';
import { getCurrentCompletedTime, getCurrentTimerType, getState } from './selectors';

jest.mock('../../Sync/Syncer');
jest.mock('../dingAlert');

describe('TimerStore', () => {
  it('должен вернуть Idle стейт в самом начале', () => {
    const store = createStore();
    const state = store.getState();
    expect(getState(state)).toEqual(TimerState.Idle);
  });

  it('при старте помидорки должен вернуть тип "помидорка"', async () => {
    const store = createStore();

    await store.dispatch(startPomodoro(minutes(25)));

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.Active);
    expect(getCurrentTimerType(state)).toEqual(TimeEntryType.Pomodoro);
  });

  it('При паузе помидорки должен вернуть паузу', async () => {
    const store = createStore();

    await store.dispatch(startPomodoro(minutes(25)));
    await store.dispatch(PauseCurrent(seconds(1)));

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.Paused);
    expect(getCurrentTimerType(state)).toEqual(TimeEntryType.Pomodoro);
    expect(getCurrentCompletedTime(state)).toEqual(seconds(1));
  });

  it('При сбросе помидорки после старта должно быть предложено отдохнуть', async () => {
    const store = createStore();

    await store.dispatch(startPomodoro(minutes(25)));
    await store.dispatch(DropCurrent(seconds(1)));

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.SuggestResting);
    expect(getCurrentTimerType(state)).toEqual(undefined);
    expect(getTodayStats(state).pomodoros.droped).toEqual(1);
    expect(getTodayStats(state).pomodoros.totalTime).toEqual(seconds(1));
  });

  it('При сбросе помидорки после паузы должно быть предложено отдохнуть', async () => {
    const store = createStore();

    await store.dispatch(startPomodoro(minutes(25)));
    await store.dispatch(PauseCurrent(seconds(1)));
    await store.dispatch(DropCurrent(seconds(1)));

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.SuggestResting);
    expect(getCurrentTimerType(state)).toEqual(undefined);
    expect(getTodayStats(state).pomodoros.droped).toEqual(1);
    expect(getTodayStats(state).pomodoros.totalTime).toEqual(seconds(2));
  });

  it('Если анпаузнуть помидорку то она активна', async () => {
    const store = createStore();

    await store.dispatch(startPomodoro(minutes(25)));
    await store.dispatch(PauseCurrent(seconds(1)));
    await store.dispatch(UnpauseCurrent());

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.Active);
    expect(getCurrentTimerType(state)).toEqual(TimeEntryType.Pomodoro);
    expect(getCurrentCompletedTime(state)).toEqual(seconds(1));
  });

  it('Если завершить помидорку, то должно быть предложено отдохнуть', async () => {
    const store = createStore();

    await store.dispatch(startPomodoro(minutes(25)));
    await store.dispatch(CompleteCurrent());

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.SuggestResting);
    expect(getCurrentTimerType(state)).toEqual(undefined);
    expect(getTodayStats(state).pomodoros.completed).toEqual(1);
    expect(getTodayStats(state).pomodoros.totalTime).toEqual(minutes(25));
  });

  it('Если предложено отдохнуть, можно отказаться', async () => {
    const store = createStore();

    await store.dispatch(startPomodoro(minutes(25)));
    await store.dispatch(CompleteCurrent());
    await store.dispatch(idle());

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.Idle);
    expect(getCurrentTimerType(state)).toEqual(undefined);
  });

  it('Если запустили отдых, то запущен отдых', async () => {
    const store = createStore();

    await store.dispatch(startResting(minutes(5)));

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.Active);
    expect(getCurrentTimerType(state)).toEqual(TimeEntryType.Rest);
  });

  it('Можно запаузить отдых', async () => {
    const store = createStore();

    await store.dispatch(startResting(minutes(5)));
    await store.dispatch(PauseCurrent(seconds(1)));

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.Paused);
    expect(getCurrentTimerType(state)).toEqual(TimeEntryType.Rest);
  });

  it('Можно восстановить отдых', async () => {
    const store = createStore();

    await store.dispatch(startResting(minutes(5)));
    await store.dispatch(PauseCurrent(seconds(1)));
    await store.dispatch(UnpauseCurrent());

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.Active);
    expect(getCurrentTimerType(state)).toEqual(TimeEntryType.Rest);
  });

  it('Можно сбросить отдых', async () => {
    const store = createStore();

    await store.dispatch(startResting(minutes(5)));
    await store.dispatch(DropCurrent(seconds(1)));

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.Idle);
    expect(getCurrentTimerType(state)).toEqual(undefined);
    expect(getTodayStats(state).rests.droped).toEqual(1);
  });

  it('Можно завершить отдых', async () => {
    const store = createStore();

    await store.dispatch(startResting(minutes(5)));
    await store.dispatch(CompleteCurrent(minutes(5)));

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.Idle);
    expect(getCurrentTimerType(state)).toEqual(undefined);
    expect(getTodayStats(state).rests.completed).toEqual(1);
  });

  it('Можно начать отрезок времени', async () => {
    const store = createStore();

    await store.dispatch(startPureTime());

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.Active);
    expect(getCurrentTimerType(state)).toEqual(TimeEntryType.Time);
  });
  it('Можно паузить отрезок времени', async () => {
    const store = createStore();

    await store.dispatch(startPureTime());
    await store.dispatch(PauseCurrent(seconds(1)));

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.Paused);
    expect(getCurrentTimerType(state)).toEqual(TimeEntryType.Time);
  });
  it('Можно восстановить отрезок времени', async () => {
    const store = createStore();

    await store.dispatch(startPureTime());
    await store.dispatch(PauseCurrent(seconds(1)));
    await store.dispatch(UnpauseCurrent());

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.Active);
    expect(getCurrentTimerType(state)).toEqual(TimeEntryType.Time);
  });
  it('Можно сбросить отрезок времени', async () => {
    const store = createStore();

    await store.dispatch(startPureTime());
    await store.dispatch(DropCurrent(seconds(1)));

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.Idle);
    expect(getCurrentTimerType(state)).toEqual(undefined);
    expect(getTodayStats(state).pureTimes.droped).toEqual(1);
  });
  it('Можно завершить отрезок времени', async () => {
    const store = createStore();

    await store.dispatch(startPureTime());
    await store.dispatch(CompleteCurrent(seconds(1)));

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.Idle);
    expect(getCurrentTimerType(state)).toEqual(undefined);
    expect(getTodayStats(state).pureTimes.completed).toEqual(1);
  });

  it('Если завершить 2 помидорки, 2 отрезка времени и 1 отдых то стата верная', async () => {
    const store = createStore();

    await store.dispatch(startPomodoro(minutes(25)));
    await store.dispatch(CompleteCurrent());
    await store.dispatch(startResting(minutes(5)));
    await store.dispatch(CompleteCurrent());
    await store.dispatch(startPomodoro(minutes(25)));
    await store.dispatch(CompleteCurrent());
    await store.dispatch(startResting(minutes(5)));
    await store.dispatch(CompleteCurrent());
    await store.dispatch(startPureTime());
    await store.dispatch(CompleteCurrent(seconds(1)));
    await store.dispatch(startPureTime());
    await store.dispatch(CompleteCurrent(seconds(1)));

    const state = store.getState();

    expect(getState(state)).toEqual(TimerState.Idle);
    expect(getCurrentTimerType(state)).toEqual(undefined);
    expect(getTodayStats(state)).toMatchObject({
      pomodoros: {
        completed: 2,
        droped: 0,
      },
      rests: {
        completed: 2,
        droped: 0,
      },
      pureTimes: {
        completed: 2,
        droped: 0,
      },
    });
  });

  it('Если паузнуть помидорку и потом завершить, то стата верная', async () => {
    const store = createStore();

    await store.dispatch(startPomodoro(minutes(25)));
    await store.dispatch(PauseCurrent(seconds(1)));
    await store.dispatch(UnpauseCurrent());
    await store.dispatch(CompleteCurrent());

    const state = store.getState();

    expect(getCurrentTimerType(state)).toEqual(undefined);
    expect(getTodayStats(state).pomodoros).toEqual({
      completed: 1,
      droped: 0,
      totalTime: minutes(25),
    });
  });
});
