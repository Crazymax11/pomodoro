import { createAction } from '@reduxjs/toolkit';
import { TimeEntry } from '../types';
import { State } from './types';

export const increment = createAction<number | undefined>('counter/increment');

export const events = {
  startTimer: createAction<TimeEntry>('timer/startTimer'),
  pauseTimer: createAction<number>('timer/pauseTimer'),
  unpauseTimer: createAction<void>('timer/unpauseTimer'),
  idle: createAction<void>('timer/idle'),
  drop: createAction<void>('timer/drop'),
  complete: createAction<void>('timer/complete'),
  initialize: createAction<State>('timer/initialize'),
};
