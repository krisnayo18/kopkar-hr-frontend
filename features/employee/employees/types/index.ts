import { z } from 'zod';

const employmentStatusSchema = z.enum(
  [
    'Active',
    'Probation',
    'On Leave',
    'Suspended',
    'Resigned',
    'Terminated',
    'Retired',
  ],
  {
    errorMap: () => ({
      message:
        'Status must be Active, Probation, On Leave, Suspended, Resigned, Terminated, or Retired',
    }),
  },
);

const employmentTypeSchema = z.enum(
  ['Permanent', 'Contract', 'Probation', 'Internship', 'Part-Time'],
  {
    errorMap: () => ({
      message:
        'Employment type must be Permanent, Contract, Probation, Internship, or Part-Time',
    }),
  },
);

const genderSchema = z.enum(['Male', 'Female'], {
  errorMap: () => ({ message: 'Gender must be Male or Female' }),
});

const maritalStatusSchema = z.enum(
  ['Single', 'Married', 'Divorced', 'Widowed'],
  {
    errorMap: () => ({
      message: 'Marital status must be Single, Married, Divorced, or Widowed',
    }),
  },
);

const bloodTypeSchema = z.enum(['A', 'B', 'AB', 'O'], {
  errorMap: () => ({ message: 'Blood type must be A, B, AB, or O' }),
});

const educationLevelSchema = z.enum(
  ['High School', 'Diploma', 'Bachelor', 'Master', 'Doctorate', 'Other'],
  {
    errorMap: () => ({
      message:
        'Education level must be High School, Diploma, Bachelor, Master, Doctorate, or Other',
    }),
  },
);

const companySchema = z.enum(['Koperasi', 'MLP', 'Outsource', 'Other'], {
  errorMap: () => ({
    message: 'Company must be Koperasi, MLP, Outsource, or Other',
  }),
});

const religionSchema = z.enum(
  ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu', 'Other'],
  {
    errorMap: () => ({
      message:
        'Religion must be Islam, Kristen, Katolik, Hindu, Buddha, Konghucu, or Other',
    }),
  },
);

export const employeeSchema = z.object({
  id: z.string().min(1, 'Employee ID is required'),
  employeeNumber: z.string().min(1, 'Employee number is required'),
  nik: z
    .string()
    .min(16, 'NIK must be 16 characters')
    .max(16, 'NIK must be 16 characters'),

  npwp: z.string().nullable().optional(),

  nickName: z.string().min(1, 'Nickname is required'),
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().nullable().optional(),
  avatar: z.string().nullable().optional(),
  gender: genderSchema,
  birthDate: z.string().datetime().or(z.date()),
  birthPlace: z.string().min(1, 'Birth place is required'),
  age: z
    .number()
    .int('Age must be an integer')
    .positive('Age must be positive'),
  educationLevel: educationLevelSchema.nullable().optional(),
  maritalStatus: maritalStatusSchema,
  bloodType: bloodTypeSchema.nullable().optional(),
  religion: religionSchema.nullable().optional(),
  nationality: z.string().min(1, 'Nationality is required'),
  address: z.string().nullable().optional(),

  departmentId: z.string().min(1, 'Department is required'),
  positionId: z.string().min(1, 'Position is required'),
  managerId: z.string().nullable().optional(),
  branchId: z.string().nullable().optional(),
  status: employmentStatusSchema,
  employmentType: employmentTypeSchema,
  joinDate: z.string().datetime().or(z.date()),
  probationEndDate: z.string().datetime().or(z.date()).nullable().optional(),
  resignDate: z.string().datetime().or(z.date()).nullable().optional(),
  retireDate: z.string().datetime().or(z.date()).nullable().optional(),
  company: companySchema,

  membershipNumber: z.string().nullable().optional(),

  bankName: z.string().nullable().optional(),
  bankAccountNumber: z.string().nullable().optional(),
  bankAccountName: z.string().nullable().optional(),

  createdAt: z.string().datetime().or(z.date()),
  updatedAt: z.string().datetime().or(z.date()),
});

export const createEmployeeSchema = employeeSchema.omit({
  id: true,
  age: true,
  createdAt: true,
  updatedAt: true,
});

export const updateEmployeeSchema = createEmployeeSchema;

export const employeeListItemSchema = employeeSchema.pick({
  id: true,
  employeeNumber: true,
  nickName: true,
  fullName: true,
  email: true,
  gender: true,
  status: true,
  employmentType: true,
  departmentId: true,
  positionId: true,
  joinDate: true,
  avatar: true,
});

export type EmploymentStatus = z.infer<typeof employmentStatusSchema>;
export type EmploymentType = z.infer<typeof employmentTypeSchema>;
export type Gender = z.infer<typeof genderSchema>;
export type MaritalStatus = z.infer<typeof maritalStatusSchema>;
export type BloodType = z.infer<typeof bloodTypeSchema>;
export type EducationLevel = z.infer<typeof educationLevelSchema>;
export type Company = z.infer<typeof companySchema>;
export type Religion = z.infer<typeof religionSchema>;

export type Employee = z.infer<typeof employeeSchema>;
export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
export type EmployeeListItem = z.infer<typeof employeeListItemSchema>;
