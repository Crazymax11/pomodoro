import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { minutes } from '../../../utils';
import * as actions from '../../store/actions';
import * as selectors from '../../store/selectors';
import { TimerState } from '../../types';
import { ActiveTimer } from './ActiveTimer';
import { Idle } from './Idle';
import { SuggestResting } from './SuggestResting';

const mapState = (store: any) => {
  return {
    currentType: selectors.getCurrentTimerType(store),
    state: selectors.getState(store),
    entry: selectors.getEntry(store),
  };
};

const mapDispatch = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const dispatch = useDispatch();

  return {
    onDrop: (completedTime: number) => dispatch(actions.DropCurrent(completedTime)),
    onComplete: (completedTime?: number) => dispatch(actions.CompleteCurrent(completedTime)),
    onPause: (completedTime: number) => dispatch(actions.PauseCurrent(completedTime)),
    onUnpause: () => dispatch(actions.UnpauseCurrent()),
    onRest: () => dispatch(actions.startResting(minutes(5))),
    onStartPomodoro: () => dispatch(actions.startPomodoro(minutes(25))),
    onIdle: () => dispatch(actions.idle()),
    onStartPureTime: () => dispatch(actions.startPureTime()),
  };
};

type Props = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>;
export const TimerPure = (props: Props) => {
  if (props.state === TimerState.Idle) {
    return <Idle onStartPomodoro={props.onStartPomodoro} onStartPureTime={props.onStartPureTime} />;
  }

  if (props.state === TimerState.SuggestResting) {
    return (
      <SuggestResting
        onRest={props.onRest}
        onIdle={props.onIdle}
        onPomodoro={props.onStartPomodoro}
      />
    );
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
  const state = useSelector(mapState);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const actions = mapDispatch();

  return <TimerPure {...state} {...actions} />;
};
