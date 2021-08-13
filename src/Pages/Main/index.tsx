import React, { useEffect } from 'react';

import { TodayStats } from '../../Features/Stats/components/TodayStats';

import { syncer } from '../../Features/Sync/Syncer';
import { Timer } from '../../Features/Timer/components/Timer';

import styles from './index.module.css';

export const Main = () => {
  useEffect(() => {
    const saved = syncer.load();
  }, []);
  return (
    <div className={styles.layout}>
      <TodayStats />
      <div className={styles.content}>
        <Timer />
      </div>
    </div>
  );
};
