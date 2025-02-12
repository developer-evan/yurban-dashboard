"use client";
import { BellDot } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "@/utils/getUserProfile";
import { PuffLoader } from "react-spinners";

interface NavbarProps {
  active: string;
}

const Navbar: React.FC<NavbarProps> = ({ active }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchProfile,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-14">
        <PuffLoader color="#2563EB" loading={isLoading} size={30} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500 bg-red-50">
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm bg-white/80 border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 h-16 max-w-[1920px] mx-auto">
        {/* Active Page Title */}
        <h2 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          {active}
        </h2>

        {/* Right-side Content */}
        <div className="flex items-center space-x-8">
          {/* Notification Icon */}
          <div className="relative group">
            <BellDot className="w-6 h-6 text-gray-500 transition-colors duration-200 cursor-pointer hover:text-gray-700" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
            
            {/* Notification Tooltip */}
            <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
              <div className="px-4 py-3 text-sm bg-white rounded-lg shadow-lg border border-gray-100">
                <p className="text-gray-600">You have new notifications</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-4 group cursor-pointer">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                {data?.user?.firstName} {data?.user?.lastName}
              </p>
              <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
                {data?.user?.email}
              </p>
            </div>

            {/* User Avatar */}
            <Avatar className="h-9 w-9 transition-transform group-hover:scale-105">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                {data?.user?.firstName && data?.user?.lastName
                  ? (data?.user?.firstName[0] + data?.user?.lastName[0]).toUpperCase()
                  : "N/A"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
