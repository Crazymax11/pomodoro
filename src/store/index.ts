import { combine, forward, guard, sample } from 'effector';
import { sounder } from '../Features/Timer/sounder';

import { TimeEntry } from '../Features/Timer/types';
import { TimeEntryType } from '../Features/types';
import { entryEvents, $currentEntry } from './currentEntry';
import { domain } from './domain';
import { $stats, statsEvents, TimeEntry as StatsTimeEntry } from './stats';
import { $timerState, timerEvents, TimerState } from './timer';
import {
  $alertVolume,
  $isNeedToMakeAlert,
  $isNeedToMakeTick,
  $settings,
  $tickVolume,
  settingsEvents,
} from './settings';
import { StateSync } from '../Features/StateSync/StateSync';

export const startPomodoro = domain.createEvent<number>();
export const startResting = domain.createEvent<number>();
export const startPureTime = domain.createEvent();
export const pauseTimer = domain.createEvent();
export const unpauseTimer = domain.createEvent();
export const drop = domain.createEvent();
export const completePureTime = domain.createEvent();
export const toIdle = domain.createEvent();
export const tick = domain.createEvent<number>();
export const removeStoredEntry = domain.createEvent<StatsTimeEntry>();

const complete = domain.createEvent<TimeEntry>();

const createTimeEntry =
  (type: TimeEntryType) =>
  (size?: number | void): TimeEntry => ({
    type,
    size: type === TimeEntryType.Time ? undefined : size || undefined,
    startTime: Date.now(),
    completedTime: 0,
  });

forward({
  from: [
    startResting.map(createTimeEntry(TimeEntryType.Rest)),
    startPureTime.map(createTimeEntry(TimeEntryType.Time)),
    startPomodoro.map(createTimeEntry(TimeEntryType.Pomodoro)),
  ],
  to: [entryEvents.setEntry, timerEvents.start as any],
});

forward({
  from: removeStoredEntry,
  to: statsEvents.remove,
});

const activeTick = sample({
  source: $timerState,
  clock: tick,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  fn: (state, tick): number => {
    if (state === TimerState.Active) {
      return tick;
    }
    return 0;
  },
});

forward({
  from: activeTick,
  to: entryEvents.addCompletedTime,
});

guard({
  clock: $currentEntry,
  filter: (entry) => {
    if (!entry) {
      return false;
    }
    if (entry.size && entry.completedTime >= entry.size) {
      return true;
    }

    return false;
  },
  // @ts-ignore
  target: complete,
});

forward({
  from: pauseTimer,
  to: [timerEvents.pause],
});

forward({
  from: unpauseTimer,
  to: timerEvents.start,
});

forward({
  from: drop,
  to: [timerEvents.idle, entryEvents.flush],
});

sample({
  source: $currentEntry,
  clock: completePureTime,
  // @ts-ignore
  target: complete,
});
const completedEntry = complete.map((entry) => ({
  type: entry.type,
  size: entry.size,
  startTime: entry.startTime,
  completedTime: entry.completedTime,
  endTime: Date.now(),
}));

forward({ from: completedEntry, to: statsEvents.addEntry });

forward({
  from: complete,
  to: [entryEvents.flush],
});

guard({
  source: complete,
  filter: (entry) => entry.type === TimeEntryType.Rest,
  target: timerEvents.idle,
});

guard({
  source: complete,
  filter: (entry) => entry.type !== TimeEntryType.Rest,
  target: timerEvents.suggestResting,
});

const makeDingSound = domain.createEvent();
guard({
  source: $isNeedToMakeAlert,
  clock: complete,
  filter: (isEnabled) => !!isEnabled,
  target: makeDingSound,
});

makeDingSound.watch(sounder.ding);

const realActiveTick = domain.createEvent();

guard({
  clock: activeTick,
  source: $isNeedToMakeTick,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  filter: (isTickSoundEnabled, tick) => !!tick && isTickSoundEnabled,
  target: realActiveTick,
});
realActiveTick.watch(sounder.tick);

forward({ from: toIdle, to: timerEvents.idle });

$tickVolume.watch((volume) => sounder.setTickVolume(volume));
$alertVolume.watch((volume) => sounder.setDingVolume(volume));
const syncedEvent = domain.createEvent();
const $isSynced = domain.createStore(false).on(syncedEvent, () => true);
export const restoreState = domain.createEffect(() => {
  const savedState = StateSync.load();
  if (!savedState) {
    return;
  }

  timerEvents.init(savedState.timer);
  statsEvents.init(savedState.stats);

  settingsEvents.init(savedState.settings);
  if (savedState.entry) {
    entryEvents.setEntry(savedState.entry);
  }
  syncedEvent();
});

combine([$currentEntry, $stats, $timerState, $isSynced, $settings]).watch(
  ([entry, stats, timer, isSynced, settings]) => {
    if (!isSynced) {
      return;
    }

    StateSync.save({
      entry,
      stats,
      timer,
      settings,
    });
  },
);
