import { z } from 'zod';

export const departmentSchema = z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  description: z.string().nullable().optional(),
  parentId: z.string().nullable().optional(),
  managerId: z.string().nullable().optional(),
  createdAt: z.string().datetime().or(z.date()),
  updatedAt: z.string().datetime().or(z.date()),
  headCount: z.number().optional(),
});

export const departmentListItemSchema = departmentSchema.omit({
  description: true,
  createdAt: true,
  updatedAt: true,
});

export type Department = z.infer<typeof departmentSchema>;
export type DepartmentListItem = z.infer<typeof departmentListItemSchema>;
