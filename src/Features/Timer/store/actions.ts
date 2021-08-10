import { ActionBody } from '../../../store';
import { statsEvents } from '../../Stats/store/events';
import { makeCompletedEntry, makeDropedEntry } from '../../Stats/store/utils';
import { TimeEntryType } from '../../types';
import { dingAlert } from '../DingAlert';
import { TimeEntry } from '../types';
import { events } from './events';
import { getEntry } from './selectors';
import { State } from './types';

export const startPomodoro =
  (size: number): ActionBody =>
  (dispatch) => {
    const pomodoro: TimeEntry = {
      size,
      type: TimeEntryType.Pomodoro,
      startTime: Date.now(),
      paused: false,
      completedTime: 0,
    };
    dispatch(events.startTimer(pomodoro));
  };

export const startResting =
  (size: number): ActionBody =>
  (dispatch) => {
    const resting: TimeEntry = {
      size,
      type: TimeEntryType.Rest,
      startTime: Date.now(),
      paused: false,
      completedTime: 0,
    };
    dispatch(events.startTimer(resting));
  };
export const startPureTime = (): ActionBody => (dispatch) => {
  const pureTime: TimeEntry = {
    type: TimeEntryType.Time,
    startTime: Date.now(),
    paused: false,
    completedTime: 0,
  };
  dispatch(events.startTimer(pureTime));
};
export const PauseCurrent =
  (completedTime: number): ActionBody =>
  (dispatch) => {
    dispatch(events.pauseTimer(completedTime));
  };

export const UnpauseCurrent = (): ActionBody => (dispatch) => {
  dispatch(events.unpauseTimer());
};

export const DropCurrent =
  (completedTime: number): ActionBody =>
  (dispatch, getState) => {
    const currentEntry = getEntry(getState());
    if (!currentEntry) {
      return;
    }
    dispatch(
      statsEvents.addEntry(
        makeDropedEntry({
          type: currentEntry.type,
          size: currentEntry.size,
          startTime: currentEntry?.startTime,
          completedTime: currentEntry.completedTime + completedTime,
          endTime: Date.now(),
        }),
      ),
    );
    dispatch(events.drop());
  };
export const CompleteCurrent =
  (completedTime?: number): ActionBody =>
  (dispatch, getState) => {
    const currentEntry = getEntry(getState());
    if (!currentEntry) {
      return;
    }

    const resultCompletedTime =
      currentEntry.type === TimeEntryType.Time
        ? currentEntry.completedTime + completedTime!
        : currentEntry.size;

    dispatch(
      statsEvents.addEntry(
        makeCompletedEntry({
          type: currentEntry.type,
          size: currentEntry.size,
          startTime: currentEntry?.startTime,
          completedTime: resultCompletedTime!,
          endTime: Date.now(),
        }),
      ),
    );
    dispatch(events.complete());
    dingAlert();
  };

export const idle = (): ActionBody => (dispatch) => dispatch(events.idle());

export const initialize =
  (state: State): ActionBody =>
  (dispatch) =>
    dispatch(events.initialize(state));
