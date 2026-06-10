import { HttpResponse, http } from 'msw';

import { env } from '@/config/env';

import { networkDelay } from '../utils';

import { departmentsHandlers } from './departments';
import { employeesHandlers } from './employees';

export const handlers = [
  ...departmentsHandlers,
  ...employeesHandlers,
  http.get(`${env.NEXT_PUBLIC_HR_API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
  http.get(`${env.NEXT_PUBLIC_ATTENDANCE_API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
  http.get(`${env.NEXT_PUBLIC_COMPENSATION_API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
  http.get(`${env.NEXT_PUBLIC_NOTIFICATION_API_URL}/healthcheck`, async () => {
    await networkDelay();
    return HttpResponse.json({ ok: true });
  }),
];