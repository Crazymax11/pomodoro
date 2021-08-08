import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Idle } from './index';

export default {
  title: 'PomodoroTimer/Idle',
  component: Idle,
} as ComponentMeta<typeof Idle>;

const Template: ComponentStory<typeof Idle> = (args) => <Idle {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onStartPomodoro: () => {},
  onStartPureTime: () => {},
};
