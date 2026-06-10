'use client';

import { useEffect, useState } from 'react';
import { env } from '@/config/env';

//automatically enable MSW in development mode, and optionally via env var in production
// async function enableMocking() {
//   if (process.env.NODE_ENV !== 'development') return;

//   const { worker } = await import('@/testing/mocks/browser');
//   return worker.start({ onUnhandledRequest: 'bypass' });
// }

async function enableMocking() {
  if (!env.NEXT_PUBLIC_ENABLE_MOCK) return; // ← replace NODE_ENV check

  const { worker } = await import('@/testing/mocks/browser');
  return worker.start({ onUnhandledRequest: 'bypass' });
}

export function MockProvider({ children }: { children: React.ReactNode }) {
  // const [ready, setReady] = useState(process.env.NODE_ENV !== 'development');
  const [ready, setReady] = useState(!env.NEXT_PUBLIC_ENABLE_MOCK); // ← replace NODE_ENV check

  useEffect(() => {
    enableMocking().then(() => setReady(true));
  }, []);

  if (!ready) return null;
  return <>{children}</>;
}
