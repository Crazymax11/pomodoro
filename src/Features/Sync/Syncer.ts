import * as timerSelectors from '../Timer/store/selectors';
import * as statsSelectors from '../Stats/store/selectors';

type TimerSync = ReturnType<typeof timerSelectors['getStateForSync']>;
type StatsSync = ReturnType<typeof statsSelectors['getStateForSync']>;
type SyncObj = { timer: TimerSync; stats: StatsSync };

interface Syncer {
  load(): SyncObj | null;
  save(obj: SyncObj): void;
}
export const syncer: Syncer = {
  load() {
    const saved = localStorage.getItem('pomodoro');
    if (!saved) {
      return null;
    }
    const { stats, timer } = JSON.parse(saved);
    return { stats, timer };
  },
  save(payload: { timer: TimerSync; stats: StatsSync }) {
    localStorage.setItem('pomodoro', JSON.stringify(payload));
  },
};
