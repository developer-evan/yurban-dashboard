/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, Download, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { getAllRides } from "@/utils/getAllRides";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type Rides = {
  driverId: any;
  customerId: any;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  county: string;
  subCounty: string;
  role: string;
  // status: string;
  profilePicture?: string;
  rides: string[];
};

const columns: ColumnDef<Rides>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "customerName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-gray-50 hover:text-gray-900 text-gray-600 font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Customer Name
        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
      </Button>
    ),
    cell: ({ row }) => {
      const firstName = row.original.customerId.firstName ?? "";
      const lastName = row.original.customerId.lastName ?? "";

      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>
              {`${firstName[0]}${lastName[0]}`.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {`${firstName} ${lastName}`.trim()}
        </div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const firstName = row.original.firstName ?? "";
      const lastName = row.original.lastName ?? "";
      const fullName = `${firstName} ${lastName}`.toLowerCase();
      return fullName.includes(filterValue.toLowerCase());
    },
  },
  {
    id: "driverName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-gray-50 hover:text-gray-900 text-gray-600 font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Driver Name
        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
      </Button>
    ),
    cell: ({ row }) => {
      const firstName = row.original.driverId?.firstName ?? "";
      const lastName = row.original.driverId?.lastName ?? "";

      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>
              {`${firstName[0]}${lastName[0]}`.toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {`${firstName} ${lastName}`.trim()}
        </div>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      const firstName = row.original.driverId?.firstName ?? "";
      const lastName = row.original.driverId?.lastName ?? "";
      const fullName = `${firstName} ${lastName}`.toLowerCase();
      return fullName.includes(filterValue.toLowerCase());
    },
  },

  {
    accessorKey: "passengerNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-gray-50 hover:text-gray-900 text-gray-600 font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Passenger
        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("passengerNumber")}</div>,
  },
  {
    accessorKey: "pickupLocation",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-gray-50 hover:text-gray-900 text-gray-600 font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Pickup
        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("pickupLocation")}</div>,
  },
  {
    accessorKey: "dropoffLocation",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-gray-50 hover:text-gray-900 text-gray-600 font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Drop Off
        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("dropoffLocation")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-gray-50 hover:text-gray-900 text-gray-600 font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
      </Button>
    ),
    cell: ({ row }) => {
      type StatusType = 'Accepted' | 'Pending' | 'Completed' | 'Cancelled';
      const status = row.getValue("status") as StatusType;
      const statusStyles = {
        Accepted: "bg-green-50 text-green-600 border-green-100",
        Pending: "bg-yellow-50 text-yellow-600 border-yellow-100",
        Completed: "bg-blue-50 text-blue-600 border-blue-100",
        Cancelled: "bg-red-50 text-red-600 border-red-100",
      };

      return (
        <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[status] || ""}`}>
          <div className={`w-1.5 h-1.5 rounded-full mr-2 ${status === "Accepted" ? "bg-green-600" : status === "Pending" ? "bg-yellow-600" : status === "Completed" ? "bg-blue-600" : "bg-red-600"}`} />
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "completedAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="hover:bg-gray-50 hover:text-gray-900 text-gray-600 font-medium"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date Completed
        <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("completedAt"));
      const formattedDate = date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true, // Ensures AM/PM format
      });
      return <div>{formattedDate}</div>;
    },
  },
];

export default function RidesData() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { data: rides, isLoading } = useQuery({
    queryKey: ["rides"],
    queryFn: getAllRides,
  });

  const table = useReactTable({
    data: Array.isArray(rides)
      ? rides.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      : [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Update the status options array to include all possible statuses
  const statusOptions = ["All", "Accepted", "Rejected", "Pending", "Completed"];

  type StatusType = 'All' | 'Completed' | 'Pending' | 'Accepted' | 'Rejected';
  
  // First, define the status styles configuration
  const statusStyleConfig: Record<StatusType, { default: string; outline: string }> = {
    All: {
      default: "bg-gray-100 text-gray-800",
      outline: "border-gray-200 text-gray-600",
    },
    Completed: {
      default: "bg-blue-100 text-blue-800",
      outline: "border-blue-200 text-blue-600",
    },
    Pending: {
      default: "bg-yellow-100 text-yellow-800",
      outline: "border-yellow-200 text-yellow-600",
    },
    Accepted: {
      default: "bg-green-100 text-green-800",
      outline: "border-green-200 text-green-600",
    },
    Rejected: {
      default: "bg-red-100 text-red-800",
      outline: "border-red-200 text-red-600",
    },
  };

  return (
    <Card className="w-full mb-auto min-h-screen pb-8">
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Recent Rides</h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage and monitor all ride activities
            </p>
          </div>
          
          {/* Add Export/Filter Actions */}
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="sm"
              className="hover:bg-gray-50 transition-colors duration-200 border-gray-200 text-gray-600 hover:text-gray-800"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button 
              variant="default" 
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white shadow-sm"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Search and Status Filter */}
        <div className="flex items-center gap-4">
          <div className="flex-1 max-w-sm">
            <Input
              placeholder="Search by driver..."
              value={(table.getColumn("driverName")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("driverName")?.setFilterValue(event.target.value)
              }
              className="w-full"
              icon={<Search className="h-4 w-4 text-gray-400" />}
            />
          </div>
          
          {/* Update the status filter section */}
          <div className="flex gap-2">
            {statusOptions.map((status) => {
              const isSelected = status === "All" 
                ? columnFilters.length === 0 
                : columnFilters[0]?.value === status;
              
              return (
                <Badge
                  key={status}
                  variant={isSelected ? "default" : "outline"}
                  className={`
                    cursor-pointer px-3 py-1 font-medium text-xs
                    transition-all duration-200
                    hover:opacity-80 
                    ${isSelected 
                      ? statusStyleConfig[status].default
                      : statusStyleConfig[status].outline
                    }
                  `}
                  onClick={() => {
                    if (status === "All") {
                      setColumnFilters([]);
                    } else {
                      setColumnFilters([{ id: "status", value: status }]);
                    }
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    {status !== "All" && (
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        isSelected 
                          ? status === "Completed" ? "bg-blue-600" 
                          : status === "Pending" ? "bg-yellow-600"
                          : status === "Accepted" ? "bg-green-600"
                          : "bg-red-600"
                          : "bg-current"
                      }`} />
                    )}
                    {status}
                  </div>
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-lg border bg-white overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center text-gray-500"
                  >
                    No rides found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex-1 text-sm text-gray-500">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} ride(s) selected
          </div>
          <div className="flex items-center gap-6">
            <div className="flex text-sm text-gray-500 items-center gap-2">
              <span>Rows per page:</span>
              <select
                className="border rounded-md px-2 py-1 text-sm text-gray-600 bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                value={table.getState().pagination.pageSize}
                onChange={e => {
                  table.setPageSize(Number(e.target.value))
                }}
              >
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className={`
                  border-gray-200 text-gray-600
                  hover:bg-gray-50 hover:text-gray-800
                  transition-colors duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                Previous
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className={`
                  border-gray-200 text-gray-600
                  hover:bg-gray-50 hover:text-gray-800
                  transition-colors duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
