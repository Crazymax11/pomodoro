import React from 'react';
import { TimeEntryType } from '../../../../../types';

import { BasePomodoroTimer } from '../BasePomodoroTimer';

type Props = {
  isPaused: boolean;
  size: number;
  completedTime: number;
  onPause: (completedTime: number) => any;
  onUnpause: () => any;
  onDrop: (completedTime: number) => any;
  onComplete: () => any;
};

export const Resting = (props: Props) => {
  return <BasePomodoroTimer type={TimeEntryType.Rest} {...props} />;
};
