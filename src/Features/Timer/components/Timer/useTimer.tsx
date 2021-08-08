import { useCallback, useEffect, useState } from 'react';

export const useTimer = (isPaused: boolean) => {
  const [time, setCurrentSession] = useState(0);

  const flush = useCallback(() => {
    setCurrentSession(0);
  }, [setCurrentSession]);

  useEffect(() => {}, [isPaused]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPaused) {
        return;
      }
      setCurrentSession((value) => value + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [setCurrentSession, isPaused]);

  return { time, flush };
};
