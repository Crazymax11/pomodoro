import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SettingsPure } from './Settings';

export default {
  title: 'Settings',
  component: SettingsPure,
} as ComponentMeta<typeof SettingsPure>;

const Template: ComponentStory<typeof SettingsPure> = (args) => <SettingsPure {...args} />;

export const Overview = Template.bind({});
Overview.args = {
  tickVolume: 0.2,
  alertVolume: 0.2,
  isAlertSoundEnabled: false,
};

export const AllDisabled = Template.bind({});
AllDisabled.args = {
  tickVolume: 0.2,
  alertVolume: 0.2,
  isAlertSoundEnabled: false,
  isTickSoundEnabled: false,
};

export const All05 = Template.bind({});
All05.args = {
  tickVolume: 0.5,
  alertVolume: 0.5,
  isAlertSoundEnabled: true,
  isTickSoundEnabled: true,
};

export const FullValue = Template.bind({});
FullValue.args = {
  tickVolume: 1,
  alertVolume: 1,
  isAlertSoundEnabled: true,
  isTickSoundEnabled: true,
};

export const Mute = Template.bind({});
Mute.args = {
  tickVolume: 0,
  alertVolume: 0,
  isAlertSoundEnabled: true,
  isTickSoundEnabled: true,
};
