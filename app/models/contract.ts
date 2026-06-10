import { Department } from './department';
import { Employee } from './employee';
import { Position } from './position';

export type ContractStatus =
  | 'Draft'
  | 'Active'
  | 'Expired'
  | 'Terminated'
  | 'Renewed';

/** PKWT = fixed-term (Perjanjian Kerja Waktu Tertentu),
 *  PKWTT = permanent (Perjanjian Kerja Waktu Tidak Tertentu) */
export type ContractType =
  | 'PKWT'
  | 'PKWT1'
  | 'PKWT2'
  | 'PKWTT'
  | 'Training'
  | 'Percobaan'
  | 'OnCall'
  | 'Other';

export interface EmployeeContract {
  id: string;
  contractNumber: string;
  employeeId: string;
  contractType: ContractType;
  status: ContractStatus;
  startDate: Date;
  endDate?: Date | null;
  positionId: string;
  departmentId: string;
  basicSalary: number;
  allowances?: ContractAllowance[];
  documentUrl?: string | null;
  notes?: string | null;
  signedAt?: Date | null;
  signedBy?: string | null;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  employee?: Employee;
  position?: Position;
  department?: Department;
}

export type AllowanceType =
  | 'Transport'
  | 'Meal'
  | 'Housing'
  | 'Communication'
  | 'Position'
  | 'Performance'
  | 'Other';

export interface ContractAllowance {
  id: string;
  contractId: string;
  type: AllowanceType;
  name: string;
  amount: number;
}

// Mock data for development
export const MOCK_CONTRACT_ALLOWANCES: ContractAllowance[] = [
  {
    id: 'ca-1',
    contractId: 'con-1',
    type: 'Transport',
    name: 'Tunjangan Transportasi',
    amount: 500_000,
  },
  {
    id: 'ca-2',
    contractId: 'con-1',
    type: 'Meal',
    name: 'Tunjangan Makan',
    amount: 600_000,
  },
  {
    id: 'ca-3',
    contractId: 'con-1',
    type: 'Position',
    name: 'Tunjangan Jabatan',
    amount: 2_000_000,
  },
  {
    id: 'ca-4',
    contractId: 'con-2',
    type: 'Transport',
    name: 'Tunjangan Transportasi',
    amount: 500_000,
  },
  {
    id: 'ca-5',
    contractId: 'con-2',
    type: 'Meal',
    name: 'Tunjangan Makan',
    amount: 600_000,
  },
  {
    id: 'ca-6',
    contractId: 'con-2',
    type: 'Position',
    name: 'Tunjangan Jabatan',
    amount: 2_500_000,
  },
  {
    id: 'ca-7',
    contractId: 'con-3',
    type: 'Transport',
    name: 'Tunjangan Transportasi',
    amount: 400_000,
  },
  {
    id: 'ca-8',
    contractId: 'con-3',
    type: 'Meal',
    name: 'Tunjangan Makan',
    amount: 500_000,
  },
  {
    id: 'ca-9',
    contractId: 'con-7',
    type: 'Transport',
    name: 'Tunjangan Transportasi',
    amount: 400_000,
  },
  {
    id: 'ca-10',
    contractId: 'con-7',
    type: 'Meal',
    name: 'Tunjangan Makan',
    amount: 500_000,
  },
  {
    id: 'ca-11',
    contractId: 'con-7',
    type: 'Performance',
    name: 'Tunjangan Kinerja',
    amount: 1_000_000,
  },
];

