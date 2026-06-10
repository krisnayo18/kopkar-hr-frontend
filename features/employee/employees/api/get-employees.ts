import { useQuery } from '@tanstack/react-query';
import { hrEndpoints } from '@/config/api-endpoints';
import { hrClient } from '@/lib/api-client-hr';
import type { Employee } from '../types';

export const employeeKeys = {
  all: () => ['employees'] as const,
  list: () => [...employeeKeys.all(), 'list'] as const,
  detail: (id: string) => [...employeeKeys.all(), 'detail', id] as const,
};

const getEmployees = (): Promise<Employee[]> =>
  hrClient.get(hrEndpoints.employees.list);

export const useEmployees = () =>
  useQuery({ queryKey: employeeKeys.list(), queryFn: getEmployees });
