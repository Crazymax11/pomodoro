import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Resting } from './index';
import { seconds } from '../../../../../utils';

export default {
  title: 'PomodoroTimer/Resting',
  component: Resting,
} as ComponentMeta<typeof Resting>;

const Template: ComponentStory<typeof Resting> = (args) => <Resting {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isPaused: false,
  size: seconds(25),
  completedTime: 0,
  onComplete: () => {},
  onDrop: () => {},
  onPause: () => {},
  onUnpause: () => {},
};
