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
  ArrowUpRight,
  //   ChevronDown,
  MoreHorizontal,
  PlusCircle,
} from "lucide-react";
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

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  //   DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

const data: Payment[] = [
  {
    id: "1",
    amount: 100,
    status: "pending",
    email: "customer1@example.com",
    createdAt: "2023-01-01T10:00:00Z",
    customer: "John Doe",
    account: "123456",
    dateSynced: "2023-01-02T10:00:00Z",
  },
  {
    id: "2",
    amount: 200,
    status: "processing",
    email: "customer2@example.com",
    createdAt: "2023-02-01T10:00:00Z",
    customer: "Jane Smith",
    account: "654321",
    dateSynced: "2023-02-02T10:00:00Z",
  },
  {
    id: "3",
    amount: 300,
    status: "success",
    email: "customer3@example.com",
    createdAt: "2023-03-01T10:00:00Z",
    customer: "Alice Johnson",
    account: "789012",
    dateSynced: "2023-03-02T10:00:00Z",
  },
  {
    id: "4",
    amount: 400,
    status: "failed",
    email: "customer4@example.com",
    createdAt: "2023-04-01T10:00:00Z",
    customer: "Bob Brown",
    account: "210987",
    dateSynced: "2023-04-02T10:00:00Z",
  },
  {
    id: "5",
    amount: 500,
    status: "pending",
    email: "customer5@example.com",
    createdAt: "2023-05-01T10:00:00Z",
    customer: "Charlie Davis",
    account: "345678",
    dateSynced: "2023-05-02T10:00:00Z",
  },
  //   {
  //     id: "6",
  //     amount: 600,
  //     status: "processing",
  //     email: "customer6@example.com",
  //     createdAt: "2023-06-01T10:00:00Z",
  //     customer: "Diana Evans",
  //     account: "876543",
  //     dateSynced: "2023-06-02T10:00:00Z",
  //   },
  //   {
  //     id: "7",
  //     amount: 700,
  //     status: "success",
  //     email: "customer7@example.com",
  //     createdAt: "2023-07-01T10:00:00Z",
  //     customer: "Edward Foster",
  //     account: "987654",
  //     dateSynced: "2023-07-02T10:00:00Z",
  //   },
  //   {
  //     id: "8",
  //     amount: 800,
  //     status: "failed",
  //     email: "customer8@example.com",
  //     createdAt: "2023-08-01T10:00:00Z",
  //     customer: "Fiona Green",
  //     account: "456789",
  //     dateSynced: "2023-08-02T10:00:00Z",
  //   },
  //   {
  //     id: "9",
  //     amount: 900,
  //     status: "pending",
  //     email: "customer9@example.com",
  //     createdAt: "2023-09-01T10:00:00Z",
  //     customer: "George Harris",
  //     account: "567890",
  //     dateSynced: "2023-09-02T10:00:00Z",
  //   },
  {
    id: "10",
    amount: 1000,
    status: "processing",
    email: "customer10@example.com",
    createdAt: "2023-10-01T10:00:00Z",
    customer: "Hannah Irving",
    account: "678901",
    dateSynced: "2023-10-02T10:00:00Z",
  },
];

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  createdAt: string;
  customer: string;
  account: string;
  dateSynced: string;
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
  //   {
  //     accessorKey: "status",
  //     header: "Status",
  //     cell: ({ row }) => (
  //       <div className="capitalize">{row.getValue("status")}</div>
  //     ),
  //   },
  // customer name
  {
    accessorKey: "customer",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Customer Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("customer")}</div>
    ),
  },
  // account
  {
    accessorKey: "account",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Account
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("account")}</div>
    ),
  },

  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  //   amount
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Balance
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div>{row.getValue("amount")}</div>,
  },
  //   {
  //     accessorKey: "amount",
  //     header: () => <div className="text-right">Balance </div>,
  //     cell: ({ row }) => {
  //       const amount = parseFloat(row.getValue("amount"));

  //       // Format the amount as a dollar amount
  //       const formatted = new Intl.NumberFormat("en-US", {
  //         style: "currency",
  //         currency: "KES",
  //       }).format(amount);

  //       return <div className="text-right font-medium">{formatted}</div>;
  //     },
  //   },
  //   currency

  // {
  //     accessorKey: "createdAt",
  //     header: "Created At",
  //     cell: ({ row }) => {
  //     const date = new Date(row.original.createdAt);
  //     return <div>{date.toLocaleDateString()}</div>;
  //     },
  // },
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
  //   date synced
  {
    accessorKey: "dateSynced",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Synced
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div>{new Date(row.getValue("dateSynced")).toLocaleDateString()}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isAddCustomerDialogOpen, setIsAddCustomerDialogOpen] =
    React.useState(false);

  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    table.getColumn("createdAt")?.setFilterValue([from, to]);
  };
  const handleAddCustomer = () => {
    setIsAddCustomerDialogOpen(true);
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
    <div className="w-full min-h-screen">
      <div className="flex items-center py-4">
        {/* <CalendarDatePicker
          value={table.getColumn("createdAt")?.getFilterValue() as string}
          onChange={(value: any) =>
            table.getColumn("createdAt")?.setFilterValue(value)
          }
          className="max-w-sm"
        /> */}

        <Input
          placeholder="Search by customer ..."
          value={
            (table.getColumn("customer")?.getFilterValue() as string) ?? ""
          }
          onChange={(event: { target: { value: any } }) =>
            table.getColumn("customer")?.setFilterValue(event.target.value)
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
          <Button
            variant="outline"
            // onClick={() => table.reset()}

            className="bg-sky-600 text-white"
          >
            <ArrowUpRight className="" size={16} />
            Export
          </Button>

          <Button
            variant="outline"
            //   onClick={() => table.reset()}
            onClick={() => handleAddCustomer()}
            className=" bg-sky-600 text-white"
          >
            <PlusCircle className="" size={16} />
            Add Customer
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
          {table.getFilteredRowModel().rows.length} customer(s) selected.
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
      {isAddCustomerDialogOpen && (
        <Dialog
          open={isAddCustomerDialogOpen}
          onOpenChange={() => setIsAddCustomerDialogOpen(false)}
        >
          <DialogOverlay />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Customer</DialogTitle>
              <DialogDescription>
                Add a new customer to the system.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="name">Customer Name</label>
                <Input id="name" placeholder="Enter customer name" />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="email">Email</label>
                <Input id="email" placeholder="Enter customer email" />
              </div>
              {/* <div className="flex flex-col space-y-2">
                  <label htmlFor="phone">Phone</label>
                  <Input id="phone" placeholder="Enter customer phone" />
                  </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="address">Address</label>
                  <Input id="address" placeholder="Enter customer address" />
                  </div> */}
              {/* <div className="flex flex-col space-y-2">
                  <label htmlFor="city">City</label>
                  <Input id="city" placeholder="Enter customer city" />
                  </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="country">Country</label>
                  <Input id="country" placeholder="Enter customer country" />
                  </div> */}
              {/* balance  */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="balance">Balance</label>
                <Input id="balance" placeholder="Enter customer balance" />
              </div>
              {/* account  */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="account">Account</label>
                <Input id="account" placeholder="Enter customer account" />
              </div>
              {/* status  */}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddCustomerDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                className="bg-sky-600 text-white "
                onClick={() => setIsAddCustomerDialogOpen(false)}
              >
                Add Customer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
