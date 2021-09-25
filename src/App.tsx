import classNames from 'classnames';
import React from 'react';

import styles from './App.module.css';
import { Main } from './Pages/Main';
import { ChoosableThemeRrovider } from './Theme/ThemeProvider';

export function App() {
  return (
    <ChoosableThemeRrovider>
      <div className={classNames(styles.App)}>
        <Main />
      </div>
    </ChoosableThemeRrovider>
  );
}
