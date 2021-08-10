import { createAction } from '@reduxjs/toolkit';
import { State, TimeEntry } from './types';

export const statsEvents = {
  addEntry: createAction<TimeEntry>('stats/addEntry'),
  initialize: createAction<State>('stats/initialize'),
};
