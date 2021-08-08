import React, { useCallback } from 'react';
import { formatToReadableTime, seconds } from '../../../../../utils';
import { useTimer } from '../../useTimer';
import styles from './index.module.css';

type Props = {
  isPaused: boolean;
  onPause: (completedTime: number) => any;
  onUnpause: () => any;
  completedTime: number;
  onComplete: (completedTime: number) => any;
};

export const Pure = ({ completedTime = 0, isPaused, onUnpause, onComplete, onPause }: Props) => {
  const { time, flush } = useTimer(isPaused);

  const onPauseBtnClick = useCallback(() => {
    if (isPaused) {
      onUnpause();
    } else {
      onPause(seconds(time));
      flush();
    }
  }, [isPaused, onUnpause, onPause, time, flush]);
  const onCompleteBtnClick = useCallback(() => {
    onComplete(seconds(time));
  }, [onComplete, time]);

  const workingTime = completedTime + seconds(time);
  return (
    <div className={styles.wrapper}>
      <div className={styles.timer}> {formatToReadableTime(workingTime)}</div>
      <span className={styles.pauseButton} onClick={onPauseBtnClick}>
        ▶️
      </span>

      <span className={styles.pauseButton} onClick={onCompleteBtnClick}>
        🚫
      </span>
    </div>
  );
};
