import React, { useCallback } from 'react';
import { formatToReadableTime } from '../../../../../utils';
import styles from './index.module.css';

type Props = {
  isPaused: boolean;
  onPause: () => any;
  onUnpause: () => any;
  completedTime: number;
  onCompletePureTime: () => any;
  onDrop: () => any;
};

export const Pure = ({
  completedTime = 0,
  isPaused,
  onUnpause,
  onCompletePureTime,
  onPause,
  onDrop,
}: Props) => {
  const onPauseBtnClick = useCallback(() => {
    if (isPaused) {
      onUnpause();
    } else {
      onPause();
    }
  }, [isPaused, onUnpause, onPause]);

  const workingTime = completedTime;
  return (
    <div className={styles.wrapper}>
      <div className={styles.timer}> {formatToReadableTime(workingTime)}</div>
      <span className={styles.pauseButton} onClick={onPauseBtnClick}>
        {isPaused ? '▶️' : '⏸️'}
      </span>

      <span className={styles.pauseButton} onClick={onCompletePureTime}>
        ✔️
      </span>
      <span className={styles.pauseButton} onClick={onDrop}>
        🚫
      </span>
    </div>
  );
};
