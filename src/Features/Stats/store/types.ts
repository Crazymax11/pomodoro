import { TimeEntryType } from '../../types';

export type TimeEntry = {
  type: TimeEntryType;
  size?: number;
  startTime: number;
  completedTime: number;
  endTime: number;
  resolution: ResolutionType;
};

export interface State {
  entries: TimeEntry[];
}

export enum ResolutionType {
  Droped = 'Droped',
  Completed = 'Completed',
}
