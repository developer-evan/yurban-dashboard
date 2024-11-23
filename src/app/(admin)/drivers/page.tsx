import React from "react";
import { AppsDataTable } from "./data-table";

function Apps() {
  return (
    <div className="flex flex-col items-start  min-h-screen pb-16 mb-auto rounded-lg shadow-sm w-full">
      <div className=" bg-gray-50 w-full p-4 h-1/4">
        <h2 className="text-lg font-semibold">Drivers</h2>
      </div>
      <div className="w-full">
        <AppsDataTable />
      </div>
    </div>
  );
}

export default Apps;
