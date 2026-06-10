import { useQuery } from '@tanstack/react-query';
import { hrEndpoints } from '@/config/api-endpoints';
import { hrClient } from '@/lib/api-client-hr';
import type { Department } from '../types';

export const departmentKeys = {
  all: () => ['departments'] as const,
  list: () => [...departmentKeys.all(), 'list'] as const,
  detail: (id: string) => [...departmentKeys.all(), 'detail', id] as const,
};

const getDepartments = (): Promise<Department[]> =>
  hrClient.get(hrEndpoints.departments.list);

export const useDepartments = () =>
  useQuery({ queryKey: departmentKeys.list(), queryFn: getDepartments });
