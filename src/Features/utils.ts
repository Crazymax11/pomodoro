export const seconds = (n: number) => n * 1000;
export const minutes = (n: number) => n * seconds(60);
export const hours = (n: number) => n * minutes(60);

const addLeadingZero = (n: number) => (n < 10 ? `0${n}` : `${n}`);
export const formatToReadableTime = (n: number) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const seconds = Math.floor(n / 1000);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return [hours, minutes % 60, seconds % 60].map(addLeadingZero).join(':');
};
