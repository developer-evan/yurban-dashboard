/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
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
import {
  ArrowUpDown,
  // ArrowUpRight,
  //   ChevronDown,
  // MoreHorizontal,
  PlusCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FaChartLine } from "react-icons/fa";

const data: Payment[] = [
  {
    id: "1",
    app: "Paya",
    name: "John Doe",
    type: "Connect",
    environment: "Live",
    createdAt: "2021-09-01T10:00:00Z",
  },
  {
    id: "2",
    app: "Stripe",
    name: "Jane Doe",
    type: "Connect",
    environment: "Sandbox",
    createdAt: "2021-09-01T10:00:00Z",
  },
];

export type Payment = {
  id: string;
  app: string;
  name: string;
  type: string;
  environment: string;
  createdAt: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "app",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        App
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Avatar>
          <AvatarFallback>
            {(row.getValue("app") as string).slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {row.getValue("app")}
      </div>
    ),
  },

  //   {
  //     accessorKey: "name",
  //     header: ({ column }) => (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Name
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     ),
  //   },
  {
    accessorKey: "type",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Type
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="uppercase bg-orange-200 text-orange-500 rounded-md p-2 items-center flex">
        <FaChartLine className="mr-1" />
        {row.getValue("type")}
      </div>
    ),
  },
  {
    accessorKey: "environment",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Environment
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div
        className={
          row.getValue("environment") === "Live"
            ? " text-green-500 p-2 rounded"
            : " text-yellow-400  p-2 rounded"
        }
      >
        {row.getValue("environment")}
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
        Date Created
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div>{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>
    ),
    filterFn: (row, columnId, filterValue) => {
      const date = new Date(row.getValue(columnId));
      const [from, to] = filterValue;
      return date >= from && date <= to;
    },
  },

  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original;

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           {/* <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem> */}
  //           <DropdownMenuSeparator />
  //           {/* <DropdownMenuItem>View customer</DropdownMenuItem> */}
  //           <DropdownMenuItem>View App details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

export function AppsDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [isAddAppsDialogOpen, setIsAddAppsDialogOpen] = React.useState(false);

  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    table.getColumn("createdAt")?.setFilterValue([from, to]);
  };

  const handleAddAppsDialogOpen = () => {
    setIsAddAppsDialogOpen(true);
  };

  const table = useReactTable({
    data,
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

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {/* <CalendarDatePicker
          value={table.getColumn("createdAt")?.getFilterValue() as string}
          onChange={(value: any) =>
            table.getColumn("createdAt")?.setFilterValue(value)
          }
          className="max-w-sm"
        /> */}

        <Input
          placeholder="Search by app ..."
          value={(table.getColumn("app")?.getFilterValue() as string) ?? ""}
          onChange={(event: { target: { value: any } }) =>
            table.getColumn("app")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mr-2"
        />
        <CalendarDatePicker
          date={dateRange}
          onDateSelect={handleDateSelect}
          className="h-9 w-[250px]"
          variant="outline"
        />
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column: { getCanHide: () => any }) =>
                column.getCanHide()
              )
              .map(
                (column: {
                  id: any;
                  getIsVisible: () => any;
                  toggleVisibility: (arg0: boolean) => any;
                }) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value: any) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                }
              )}
          </DropdownMenuContent>
        </DropdownMenu> */}
        {/* export button  */}
        <div className="ml-auto">
          {/* <Button
            variant="outline"
            // onClick={() => table.reset()}
            className="bg-sky-600 text-white"
          >
            <ArrowUpRight className="" size={16} />
            Export
          </Button> */}

          <Button
            variant="outline"
            //   onClick={() => table.reset()}
            onClick={() => handleAddAppsDialogOpen()}
            className=" bg-sky-600 text-white"
          >
            <PlusCircle className="" size={16} />
            Create App
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table
              .getHeaderGroups()
              .map(
                (headerGroup: {
                  id: React.Key | null | undefined;
                  headers: any[];
                }) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(
                      (header: {
                        id: React.Key | null | undefined;
                        isPlaceholder: any;
                        column: { columnDef: { header: any } };
                        getContext: () => any;
                      }) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      }
                    )}
                  </TableRow>
                )
              )}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.map(
                  (row: {
                    id: React.Key | null | undefined;
                    getIsSelected: () => any;
                    getVisibleCells: () => any[];
                  }) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row
                        .getVisibleCells()
                        .map(
                          (cell: {
                            id: React.Key | null | undefined;
                            column: { columnDef: { cell: any } };
                            getContext: () => any;
                          }) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          )
                        )}
                    </TableRow>
                  )
                )
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
          {table.getFilteredRowModel().rows.length} app(s) selected.
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
        {isAddAppsDialogOpen && (
          <Dialog
            open={isAddAppsDialogOpen}
            onOpenChange={() => setIsAddAppsDialogOpen(false)}
          >
            <DialogOverlay />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create App</DialogTitle>
                <DialogDescription>
                  Create a new app to get started.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name">App Name</label>
                  <Input id="name" placeholder="Enter app name" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="type">Type</label>
                  <Input id="type" placeholder="Enter app type" />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="environment">Environment</label>
                  <Input id="environment" placeholder="Enter app environment" />
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddAppsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="outline" className="bg-sky-600 text-white ">
                  Create App
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
