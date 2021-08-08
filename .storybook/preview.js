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
