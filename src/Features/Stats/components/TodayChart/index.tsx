import { useStore } from 'effector-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import rough from 'roughjs';
import { removeStoredEntry, saveEntry } from '../../../../store';
import { $stats, TimeEntry } from '../../../../store/stats';
import { TimeEntryType } from '../../../types';
import { minutes } from '../../../utils';
import { isToday } from '../isToday';
import { EditEntry } from './EditEntry';
import styles from './index.module.css';

const colors: Record<TimeEntryType, { color: string; border: string }> = {
  [TimeEntryType.Pomodoro]: { color: 'tomato', border: 'tomato' },
  [TimeEntryType.Rest]: { color: 'green', border: 'green' },
  [TimeEntryType.Time]: { color: 'deepskyblue', border: 'deepskyblue' },
};

const TimeBlock = React.memo(
  (props: { type: TimeEntryType; size: number; position: number; onClick: () => void }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!svgRef.current || !divRef.current) {
        return;
      }
      if (svgRef.current.childNodes[0]) {
        svgRef.current.removeChild(svgRef.current.childNodes[0]);
      }

      const { offsetWidth, offsetHeight } = divRef.current;
      const rc = rough.svg(svgRef.current);
      const node = rc.rectangle(0, 0, offsetWidth, offsetHeight, {
        fill: colors[props.type].color,
        stroke: colors[props.type].border,
        fillStyle: 'hachure',
        hachureGap: 2,
      });

      svgRef.current.appendChild(node);
    });

    return (
      <div
        className={styles.root}
        ref={divRef}
        title="kek"
        style={{
          width: `${props.size}%`,
          marginLeft: `${props.position}%`,
          height: 40,
          position: 'absolute',
        }}
        onClick={props.onClick}
      >
        <svg style={{ width: '100%', height: '100%' }} ref={svgRef} />
      </div>
    );
  },
);

// eslint-disable-next-line react/display-name
const HourLine = React.memo((props: { position: number; hour: number }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${props.position}%`,
        height: 60,
        borderLeft: 'solid grey 1px',
      }}
    >
      <div style={{ marginTop: 40 }}>{props.hour}</div>
    </div>
  );
});

type Props = {
  entries: TimeEntry[];
  removeEntry: (entry: TimeEntry) => void;
  saveEntry: (entry: TimeEntry) => void;
};
// eslint-disable-next-line max-statements
export const TodayChartPure = (props: Props) => {
  const [entryToEdit, setEntryToEdit] = useState<null | TimeEntry>(null);

  const handleOnRemove = useCallback(() => {
    if (entryToEdit) {
      props.removeEntry(entryToEdit);
    }

    setEntryToEdit(null);
  }, [entryToEdit]);

  const closeModal = useCallback(() => setEntryToEdit(null), []);

  const setEntryHandlers = useRef(new WeakMap<TimeEntry, () => void>());

  if (!props.entries.length) {
    return null;
  }

  const today9AM = new Date().setHours(9, 0, 0, 0);
  const today8PM = new Date().setHours(20, 0, 0, 0);

  const firstEntryStartTime = props.entries[0].startTime;
  const lastEntryEndTime = props.entries[props.entries.length - 1].endTime;

  const start = today9AM < firstEntryStartTime ? today9AM : firstEntryStartTime;
  const end =
    // eslint-disable-next-line no-nested-ternary
    Date.now() > today8PM ? Date.now() : today8PM > lastEntryEndTime ? today8PM : lastEntryEndTime;

  const totalSize = end - start;

  const firstHourAfterStart = new Date(start + minutes(60)).setMinutes(0, 0, 0);
  const hours = [firstHourAfterStart];

  let counter = 0;
  while (hours[hours.length - 1] + minutes(60) < end) {
    counter += 1;
    hours.push(hours[hours.length - 1] + minutes(60));
    if (counter === 24) {
      throw new Error('kek');
    }
  }

  return (
    <div style={{ position: 'relative', height: 40 }}>
      {hours.map((hour) => (
        <HourLine
          key={hour}
          position={((hour - start) * 100) / totalSize}
          hour={new Date(hour).getHours()}
        />
      ))}
      {props.entries.map((entry) => {
        if (!setEntryHandlers.current.get(entry)) {
          setEntryHandlers.current.set(entry, () => setEntryToEdit(entry));
        }

        return (
          <TimeBlock
            type={entry.type}
            key={entry.startTime}
            size={((entry.endTime - entry.startTime) * 100) / totalSize}
            position={((entry.startTime - start) * 100) / totalSize}
            onClick={setEntryHandlers.current.get(entry)!}
          />
        );
      })}
      {entryToEdit && (
        <EditEntry
          entry={entryToEdit}
          onClose={closeModal}
          onRemove={handleOnRemove}
          isCreation={false}
          onSave={(entry) => {
            props.removeEntry(entryToEdit);
            props.saveEntry(entry);
          }}
        />
      )}
    </div>
  );
};

export const TodayChart = () => {
  const stats = useStore($stats);

  return (
    <TodayChartPure
      entries={stats.entries.filter(isToday)}
      removeEntry={removeStoredEntry}
      saveEntry={saveEntry}
    />
  );
};
