import { ArrowUpRight } from "lucide-react";
import React from "react";
import { DataTableDemo } from "./data-table";

function Customers() {
  return (
    <div className="flex flex-col items-start  rounded-lg shadow-sm w-full">
      <div className=" bg-gray-50 w-full p-4 space-y-2 h-1/4">
        <h2 className="text-lg font-semibold">Customers</h2>
        <p className="text-sm text-gray-600">
          All customers with accounts linked with Paya Ventures Ltd
        </p>
        <a href="#" className="text-blue-600 flex items-center mt-2">
          Learn more <ArrowUpRight className="ml-1" size={16} />
        </a>
      </div>
      <div className="flex-1 w-full">       
      <DataTableDemo />
      </div>
    </div>
  );
}

export default Customers;
