import React, { ReactNode } from 'react';
import styles from './Button.module.css';

export const Button: React.FC<{ onClick: () => void, children: ReactNode }> = (props) => {
  return (
    <button className={styles.root} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
