import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TodayStatsPure } from './index';

export default {
  title: 'Stats/TodayStatsPure',
  component: TodayStatsPure,
} as ComponentMeta<typeof TodayStatsPure>;

const Template: ComponentStory<typeof TodayStatsPure> = (args) => <TodayStatsPure {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  totalTime: 64000,
  pomodorosCount: 1,
};
