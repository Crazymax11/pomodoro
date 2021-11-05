import React from 'react';
import { entryTypeEmojis } from '../../../../../shared/EntryTypeIcon';
import { TimeEntryType } from '../../../../../types';

export const EntryTypeInput: React.FC<{
  value: TimeEntryType;
  onChange: (newValue: TimeEntryType) => void;
}> = (props) => {
  const types = [TimeEntryType.Pomodoro, TimeEntryType.Time, TimeEntryType.Rest];

  return (
    <select value={props.value} onChange={(e) => props.onChange(e.target.value as TimeEntryType)}>
      {types.map((type) => (
        <option key={type} value={type}>
          {entryTypeEmojis[type]}
        </option>
      ))}
    </select>
  );
};
