import { z } from 'zod';

export const assuranceSchema = z.object({
  id: z.string().min(1, 'Assurance ID is required'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  bpjsNumber: z.string().min(1, 'BPJS number is required'),

  jhtActive: z.boolean(),
  jpActive: z.boolean(),
  jkkActive: z.boolean(),
  jkmActive: z.boolean(),
  jkpActive: z.boolean(),

  registeredDate: z.string().datetime().or(z.date()),
  isActive: z.boolean(),
  createdAt: z.string().datetime().or(z.date()),
  updatedAt: z.string().datetime().or(z.date()),
});

export const createAssuranceSchema = assuranceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateAssuranceSchema = createAssuranceSchema;

export const assuranceListItemSchema = assuranceSchema.pick({
  id: true,
  employeeId: true,
  bpjsNumber: true,
  isActive: true,
});

export const assuranceContributionSchema = z.object({
  id: z.string().min(1, 'Contribution ID is required'),
  employmentInsuranceId: z
    .string()
    .min(1, 'Employment Insurance ID is required'),
  period: z.string().min(1, 'Period is required'),
  baseSalary: z.number().positive('Base salary must be positive'),

  jhtEmployeeRate: z.number().nonnegative(),
  jhtEmployerRate: z.number().nonnegative(),
  jhtEmployeeAmount: z.number().nonnegative(),
  jhtEmployerAmount: z.number().nonnegative(),

  jpEmployeeRate: z.number().nonnegative(),
  jpEmployerRate: z.number().nonnegative(),
  jpEmployeeAmount: z.number().nonnegative(),
  jpEmployerAmount: z.number().nonnegative(),

  jkkRate: z.number().nonnegative(),
  jkkAmount: z.number().nonnegative(),
  jkmRate: z.number().nonnegative(),
  jkmAmount: z.number().nonnegative(),

  totalEmployeeContribution: z.number().nonnegative(),
  totalEmployerContribution: z.number().nonnegative(),

  paidAt: z.string().datetime().or(z.date()).nullable().optional(),
  createdAt: z.string().datetime().or(z.date()),
});

export const createAssuranceContributionSchema =
  assuranceContributionSchema.omit({
    id: true,
    createdAt: true,
  });

export type Assurance = z.infer<typeof assuranceSchema>;
export type CreateAssuranceInput = z.infer<typeof createAssuranceSchema>;
export type UpdateAssuranceInput = z.infer<typeof updateAssuranceSchema>;
export type AssuranceListItem = z.infer<typeof assuranceListItemSchema>;

export type AssuranceContribution = z.infer<typeof assuranceContributionSchema>;
export type CreateAssuranceContributionInput = z.infer<
  typeof createAssuranceContributionSchema
>;
