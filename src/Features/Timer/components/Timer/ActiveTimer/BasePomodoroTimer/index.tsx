import classnames from 'classnames';
import React, { useCallback } from 'react';
import { TimeEntryType } from '../../../../../types';

import { formatToReadableTime } from '../../../../../utils';

import styles from './index.module.css';

type Props = {
  type: TimeEntryType.Pomodoro | TimeEntryType.Rest;
  isPaused: boolean;
  size: number;
  completedTime: number;
  onPause: () => any;
  onDrop: () => any;

  onUnpause: () => any;
};

export const BasePomodoroTimer = ({
  isPaused,
  size,
  type,
  completedTime,
  onDrop,
  onPause,

  onUnpause,
}: Props) => {
  const onPauseBtnClick = useCallback(() => {
    if (isPaused) {
      onUnpause();
    } else {
      onPause();
    }
  }, [isPaused, onPause, onUnpause]);

  const restingTime = size - completedTime;

  return (
    <div className={styles.wrapper}>
      <div
        className={classnames(
          styles.timer,
          type === TimeEntryType.Pomodoro ? styles.pomodoro : styles.rest,
        )}
      >
        {restingTime > 0 ? formatToReadableTime(restingTime) : 0}
      </div>
      <span className={styles.pauseButton} onClick={onPauseBtnClick}>
        {isPaused ? '▶️' : '⏸️'}
      </span>
      <span className={styles.pauseButton} onClick={onDrop}>
        🚫
      </span>
    </div>
  );
};
