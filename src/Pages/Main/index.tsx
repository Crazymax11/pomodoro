import { combine, createEvent, createStore } from 'effector';
import React, { useEffect } from 'react';
import { TodayChart } from '../../Features/Stats/components/TodayChart';

import { TodayStats } from '../../Features/Stats/components/TodayStats';

import { Timer } from '../../Features/Timer/components/Timer';
import { TimeEntryType } from '../../Features/types';
import { formatToReadableTime, seconds } from '../../Features/utils';
import { tick } from '../../store';
import { $currentEntry, entryEvents } from '../../store/currentEntry';
import { $stats, statsEvents } from '../../store/stats';
import { $timerState, timerEvents, TimerState } from '../../store/timer';

import styles from './index.module.css';

const synced = createEvent();
const $syncer = createStore(false).on(synced, () => true);

combine([$currentEntry, $stats, $timerState, $syncer]).watch(([entry, stats, timer, syncer]) => {
  if (!syncer) {
    return;
  }

  localStorage.setItem(
    'pomodoro',
    JSON.stringify({
      entry,
      stats,
      timer: timer === TimerState.Active ? TimerState.Paused : timer,
    }),
  );
});

export const Main = () => {
  useEffect(() => {
    const possibleItem = localStorage.getItem('pomodoro');

    if (!possibleItem) {
      synced();
      return;
    }
    const { entry, stats, timer } = JSON.parse(possibleItem);
    timerEvents.init(timer);
    statsEvents.init(stats);
    entryEvents.setEntry(entry);
    synced();
  }, []);
  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']")!;
    $currentEntry.watch((entry) => {
      const entryTypeIcons: Record<TimeEntryType, string> = {
        [TimeEntryType.Pomodoro]: '/favicons/pomodoro.ico',
        [TimeEntryType.Rest]: '/favicons/rest.ico',
        [TimeEntryType.Time]: '/favicons/time.ico',
      };

      if (!entry) {
        document.title = 'Pomodoro Timer';
        // @ts-ignore
        link.href = entryTypeIcons[TimeEntryType.Pomodoro];
        return;
      }

      const time =
        entry.type === TimeEntryType.Time
          ? formatToReadableTime(entry.completedTime)
          : formatToReadableTime(entry!.size! - entry.completedTime);

      document.title = time;
      // @ts-ignore
      link.href = entryTypeIcons[entry.type];
    });
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      tick(seconds(1));
    }, seconds(1));
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.layout}>
      <div style={{ marginBottom: 12 }}>
        <TodayChart />
      </div>

      <TodayStats />
      <div className={styles.content}>
        <Timer />
      </div>
    </div>
  );
};
