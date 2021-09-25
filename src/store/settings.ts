import { combine } from 'effector';
import { domain } from './domain';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}
export const $tickVolume = domain.createStore(0.1);
export const $alertVolume = domain.createStore(1);
export const $isTickSoundEnabled = domain.createStore(true);
export const $isAlertSoundEnabled = domain.createStore(true);
export const $preferedTheme = domain.createStore<Theme>(Theme.Dark);

export const $settings = combine({
  tickVolume: $tickVolume,
  alertVolume: $alertVolume,
  isTickSoundEnabled: $isTickSoundEnabled,
  isAlertSoundEnabled: $isAlertSoundEnabled,
  preferedTheme: $preferedTheme,
});

export const settingsEvents = {
  setTickVolume: domain.createEvent<number>(),
  setAlertVolume: domain.createEvent<number>(),
  toggleTickSound: domain.createEvent<void>(),
  toggleAlertSound: domain.createEvent<void>(),
  setPreferedTheme: domain.createEvent<Theme>(),
  init: domain.createEvent<{
    tickVolume: number;
    alertVolume: number;
    isTickSoundEnabled: boolean;
    isAlertSoundEnabled: boolean;
    preferedTheme: Theme;
  }>(),
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

export const $isNeedToMakeTick = combine({ $tickVolume, $isTickSoundEnabled }).map(
  (payload) => !!payload.$isTickSoundEnabled && payload.$tickVolume > 0,
);

export const $isNeedToMakeAlert = combine({ $alertVolume, $isAlertSoundEnabled }).map(
  (payload) => !!payload.$isAlertSoundEnabled && payload.$alertVolume > 0,
);