export const MOCK_CONTRACTS: EmployeeContract[] = [
  {
    id: 'con-1',
    contractNumber: 'PKT/2019/001',
    employeeId: 'emp-1',
    contractType: 'PKWTT',
    status: 'Active',
    startDate: new Date('2019-01-18'),
    endDate: null,
    positionId: 'pos-1',
    departmentId: 'dept-2',
    basicSalary: 15_000_000,
    allowances: MOCK_CONTRACT_ALLOWANCES.filter(
      (a) => a.contractId === 'con-1',
    ),
    documentUrl: '/documents/contracts/PKT-2019-001.pdf',
    notes: 'Kontrak permanen HR Manager',
    signedAt: new Date('2019-01-17'),
    signedBy: 'Direktur Utama',
    createdAt: new Date('2019-01-15'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 'con-2',
    contractNumber: 'PKT/2020/002',
    employeeId: 'emp-2',
    contractType: 'PKWTT',
    status: 'Active',
    startDate: new Date('2020-06-05'),
    endDate: null,
    positionId: 'pos-3',
    departmentId: 'dept-3',
    basicSalary: 16_000_000,
    allowances: MOCK_CONTRACT_ALLOWANCES.filter(
      (a) => a.contractId === 'con-2',
    ),
    documentUrl: '/documents/contracts/PKT-2020-002.pdf',
    notes: 'Kontrak permanen Finance Manager',
    signedAt: new Date('2020-06-04'),
    signedBy: 'Direktur Utama',
    createdAt: new Date('2020-06-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 'con-3',
    contractNumber: 'PKT/2021/003',
    employeeId: 'emp-3',
    contractType: 'PKWT',
    status: 'Active',
    startDate: new Date('2021-03-12'),
    endDate: new Date('2024-03-12'),
    positionId: 'pos-2',
    departmentId: 'dept-2',
    basicSalary: 6_500_000,
    allowances: MOCK_CONTRACT_ALLOWANCES.filter(
      (a) => a.contractId === 'con-3',
    ),
    documentUrl: '/documents/contracts/PKT-2021-003.pdf',
    notes: 'Kontrak PKWT 3 tahun',
    signedAt: new Date('2021-03-11'),
    signedBy: 'HR Manager',
    createdAt: new Date('2021-03-10'),
    updatedAt: new Date('2021-03-12'),
  },
  {
    id: 'con-4',
    contractNumber: 'PKT/2018/004',
    employeeId: 'emp-4',
    contractType: 'PKWTT',
    status: 'Active',
    startDate: new Date('2018-09-01'),
    endDate: null,
    positionId: 'pos-6',
    departmentId: 'dept-4',
    basicSalary: 20_000_000,
    documentUrl: '/documents/contracts/PKT-2018-004.pdf',
    signedAt: new Date('2018-08-30'),
    signedBy: 'Direktur Utama',
    createdAt: new Date('2018-08-28'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 'con-5',
    contractNumber: 'PKT/2022/005',
    employeeId: 'emp-5',
    contractType: 'PKWTT',
    status: 'Active',
    startDate: new Date('2022-04-01'),
    endDate: null,
    positionId: 'pos-7',
    departmentId: 'dept-5',
    basicSalary: 14_000_000,
    documentUrl: '/documents/contracts/PKT-2022-005.pdf',
    signedAt: new Date('2022-03-30'),
    signedBy: 'Direktur Utama',
    createdAt: new Date('2022-03-28'),
    updatedAt: new Date('2022-04-01'),
  },
  {
    id: 'con-6',
    contractNumber: 'PKT/2017/006',
    employeeId: 'emp-6',
    contractType: 'PKWTT',
    status: 'Active',
    startDate: new Date('2017-07-03'),
    endDate: null,
    positionId: 'pos-8',
    departmentId: 'dept-6',
    basicSalary: 15_500_000,
    documentUrl: '/documents/contracts/PKT-2017-006.pdf',
    signedAt: new Date('2017-07-01'),
    signedBy: 'Direktur Utama',
    createdAt: new Date('2017-06-30'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 'con-7',
    contractNumber: 'PKT/2023/007',
    employeeId: 'emp-7',
    contractType: 'PKWT1',
    status: 'Active',
    startDate: new Date('2023-01-02'),
    endDate: new Date('2024-01-02'),
    positionId: 'pos-5',
    departmentId: 'dept-4',
    basicSalary: 10_000_000,
    allowances: MOCK_CONTRACT_ALLOWANCES.filter(
      (a) => a.contractId === 'con-7',
    ),
    documentUrl: '/documents/contracts/PKT-2023-007.pdf',
    notes: 'Kontrak PKWT 1 tahun, outsource',
    signedAt: new Date('2023-01-01'),
    signedBy: 'Engineering Manager',
    createdAt: new Date('2022-12-28'),
    updatedAt: new Date('2023-01-02'),
  },
  {
    id: 'con-8',
    contractNumber: 'PKT/2026/008',
    employeeId: 'emp-8',
    contractType: 'Percobaan',
    status: 'Active',
    startDate: new Date('2026-04-01'),
    endDate: new Date('2026-07-01'),
    positionId: 'pos-4',
    departmentId: 'dept-3',
    basicSalary: 6_000_000,
    notes: 'Masa percobaan 3 bulan',
    signedAt: new Date('2026-03-31'),
    signedBy: 'HR Manager',
    createdAt: new Date('2026-03-28'),
    updatedAt: new Date('2026-04-01'),
  },
];
