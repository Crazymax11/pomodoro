import { useStoreMap } from 'effector-react';
import React, { useState } from 'react';
import { $stats, TimeEntry } from '../../../../store/stats';
import { TimeEntryType } from '../../../types';

import { formatToReadableTime } from '../../../utils';

import styles from './index.module.css';
import { isToday } from '../isToday';
import { Button } from '../../../shared/Button/Button';
import { EditEntry } from '../TodayChart/EditEntry';
import { saveEntry } from '../../../../store';

type Props = {
  totalTime: number;
  pomodorosCount: number;
  saveEntry: (entry: TimeEntry) => void;
};
export const TodayStatsPure = (props: Props) => {
  const [showCreationModal, setShowCreationModal] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div>🍅 {props.pomodorosCount} </div>
      <div>🕰️ {formatToReadableTime(props.totalTime)} </div>
      <Button
        onClick={() => {
          setShowCreationModal(true);
        }}
      >
        Создать ➕
      </Button>
      {showCreationModal && (
        <EditEntry
          entry={{
            type: TimeEntryType.Pomodoro,
            startTime: Date.now(),
            endTime: Date.now() + 1000,
            completedTime: 1000,
          }}
          onClose={() => setShowCreationModal(false)}
          isCreation={true}
          onSave={(entry) => {
            setShowCreationModal(false);
            props.saveEntry(entry);
          }}
          onRemove={() => {}}
        />
      )}
    </div>
  );
};

export const TodayStats = () => {
  const { totalTime, pomodorosCount } = useStoreMap($stats, (state) => ({
    totalTime: state.entries.filter(isToday).reduce((acc, entry) => acc + entry.completedTime, 0),
    pomodorosCount: state.entries
      .filter(isToday)
      .filter((entry) => entry.type === TimeEntryType.Pomodoro).length,
  }));

  return (
    <TodayStatsPure totalTime={totalTime} pomodorosCount={pomodorosCount} saveEntry={saveEntry} />
  );
};
