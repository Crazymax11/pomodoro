import { useEffect, useRef } from 'react';
import { tick } from '../../store';

import { seconds } from '../utils';
import TickerWorker from './tickerWorker?worker';

export const useTimerForTicking = () => {
  const workerRef = useRef<Worker | null>();

  useEffect(() => {
    if (!workerRef.current) {
      workerRef.current = new TickerWorker();
    }

    workerRef.current.onmessage = () => tick(seconds(1));
    workerRef.current.postMessage('start');
    return () => workerRef.current!.postMessage('stop');
  }, []);
};
