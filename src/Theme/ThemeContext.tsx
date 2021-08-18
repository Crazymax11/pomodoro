import React from 'react';

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export type ThemeContextValue = {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = React.createContext<ThemeContextValue>({
  currentTheme: Theme.Dark,
  setTheme: () => {},
});
