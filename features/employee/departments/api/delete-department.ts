import { useMutation, useQueryClient } from '@tanstack/react-query';
import { hrEndpoints } from '@/config/api-endpoints';
import { hrClient } from '@/lib/api-client-hr';
import { departmentKeys } from './get-departments';

const deleteDepartment = (id: string) =>
  hrClient.delete(hrEndpoints.departments.detail(id));

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDepartment,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: departmentKeys.list() }),
  });
};
