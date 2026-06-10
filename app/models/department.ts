export interface Department {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  parentId?: string | null;
  managerId?: string | null;
  createdAt: Date;
  updatedAt: Date;

  // Relations
  parent?: Department;
  children?: Department[];
  headCount?: number;
}

// Mock data for development
export const MOCK_DEPARTMENTS: Department[] = [
  {
    id: 'dept-1',
    code: 'HO',
    name: 'Head Office',
    description: 'Head Office / Corporate',
    parentId: null,
    managerId: 'emp-1',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    headCount: 30,
  },
  {
    id: 'dept-2',
    code: 'HRD',
    name: 'Human Resources',
    description: 'Human Resources & General Affairs',
    parentId: 'dept-1',
    managerId: 'emp-3',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    headCount: 8,
  },
  {
    id: 'dept-3',
    code: 'FIN',
    name: 'Finance',
    description: 'Finance & Accounting',
    parentId: 'dept-1',
    managerId: 'emp-2',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    headCount: 10,
  },
  {
    id: 'dept-4',
    code: 'ENG',
    name: 'Engineering',
    description: 'Software Engineering & IT',
    parentId: 'dept-1',
    managerId: 'emp-4',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    headCount: 15,
  },
  {
    id: 'dept-5',
    code: 'MKT',
    name: 'Marketing',
    description: 'Marketing & Business Development',
    parentId: 'dept-1',
    managerId: 'emp-5',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    headCount: 7,
  },
  {
    id: 'dept-6',
    code: 'OPS',
    name: 'Operations',
    description: 'Operations & Supply Chain',
    parentId: 'dept-1',
    managerId: 'emp-6',
    createdAt: new Date('2022-01-01'),
    updatedAt: new Date('2022-01-01'),
    headCount: 12,
  },
];
