import classnames from 'classnames';
import React, { useCallback, useEffect } from 'react';
import { TimeEntryType } from '../../../../../types';

import { formatToReadableTime, seconds } from '../../../../../utils';
import { useTimer } from '../../useTimer';
import styles from './index.module.css';

type Props = {
  type: TimeEntryType.Pomodoro | TimeEntryType.Rest;
  isPaused: boolean;
  size: number;
  completedTime: number;
  onPause: (completedTime: number) => any;
  onDrop: (completedTime: number) => any;
  onComplete: () => any;
  onUnpause: () => any;
};

export const BasePomodoroTimer = ({
  isPaused,
  size,
  type,
  completedTime,
  onDrop,
  onPause,
  onComplete,
  onUnpause,
}: Props) => {
  const buttonText = isPaused ? 'Запуск' : 'Пауза';

  const { time, flush } = useTimer(isPaused);
  const onPauseBtnClick = useCallback(() => {
    if (isPaused) {
      onUnpause();
    } else {
      onPause(seconds(time));
      flush();
    }
  }, [isPaused, flush, onPause, onUnpause, time]);
  const onDropBtnClick = useCallback(() => {
    onDrop(seconds(time));
  }, [time, onDrop]);

  const restingTime = size - completedTime - seconds(time);

  useEffect(() => {
    if (restingTime <= 0) {
      onComplete();
    }
  }, [restingTime, onComplete]);

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
      <span className={styles.pauseButton} onClick={onDropBtnClick}>
        🚫
      </span>
    </div>
  );
};
