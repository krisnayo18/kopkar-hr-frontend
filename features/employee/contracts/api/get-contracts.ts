import { useQuery } from '@tanstack/react-query';
import { hrEndpoints } from '@/config/api-endpoints';
import { hrClient } from '@/lib/api-client-hr';
import type { Contract } from '../types';

export const contractKeys = {
  all: () => ['contracts'] as const,
  list: () => [...contractKeys.all(), 'list'] as const,
  detail: (id: string) => [...contractKeys.all(), 'detail', id] as const,
};

const getContracts = (): Promise<Contract[]> =>
  hrClient.get(hrEndpoints.contracts.list);

export const useContracts = () =>
  useQuery({ queryKey: contractKeys.list(), queryFn: getContracts });
