import { z } from 'zod';

export const healthInsuranceClassSchema = z.enum(['1', '2', '3'], {
  errorMap: () => ({ message: 'Class must be 1, 2, or 3' }),
});

export const dependentRelationshipSchema = z.enum(['Spouse', 'Child'], {
  errorMap: () => ({ message: 'Relationship must be Spouse or Child' }),
});

export const healthInsuranceDependentSchema = z.object({
  id: z.string().min(1, 'Dependent ID is required'),
  healthInsuranceId: z.string().min(1, 'Health Insurance ID is required'),
  name: z.string().min(1, 'Name is required'),
  relationship: dependentRelationshipSchema,
  nik: z.string().nullable().optional(),
  birthDate: z.string().datetime().or(z.date()),
  bpjsNumber: z.string().nullable().optional(),
  isActive: z.boolean(),
});

export const createHealthInsuranceDependentSchema =
  healthInsuranceDependentSchema.omit({
    id: true,
  });

export const updateHealthInsuranceDependentSchema =
  createHealthInsuranceDependentSchema;

export const healthInsuranceSchema = z.object({
  id: z.string().min(1, 'Insurance ID is required'),
  employeeId: z.string().min(1, 'Employee ID is required'),
  bpjsNumber: z.string().min(1, 'BPJS number is required'),
  class: healthInsuranceClassSchema,
  faskes1: z.string().nullable().optional(),
  registeredDate: z.string().datetime().or(z.date()),
  isActive: z.boolean(),
  dependents: z.array(healthInsuranceDependentSchema).optional(),
  createdAt: z.string().datetime().or(z.date()),
  updatedAt: z.string().datetime().or(z.date()),
});

export const createHealthInsuranceSchema = healthInsuranceSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    dependents: z.array(createHealthInsuranceDependentSchema).optional(),
  });

export const updateHealthInsuranceSchema = createHealthInsuranceSchema;

export const healthInsuranceListItemSchema = healthInsuranceSchema.pick({
  id: true,
  employeeId: true,
  bpjsNumber: true,
  class: true,
  isActive: true,
});

export type HealthInsuranceClass = z.infer<typeof healthInsuranceClassSchema>;
export type DependentRelationship = z.infer<typeof dependentRelationshipSchema>;
export type HealthInsuranceDependent = z.infer<
  typeof healthInsuranceDependentSchema
>;
export type CreateHealthInsuranceDependentInput = z.infer<
  typeof createHealthInsuranceDependentSchema
>;
export type UpdateHealthInsuranceDependentInput = z.infer<
  typeof updateHealthInsuranceDependentSchema
>;

export type HealthInsurance = z.infer<typeof healthInsuranceSchema>;
export type CreateHealthInsuranceInput = z.infer<
  typeof createHealthInsuranceSchema
>;
export type UpdateHealthInsuranceInput = z.infer<
  typeof updateHealthInsuranceSchema
>;
export type HealthInsuranceListItem = z.infer<
  typeof healthInsuranceListItemSchema
>;
