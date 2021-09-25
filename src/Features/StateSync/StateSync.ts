import { defaultSettings, Settings } from '../../store/settings';
import { TimerState } from '../../store/timer';
import { StatsState } from '../../store/stats';
import { TimeEntry } from '../Timer/types';

export const LOCAL_STORAGE_KEY = 'pomodoro';

type Synced = {
  v: 1;
  data: {
    entry: TimeEntry | null;
    stats: StatsState;
    timer: TimerState;
    settings: Settings;
  };
};

const isSynced = (data: unknown): data is Synced => {
  if (typeof data !== 'object' || data == null) {
    return false;
  }

  // @ts-ignore
  return data.v === 1;
};

const isOldFormat = (
  data: unknown,
): data is {
  entry: TimeEntry | null;
  stats: StatsState;
  timer: TimerState;
  settings?: Settings;
} => {
  if (typeof data !== 'object' || data == null) {
    return false;
  }

  return 'entry' in data && 'stats' in data && 'timer' in data;
};

const formatDataToSync = (data: Synced['data']): Synced => ({
  v: 1,
  data,
});

export class StateSync {
  static save(payload: Synced['data']) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(
        formatDataToSync({
          ...payload,
          timer: payload.timer === TimerState.Active ? TimerState.Paused : payload.timer,
        }),
      ),
    );
  }

  static load(): null | Synced['data'] {
    const item = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!item) {
      return null;
    }
    let parsed: unknown;
    try {
      parsed = JSON.parse(item);
    } catch (err) {
      return null;
    }

    if (isSynced(parsed)) {
      return parsed.data;
    }

    if (isOldFormat(parsed)) {
      return {
        ...parsed,
        settings: {
          ...defaultSettings,
          ...parsed.settings,
        },
      };
    }

    return null;
  }
}
