import { TimeEntry } from '../../../store/stats';

export const isToday = (entry: TimeEntry): boolean => {
  const entryStartTime = new Date(entry.startTime);
  const entryDateTime = {
    day: entryStartTime.getDate(),
    month: entryStartTime.getMonth(),
    year: entryStartTime.getFullYear(),
  };

  const nowDateTime = {
    day: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };

  return (
    entryDateTime.day === nowDateTime.day &&
    entryDateTime.month === nowDateTime.month &&
    entryDateTime.year === nowDateTime.year
  );
};
