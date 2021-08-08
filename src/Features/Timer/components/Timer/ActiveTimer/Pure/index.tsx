import React, { useCallback } from 'react';
import { formatToReadableTime, seconds } from '../../../../../utils';
import { useTimer } from '../../useTimer';

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
    <div>
      <div> Pure Time</div>
      <div> {formatToReadableTime(workingTime)}</div>
      <button onClick={onPauseBtnClick}>pause</button>
      <button onClick={onCompleteBtnClick}>stop</button>
    </div>
  );
};
