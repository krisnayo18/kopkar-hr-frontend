import { z } from 'zod';

const envSchema = z.object({
  // Mock API flag
  NEXT_PUBLIC_ENABLE_MOCK: z
    .string()
    .transform((v) => v === 'true')
    .default('false'),

  // HR — Go backend :8080
  NEXT_PUBLIC_HR_API_URL: z
    .string()
    .url()
    .default('http://localhost:8080/api'),

  // ATTENDANCE — Go backend :3001
  NEXT_PUBLIC_ATTENDANCE_API_URL: z
    .string()
    .url()
    .default('http://localhost:3001/api'),

  // COMPENSATION — Go backend :3002
  NEXT_PUBLIC_COMPENSATION_API_URL: z
    .string()
    .url()
    .default('http://localhost:3002/api'),

  // NOTIFICATION — Go backend :3003
  NEXT_PUBLIC_NOTIFICATION_API_URL: z
    .string()
    .url()
    .default('http://localhost:3003/api'),

  // HCM WebSocket
  // NEXT_PUBLIC_HCM_WS_URL: z.string().url().default('ws://localhost:3002'),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_ENABLE_MOCK: process.env.NEXT_PUBLIC_ENABLE_MOCK,
  NEXT_PUBLIC_HR_API_URL: process.env.NEXT_PUBLIC_HR_API_URL,
  NEXT_PUBLIC_ATTENDANCE_API_URL: process.env.NEXT_PUBLIC_ATTENDANCE_API_URL,
  NEXT_PUBLIC_COMPENSATION_API_URL: process.env.NEXT_PUBLIC_COMPENSATION_API_URL,
  NEXT_PUBLIC_NOTIFICATION_API_URL: process.env.NEXT_PUBLIC_NOTIFICATION_API_URL,
});
// NEXT_PUBLIC_HCM_WS_URL: process.env.NEXT_PUBLIC_HCM_WS_URL,
