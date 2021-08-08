import React from 'react';
import { TimeEntryType } from '../../../../types';
import { TimeEntry } from '../../../types';

import { Pomodoro } from './Pomodoro';
import { Pure } from './Pure';
import { Resting } from './Resting';

type Props = {
  entry: TimeEntry;
  isPaused: boolean;
  onDrop: (completedTime: number) => any;
  onComplete: (completedTime?: number) => any;
  onPause: (completedTime: number) => any;
  onUnpause: () => any;
};
export const ActiveTimer = (props: Props) => {
  if (props.entry.type === TimeEntryType.Pomodoro) {
    return (
      <Pomodoro
        size={props.entry.size!}
        isPaused={props.isPaused}
        completedTime={props.entry.completedTime}
        onComplete={props.onComplete}
        onDrop={props.onDrop}
        onPause={props.onPause}
        onUnpause={props.onUnpause}
      />
    );
  }

  if (props.entry.type === TimeEntryType.Rest) {
    return (
      <Resting
        size={props.entry.size!}
        isPaused={props.isPaused}
        completedTime={props.entry.completedTime}
        onComplete={props.onComplete}
        onDrop={props.onDrop}
        onPause={props.onPause}
        onUnpause={props.onUnpause}
      />
    );
  }

  return (
    <Pure
      isPaused={props.isPaused}
      completedTime={props.entry.completedTime}
      onComplete={props.onComplete}
      onPause={props.onPause}
      onUnpause={props.onUnpause}
    />
  );
};
