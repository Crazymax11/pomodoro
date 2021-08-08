import { ResolutionType, TimeEntry } from './types';

export const makeCompletedEntry = (params: Omit<TimeEntry, 'resolution'>): TimeEntry => {
  return {
    ...params,
    resolution: ResolutionType.Completed,
  };
};
export const makeDropedEntry = (params: Omit<TimeEntry, 'resolution'>): TimeEntry => {
  return {
    ...params,
    resolution: ResolutionType.Droped,
  };
};
