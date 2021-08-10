import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { statsReducer } from './Features/Stats/store/reducer';
import * as statsSelectors from './Features/Stats/store/selectors';
import * as timerSelectors from './Features/Timer/store/selectors';
import { timerReducer } from './Features/Timer/store/reducer';
import { syncer } from './Features/Sync/Syncer';

export const createStore = () =>
  configureStore({
    reducer: combineReducers({ timer: timerReducer, stats: statsReducer }),
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware().concat((store: any) => (next: any) => (action: any) => {
        next(action);
        const state = store.getState();
        const stats = statsSelectors.getStateForSync(state);
        const timer = timerSelectors.getStateForSync(state);
        syncer.save({ timer, stats });
      }),
  } as any);
export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type GetRootState = () => RootState;
export type AppDispatch = typeof store.dispatch;
export type ActionBody = (dispatch: AppDispatch, getState: () => RootState) => any;
