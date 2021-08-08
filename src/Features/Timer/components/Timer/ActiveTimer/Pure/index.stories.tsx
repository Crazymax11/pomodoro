import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Pure } from './index';

export default {
  title: 'PomodoroTimer/Pure',
  component: Pure,
} as ComponentMeta<typeof Pure>;

const Template: ComponentStory<typeof Pure> = (args) => <Pure {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  onComplete: () => {},
  onPause: () => {},
  onUnpause: () => {},
};
