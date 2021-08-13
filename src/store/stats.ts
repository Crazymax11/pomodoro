import { TimeEntryType } from '../Features/types';
import { domain } from './domain';

export type TimeEntry = {
  type: TimeEntryType;
  size?: number;
  startTime: number;
  completedTime: number;
  endTime: number;
};
export const statsEvents = {
  addEntry: domain.createEvent<TimeEntry>(),
};

const initialState: {
  entries: TimeEntry[];
} = {
  entries: [],
};
export const $stats = domain
  .createStore(initialState)
  .on(statsEvents.addEntry, (state, payload) => ({
    entries: [...state.entries, payload],
  }));
