export type JobGradeStatus = 'Active' | 'Inactive';

export interface JobGrade {
  id: string;
  code: string;
  name: string;
  level: number;
  minSalary?: number | null;
  maxSalary?: number | null;
  description?: string | null;
  status: JobGradeStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data for development
export const MOCK_JOB_GRADES: JobGrade[] = [
  {
    id: 'jg-1',
    code: 'JG1',
    name: 'Staff',
    level: 1,
    minSalary: 3_500_000,
    maxSalary: 5_000_000,
    description: 'Entry-level staff',
    status: 'Active',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 'jg-2',
    code: 'JG2',
    name: 'Senior Staff',
    level: 2,
    minSalary: 5_000_000,
    maxSalary: 8_000_000,
    description: 'Experienced staff',
    status: 'Active',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 'jg-3',
    code: 'JG3',
    name: 'Supervisor',
    level: 3,
    minSalary: 8_000_000,
    maxSalary: 12_000_000,
    description: 'Team supervisor',
    status: 'Active',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 'jg-4',
    code: 'JG4',
    name: 'Manager',
    level: 4,
    minSalary: 12_000_000,
    maxSalary: 20_000_000,
    description: 'Department manager',
    status: 'Active',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
  {
    id: 'jg-5',
    code: 'JG5',
    name: 'Senior Manager',
    level: 5,
    minSalary: 20_000_000,
    maxSalary: 35_000_000,
    description: 'Senior manager / Head of division',
    status: 'Active',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
  },
];
