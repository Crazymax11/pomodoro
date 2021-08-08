import React from 'react';
import { useSelector } from 'react-redux';
import { formatToReadableTime } from '../../../utils';
import { getTodayStats } from '../../store/selectors';

const mapState = (store: any) => {
  return {
    todayStats: getTodayStats(store),
  };
};

type Props = ReturnType<typeof mapState>;
export const TodayStatsPure = (props: Props) => {
  const totalTime =
    props.todayStats.pomodoros.totalTime +
    props.todayStats.pureTimes.totalTime +
    props.todayStats.rests.totalTime;
  return (
    <div>
      <div>🍅 {props.todayStats.pomodoros.completed} </div>
      <div>🕰️ {formatToReadableTime(totalTime)} </div>
    </div>
  );
};

export const TodayStats = () => {
  const state = useSelector(mapState);
  return <TodayStatsPure {...state} />;
};
