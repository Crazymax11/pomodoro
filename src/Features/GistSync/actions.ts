import { AppDispatch, GetRootState } from '../../store';
import { seconds } from '../utils';
import { setData } from './events';
import { GistSyncState } from './types';

export const sync = () => async (dispatch: AppDispatch, getState: GetRootState) => {
  const timer = foreignSelector(state);
  const stats = foreignSelector(state);
  try {
    await api.save({ timer, stats });
  } catch (err) {
    dispatch(
      setData({
        state: GistSyncState.FailedToSync,
      }),
    );
    console.error(err);
  }

  // вызывает селекторы для синка из других сторов
};
/**
 * Если АТ нет - то не начинает синхронизацию
 */
export const startSync = () => async (dispatch: AppDispatch, getState: GetRootState) => {
  const state = getState();
  const AT = selectors.getAccessToken(state);
  if (!AT) {
    return;
  }

  dispatch(setData({ state: GistSyncState.Syncing }));

  await dispatch(sync());
  setInterval(() => {
    if (selectors.isSyncing(getState())) {
      dispatch(sync());
    }
  }, seconds(10));
};

export const pauseSync = () => (dispatch: AppDispatch, getState: GetRootState) => {
  const state = selectors.getState(getState());
  if (state === GistSyncState.Syncing) {
    setData({
      state: GistSyncState.Paused,
    });
  } else if (state === GistSyncState.Paused || state === GistSyncState.FailedToSync) {
    setData({
      state: GistSyncState.Syncing,
    });
  }
};
// load access token from LocalStorage
/**
 * Скачивает последнее состояние приложение и устанавливает его в сторы
 * Если нет АТ - не пытается скачать
 * Если не удалось скачать - падаем
 */
export const initialize = () => async (dispatch: AppDispatch) => {
  const AT = localStorage.getItem('AT');
  if (!AT) {
    return;
  }

  dispatch(
    setData({
      accessToken: AT,
    }),
  );

  api.setAccessToken(AT);
  try {
    const state = await api.loadState();
    dispatch(foreignAction(state.timer));
    dispatch(foreignAction(state.stats));
    setData({
      state: GistSyncState.Initialized,
    });
    dispatch(startSync());
  } catch (err) {
    console.error(err);
    dispatch(
      setData({
        state: GistSyncState.FailedToInitialize,
      }),
    );
  }
};
export const setAccessToken = () => () => {
  // Устанавливает AT и начинает синк
};
