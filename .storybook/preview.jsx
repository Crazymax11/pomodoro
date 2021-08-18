import React from 'react';
import { ChoosableThemeRrovider } from '../src/Theme/ThemeProvider';
import { ThemeToggle } from '../src/Theme/ThemeToggle';
import { useGlobalInjector } from '../src/Theme/ThemeInjector';
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  parameters: { actions: { argTypesRegex: '^on.*' } },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => {
    useGlobalInjector();
    return (
      <div>
        <ThemeToggle />
        <Story />
      </div>
    );
  },
  (Story) => {
    return (
      <ChoosableThemeRrovider>
        <Story />
      </ChoosableThemeRrovider>
    );
  },
];
