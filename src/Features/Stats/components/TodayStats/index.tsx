import { useStoreMap } from 'effector-react';
import React from 'react';
import { $stats } from '../../../../store/stats';
import { TimeEntryType } from '../../../types';

import { formatToReadableTime } from '../../../utils';

import styles from './index.module.css';

type Props = {
  totalTime: number;
  pomodorosCount: number;
};
export const TodayStatsPure = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <div>За сегодня</div>
      <div>🍅 {props.pomodorosCount} </div>
      <div>🕰️ {formatToReadableTime(props.totalTime)} </div>
    </div>
  );
};

export const TodayStats = () => {
  const { totalTime, pomodorosCount } = useStoreMap($stats, (state) => ({
    totalTime: state.entries
      .filter((entry) => {
        const entryStartTime = new Date(entry.startTime);
        const entryDateTime = {
          day: entryStartTime.getDate(),
          month: entryStartTime.getMonth(),
          year: entryStartTime.getFullYear(),
        };

        const nowDateTime = {
          day: new Date().getDate(),
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
        };

        return (
          entryDateTime.day === nowDateTime.day &&
          entryDateTime.month === nowDateTime.month &&
          entryDateTime.year === nowDateTime.year
        );
      })
      .reduce((acc, entry) => acc + entry.completedTime, 0),
    pomodorosCount: state.entries.filter((entry) => entry.type === TimeEntryType.Pomodoro).length,
  }));

  return <TodayStatsPure totalTime={totalTime} pomodorosCount={pomodorosCount} />;
};
