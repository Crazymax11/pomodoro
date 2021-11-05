import React from 'react';
import { TimeEntryType } from '../../types';

export const entryTypeEmojis: Record<TimeEntryType, string> = {
  [TimeEntryType.Pomodoro]: '🍅',
  [TimeEntryType.Rest]: '🏖️',
  [TimeEntryType.Time]: '⏳',
};
export const EntryTypeIcon = (props: { type: TimeEntryType }) => {
  return <span>{entryTypeEmojis[props.type]}</span>;
};
