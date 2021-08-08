import { createAction } from '@reduxjs/toolkit';
import { TimeEntry } from './types';

export const statsEvents = {
  addEntry: createAction<TimeEntry>('stats/addEntry'),
};
