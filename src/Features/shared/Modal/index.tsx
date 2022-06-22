import React, { ReactNode } from 'react';

import styles from './index.module.css';

type Props = {
  onClose: () => void;
  children: ReactNode[] | ReactNode;
};
export const Modal: React.FC<Props> = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.cover} onClick={props.onClose} />
      <div className={styles.container}>
        <div className={styles.closeIcon} onClick={props.onClose}>
          X
        </div>
        <div className={styles.content}>{props.children}</div>
      </div>
    </div>
  );
};
