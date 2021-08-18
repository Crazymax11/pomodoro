import classNames from 'classnames';
import React from 'react';
import styles from './index.module.css';

type Props = {
  onRest: () => any;
  onPomodoro: () => any;
  onIdle: () => any;
};
export const SuggestResting = (props: Props) => {
  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.title)}>Что теперь?</div>
      <div className={classNames(styles.buttons)}>
        <div className={classNames(styles.button)} onClick={props.onRest}>
          🏖️
          <div className={classNames(styles.buttonText)}>Перерыв</div>
        </div>
        <div className={classNames(styles.button)} onClick={props.onPomodoro}>
          🍅
          <div className={classNames(styles.buttonText)}>Начать помидорку</div>
        </div>
        <div className={classNames(styles.button)} onClick={props.onIdle}>
          🤷
          <div className={classNames(styles.buttonText)}>Да хз</div>
        </div>
      </div>
    </div>
  );
};
