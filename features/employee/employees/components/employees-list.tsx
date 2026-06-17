'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useDepartments } from '@/features/employee/departments/api/get-departments';
import { useEmployees } from '@/features/employee/employees/api/get-employees';
import type {
  Employee,
  EmploymentStatus,
} from '@/features/employee/employees/types';
import { usePositions } from '@/features/employee/positions/api/get-positions';
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
  EllipsisVertical,
  Filter,
  Search,
  Settings2,
  UserRoundPlus,
  X,
} from 'lucide-react';
import { Badge, BadgeDot } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardFooter,
  CardHeader,
  CardHeading,
  CardTable,
  CardToolbar,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
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
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';

//  ─── Types ────────────────────────────────────────────────────────────────────
type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'info'
  | 'destructive';

//  ─── Status badge config ──────────────────────────────────────────────────────
const STATUS_BADGE: Record<
  EmploymentStatus,
  { variant: BadgeVariant; label: string }
> = {
  Active: { variant: 'success', label: 'Active' },
  Probation: { variant: 'warning', label: 'Probation' },
  'On Leave': { variant: 'info', label: 'On Leave' },
  Suspended: { variant: 'warning', label: 'Suspended' },
  Resigned: { variant: 'destructive', label: 'Resigned' },
  Terminated: { variant: 'destructive', label: 'Terminated' },
  Retired: { variant: 'secondary', label: 'Retired' },
};

