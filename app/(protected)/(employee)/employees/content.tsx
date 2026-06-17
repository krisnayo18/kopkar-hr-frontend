import { Suspense } from 'react';
import { EmployeesList } from '@/features/employee/employees/components/employees-list';

export default function EmployeesContent() {
  return (
    //give gap each component
    <div className="grid gap-5 lg:gap-7.5">
      <Suspense
        fallback={
          <div className="py-8 text-center text-gray-500">
            Loading employees...
          </div>
        }
      >
        <EmployeesList />
      </Suspense>
    </div>
  );
}
