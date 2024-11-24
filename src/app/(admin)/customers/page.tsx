import React from "react";
import { CustomerDataTable } from "./data-table";

function Customers() {
  return (
    <div className="flex flex-col items-start  rounded-lg shadow-sm w-full">
      <div className=" bg-gray-50 w-full p-4 space-y-2 ">
        <h2 className="text-lg font-semibold">Customers</h2>
      </div>
      <div className="flex-1 w-full">
        <CustomerDataTable />
      </div>
    </div>
  );
}

export default Customers;
