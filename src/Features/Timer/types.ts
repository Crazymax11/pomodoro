import { TimeEntryType } from '../types';

export type TimeEntry = {
  type: TimeEntryType;
  size?: number;
  startTime: number;
  completedTime: number;
};

export enum TimerState {
  Idle = 'Idle',
  Active = 'Active',
  Paused = 'Paused',
  SuggestResting = 'SuggestResting',
}
