import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { hrEndpoints } from '@/config/api-endpoints';
import { hrClient } from '@/lib/api-client-hr';
import { departmentKeys } from './get-departments';

export const createDepartmentInputSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  parentId: z.string().nullable().optional(),
  managerId: z.string().nullable().optional(),
});

export type CreateDepartmentInput = z.infer<typeof createDepartmentInputSchema>;

const createDepartment = (data: CreateDepartmentInput) =>
  hrClient.post(hrEndpoints.departments.list, data);

export const useCreateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createDepartment,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: departmentKeys.list() }),
  });
};
