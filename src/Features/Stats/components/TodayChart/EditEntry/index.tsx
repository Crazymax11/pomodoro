import React from 'react';
import { TimeEntry } from '../../../../../store/stats';
import { EntryTypeIcon } from '../../../../shared/EntryTypeIcon';
import { formatToReadableTime } from '../../../../utils';
import styles from './index.module.css';

type Props = {
  entry: TimeEntry;
  onClose: () => void;
  onRemove: () => void;
};
export const EditEntry: React.FC<Props> = (props) => {
  return (
    <div className={styles.root}>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: -1,
        }}
        onClick={props.onClose}
      />
      <div className={styles.container}>
        <div className={styles.closeIcon} onClick={props.onClose}>
          X
        </div>
        <div className={styles.content}>
          <div>
            <div>
              <EntryTypeIcon type={props.entry.type} />
            </div>
            <div> startTime: {new Date(props.entry.startTime).toLocaleString()}</div>
            <div> endTime: {new Date(props.entry.endTime).toLocaleString()} </div>
            <div> completed Time : {formatToReadableTime(props.entry.completedTime)} </div>
            <span className={styles.removeIcon} title="remove">
              🗑️
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
