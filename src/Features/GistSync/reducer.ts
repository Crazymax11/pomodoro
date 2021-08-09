import { createReducer } from '@reduxjs/toolkit';

import { GistSyncState, State } from './types';

import * as events from './events';

const initialState: State = {
  state: GistSyncState.Idle,
  isActive: false,
};

export const gistSyncReducer = createReducer(initialState, (builder) => {
  builder.addCase(events.setData, (state, { payload }) => ({ ...state, ...payload }));
});
