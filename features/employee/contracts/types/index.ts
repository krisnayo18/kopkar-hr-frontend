import { z } from 'zod';

export const contractStatusSchema = z.enum([
  'Draft',
  'Active',
  'Expired',
  'Terminated',
  'Renewed',
]);

export const contractTypeSchema = z.enum([
  'PKWT',
  'PKWT1',
  'PKWT2',
  'PKWTT',
  'Training',
  'Percobaan',
  'OnCall',
  'Other',
]);

export const allowanceTypeSchema = z.enum([
  'Transport',
  'Meal',
  'Housing',
  'Communication',
  'Performance',
  'Other',
]);

export const contractAllowanceSchema = z.object({
  id: z.string(),
  contractId: z.string(),
  type: allowanceTypeSchema,
  name: z.string(),
  amount: z.number(),
});

export const contractSchema = z.object({
  id: z.string(),
  contractNumber: z.string(),
  employeeId: z.string(),
  contractType: contractTypeSchema,
  status: contractStatusSchema,
  startDate: z.string().datetime().or(z.date()),
  endDate: z.string().datetime().or(z.date()).nullable().optional(),
  positionId: z.string(),
  departmentId: z.string(),
  basicSalary: z.number(),
  allowances: z.array(contractAllowanceSchema).optional(),
  documentUrl: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  signedAt: z.string().datetime().or(z.date()).nullable().optional(),
  signedBy: z.string().nullable().optional(),
  createdAt: z.string().datetime().or(z.date()),
  updatedAt: z.string().datetime().or(z.date()),
});

export const contractListItemSchema = contractSchema.omit({
  allowances: true,
  documentUrl: true,
  notes: true,
  createdAt: true,
  updatedAt: true,
});

export type ContractStatus = z.infer<typeof contractStatusSchema>;
export type ContractType = z.infer<typeof contractTypeSchema>;
export type AllowanceType = z.infer<typeof allowanceTypeSchema>;
export type ContractAllowance = z.infer<typeof contractAllowanceSchema>;
export type Contract = z.infer<typeof contractSchema>;
export type ContractListItem = z.infer<typeof contractListItemSchema>;
