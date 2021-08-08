import { createSelector } from '@reduxjs/toolkit';
import { TimeEntryType } from '../../types';
import { TimeEntry, TimerState } from '../types';

import { State } from './types';

const getTimerState = (store: any): State => store.timer;
export const getCurrentTimerType = createSelector(
  getTimerState,
  (timer: State): TimeEntryType | undefined => {
    return timer.entry?.type;
  },
);

export const getState: (store: any) => TimerState = createSelector(
  getTimerState,
  (state) => state.state,
);
export const getEntry: (store: any) => TimeEntry | undefined = createSelector(
  getTimerState,
  (state) => state.entry,
);

export const getCurrentCompletedTime: (store: any) => number | undefined = createSelector(
  getTimerState,
  (state) => state.entry?.completedTime,
);
