import { useQuery } from '@tanstack/react-query';
import { hrEndpoints } from '@/config/api-endpoints';
import { hrClient } from '@/lib/api-client-hr';
import type { Position } from '../types';

export const positionKeys = {
  all: () => ['positions'] as const,
  list: () => [...positionKeys.all(), 'list'] as const,
  detail: (id: string) => [...positionKeys.all(), 'detail', id] as const,
};

const getPositions = (): Promise<Position[]> =>
  hrClient.get(hrEndpoints.positions.list);

export const usePositions = () =>
  useQuery({ queryKey: positionKeys.list(), queryFn: getPositions });
