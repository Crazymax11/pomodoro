import { useStore } from 'effector-react';
import React from 'react';
import {
  $tickVolume,
  $alertVolume,
  $isTickSoundEnabled,
  $isAlertSoundEnabled,
  settingsEvents,
  $preferedTheme,
  Theme,
  $featureFlags,
} from '../../store/settings';
import { ThemeTogglePure } from '../../Theme/ThemeToggle';

type Props = {
  tickVolume: number;
  alertVolume: number;
  isTickSoundEnabled: boolean;
  isAlertSoundEnabled: boolean;
  onTickVolumeChange: (newValue: number) => void;
  onAlertVolumeChange: (newValue: number) => void;
  onToggleTickSound: () => void;
  onToggleAlertSound: () => void;
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  featureFlags: Record<string, boolean>;
  onToggleFeatureFlag: (flagName: string) => void;
};

export const SettingsPure: React.FC<Props> = ({
  isTickSoundEnabled,
  tickVolume,
  alertVolume,
  onToggleTickSound,
  onTickVolumeChange,
  onToggleAlertSound,
  isAlertSoundEnabled,
  onAlertVolumeChange,
  currentTheme,
  setTheme,
  featureFlags,
  onToggleFeatureFlag,
}) => {
  return (
    <div>
      <div>Настройки</div>
      <ThemeTogglePure setTheme={setTheme} currentTheme={currentTheme} />
      <div>
        <label> Тикание</label>
        <input
          checked={isTickSoundEnabled}
          type="checkbox"
          id="tickSound"
          name="tickSound"
          onChange={onToggleTickSound}
        />
        <input
          type="range"
          id="tickVolume"
          name="tickVolume"
          min="0"
          max="1"
          step="0.1"
          disabled={!isTickSoundEnabled}
          onChange={(e) => onTickVolumeChange(Number(e.target.value))}
          value={tickVolume}
        />
      </div>
      <div>
        <label> Алерт</label>
        <input
          type="checkbox"
          id="alertSound"
          name="alertSound"
          checked={isAlertSoundEnabled}
          onChange={onToggleAlertSound}
        />
        <input
          type="range"
          id="alertVolume"
          name="alertVolume"
          min="0"
          max="1"
          step="0.1"
          disabled={!isAlertSoundEnabled}
          onChange={(e) => onAlertVolumeChange(Number(e.target.value))}
          value={alertVolume}
        />
      </div>

      {Object.keys(featureFlags).length ? <div> FeatureFlags</div> : null}

      {Object.entries(featureFlags).map(([name, value]) => (
        <div key={name}>
          <span> {name}</span>
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={!!value}
            onChange={() => onToggleFeatureFlag(name)}
          />
        </div>
      ))}
    </div>
  );
};

export const Settings = () => {
  const tickVolume = useStore($tickVolume);
  const alertVolume = useStore($alertVolume);
  const isTickSoundEnabled = useStore($isTickSoundEnabled);
  const isAlertSoundEnabled = useStore($isAlertSoundEnabled);
  const currentTheme = useStore($preferedTheme);
  const featureFlags = useStore($featureFlags);

  return (
    <SettingsPure
      tickVolume={tickVolume}
      alertVolume={alertVolume}
      isTickSoundEnabled={isTickSoundEnabled}
      isAlertSoundEnabled={isAlertSoundEnabled}
      onAlertVolumeChange={settingsEvents.setAlertVolume}
      onTickVolumeChange={settingsEvents.setTickVolume}
      onToggleAlertSound={settingsEvents.toggleAlertSound}
      onToggleTickSound={settingsEvents.toggleTickSound}
      setTheme={settingsEvents.setPreferedTheme}
      currentTheme={currentTheme}
      featureFlags={featureFlags}
      onToggleFeatureFlag={settingsEvents.toggleFeatureFlag as any}
    />
  );
};
