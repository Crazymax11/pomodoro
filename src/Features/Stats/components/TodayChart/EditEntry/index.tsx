import React from 'react';
import { TimeEntry } from '../../../../../store/stats';
import { EntryTypeIcon } from '../../../../shared/EntryTypeIcon';
import { Modal } from '../../../../shared/Modal';
import { formatToReadableTime } from '../../../../utils';
import styles from './index.module.css';

type Props = {
  entry: TimeEntry;
  onClose: () => void;
  onRemove: () => void;
};
export const EditEntry: React.FC<Props> = (props) => {
  return (
    <Modal onClose={props.onClose}>
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
    </Modal>
  );
};
