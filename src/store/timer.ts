import { domain } from './domain';

export enum TimerState {
  Idle = 'Idle',
  Active = 'Active',
  Paused = 'Paused',
  SuggestResting = 'SuggestResting',
}

export const timerEvents = {
  idle: domain.createEvent(),
  start: domain.createEvent(),
  pause: domain.createEvent(),
  suggestResting: domain.createEvent(),
  init: domain.createEvent<TimerState>(),
};

export const $timerState = domain
  .createStore<TimerState>(TimerState.Idle)
  .on(timerEvents.idle, () => TimerState.Idle)
  .on(timerEvents.pause, () => TimerState.Paused)
  .on(timerEvents.start, () => TimerState.Active)
  .on(timerEvents.suggestResting, () => TimerState.SuggestResting)
  .on(timerEvents.init, (state, payload) => payload);
