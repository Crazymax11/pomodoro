import React, { useEffect } from 'react';
import { Settings } from '../../Features/Settings/Settings';
import { useSettingsSync } from '../../Features/StateSync/useSettingsSync';
import { TodayChart } from '../../Features/Stats/components/TodayChart';

import { TodayStats } from '../../Features/Stats/components/TodayStats';

import { Timer } from '../../Features/Timer/components/Timer';
import { useTimerForTicking } from '../../Features/Timer/useTimerForTicking';
import { TimeEntryType } from '../../Features/types';
import { formatToReadableTime } from '../../Features/utils';

import { $currentEntry } from '../../store/currentEntry';

import styles from './index.module.css';

export const Main = () => {
  useSettingsSync();
  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']")!;
    $currentEntry.watch((entry) => {
      const entryTypeIcons: Record<TimeEntryType, string> = {
        [TimeEntryType.Pomodoro]: '/favicons/pomodoro.ico',
        [TimeEntryType.Rest]: '/favicons/rest.ico',
        [TimeEntryType.Time]: '/favicons/time.ico',
      };

      const entryTypeEmojis: Record<TimeEntryType, string> = {
        [TimeEntryType.Pomodoro]: '🍅',
        [TimeEntryType.Rest]: '🏖️',
        [TimeEntryType.Time]: '⏳',
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

      document.title = `${entryTypeEmojis[entry.type]} ${time}`;

      // @ts-ignore
      link.href = entryTypeIcons[entry.type];
    });
  }, []);
  useTimerForTicking();

  return (
    <div className={styles.layout}>
      <Settings />
      <div>
        <h3>Стата за сегодня</h3>
        <div
          style={{ marginBottom: 12, display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <TodayStats />
          <div style={{ flexGrow: 1 }}>
            <TodayChart />
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <Timer />
      </div>
    </div>
  );
};
