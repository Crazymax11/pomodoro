import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TodayStats } from '../../Features/Stats/components/TodayStats';
import { statsEvents } from '../../Features/Stats/store/events';
import { syncer } from '../../Features/Sync/Syncer';
import { Timer } from '../../Features/Timer/components/Timer';
import { events } from '../../Features/Timer/store/events';

import styles from './index.module.css';

export const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const saved = syncer.load();

    if (!saved) {
      return;
    }
    const { stats, timer } = saved;
    dispatch(events.initialize(timer));
    dispatch(statsEvents.initialize(stats));
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
