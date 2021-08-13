import { TimeEntry } from '../Features/Timer/types';
import { domain } from './domain';

export const entryEvents = {
  setEntry: domain.createEvent<TimeEntry>(),
  flush: domain.createEvent(),
  addCompletedTime: domain.createEvent<number>(),
};
export const $currentEntry = domain
  .createStore<TimeEntry | null>(null)
  .on(entryEvents.setEntry, (_, payload) => payload)
  .on(entryEvents.flush, () => null)
  .on(entryEvents.addCompletedTime, (state, payload) => {
    if (!state) {
      return state;
    }

    return {
      ...state,
      completedTime: state.completedTime + payload,
    };
  });
