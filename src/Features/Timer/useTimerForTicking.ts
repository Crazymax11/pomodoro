import { useStore } from 'effector-react';
import { useEffect, useRef } from 'react';
import { tick } from '../../store';
import { $settings } from '../../store/settings';
import { seconds } from '../utils';
import TickerWorker from './tickerWorker?worker';

export const useTimerForTicking = () => {
  const {
    featureFlags: { useWebWorkersForTicking },
  } = useStore($settings);

  const workerRef = useRef<Worker | null>();

  useEffect(() => {
    if (!useWebWorkersForTicking) {
      return;
    }
    if (!workerRef.current) {
      workerRef.current = new TickerWorker();
    }

    workerRef.current.onmessage = () => tick(seconds(1));
    workerRef.current.postMessage('start');
    return () => workerRef.current!.postMessage('stop');
  }, [useWebWorkersForTicking]);

  useEffect(() => {
    if (useWebWorkersForTicking) {
      return;
    }
    const interval = setInterval(() => tick(seconds(1)), seconds(1));

    return () => clearInterval(interval);
  }, [!useWebWorkersForTicking]);
};
