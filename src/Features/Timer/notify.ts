function checkNotificationPromise() {
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }

  return true;
}

export const notify = (message: string) => {
  if (!Notification || Notification.permission === 'denied') {
    return;
  }

  if (Notification.permission === 'granted') {
    // eslint-disable-next-line no-new
    new Notification(message);
    return;
  }

  if (checkNotificationPromise()) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        // eslint-disable-next-line no-new
        new Notification(message);
      }
    });
  } else {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        // eslint-disable-next-line no-new
        new Notification(message);
      }
    });
  }
};
