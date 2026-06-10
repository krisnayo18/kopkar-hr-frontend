import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useCreateDepartment } from '../api/create-department';
import { useDeleteDepartment } from '../api/delete-department';
import { useDepartment } from '../api/get-department';
import { useDepartments } from '../api/get-departments';
import { useUpdateDepartment } from '../api/update-department';

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

describe('departments API hooks', () => {
  it('useDepartments — fetches list from HR API', async () => {
    const { result } = renderHook(() => useDepartments(), {
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

  it('useDepartment — fetches single department by id', async () => {
    const { result } = renderHook(() => useDepartment('dept-1'), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toMatchObject({
      id: 'dept-1',
      code: 'HO',
      name: 'Head Office',
    });
  });

  it('useDepartment — returns error for unknown id', async () => {
    const { result } = renderHook(() => useDepartment('nonexistent'), {
      wrapper: makeWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });

  it('useCreateDepartment — creates a new department', async () => {
    const { result } = renderHook(() => useCreateDepartment(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({
      code: 'TEST',
      name: 'Test Department',
      description: 'Created in test',
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('useUpdateDepartment — updates an existing department', async () => {
    const { result } = renderHook(() => useUpdateDepartment(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate({ id: 'dept-2', name: 'HR Updated' });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('useDeleteDepartment — deletes an existing department', async () => {
    const { result } = renderHook(() => useDeleteDepartment(), {
      wrapper: makeWrapper(),
    });

    result.current.mutate('dept-3');

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
