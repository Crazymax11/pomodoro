import React from 'react';
import styles from './Button.module.css';

export const Button: React.FC<{ onClick: () => void }> = (props) => {
  return (
    <button className={styles.root} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
