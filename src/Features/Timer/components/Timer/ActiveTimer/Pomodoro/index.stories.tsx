import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Pomodoro } from './index';
import { seconds } from '../../../../../utils';

export default {
  title: 'PomodoroTimer/Pomodoro',
  component: Pomodoro,
} as ComponentMeta<typeof Pomodoro>;

const Template: ComponentStory<typeof Pomodoro> = (args) => <Pomodoro {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isPaused: false,
  size: seconds(25),
  completedTime: 0,
  onDrop: () => {},
  onPause: () => {},
  onUnpause: () => {},
};
