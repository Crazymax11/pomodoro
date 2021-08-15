import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TodayChartPure } from './index';
import { minutes } from '../../../utils';
import { TimeEntryType } from '../../../types';

export default {
  title: 'Stats/Chart',
  component: TodayChartPure,
} as ComponentMeta<typeof TodayChartPure>;

const Template: ComponentStory<typeof TodayChartPure> = (args) => <TodayChartPure {...args} />;

export const Overview = Template.bind({});
Overview.args = {
  entries: [
    {
      startTime: new Date().setHours(10, 0, 0, 0),
      completedTime: minutes(25),
      endTime: new Date().setHours(10, 25, 0, 0),
      type: TimeEntryType.Pomodoro,
    },
    {
      startTime: new Date().setHours(10, 25, 0, 0),
      completedTime: minutes(5),
      endTime: new Date().setHours(10, 30, 0, 0),
      type: TimeEntryType.Rest,
    },
    {
      startTime: new Date().setHours(10, 30, 0, 0),
      completedTime: minutes(30),
      endTime: new Date().setHours(11, 0, 0, 0),
      type: TimeEntryType.Time,
    },
    {
      startTime: new Date().setHours(11, 0, 0, 0),
      completedTime: minutes(25),
      endTime: new Date().setHours(11, 40, 0, 0),
      type: TimeEntryType.Pomodoro,
    },
    {
      startTime: new Date().setHours(11, 40, 0, 0),
      completedTime: minutes(20),
      endTime: new Date().setHours(12, 0, 0, 0),
      type: TimeEntryType.Rest,
    },
  ],
};
