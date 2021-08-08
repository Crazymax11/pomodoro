import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { statsReducer } from './Features/Stats/store/reducer';
import { timerReducer } from './Features/Timer/store/reducer';

export const createStore = () =>
  configureStore({ reducer: combineReducers({ timer: timerReducer, stats: statsReducer }) } as any);
export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type GetRootState = () => RootState;
export type AppDispatch = typeof store.dispatch;
export type ActionBody = (dispatch: AppDispatch, getState: () => RootState) => any;
