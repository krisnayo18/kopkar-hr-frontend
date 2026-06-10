import { delay } from 'msw';

export const networkDelay = async () => {
  await delay(1000);
};
