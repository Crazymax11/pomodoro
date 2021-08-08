import React from 'react';

type Props = {
  onRest: () => any;
  onPomodoro: () => any;
  onIdle: () => any;
};
export const SuggestResting = (props: Props) => {
  return (
    <div>
      Отдохни
      <button onClick={props.onRest}>Отдохнуть</button>
      <button onClick={props.onPomodoro}>Начать новую помидорку</button>
      <button onClick={props.onIdle}>Ничего не хочу</button>
    </div>
  );
};
