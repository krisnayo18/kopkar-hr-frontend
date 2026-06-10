import { z } from 'zod';

export const jobGradeSchema = z.object({
  id: z.string().min(1, 'Job grade ID is required'),
  code: z.string().min(1, 'Job grade code is required'),
  name: z.string().min(1, 'Job grade name is required'),
  level: z
    .number()
    .int('Level must be an integer')
    .positive('Level must be positive'),
  minSalary: z
    .number()
    .positive('Minimum salary must be positive')
    .nullable()
    .optional(),
  maxSalary: z
    .number()
    .positive('Maximum salary must be positive')
    .nullable()
    .optional(),
  description: z.string().nullable().optional(),
  status: z.enum(['Active', 'Inactive'], {
    errorMap: () => ({ message: 'Status must be either Active or Inactive' }),
  }),
  createdAt: z.string().datetime().or(z.date()),
  updatedAt: z.string().datetime().or(z.date()),
});

export const createJobGradeSchema = jobGradeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateJobGradeSchema = createJobGradeSchema;

export const jobGradeListItemSchema = jobGradeSchema.omit({
  description: true,
});

export const jobGradeWithSalaryValidationSchema = jobGradeSchema.refine(
  (data) => {
    if (data.minSalary && data.maxSalary) {
      return data.maxSalary >= data.minSalary;
    }
    return true;
  },
  {
    message: 'Maximum salary must be greater than or equal to minimum salary',
    path: ['maxSalary'],
  },
);

export type JobGrade = z.infer<typeof jobGradeSchema>;
export type CreateJobGradeInput = z.infer<typeof createJobGradeSchema>;
export type UpdateJobGradeInput = z.infer<typeof updateJobGradeSchema>;
export type JobGradeListItem = z.infer<typeof jobGradeListItemSchema>;
