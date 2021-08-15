import { useStore } from 'effector-react';
import React from 'react';
import { $stats, TimeEntry } from '../../../../store/stats';
import { TimeEntryType } from '../../../types';
import { minutes } from '../../../utils';
import { isToday } from '../isToday';

const colors: Record<TimeEntryType, string> = {
  [TimeEntryType.Pomodoro]: 'tomato',
  [TimeEntryType.Rest]: 'green',
  [TimeEntryType.Time]: 'blue',
};
const TimeBlock = (props: { type: TimeEntryType; size: number; position: number }) => {
  return (
    <div
      style={{
        width: `${props.size}%`,
        marginLeft: `${props.position}%`,
        height: 20,
        backgroundColor: colors[props.type],
        position: 'absolute',
      }}
    />
  );
};

const HourLine = (props: { position: number; hour: number }) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${props.position}%`,
        height: 40,
        borderLeft: 'solid grey 1px',
      }}
    >
      <div style={{ marginTop: 20 }}>{props.hour}:00</div>
    </div>
  );
};

type Props = {
  entries: TimeEntry[];
};
export const TodayChartPure = (props: Props) => {
  if (!props.entries.length) {
    return null;
  }
  const today9AM = new Date().setHours(9);
  const today8PM = new Date().setHours(20);

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
      {props.entries.map((entry) => (
        <TimeBlock
          type={entry.type}
          key={entry.startTime}
          size={((entry.endTime - entry.startTime) * 100) / totalSize}
          position={((entry.startTime - start) * 100) / totalSize}
        />
      ))}
    </div>
  );
};

export const TodayChart = () => {
  const stats = useStore($stats);

  return <TodayChartPure entries={stats.entries.filter(isToday)} />;
};
