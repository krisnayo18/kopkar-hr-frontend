'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useContracts } from '../api/get-contracts';
import { useState, useEffect } from 'react';

export function ContractList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';

  const [searchInput, setSearchInput] = useState(search);
  const [statusInput, setStatusInput] = useState(status);

  // Sync inputs with URL changes (e.g. back button)
  useEffect(() => {
    setSearchInput(search);
    setStatusInput(status);
  }, [search, status]);

  const { data: contracts, isLoading, isError } = useContracts({
    search: search || undefined,
    status: status || undefined,
  });

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (searchInput) params.set('search', searchInput);
    if (statusInput) params.set('status', statusInput);
    
    // Update URL without full page reload
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex flex-col gap-1 w-full sm:w-64">
          <label htmlFor="search" className="text-sm font-medium">Search</label>
          <input
            id="search"
            type="text"
            className="border rounded px-3 py-2 text-sm"
            placeholder="Search contracts..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
          />
        </div>
        <div className="flex flex-col gap-1 w-full sm:w-48">
          <label htmlFor="status" className="text-sm font-medium">Status</label>
          <select
            id="status"
            className="border rounded px-3 py-2 text-sm bg-white dark:bg-gray-900"
            value={statusInput}
            onChange={(e) => setStatusInput(e.target.value)}
          >
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
            <option value="Expired">Expired</option>
            <option value="Terminated">Terminated</option>
            <option value="Renewed">Renewed</option>
          </select>
        </div>
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 font-medium"
        >
          Apply Filters
        </button>
      </div>

      {isLoading ? (
        <div className="py-8 text-center text-gray-500">Loading contracts...</div>
      ) : isError ? (
        <div className="py-8 text-center text-red-500">Error loading contracts</div>
      ) : contracts?.length === 0 ? (
        <div className="py-8 text-center text-gray-500 border rounded bg-gray-50 dark:bg-gray-800">
          No contracts found.
        </div>
      ) : (
        <div className="overflow-x-auto border rounded">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b">
              <tr>
                <th className="px-4 py-3 font-medium">Contract Number</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Start Date</th>
                <th className="px-4 py-3 font-medium">Basic Salary</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {contracts?.map((contract) => (
                <tr key={contract.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-4 py-3">{contract.contractNumber}</td>
                  <td className="px-4 py-3">{contract.contractType}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {contract.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(contract.startDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(contract.basicSalary)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
