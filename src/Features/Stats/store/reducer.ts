import { createReducer } from '@reduxjs/toolkit';

import { statsEvents } from './events';
import { State } from './types';

const initialState: State = {
  entries: [],
};

export const statsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(statsEvents.addEntry, (state, { payload }) => {
      state.entries.push(payload);
    })
    .addCase(statsEvents.initialize, (_, { payload }) => payload);
});
