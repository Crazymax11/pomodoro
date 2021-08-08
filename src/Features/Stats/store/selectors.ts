import { createSelector } from '@reduxjs/toolkit';
import { TimeEntryType } from '../../types';

import { ResolutionType, State } from './types';

export const getStatsState = (state: any): State => state.stats;
export const getTodayStats = createSelector([getStatsState], (state) => {
  return state.entries.reduce(
    (acc, entry) => {
      const key = entry.resolution === ResolutionType.Completed ? 'completed' : 'droped';
      const entryType =
        // eslint-disable-next-line no-nested-ternary
        entry.type === TimeEntryType.Pomodoro
          ? 'pomodoros'
          : entry.type === TimeEntryType.Rest
          ? 'rests'
          : 'pureTimes';
      acc[entryType][key] += 1;
      acc[entryType].totalTime += entry.completedTime;

      return acc;
    },
    {
      pomodoros: {
        completed: 0,
        droped: 0,
        totalTime: 0,
      },
      rests: {
        completed: 0,
        droped: 0,
        totalTime: 0,
      },
      pureTimes: {
        completed: 0,
        droped: 0,
        totalTime: 0,
      },
    },
  );
});
