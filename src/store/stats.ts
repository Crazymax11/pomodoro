import { TimeEntryType } from '../Features/types';
import { domain } from './domain';

export type TimeEntry = {
  type: TimeEntryType;
  size?: number;
  startTime: number;
  completedTime: number;
  endTime: number;
};

export type StatsState = {
  entries: TimeEntry[];
};
export const statsEvents = {
  addEntry: domain.createEvent<TimeEntry>(),
  init: domain.createEvent<{ entries: TimeEntry[] }>(),
  remove: domain.createEvent<TimeEntry>(),
};

const initialState: StatsState = {
  entries: [],
};
export const $stats = domain
  .createStore(initialState)
  .on(statsEvents.addEntry, (state, payload) => ({
    entries: [...state.entries, payload],
  }))
  .on(statsEvents.init, (_, payload) => payload)
  .on(statsEvents.remove, (state, payload) => {
    return {
      ...state,
      entries: state.entries.filter((e) => e !== payload),
    };
  });
