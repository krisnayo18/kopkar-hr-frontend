import { Department } from './department';
import { JobGrade } from './jobGrade';

export type PositionStatus = 'Active' | 'Inactive';

export interface Position {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  departmentId: string;
  jobGradeId?: string | null;
  minSalary?: number | null;
  maxSalary?: number | null;
  status: PositionStatus;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  department?: Department;
  jobGrade?: JobGrade;
  headCount?: number;
}

// Mock data for development
export const MOCK_POSITIONS: Position[] = [
  {
    id: 'pos-1',
    code: 'HR-MGR',
    name: 'HR Manager',
    departmentId: 'dept-2',
    jobGradeId: 'jg-4',
    minSalary: 12_000_000,
    maxSalary: 18_000_000,
    status: 'Active',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    headCount: 1,
  },
  {
    id: 'pos-2',
    code: 'HR-SPEC',
    name: 'HR Specialist',
    departmentId: 'dept-2',
    jobGradeId: 'jg-2',
    minSalary: 5_000_000,
    maxSalary: 8_000_000,
    status: 'Active',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    headCount: 3,
  },
  {
    id: 'pos-3',
    code: 'FIN-MGR',
    name: 'Finance Manager',
    departmentId: 'dept-3',
    jobGradeId: 'jg-4',
    minSalary: 14_000_000,
    maxSalary: 20_000_000,
    status: 'Active',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    headCount: 1,
  },
  {
    id: 'pos-4',
    code: 'FIN-ANA',
    name: 'Finance Analyst',
    departmentId: 'dept-3',
    jobGradeId: 'jg-2',
    minSalary: 5_500_000,
    maxSalary: 8_500_000,
    status: 'Active',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    headCount: 4,
  },
  {
    id: 'pos-5',
    code: 'ENG-SEN',
    name: 'Senior Software Engineer',
    departmentId: 'dept-4',
    jobGradeId: 'jg-3',
    minSalary: 10_000_000,
    maxSalary: 15_000_000,
    status: 'Active',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    headCount: 5,
  },
  {
    id: 'pos-6',
    code: 'ENG-MGR',
    name: 'Engineering Manager',
    departmentId: 'dept-4',
    jobGradeId: 'jg-4',
    minSalary: 18_000_000,
    maxSalary: 25_000_000,
    status: 'Active',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    headCount: 1,
  },
  {
    id: 'pos-7',
    code: 'MKT-MGR',
    name: 'Marketing Manager',
    departmentId: 'dept-5',
    jobGradeId: 'jg-4',
    minSalary: 13_000_000,
    maxSalary: 18_000_000,
    status: 'Active',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    headCount: 1,
  },
  {
    id: 'pos-8',
    code: 'OPS-MGR',
    name: 'Operations Manager',
    departmentId: 'dept-6',
    jobGradeId: 'jg-4',
    minSalary: 13_000_000,
    maxSalary: 19_000_000,
    status: 'Active',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    headCount: 1,
  },
];
