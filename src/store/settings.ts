import { combine } from 'effector';
import { domain } from './domain';

export const $tickVolume = domain.createStore(0.1);
export const $alertVolume = domain.createStore(1);
export const $isTickSoundEnabled = domain.createStore(true);
export const $isAlertSoundEnabled = domain.createStore(true);

export const settingsEvents = {
  setTickVolume: domain.createEvent<number>(),
  setAlertVolume: domain.createEvent<number>(),
  toggleTickSound: domain.createEvent<void>(),
  toggleAlertSound: domain.createEvent<void>(),
};

$tickVolume.on(settingsEvents.setTickVolume, (s, p) => p);
$alertVolume.on(settingsEvents.setAlertVolume, (s, p) => p);
$isTickSoundEnabled.on(settingsEvents.toggleTickSound, (s) => !s);
$isAlertSoundEnabled.on(settingsEvents.toggleAlertSound, (s) => !s);

export const $isNeedToMakeTick = combine({ $tickVolume, $isTickSoundEnabled }).map(
  (payload) => !!payload.$isTickSoundEnabled && payload.$tickVolume > 0,
);

export const $isNeedToMakeAlert = combine({ $alertVolume, $isAlertSoundEnabled }).map(
  (payload) => !!payload.$isAlertSoundEnabled && payload.$alertVolume > 0,
);
