"use client";
import { fetchProfile } from "@/utils/getUserProfile";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function DashboardPage() {
  const userData = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => fetchProfile(),
  });

  return (
    <div>
      {userData && (
        <h1 className="text-xl font-semibold ">
          Welcome,{" "}
          <span className="text-[#2563EB]">
            {userData.data?.user?.firstName ?? ""} {userData.data?.user?.lastName ?? ""}
          </span>
          !
        </h1>
      )}
    </div>
  );
}

export default DashboardPage;
