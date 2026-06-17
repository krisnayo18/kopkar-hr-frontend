import { useQuery } from '@tanstack/react-query';
import { hrEndpoints } from '@/config/api-endpoints';
import { hrClient } from '@/lib/api-client-hr';
import type { Contract } from '../types';

export interface GetContractsParams {
  search?: string;
  status?: string;
}

export const contractKeys = {
  all: () => ['contracts'] as const,
  list: (params?: GetContractsParams) => [...contractKeys.all(), 'list', params] as const,
  detail: (id: string) => [...contractKeys.all(), 'detail', id] as const,
};

const getContracts = (params?: GetContractsParams): Promise<Contract[]> =>
  hrClient.get(hrEndpoints.contracts.list, { params });

export const useContracts = (params?: GetContractsParams) =>
  useQuery({ queryKey: contractKeys.list(params), queryFn: () => getContracts(params) });
