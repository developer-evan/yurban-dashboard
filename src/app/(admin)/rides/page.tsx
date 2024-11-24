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
import { ArrowUpDown } from "lucide-react";
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
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Customer Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
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
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Driver Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const firstName = row.original.driverId.firstName ?? "";
      const lastName = row.original.driverId.lastName ?? "";

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
    accessorKey: "passengerNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Passenger
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("passengerNumber")}</div>,
  },
  {
    accessorKey: "pickupLocation",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Pickup 
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("pickupLocation")}</div>,
  },
  {
    accessorKey: "dropoffLocation",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Drop Off 
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("dropoffLocation")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div
        className={
          row.getValue("status") === "Accepted"
            ? "text-green-500 p-2 rounded"
            : row.getValue("status") === "Pending"
            ? "text-yellow-500 p-2 rounded"
            : "text-red-400 p-2 rounded"
        }
      >
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date Requested
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    
    cell: ({ row }) => (
      <div>{new Date(row.getValue("createdAt")).toLocaleString()}</div>
    ),
  },
  
];

export default function RidesDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { data: rides, isLoading } = useQuery({
    queryKey: ["rides"],
    queryFn: getAllRides,
  });

  const table = useReactTable({
      // data: Array.isArray(UserData.data)
    // ? UserData.data.sort(
    //     (a, b) =>
    //       new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    //   )
    // : [],
    data: Array.isArray(rides) ? rides.sort(
      (a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ) : [],

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

  return (
    <div className="w-full mb-auto min-h-screen pb-16">
        <h1 className="text-2xl font-semibold mb-4">Rides</h1>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search by driver ..."
          value={(table.getColumn("driverName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mr-2"
        />
      </div>
      <div className="rounded-md border">
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} ride(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
