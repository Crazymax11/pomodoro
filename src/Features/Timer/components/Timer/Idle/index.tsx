import React from 'react';

type Props = {
  onStartPomodoro: () => any;
  onStartPureTime: () => any;
};
export const Idle = (props: Props) => {
  return (
    <div>
      Idle
      <button onClick={props.onStartPomodoro}>Начать помидорку</button>
      <button onClick={props.onStartPureTime}>Просто включить время</button>
    </div>
  );
};
