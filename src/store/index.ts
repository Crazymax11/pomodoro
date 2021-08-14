import { forward, sample } from 'effector';

import { dingAlert } from '../Features/Timer/dingAlert';
import { TimeEntry } from '../Features/Timer/types';
import { TimeEntryType } from '../Features/types';
import { entryEvents, $currentEntry } from './currentEntry';
import { domain } from './domain';
import { statsEvents } from './stats';
import { timerEvents } from './timer';

export const startPomodoro = domain.createEvent<number>();
export const startResting = domain.createEvent<number>();
export const startPureTime = domain.createEvent();
export const pauseTimer = domain.createEvent<number>();
export const unpauseTimer = domain.createEvent();
export const drop = domain.createEvent();
export const complete = domain.createEvent<number | undefined>();
export const toIdle = domain.createEvent();

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
  from: pauseTimer,
  to: [entryEvents.addCompletedTime, timerEvents.pause as any],
});

forward({
  from: unpauseTimer,
  to: timerEvents.start,
});

forward({
  from: drop,
  to: [timerEvents.idle, entryEvents.flush],
});

forward({
  from: sample({
    source: $currentEntry,
    clock: complete,
    fn: (entry, completedTime) => {
      if (!entry) {
        throw new Error('Ожидали что entry будет');
      }
      const resultCompletedTime =
        entry.type === TimeEntryType.Time ? entry.completedTime + completedTime! : entry.size;

      return {
        type: entry.type,
        size: entry.size,
        startTime: entry?.startTime,
        completedTime: resultCompletedTime!,
        endTime: Date.now(),
      };
    },
  }) as any,
  to: [statsEvents.addEntry as any, timerEvents.suggestResting, entryEvents.flush],
});

complete.watch(dingAlert);

forward({ from: toIdle, to: timerEvents.idle });
