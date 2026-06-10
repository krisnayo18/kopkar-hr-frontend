import { Employee } from './employee';

export type HealthInsuranceClass = '1' | '2' | '3';

export type DependentRelationship = 'Spouse' | 'Child';

export interface HealthInsuranceDependent {
  id: string;
  healthInsuranceId: string;
  name: string;
  relationship: DependentRelationship;
  nik?: string | null;
  birthDate: Date;
  bpjsNumber?: string | null;
  isActive: boolean;
}

export interface HealthInsurance {
  id: string;
  employeeId: string;
  bpjsNumber: string;
  class: HealthInsuranceClass;
  faskes1?: string | null;
  registeredDate: Date;
  isActive: boolean;
  dependents?: HealthInsuranceDependent[];
  createdAt: Date;
  updatedAt: Date;

  // Relations
  employee?: Employee;
}

// Mock data for development
export const MOCK_HEALTH_INSURANCE_DEPENDENTS: HealthInsuranceDependent[] = [
  {
    id: 'hid-1',
    healthInsuranceId: 'hi-1',
    name: 'Agus Lestari',
    relationship: 'Spouse',
    nik: '3201010101830010',
    birthDate: new Date('1983-07-20'),
    bpjsNumber: 'BPJSKES-DEP-001',
    isActive: true,
  },
  {
    id: 'hid-2',
    healthInsuranceId: 'hi-1',
    name: 'Nur Lestari',
    relationship: 'Child',
    birthDate: new Date('2010-03-15'),
    bpjsNumber: 'BPJSKES-DEP-002',
    isActive: true,
  },
  {
    id: 'hid-3',
    healthInsuranceId: 'hi-2',
    name: 'Sri Santoso',
    relationship: 'Spouse',
    nik: '3201010505780011',
    birthDate: new Date('1978-05-05'),
    bpjsNumber: 'BPJSKES-DEP-003',
    isActive: true,
  },
  {
    id: 'hid-4',
    healthInsuranceId: 'hi-2',
    name: 'Dian Santoso',
    relationship: 'Child',
    birthDate: new Date('2005-11-12'),
    bpjsNumber: 'BPJSKES-DEP-004',
    isActive: true,
  },
  {
    id: 'hid-5',
    healthInsuranceId: 'hi-2',
    name: 'Fajar Santoso',
    relationship: 'Child',
    birthDate: new Date('2008-04-08'),
    bpjsNumber: 'BPJSKES-DEP-005',
    isActive: true,
  },
  {
    id: 'hid-6',
    healthInsuranceId: 'hi-4',
    name: 'Lina Fauzi',
    relationship: 'Spouse',
    nik: '3201010901900012',
    birthDate: new Date('1990-01-09'),
    bpjsNumber: 'BPJSKES-DEP-006',
    isActive: true,
  },
];

export const MOCK_HEALTH_INSURANCES: HealthInsurance[] = [
  {
    id: 'hi-1',
    employeeId: 'emp-1',
    bpjsNumber: 'BPJSKES-001-2019',
    class: '1',
    faskes1: 'Klinik Sehat Bandung',
    registeredDate: new Date('2019-01-18'),
    isActive: true,
    dependents: MOCK_HEALTH_INSURANCE_DEPENDENTS.filter(
      (d) => d.healthInsuranceId === 'hi-1',
    ),
    createdAt: new Date('2019-01-18'),
    updatedAt: new Date('2019-01-18'),
  },
  {
    id: 'hi-2',
    employeeId: 'emp-2',
    bpjsNumber: 'BPJSKES-002-2020',
    class: '1',
    faskes1: 'Puskesmas Sudirman Jakarta',
    registeredDate: new Date('2020-06-05'),
    isActive: true,
    dependents: MOCK_HEALTH_INSURANCE_DEPENDENTS.filter(
      (d) => d.healthInsuranceId === 'hi-2',
    ),
    createdAt: new Date('2020-06-05'),
    updatedAt: new Date('2020-06-05'),
  },
  {
    id: 'hi-3',
    employeeId: 'emp-3',
    bpjsNumber: 'BPJSKES-003-2021',
    class: '2',
    faskes1: 'Klinik Pratama Surabaya',
    registeredDate: new Date('2021-03-12'),
    isActive: true,
    dependents: [],
    createdAt: new Date('2021-03-12'),
    updatedAt: new Date('2021-03-12'),
  },
  {
    id: 'hi-4',
    employeeId: 'emp-4',
    bpjsNumber: 'BPJSKES-004-2018',
    class: '1',
    faskes1: 'RS Bethesda Yogyakarta',
    registeredDate: new Date('2018-09-01'),
    isActive: true,
    dependents: MOCK_HEALTH_INSURANCE_DEPENDENTS.filter(
      (d) => d.healthInsuranceId === 'hi-4',
    ),
    createdAt: new Date('2018-09-01'),
    updatedAt: new Date('2018-09-01'),
  },
  {
    id: 'hi-5',
    employeeId: 'emp-5',
    bpjsNumber: 'BPJSKES-005-2022',
    class: '2',
    faskes1: 'Klinik Medika Semarang',
    registeredDate: new Date('2022-04-01'),
    isActive: true,
    dependents: [],
    createdAt: new Date('2022-04-01'),
    updatedAt: new Date('2022-04-01'),
  },
  {
    id: 'hi-6',
    employeeId: 'emp-6',
    bpjsNumber: 'BPJSKES-006-2017',
    class: '1',
    faskes1: 'Puskesmas Medan Baru',
    registeredDate: new Date('2017-07-03'),
    isActive: true,
    dependents: [],
    createdAt: new Date('2017-07-03'),
    updatedAt: new Date('2017-07-03'),
  },
  {
    id: 'hi-7',
    employeeId: 'emp-7',
    bpjsNumber: 'BPJSKES-007-2023',
    class: '2',
    faskes1: 'Klinik Sehat Denpasar',
    registeredDate: new Date('2023-01-02'),
    isActive: true,
    dependents: [],
    createdAt: new Date('2023-01-02'),
    updatedAt: new Date('2023-01-02'),
  },
  {
    id: 'hi-8',
    employeeId: 'emp-8',
    bpjsNumber: 'BPJSKES-008-2026',
    class: '3',
    faskes1: 'Puskesmas Makassar Tengah',
    registeredDate: new Date('2026-04-01'),
    isActive: true,
    dependents: [],
    createdAt: new Date('2026-04-01'),
    updatedAt: new Date('2026-04-01'),
  },
];
