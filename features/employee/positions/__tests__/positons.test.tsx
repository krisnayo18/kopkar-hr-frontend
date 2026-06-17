import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { usePositions } from '../api/get-positions';

function makeWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe('positions API hooks', () => {
  it('usePositions — fetches list from HR API', async () => {
    const { result } = renderHook(() => usePositions(), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeInstanceOf(Array);
    expect(result.current.data!.length).toBeGreaterThan(0);
    expect(result.current.data![0]).toMatchObject({
      id: expect.any(String),
      code: expect.any(String),
      name: expect.any(String),
    });
  });
});
