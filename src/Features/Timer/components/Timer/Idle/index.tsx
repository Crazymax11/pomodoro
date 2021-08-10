import React, { useMemo } from 'react';
import { minutes } from '../../../../utils';
import styles from './index.module.css';

type Props = {
  onStartPomodoro: (time: number) => any;
  onStartPureTime: () => any;
};

type PomodoroButtonProps = {
  size: number;
  onStart: () => any;
};
const PomodoroButton = ({ size, onStart }: PomodoroButtonProps) => {
  return (
    <span className={styles.buttonWrapper}>
      <span className={styles.button} onClick={onStart}>
        🍅
        <span className={styles.buttonLabel}>{size}</span>
      </span>
    </span>
  );
};

const sizes = [5, 10, 15, 20, 40];
export const Idle = ({ onStartPomodoro, onStartPureTime }: Props) => {
  const pomodoroButtons = useMemo(
    () =>
      sizes.map((size) => (
        <PomodoroButton key={size} size={size} onStart={() => onStartPomodoro(minutes(size))} />
      )),
    [onStartPomodoro],
  );
  return (
    <div>
      {pomodoroButtons}
      <span className={styles.button} onClick={onStartPureTime}>
        ⌛
      </span>
    </div>
  );
};
