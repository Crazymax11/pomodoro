import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SuggestResting } from './index';

export default {
  title: 'PomodoroTimer/SuggestResting',
  component: SuggestResting,
} as ComponentMeta<typeof SuggestResting>;

const Template: ComponentStory<typeof SuggestResting> = (args) => <SuggestResting {...args} />;

export const Overview = Template.bind({});
Overview.args = {};
