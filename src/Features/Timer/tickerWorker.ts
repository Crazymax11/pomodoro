let interval: any;

onmessage = (event: MessageEvent<any>) => {
  const message = event.data;

  if (message === 'start') {
    interval = setInterval(() => {
      // @ts-ignore
      postMessage('tick');
    }, 1000);
  }
  if (message === 'stop') {
    clearInterval(interval);
  }
};
export {};
