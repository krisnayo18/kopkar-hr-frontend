import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useContracts } from '../api/get-contracts';

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

describe('contracts API hooks', () => {
  it('useContracts — fetches list from HR API', async () => {
    const { result } = renderHook(() => useContracts(), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeInstanceOf(Array);
    expect(result.current.data!.length).toBeGreaterThan(0);
    expect(result.current.data![0]).toMatchObject({
      id: expect.any(String),
      contractNumber: expect.any(String),
      contractType: expect.any(String),
      status: expect.any(String),
    });
  });

  it('useContracts — filters list by status', async () => {
    const { result } = renderHook(() => useContracts({ status: 'Active' }), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeInstanceOf(Array);
    result.current.data!.forEach((contract) => {
      expect(contract.status).toBe('Active');
    });
  });
});
