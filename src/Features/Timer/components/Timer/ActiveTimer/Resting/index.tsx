import React from 'react';
import { TimeEntryType } from '../../../../../types';

import { BasePomodoroTimer } from '../BasePomodoroTimer';

type Props = {
  isPaused: boolean;
  size: number;
  completedTime: number;
  onPause: () => any;
  onUnpause: () => any;
  onDrop: () => any;
};

export const Resting = (props: Props) => {
  return <BasePomodoroTimer type={TimeEntryType.Rest} {...props} />;
};
