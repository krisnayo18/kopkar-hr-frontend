import { useCallback, useState } from 'react';

type PaginationState = {
  page: number;
  limit: number;
};

type PaginationActions = {
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  reset: () => void;
};

export function usePagination(
  initialPage = 1,
  initialLimit = 10,
): PaginationState & PaginationActions {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const nextPage = useCallback(() => setPage((p) => p + 1), []);
  const prevPage = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const reset = useCallback(() => setPage(initialPage), [initialPage]);

  return { page, limit, setPage, setLimit, nextPage, prevPage, reset };
}
