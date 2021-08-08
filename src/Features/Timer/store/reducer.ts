/* eslint-disable no-param-reassign */
import { createReducer } from '@reduxjs/toolkit';
import { TimeEntryType } from '../../types';
import { TimerState } from '../types';

import { events } from './events';
import { State } from './types';

const initialState: State = {
  state: TimerState.Idle,
};

export const timerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(events.startTimer, (state, { payload }) => {
      state.entry = payload;
      state.state = TimerState.Active;
    })
    .addCase(events.pauseTimer, (state, { payload }) => {
      state.state = TimerState.Paused;
      state.entry!.completedTime += payload;
    })
    .addCase(events.unpauseTimer, (state) => {
      state.state = TimerState.Active;
    })

    .addCase(events.drop, (state) => {
      const isResting = state.entry?.type === TimeEntryType.Rest;
      const isPureTime = state.entry?.type === TimeEntryType.Time;
      const nextState = isResting || isPureTime ? TimerState.Idle : TimerState.SuggestResting;

      state.state = nextState;
      state.entry = undefined;
    })
    .addCase(events.complete, (state) => {
      const isResting = state.entry?.type === TimeEntryType.Rest;
      const isPureTime = state.entry?.type === TimeEntryType.Time;
      const nextState = isResting || isPureTime ? TimerState.Idle : TimerState.SuggestResting;

      state.state = nextState;
      state.entry = undefined;
    })
    .addCase(events.idle, (state) => {
      state.state = TimerState.Idle;
    });
});

/* eslint-enable no-param-reassign */
