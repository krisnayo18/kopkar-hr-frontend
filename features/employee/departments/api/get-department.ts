import { useQuery } from '@tanstack/react-query';
import { hrEndpoints } from '@/config/api-endpoints';
import { hrClient } from '@/lib/api-client-hr';
import type { Department } from '../types';
import { departmentKeys } from './get-departments';

const getDepartment = (id: string): Promise<Department> =>
  hrClient.get(hrEndpoints.departments.detail(id));

export const useDepartment = (id: string) =>
  useQuery({
    queryKey: departmentKeys.detail(id),
    queryFn: () => getDepartment(id),
    enabled: !!id,
  });
