import { delay } from 'msw';

export const networkDelay = async () => {
  if (process.env.NODE_ENV === 'test') {
    return;
  }
  await delay(1000);
};
