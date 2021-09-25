import React from 'react';
import { Theme } from '../store/settings';

export type ThemeContextValue = {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = React.createContext<ThemeContextValue>({
  currentTheme: Theme.Dark,
  setTheme: () => {},
});
