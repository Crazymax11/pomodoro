import { TimeEntry, TimerState } from '../types';

export interface State {
  entry?: TimeEntry;
  state: TimerState;
}
