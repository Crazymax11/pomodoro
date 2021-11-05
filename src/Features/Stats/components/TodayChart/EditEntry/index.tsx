import React, { useState } from 'react';
import { TimeEntry } from '../../../../../store/stats';
import { Button } from '../../../../shared/Button/Button';

import { Modal } from '../../../../shared/Modal';

import { DateTimeInput } from './DateTimeInput/DateTimeInput';
import { DurationInput } from './DurationInput/DurationInput';
import { EntryTypeInput } from './EntryTypeInput/EntryTypeInput';
import styles from './index.module.css';

type Props = {
  entry: TimeEntry;
  onClose: () => void;
  onRemove: () => void;
  onSave: (entry: TimeEntry) => void;
  isCreation: boolean;
};
export const EditEntry: React.FC<Props> = (props) => {
  const [startTime, setStartTime] = useState(props.entry.startTime);
  const [endTime, setEndTime] = useState(props.entry.endTime);
  const [completedTime, setCompletedTime] = useState(props.entry.completedTime);
  const [entryType, setEntryType] = useState(props.entry.type);

  return (
    <Modal onClose={props.onClose}>
      <div className={styles.content}>
        <div className={styles.header}>{props.isCreation ? 'Создание' : 'Редактирование'}</div>
        <div>
          <div className={styles.field}>
            type: <EntryTypeInput value={entryType} onChange={setEntryType} />
          </div>

          <div className={styles.field}>
            startTime: <DateTimeInput value={startTime} onChange={setStartTime} />
          </div>
          <div className={styles.field}>
            endTime: <DateTimeInput value={endTime} onChange={setEndTime} />
          </div>
          <div className={styles.field}>
            completedTime: <DurationInput value={completedTime} onChange={setCompletedTime} />
          </div>
        </div>
        <div className={styles.footer}>
          {!props.isCreation && <Button onClick={props.onRemove}>Удалить 🗑️</Button>}
          <Button
            onClick={() => {
              props.onSave({
                startTime,
                endTime,
                type: entryType,
                completedTime,
              });
            }}
          >
            Сохранить 💾
          </Button>
        </div>
      </div>
    </Modal>
  );
};
