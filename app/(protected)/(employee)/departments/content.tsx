import { Suspense } from 'react';
import { DepartmentsList } from '@/features/employee/departments/components/departments-list';

export default function DepartmentsContent() {
  return (
    //give gap each component
    <div className="grid gap-5 lg:gap-7.5">
      <Suspense
        fallback={
          <div className="py-8 text-center text-gray-500">
            Loading departments...
          </div>
        }
      >
        <DepartmentsList />
      </Suspense>
    </div>
  );
}
