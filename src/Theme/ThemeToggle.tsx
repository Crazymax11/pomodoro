import React, { useContext } from 'react';
import { Theme } from '../store/settings';
import { ThemeContext } from './ThemeContext';

type Props = {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
};
export function ThemeTogglePure(props: Props) {
  return (
    <div>
      Тема
      <label>
        Темная
        <input
          checked={props.currentTheme === Theme.Dark}
          type="radio"
          name="darkTheme"
          value="true"
          onChange={() => props.setTheme(Theme.Dark)}
        />
      </label>
      <label>
        Светлая
        <input
          checked={props.currentTheme === Theme.Light}
          type="radio"
          name="darkTheme"
          value="false"
          onChange={() => props.setTheme(Theme.Light)}
        />
      </label>
    </div>
  );
}

export const ThemeToggle = () => {
  const value = useContext(ThemeContext);
  return <ThemeTogglePure {...value} />;
};
