import React from "react";
import { ArrowUpRight } from "lucide-react"; // Ensure you have Lucide icons installed
import { AppsDataTable } from "./data-table";

function Apps() {
  return (
    <div className="flex flex-col items-start  rounded-lg shadow-sm w-full">
      <div className=" bg-gray-50 w-full p-4 h-1/4">
        <h2 className="text-lg font-semibold">Get started with Apps</h2>
        <p className="text-sm text-gray-600">
          With apps, you can setup scope, account type, webhooks and more.
        </p>
        <a href="#" className="text-blue-600 flex items-center mt-2">
          Learn more <ArrowUpRight className="ml-1" size={16} />
        </a>
      </div>
      <div className="w-full">
        <AppsDataTable />
      </div>
    </div>
  );
}

export default Apps;
