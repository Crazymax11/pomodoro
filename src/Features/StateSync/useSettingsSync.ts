import { useEffect } from 'react';
import { restoreState } from '../../store';

export const useSettingsSync = () => {
  return useEffect(() => {
    restoreState();
  }, []);
};
