import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SuggestResting } from './index';
import { ChoosableThemeRrovider, DarkThemeProvider } from '../../../../../Theme/ThemeProvider';

export default {
  title: 'PomodoroTimer/SuggestResting',
  component: SuggestResting,
} as ComponentMeta<typeof SuggestResting>;

const Template: ComponentStory<typeof SuggestResting> = (args) => (
  <DarkThemeProvider>
    <SuggestResting {...args} />
  </DarkThemeProvider>
);

export const Overview = Template.bind({});
Overview.args = {};
