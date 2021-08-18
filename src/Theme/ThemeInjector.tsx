import classNames from 'classnames';
import React from 'react';
import { Theme } from './ThemeContext';
import styles from './ThemeInjector.module.css';

export const ThemeInjector: React.FC<{ theme: Theme }> = ({ theme, children }) => {
  return <div className={classNames(styles[theme], styles.injectedRoot)}>{children}</div>;
};
