import classNames from 'classnames';
import React, { useContext, useEffect } from 'react';
import { Theme } from '../store/settings';
import { ThemeContext } from './ThemeContext';
import styles from './ThemeInjector.module.css';

export const ThemeInjector: React.FC<{ theme: Theme, children: JSX.Element }> = ({ theme, children }) => {
  return <div className={classNames(styles[theme], styles.injectedRoot)}>{children}</div>;
};

export const useGlobalInjector = () => {
  const { currentTheme } = useContext(ThemeContext);
  useEffect(() => {
    const body = document.querySelector('body');
    if (!body) {
      return;
    }

    body.classList.remove(styles.dark);
    body.classList.remove(styles.light);
    body.classList.add(styles.injectedRoot);
    body.classList.add(styles[currentTheme]);
  }, [currentTheme]);
};

export const GlobalInjector: React.FC<{ theme: Theme, children: JSX.Element }> = ({ theme, children }) => {
  return <div className={classNames(styles[theme], styles.injectedRoot)}>{children}</div>;
};
