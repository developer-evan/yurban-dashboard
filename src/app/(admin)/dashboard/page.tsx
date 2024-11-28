"use client";
import { getAllRides } from "@/utils/getAllRides";
import { fetchProfile } from "@/utils/getUserProfile";
import { getUsers } from "@/utils/getUsers";
import { useQuery } from "@tanstack/react-query";
import { Bike, CarFront, UserCheck, UserCog } from "lucide-react";
import React from "react";
import RidesData from "./data-table";

function DashboardPage() {
  const { data: userData } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchProfile,
  });

  const { data: usersData } = useQuery({
    queryKey: ["userLength"],
    queryFn: getUsers,
  });

  const { data: ridesData } = useQuery({
    queryKey: ["rideLength"],
    queryFn: getAllRides,
  });

  return (
    <div className="p-6  min-h-screen w-full mx-auto">
      {userData && (
        <h1 className="text-2xl font-bold mb-6">
          Welcome,{" "}
          <span className="text-blue-600">
            {userData?.user?.firstName ?? ""} {userData?.user?.lastName ?? ""}
          </span>
          !
        </h1>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users Card */}

        <div className="w-full mx-auto p-3 h-full">
          <div className="border space-y-5 rounded-lg px-4 py-5 h-full flex justify-between items-center">
            <div className="space-y-4">
              <h2 className="text-sm font-semibold">All Users</h2>
              <p className="text-lg flex items-center font-bold">
                <span>{usersData?.length ?? 0}</span>
              </p>
            </div>
            <div>
              <p className={`bg-sky-500 text-white p-3 rounded-full`}>
                <UserCheck size={24} />
              </p>
            </div>
          </div>
        </div>

        {/* Total Customers Card */}
        {/* <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-700">Customers</h2>
          <p className="text-3xl font-bold text-green-600">
            {usersData?.filter((user: { role: string; }) => user.role === "Customer").length ?? 0}
          </p>
        </div> */}
        <div className="w-full mx-auto p-3 h-full">
          <div className="border space-y-5 rounded-lg px-4 py-5 h-full flex justify-between items-center">
            <div className="space-y-4">
              <h2 className="text-sm font-semibold">Drivers</h2>
              <p className="text-lg flex items-center font-bold">
                <span>
                  {usersData?.filter(
                    (user: { role: string }) => user.role === "Driver"
                  ).length ?? 0}
                </span>
              </p>
            </div>
            <div>
              <p className={`bg-green-500 text-white p-3 rounded-full`}>
                <CarFront size={24} />
              </p>
            </div>
          </div>
        </div>

        <div className="w-full mx-auto p-3 h-full">
          <div className="border space-y-5 rounded-lg px-4 py-5 h-full flex justify-between items-center">
            <div className="space-y-4">
              <h2 className="text-sm font-semibold">Customers</h2>
              <p className="text-lg flex items-center font-bold">
                <span>
                  {usersData?.filter(
                    (user: { role: string }) => user.role === "Customer"
                  ).length ?? 0}
                </span>
              </p>
            </div>
            <div>
              <p className={`bg-orange-500 text-white p-3 rounded-full`}>
                <UserCog size={24} />
              </p>
            </div>
          </div>
        </div>

        {/* Total Rides Card */}
        {/* <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-700">Total Rides</h2>
          <p className="text-3xl font-bold text-purple-600">
            {ridesData?.length ?? 0}
          </p>
        </div> */}
        <div className="w-full mx-auto p-3 h-full">
          <div className="border space-y-5 rounded-lg px-4 py-5 h-full flex justify-between items-center">
            <div className="space-y-4">
              <h2 className="text-sm font-semibold">Rides</h2>
              <p className="text-lg flex items-center font-bold">
                <span> {ridesData?.length ?? 0}</span>
              </p>
            </div>
            <div>
              <p className={`bg-blue-500 text-white p-3 rounded-full`}>
                <Bike size={24} />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 mx-auto ">
        <RidesData />
        </div>
    </div>
  );
}

export default DashboardPage;
