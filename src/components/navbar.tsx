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
  // Fetch user data with react-query
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: fetchProfile,
  });

  if (isLoading) {
    return <div
    className="flex items-center justify-center mx-auto"
    >
      <PuffLoader color="#2563EB" loading={isLoading} size={40} />
    </div>;
  }

  if (isError) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between px-6 h-14 bg-white border-b">
      {/* Active Page Title */}
      <h2 className="text-lg font-semibold text-gray-700">{active}</h2>

      {/* Right-side Content: Notification and User Info */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <div className="relative">
          <BellDot className="w-6 h-6 text-gray-500 cursor-pointer hover:text-gray-700" />
          {/* Notification Badge (if needed) */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-800">
              {data?.user?.firstName} {data?.user?.lastName}
            </p>
            <p className="text-xs text-gray-500">{data?.user?.email}</p>
          </div>

          {/* User Avatar */}
          <Avatar>
            <AvatarFallback>
              {data?.user?.firstName && data?.user?.lastName
                ? (data?.user?.firstName[0] + data?.user?.lastName[0]).toUpperCase()
                : "N/A"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
