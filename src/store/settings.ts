import { combine } from 'effector';
import { domain } from './domain';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}
// eslint-disable-next-line @typescript-eslint/ban-types
type FeatureFlags = {};
export type Settings = {
  tickVolume: number;
  alertVolume: number;
  isTickSoundEnabled: boolean;
  isAlertSoundEnabled: boolean;
  preferedTheme: Theme;
  featureFlags: FeatureFlags;
};

export const defaultSettings: Settings = {
  tickVolume: 0.2,
  alertVolume: 1,
  isTickSoundEnabled: true,
  isAlertSoundEnabled: true,
  preferedTheme: Theme.Dark,
  featureFlags: {},
};

export const $tickVolume = domain.createStore(defaultSettings.tickVolume);
export const $alertVolume = domain.createStore(defaultSettings.alertVolume);
export const $isTickSoundEnabled = domain.createStore(defaultSettings.isTickSoundEnabled);
export const $isAlertSoundEnabled = domain.createStore(defaultSettings.isAlertSoundEnabled);
export const $preferedTheme = domain.createStore<Theme>(defaultSettings.preferedTheme);
export const $featureFlags = domain.createStore<FeatureFlags>(defaultSettings.featureFlags);

export const $settings = combine({
  tickVolume: $tickVolume,
  alertVolume: $alertVolume,
  isTickSoundEnabled: $isTickSoundEnabled,
  isAlertSoundEnabled: $isAlertSoundEnabled,
  preferedTheme: $preferedTheme,
  featureFlags: $featureFlags,
});

export const settingsEvents = {
  setTickVolume: domain.createEvent<number>(),
  setAlertVolume: domain.createEvent<number>(),
  toggleTickSound: domain.createEvent<void>(),
  toggleAlertSound: domain.createEvent<void>(),
  setPreferedTheme: domain.createEvent<Theme>(),
  toggleFeatureFlag: domain.createEvent<keyof FeatureFlags>(),
  init: domain.createEvent<Settings>(),
};

$tickVolume
  .on(settingsEvents.setTickVolume, (s, p) => p)
  .on(settingsEvents.init, (s, p) => p.tickVolume);
$alertVolume
  .on(settingsEvents.setAlertVolume, (s, p) => p)
  .on(settingsEvents.init, (s, p) => p.alertVolume);
$isTickSoundEnabled
  .on(settingsEvents.toggleTickSound, (s) => !s)
  .on(settingsEvents.init, (s, p) => p.isTickSoundEnabled);
$isAlertSoundEnabled
  .on(settingsEvents.toggleAlertSound, (s) => !s)
  .on(settingsEvents.init, (s, p) => p.isAlertSoundEnabled);
$preferedTheme
  .on(settingsEvents.setPreferedTheme, (s, p) => p)
  .on(settingsEvents.init, (s, p) => p.preferedTheme);

$featureFlags
  .on(settingsEvents.toggleFeatureFlag, (s, p) => ({ ...s, [p]: !s[p] }))
  .on(settingsEvents.init, (s, p) => p.featureFlags);

export const $isNeedToMakeTick = combine({ $tickVolume, $isTickSoundEnabled }).map(
  (payload) => !!payload.$isTickSoundEnabled && payload.$tickVolume > 0,
);

export const $isNeedToMakeAlert = combine({ $alertVolume, $isAlertSoundEnabled }).map(
  (payload) => !!payload.$isAlertSoundEnabled && payload.$alertVolume > 0,
);
