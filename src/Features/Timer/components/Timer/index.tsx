import { useStore } from 'effector-react';
import React, { useCallback } from 'react';
import {
  startResting,
  unpauseTimer,
  pauseTimer,
  complete,
  startPomodoro,
  startPureTime,
  toIdle,
  drop,
} from '../../../../store/index';

import { $currentEntry } from '../../../../store/currentEntry';
import { $timerState } from '../../../../store/timer';

import { minutes } from '../../../utils';

import { TimeEntry, TimerState } from '../../types';
import { ActiveTimer } from './ActiveTimer';
import { Idle } from './Idle';
import { SuggestResting } from './SuggestResting';

type Props = {
  onDrop: () => any;
  onComplete: (completedTime?: number) => any;
  onPause: (completedTime: number) => any;
  onUnpause: () => any;
  onRest: () => any;
  onStartPomodoro: (time: number) => any;
  onIdle: () => any;
  onStartPureTime: () => any;
  state: TimerState;
  entry?: TimeEntry;
};
export const TimerPure = (props: Props) => {
  if (props.state === TimerState.Idle) {
    return <Idle onStartPomodoro={props.onStartPomodoro} onStartPureTime={props.onStartPureTime} />;
  }

  if (props.state === TimerState.SuggestResting) {
    return <SuggestResting onRest={props.onRest} onIdle={props.onIdle} onPomodoro={props.onIdle} />;
  }
  if (!props.entry) {
    return null;
  }

  return (
    <ActiveTimer
      entry={props.entry}
      isPaused={props.state === TimerState.Paused}
      onDrop={props.onDrop}
      onComplete={props.onComplete}
      onPause={props.onPause}
      onUnpause={props.onUnpause}
    />
  );
};

export const Timer = () => {
  const entry = useStore($currentEntry);
  const timerState = useStore($timerState);
  const onRest = useCallback(() => {
    startResting(minutes(5));
  }, []);

  return (
    <TimerPure
      state={timerState}
      entry={entry || undefined}
      onDrop={drop}
      onComplete={complete}
      onPause={pauseTimer}
      onUnpause={unpauseTimer}
      onRest={onRest}
      onStartPomodoro={startPomodoro}
      onIdle={toIdle}
      onStartPureTime={startPureTime}
    />
  );
};
