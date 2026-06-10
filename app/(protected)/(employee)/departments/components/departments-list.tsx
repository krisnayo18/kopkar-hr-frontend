'use client';

import { useMemo, useState } from 'react';
import { useDepartments } from '@/features/employee/departments/api/get-departments';
import { DepartmentFormDialog } from '@/features/employee/departments/components/department-form-dialog';
import type { Department } from '@/features/employee/departments/types';
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  Row,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  Building2,
  EllipsisVertical,
  Loader2,
  Plus,
  Search,
  Settings2,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTable,
  CardToolbar,
} from '@/components/ui/card';
import { DataGrid, useDataGrid } from '@/components/ui/data-grid';
import { DataGridColumnHeader } from '@/components/ui/data-grid-column-header';
import { DataGridColumnVisibility } from '@/components/ui/data-grid-column-visibility';
import { DataGridPagination } from '@/components/ui/data-grid-pagination';
import {
  DataGridTable,
  DataGridTableRowSelect,
  DataGridTableRowSelectAll,
} from '@/components/ui/data-grid-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// ─── Actions dropdown cell ────────────────────────────────────────────────────
function ActionsCell({ row }: { row: Row<Department> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-7" mode="icon" variant="ghost">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        <DropdownMenuItem onClick={() => {}}>View</DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={() => {}}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Column definitions ───────────────────────────────────────────────────────
function getDepartmentColumns(
  deptMap: Record<string, string>,
): ColumnDef<Department>[] {
  return [
    // ── Select ──────────────────────────────────────────────────────────
    {
      accessorKey: 'id',
      accessorFn: (row) => row.id,
      header: () => <DataGridTableRowSelectAll />,
      cell: ({ row }) => <DataGridTableRowSelect row={row} />,
      enableSorting: false,
      enableHiding: false,
      enableResizing: false,
      size: 51,
    },

    // ── Code ─────────────────────────────────────────────────────────────
    {
      id: 'code',
      accessorFn: (row) => row.code,
      header: ({ column }) => (
        <DataGridColumnHeader title="Code" column={column} />
      ),
      cell: ({ getValue }) => (
        <span className="text-sm font-mono font-medium text-foreground">
          {getValue<string>()}
        </span>
      ),
      enableSorting: true,
      size: 90,
    },

    // ── Name ─────────────────────────────────────────────────────────────
    {
      id: 'name',
      accessorFn: (row) => row.name,
      header: ({ column }) => (
        <DataGridColumnHeader title="Department Name" column={column} />
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Building2 className="size-4" />
          </span>
          <span className="text-sm font-medium text-mono">
            {row.original.name}
          </span>
        </div>
      ),
      enableSorting: true,
      size: 220,
    },

    // ── Description ──────────────────────────────────────────────────────
    {
      id: 'description',
      accessorFn: (row) => row.description ?? '—',
      header: ({ column }) => (
        <DataGridColumnHeader title="Description" column={column} />
      ),
      cell: ({ getValue }) => (
        <span className="text-sm text-secondary-foreground font-normal">
          {getValue<string>()}
        </span>
      ),
      enableSorting: false,
      size: 260,
    },

    // ── Parent Department ─────────────────────────────────────────────────
    {
      id: 'parent',
      accessorFn: (row) =>
        row.parentId ? (deptMap[row.parentId] ?? row.parentId) : '—',
      header: ({ column }) => (
        <DataGridColumnHeader title="Parent Dept." column={column} />
      ),
      cell: ({ getValue }) => (
        <span className="text-sm text-foreground font-normal">
          {getValue<string>()}
        </span>
      ),
      enableSorting: true,
      size: 180,
    },

    // ── Head Count ───────────────────────────────────────────────────────
    {
      id: 'headCount',
      accessorFn: (row) => row.headCount ?? 0,
      header: ({ column }) => (
        <DataGridColumnHeader title="Head Count" column={column} />
      ),
      cell: ({ getValue }) => (
        <span className="text-sm font-medium text-foreground">
          {getValue<number>()}
        </span>
      ),
      enableSorting: true,
      size: 110,
    },

    // ── Actions ──────────────────────────────────────────────────────────
    {
      id: 'actions',
      header: '',
      cell: ({ row }) => <ActionsCell row={row} />,
      enableSorting: false,
      size: 60,
    },
  ];
}

// ─── Filter hook ──────────────────────────────────────────────────────────────
function useDepartmentFilters(data: Department[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    const q = searchQuery.toLowerCase();
    return data.filter(
      (dept) =>
        dept.name.toLowerCase().includes(q) ||
        dept.code.toLowerCase().includes(q) ||
        (dept.description ?? '').toLowerCase().includes(q),
    );
  }, [searchQuery, data]);

  return { searchQuery, setSearchQuery, filteredData };
}

// ─── Card toolbar ─────────────────────────────────────────────────────────────
function DepartmentsCardToolbar({ onAdd }: { onAdd: () => void }) {
  const { table } = useDataGrid();
  return (
    <CardToolbar>
      <Button onClick={onAdd}>
        <Plus />
        Add Department
      </Button>
      <DataGridColumnVisibility
        table={table}
        trigger={
          <Button variant="outline">
            <Settings2 />
            Columns
          </Button>
        }
      />
    </CardToolbar>
  );
}

// ─── Go to page input ─────────────────────────────────────────────────────────
function GoToPage() {
  const { table } = useDataGrid();
  const [value, setValue] = useState('');
  const pageCount = table.getPageCount();

  const commit = () => {
    const page = parseInt(value, 10);
    if (!isNaN(page) && page >= 1 && page <= pageCount) {
      table.setPageIndex(page - 1);
      setValue('');
    }
  };

  return (
    <div className="hidden sm:flex flex-shrink-0 items-center gap-2 text-sm text-muted-foreground border-l ps-4">
      <span className="text-nowrap">Go to page</span>
      <Input
        type="number"
        min={1}
        max={pageCount}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && commit()}
        className="w-14 h-8 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export const DepartmentsList = () => {
  const { data = [], isLoading, isError } = useDepartments();
  const [addOpen, setAddOpen] = useState(false);

  const deptMap = useMemo(
    () => Object.fromEntries(data.map((d) => [d.id, d.name])),
    [data],
  );

  const filters = useDepartmentFilters(data);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'code', desc: false },
  ]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const columns = useMemo(() => getDepartmentColumns(deptMap), [deptMap]);

  const table = useReactTable({
    columns,
    data: filters.filteredData,
    pageCount: Math.ceil(filters.filteredData.length / pagination.pageSize),
    getRowId: (row) => row.id,
    state: { pagination, sorting, rowSelection },
    columnResizeMode: 'onChange',
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (isError) {
    return (
      <Card>
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-sm text-destructive text-center">
          <span>Failed to load departments. Please try again later.</span>
        </div>
      </Card>
    );
  }

  return (
    <DataGrid
      table={table}
      recordCount={filters.filteredData.length}
      tableLayout={{
        columnsPinnable: true,
        columnsMovable: true,
        columnsVisibility: true,
        cellBorder: true,
      }}
    >
      <Card>
        {/* ── Header: search (left) | toolbar (right) ── */}
        <CardHeader className="py-3">
          <CardHeading>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                <Input
                  placeholder="Search departments..."
                  value={filters.searchQuery}
                  onChange={(e) => filters.setSearchQuery(e.target.value)}
                  className="ps-9 w-48"
                />
                {filters.searchQuery.length > 0 && (
                  <Button
                    mode="icon"
                    variant="ghost"
                    className="absolute end-1.5 top-1/2 -translate-y-1/2 h-6 w-6"
                    onClick={() => filters.setSearchQuery('')}
                  >
                    <X />
                  </Button>
                )}
              </div>
            </div>
          </CardHeading>
          <DepartmentsCardToolbar onAdd={() => setAddOpen(true)} />
        </CardHeader>

        {/* ── Table ── */}
        <CardTable>
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              <span>Loading departments...</span>
            </div>
          ) : (
            <ScrollArea>
              <DataGridTable />
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          )}
        </CardTable>

        {/* ── Footer: pagination ── */}
        {!isLoading && (
          <CardFooter>
            <DataGridPagination />
            <GoToPage />
          </CardFooter>
        )}
      </Card>
      <DepartmentFormDialog open={addOpen} onOpenChange={setAddOpen} />
    </DataGrid>
  );
};
