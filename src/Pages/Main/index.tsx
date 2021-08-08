import React from 'react';
import { TodayStats } from '../../Features/Stats/components/TodayStats';
import { Timer } from '../../Features/Timer/components/Timer';
import styles from './index.module.css';

export const Main = () => {
  return (
    <div className={styles.layout}>
      <TodayStats />
      <Timer />
    </div>
  );
};
