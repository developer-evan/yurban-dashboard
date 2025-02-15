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
    <div className="p-8 min-h-screen w-full mx-auto bg-gray-50">
      {userData && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              {userData?.user?.firstName ?? ""} {userData?.user?.lastName ?? ""}
            </span>
          </h1>
          <p className="text-gray-500 mt-2">Here&apos;s what&lsquo;s happening today</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Stats Cards */}
        <StatsCard
          title="All Users"
          value={usersData?.length ?? 0}
          icon={<UserCheck size={24} />}
          bgColor="bg-gradient-to-br from-sky-500 to-blue-600"
        />
        
        <StatsCard
          title="Drivers"
          value={usersData?.filter((user: { role: string }) => user.role === "Driver").length ?? 0}
          icon={<CarFront size={24} />}
          bgColor="bg-gradient-to-br from-green-500 to-emerald-600"
        />
        
        <StatsCard
          title="Customers"
          value={usersData?.filter((user: { role: string }) => user.role === "Customer").length ?? 0}
          icon={<UserCog size={24} />}
          bgColor="bg-gradient-to-br from-orange-500 to-amber-600"
        />
        
        <StatsCard
          title="Total Rides"
          value={ridesData?.length ?? 0}
          icon={<Bike size={24} />}
          bgColor="bg-gradient-to-br from-purple-500 to-indigo-600"
        />
      </div>

      <div className="mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Recent Rides</h2>
          <RidesData />
        </div>
      </div>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  bgColor: string;
}

const StatsCard = ({ title, value, icon, bgColor }: StatsCardProps) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-sm font-medium text-gray-600 mb-2">{title}</h2>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`${bgColor} p-3 rounded-lg text-white`}>
        {icon}
      </div>
    </div>
  </div>
);

export default DashboardPage;
