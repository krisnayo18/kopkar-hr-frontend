import { Employee } from './employee';

/**
 * Employment Insurance (BPJS Ketenagakerjaan) covers 5 programs:
 * - JHT : Old Age Security        (Jaminan Hari Tua)
 * - JP  : Pension                 (Jaminan Pensiun)
 * - JKK : Work Accident Insurance (Jaminan Kecelakaan Kerja)
 * - JKM : Life Insurance          (Jaminan Kematian)
 * - JKP : Unemployment Insurance  (Jaminan Kehilangan Pekerjaan)
 */
export interface EmploymentInsurance {
  id: string;
  employeeId: string;
  bpjsNumber: string;

  // Program participation flags
  jhtActive: boolean;
  jpActive: boolean;
  jkkActive: boolean;
  jkmActive: boolean;
  jkpActive: boolean;

  registeredDate: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  employee?: Employee;
}

export interface EmploymentInsuranceContribution {
  id: string;
  employmentInsuranceId: string;
  period: string;
  baseSalary: number;

  // JHT contributions (%)
  jhtEmployeeRate: number;
  jhtEmployerRate: number;
  jhtEmployeeAmount: number;
  jhtEmployerAmount: number;

  // JP contributions (%)
  jpEmployeeRate: number;
  jpEmployerRate: number;
  jpEmployeeAmount: number;
  jpEmployerAmount: number;

  // JKK & JKM (employer only)
  jkkRate: number;
  jkkAmount: number;
  jkmRate: number;
  jkmAmount: number;

  totalEmployeeContribution: number;
  totalEmployerContribution: number;

  paidAt?: Date | null;
  createdAt: Date;
}

// Mock data for development
export const MOCK_EMPLOYMENT_INSURANCES: EmploymentInsurance[] = [
  {
    id: 'ei-1',
    employeeId: 'emp-1',
    bpjsNumber: 'BPJSTK-001-2019',
    jhtActive: true,
    jpActive: true,
    jkkActive: true,
    jkmActive: true,
    jkpActive: true,
    registeredDate: new Date('2019-01-18'),
    isActive: true,
    createdAt: new Date('2019-01-18'),
    updatedAt: new Date('2019-01-18'),
  },
  {
    id: 'ei-2',
    employeeId: 'emp-2',
    bpjsNumber: 'BPJSTK-002-2020',
    jhtActive: true,
    jpActive: true,
    jkkActive: true,
    jkmActive: true,
    jkpActive: true,
    registeredDate: new Date('2020-06-05'),
    isActive: true,
    createdAt: new Date('2020-06-05'),
    updatedAt: new Date('2020-06-05'),
  },
  {
    id: 'ei-3',
    employeeId: 'emp-3',
    bpjsNumber: 'BPJSTK-003-2021',
    jhtActive: true,
    jpActive: false,
    jkkActive: true,
    jkmActive: true,
    jkpActive: false,
    registeredDate: new Date('2021-03-12'),
    isActive: true,
    createdAt: new Date('2021-03-12'),
    updatedAt: new Date('2021-03-12'),
  },
  {
    id: 'ei-4',
    employeeId: 'emp-4',
    bpjsNumber: 'BPJSTK-004-2018',
    jhtActive: true,
    jpActive: true,
    jkkActive: true,
    jkmActive: true,
    jkpActive: true,
    registeredDate: new Date('2018-09-01'),
    isActive: true,
    createdAt: new Date('2018-09-01'),
    updatedAt: new Date('2018-09-01'),
  },
  {
    id: 'ei-7',
    employeeId: 'emp-7',
    bpjsNumber: 'BPJSTK-007-2023',
    jhtActive: true,
    jpActive: false,
    jkkActive: true,
    jkmActive: true,
    jkpActive: false,
    registeredDate: new Date('2023-01-02'),
    isActive: true,
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02'),
  },
];

export const MOCK_EMPLOYMENT_INSURANCE_CONTRIBUTIONS: EmploymentInsuranceContribution[] =
  [
    {
      id: 'eic-1',
      employmentInsuranceId: 'ei-1',
      period: '2026-04',
      baseSalary: 15_000_000,
      jhtEmployeeRate: 2,
      jhtEmployerRate: 3.7,
      jhtEmployeeAmount: 300_000,
      jhtEmployerAmount: 555_000,
      jpEmployeeRate: 1,
      jpEmployerRate: 2,
      jpEmployeeAmount: 150_000,
      jpEmployerAmount: 300_000,
      jkkRate: 0.24,
      jkkAmount: 36_000,
      jkmRate: 0.3,
      jkmAmount: 45_000,
      totalEmployeeContribution: 450_000,
      totalEmployerContribution: 936_000,
      paidAt: new Date('2026-04-15'),
      createdAt: new Date('2026-04-01'),
    },
    {
      id: 'eic-2',
      employmentInsuranceId: 'ei-2',
      period: '2026-04',
      baseSalary: 16_000_000,
      jhtEmployeeRate: 2,
      jhtEmployerRate: 3.7,
      jhtEmployeeAmount: 320_000,
      jhtEmployerAmount: 592_000,
      jpEmployeeRate: 1,
      jpEmployerRate: 2,
      jpEmployeeAmount: 160_000,
      jpEmployerAmount: 320_000,
      jkkRate: 0.24,
      jkkAmount: 38_400,
      jkmRate: 0.3,
      jkmAmount: 48_000,
      totalEmployeeContribution: 480_000,
      totalEmployerContribution: 998_400,
      paidAt: new Date('2026-04-15'),
      createdAt: new Date('2026-04-01'),
    },
    {
      id: 'eic-3',
      employmentInsuranceId: 'ei-3',
      period: '2026-04',
      baseSalary: 6_500_000,
      jhtEmployeeRate: 2,
      jhtEmployerRate: 3.7,
      jhtEmployeeAmount: 130_000,
      jhtEmployerAmount: 240_500,
      jpEmployeeRate: 0,
      jpEmployerRate: 0,
      jpEmployeeAmount: 0,
      jpEmployerAmount: 0,
      jkkRate: 0.24,
      jkkAmount: 15_600,
      jkmRate: 0.3,
      jkmAmount: 19_500,
      totalEmployeeContribution: 130_000,
      totalEmployerContribution: 275_600,
      paidAt: new Date('2026-04-15'),
      createdAt: new Date('2026-04-01'),
    },
  ];
