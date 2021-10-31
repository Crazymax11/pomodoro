import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SettingsPure } from './Settings';
import { Theme } from '../../store/settings';

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
  currentTheme: Theme.Dark,
  featureFlags: {},
};

export const AllDisabled = Template.bind({});
AllDisabled.args = {
  tickVolume: 0.2,
  alertVolume: 0.2,
  isAlertSoundEnabled: false,
  isTickSoundEnabled: false,
  currentTheme: Theme.Dark,
  featureFlags: {},
  isOpened: true,
};

export const All05 = Template.bind({});
All05.args = {
  tickVolume: 0.5,
  alertVolume: 0.5,
  isAlertSoundEnabled: true,
  isTickSoundEnabled: true,
  currentTheme: Theme.Dark,
  featureFlags: {},
  isOpened: true,
};

export const FullValue = Template.bind({});
FullValue.args = {
  tickVolume: 1,
  alertVolume: 1,
  isAlertSoundEnabled: true,
  isTickSoundEnabled: true,
  currentTheme: Theme.Dark,
  featureFlags: {},
  isOpened: true,
};

export const Mute = Template.bind({});
Mute.args = {
  tickVolume: 0,
  alertVolume: 0,
  isAlertSoundEnabled: true,
  isTickSoundEnabled: true,
  featureFlags: {},
  currentTheme: Theme.Dark,
  isOpened: true,
};

export const FeatureFlags = Template.bind({});
FeatureFlags.args = {
  tickVolume: 0,
  alertVolume: 0,
  isAlertSoundEnabled: true,
  isTickSoundEnabled: true,
  featureFlags: {
    enabled: true,
    disabled: false,
  },
  currentTheme: Theme.Dark,
  isOpened: true,
};
