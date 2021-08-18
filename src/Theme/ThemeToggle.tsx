import React, { useContext } from 'react';
import { Theme, ThemeContext } from './ThemeContext';

export function ThemeToggle() {
  const { currentTheme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      Тема
      <label>
        Темная
        <input
          checked={currentTheme === Theme.Dark}
          type="radio"
          name="darkTheme"
          value="true"
          onChange={() => setTheme(Theme.Dark)}
        />
      </label>
      <label>
        Светлая
        <input
          checked={currentTheme === Theme.Light}
          type="radio"
          name="darkTheme"
          value="false"
          onChange={() => setTheme(Theme.Light)}
        />
      </label>
    </div>
  );
}
