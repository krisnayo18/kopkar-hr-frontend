import { Suspense } from 'react';
import { ContractList } from '@/features/employee/contracts/components/ContractList';

export default function ContractsContent() {
  return (
    //give gap each component
    <div className="grid gap-5 lg:gap-7.5">
      <Suspense fallback={<div className="py-8 text-center text-gray-500">Loading contracts...</div>}>
        <ContractList />
      </Suspense>
    </div>
  );
}

