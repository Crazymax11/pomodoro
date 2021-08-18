import React, { useState } from 'react';
import { Theme, ThemeContext, ThemeContextValue } from './ThemeContext';
import { ThemeInjector } from './ThemeInjector';

export const DarkThemeProvider: React.FC = ({ children }) => {
  const value: ThemeContextValue = {
    currentTheme: Theme.Dark,
    setTheme: () => {},
  };
  return (
    <ThemeContext.Provider value={value}>
      <ThemeInjector theme={Theme.Dark}>{children}</ThemeInjector>
    </ThemeContext.Provider>
  );
};
export const LightThemeProvider: React.FC = ({ children }) => {
  const value: ThemeContextValue = {
    currentTheme: Theme.Light,
    setTheme: () => {},
  };
  return (
    <ThemeContext.Provider value={value}>
      <ThemeInjector theme={Theme.Light}>{children}</ThemeInjector>
    </ThemeContext.Provider>
  );
};
export const ChoosableThemeRrovider: React.FC = ({ children }) => {
  const [currentTheme, setTheme] = useState(Theme.Dark);
  const value: ThemeContextValue = {
    currentTheme,
    setTheme,
  };
  return (
    <ThemeContext.Provider value={value}>
      <ThemeInjector theme={currentTheme}>{children}</ThemeInjector>
    </ThemeContext.Provider>
  );
};