//  ─── Actions dropdown cell ────────────────────────────────────────────────────
function ActionsCell({ row }: { row: Row<Employee> }) {
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

//  ─── Column definitions ───────────────────────────────────────────────────────
function getEmployeeColumns(
  deptMap: Record<string, string>,
  posMap: Record<string, string>,
): ColumnDef<Employee>[] {
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

    // ── Employee ─────────────────────────────────────────────────────────
    {
      id: 'employee',
      accessorFn: (row) => row.fullName,
      header: ({ column }) => (
        <DataGridColumnHeader title="Employee" column={column} />
      ),
      cell: ({ row }) => {
        const emp = row.original;
        return (
          <div className="flex items-center gap-2.5">
            <div className="shrink-0">
              {emp.avatar ? (
                <img
                  src={emp.avatar}
                  className="size-9 rounded-full object-cover"
                  alt={emp.fullName}
                />
              ) : (
                <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-medium">
                  {emp.fullName
                    .split(' ')
                    .slice(0, 2)
                    .map((n) => n[0])
                    .join('')}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-0.5">
              <Link
                href="#"
                className="leading-none font-medium text-sm text-mono hover:text-primary"
              >
                {emp.fullName}
              </Link>
              <span className="text-sm text-secondary-foreground font-normal">
                {emp.employeeNumber}
              </span>
            </div>
          </div>
        );
      },
      enableSorting: true,
      size: 240,
    },

    // ── Department ───────────────────────────────────────────────────────
    {
      id: 'department',
      accessorFn: (row) => deptMap[row.departmentId] ?? row.departmentId,
      header: ({ column }) => (
        <DataGridColumnHeader title="Department" column={column} />
      ),
      cell: ({ getValue }) => (
        <span className="text-sm text-foreground font-normal">
          {getValue<string>()}
        </span>
      ),
      enableSorting: true,
      size: 180,
    },

    // ── Position ─────────────────────────────────────────────────────────
    {
      id: 'position',
      accessorFn: (row) => posMap[row.positionId] ?? row.positionId,
      header: ({ column }) => (
        <DataGridColumnHeader title="Position" column={column} />
      ),
      cell: ({ getValue }) => (
        <span className="text-sm text-foreground font-normal">
          {getValue<string>()}
        </span>
      ),
      enableSorting: true,
      size: 180,
    },

    // ── Status ───────────────────────────────────────────────────────────
    {
      id: 'status',
      accessorFn: (row) => row.status,
      header: ({ column }) => (
        <DataGridColumnHeader title="Status" column={column} />
      ),
      cell: ({ row }) => {
        const cfg = STATUS_BADGE[row.original.status];
        return (
          <Badge
            size="md"
            variant={cfg.variant}
            appearance="light"
            shape="circle"
          >
            <BadgeDot /> {cfg.label}
          </Badge>
        );
      },
      enableSorting: true,
      size: 140,
    },

    // ── Join Date ────────────────────────────────────────────────────────
    {
      id: 'joinDate',
      accessorFn: (row) => row.joinDate,
      header: ({ column }) => (
        <DataGridColumnHeader title="Join Date" column={column} />
      ),
      cell: ({ row }) => (
        <span className="text-sm text-secondary-foreground font-normal">
          {new Date(row.original.joinDate).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          })}
        </span>
      ),
      enableSorting: true,
      size: 130,
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

//  ─── Filter hook ──────────────────────────────────────────────────────────────
//  Encapsulates all search / filter state so EmployeesList stays lean.
function useEmployeeFilters(
  employees: Employee[],
  deptMap: Record<string, string>,
  posMap: Record<string, string>,
) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [activeOnly, setActiveOnly] = useState(false);

  const filteredData = useMemo(() => {
    return employees.filter((item) => {
      if (activeOnly && item.status !== 'Active') return false;
      if (
        selectedStatuses.length > 0 &&
        !selectedStatuses.includes(item.status)
      )
        return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          item.fullName.toLowerCase().includes(q) ||
          item.employeeNumber.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          (deptMap[item.departmentId] ?? '').toLowerCase().includes(q) ||
          (posMap[item.positionId] ?? '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [employees, deptMap, posMap, searchQuery, selectedStatuses, activeOnly]);

  // Static counts — always based on full dataset so filter counts don't shift
  const statusCounts = useMemo(
    () =>
      employees.reduce(
        (acc, item) => {
          acc[item.status] = (acc[item.status] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      ),
    [employees],
  );

  const handleStatusChange = (checked: boolean, value: string) =>
    setSelectedStatuses((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value),
    );

  return {
    searchQuery,
    setSearchQuery,
    selectedStatuses,
    handleStatusChange,
    activeOnly,
    setActiveOnly,
    filteredData,
    statusCounts,
  };
}

//  ─── Card toolbar (right side of CardHeader) ─────────────────────────────────
//  Must render inside <DataGrid> context (needs useDataGrid for column visibility).
interface CardToolbarProps {
  activeOnly: boolean;
  onActiveOnlyChange: (value: boolean) => void;
}

function EmployeesCardToolbar({
  activeOnly,
  onActiveOnlyChange,
}: CardToolbarProps) {
  const { table } = useDataGrid();
  return (
    <CardToolbar>
      <div className="flex items-center gap-2.5">
        <Label htmlFor="active-employees" className="text-sm">
          Active Employees
        </Label>
        <Switch
          size="sm"
          id="active-employees"
          checked={activeOnly}
          onCheckedChange={onActiveOnlyChange}
        />
      </div>
      <Button>
        <UserRoundPlus />
        Add New
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

//  ─── Go to page input ─────────────────────────────────────────────────────────
//  Must render inside <DataGrid> context.
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

//  ─── Main component ───────────────────────────────────────────────────────────
const EmployeesList = () => {
  const { data: employees = [], isLoading: isLoadingEmployees } =
    useEmployees();
  const { data: departments = [] } = useDepartments();
  const { data: positions = [] } = usePositions();

  const deptMap = useMemo(
    () => Object.fromEntries(departments.map((d) => [d.id, d.name])),
    [departments],
  );

  const posMap = useMemo(
    () => Object.fromEntries(positions.map((p) => [p.id, p.name])),
    [positions],
  );

  const filters = useEmployeeFilters(employees, deptMap, posMap);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'employee', desc: false },
  ]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Column definitions are stable — no inline closures depend on component state
  const columns = useMemo(
    () => getEmployeeColumns(deptMap, posMap),
    [deptMap, posMap],
  );

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
        {/* ── Header: search + filters (left) | toolbar (right) ── */}
        <CardHeader>
          <CardHeading>
            <div className="flex items-center gap-2.5">
              {/* Search */}
              <div className="relative">
                <Search className="size-4 text-muted-foreground absolute start-3 top-1/2 -translate-y-1/2" />
                <Input
                  placeholder="Search Employees..."
                  value={filters.searchQuery}
                  onChange={(e) => filters.setSearchQuery(e.target.value)}
                  className="ps-9 w-44"
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

              {/* Status filter */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Filter />
                    Status
                    {filters.selectedStatuses.length > 0 && (
                      <Badge size="sm" variant="outline">
                        {filters.selectedStatuses.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-44 p-3" align="start">
                  <div className="space-y-3">
                    <p className="text-xs font-medium text-muted-foreground">
                      Filter by Status
                    </p>
                    <div className="space-y-3">
                      {Object.entries(filters.statusCounts).map(
                        ([status, count]) => (
                          <div
                            key={status}
                            className="flex items-center gap-2.5"
                          >
                            <Checkbox
                              id={`status-${status}`}
                              checked={filters.selectedStatuses.includes(
                                status,
                              )}
                              onCheckedChange={(checked) =>
                                filters.handleStatusChange(
                                  checked === true,
                                  status,
                                )
                              }
                            />
                            <Label
                              htmlFor={`status-${status}`}
                              className="grow flex items-center justify-between font-normal gap-1.5"
                            >
                              {status}
                              <span className="text-muted-foreground">
                                {count}
                              </span>
                            </Label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardHeading>

          <EmployeesCardToolbar
            activeOnly={filters.activeOnly}
            onActiveOnlyChange={filters.setActiveOnly}
          />
        </CardHeader>

        {/* ── Table ── */}
        <CardTable>
          <ScrollArea>
            <DataGridTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardTable>

        {/* ── Footer: pagination + go-to-page ── */}
        <CardFooter>
          <DataGridPagination sizes={[5, 10, 25, 50]} />
          <GoToPage />
        </CardFooter>
      </Card>
    </DataGrid>
  );
};

export { EmployeesList };
