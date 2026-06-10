import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { hrEndpoints } from '@/config/api-endpoints';
import { hrClient } from '@/lib/api-client-hr';
import { departmentKeys } from './get-departments';

const updateDepartmentInputSchema = z.object({
  id: z.string(),
  code: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  parentId: z.string().nullable().optional(),
  managerId: z.string().nullable().optional(),
});

export type UpdateDepartmentInput = z.infer<typeof updateDepartmentInputSchema>;

const updateDepartment = ({ id, ...data }: UpdateDepartmentInput) =>
  hrClient.patch(hrEndpoints.departments.detail(id), data);

export const useUpdateDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDepartment,
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: departmentKeys.list() });
      queryClient.invalidateQueries({
        queryKey: departmentKeys.detail(variables.id),
      });
    },
  });
};
