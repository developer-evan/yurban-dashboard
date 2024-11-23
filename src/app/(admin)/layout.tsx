"use client";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/side-nav";
import { Button } from "@/components/ui/button";
import useAuthInfo from "@/hooks/useAuthInfo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState("Overview");
  const [loading, setLoading] = useState(true);
  const userRole = useAuthInfo();
  const router = useRouter();
  // const isAdmin = userRole.roles?.includes("Super Admin");
  const isBusiness = userRole.role?.includes("Admin");
  // Use effect to simulate loading completion (or use actual data fetching)
  useEffect(() => {
    // Simulate a loading process for demonstration (replace this with real loading logic)
    if (userRole) {
      setLoading(false); // Set loading to false once data is available
    }
  }, [userRole]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        {/* <div className="spinner-border animate-spin border-4 border-blue-500 rounded-full w-16 h-16"></div> */}
        <PuffLoader color="#2563EB" loading={loading} size={60} />
      </div>
    ); // Loading spinner shown while data is loading
  }
  return (
    <>
      {isBusiness ? (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
          <div className=" hidden lg:block   ">
            <Sidebar active={active} setActive={setActive} />
          </div>
          <div className="w-full  flex flex-col flex-grow">
            <div className="sticky top-0 z-50">
              <Navbar active={active} />
            </div>
            <div className="flex grow p-3 bg-white  text-slate-800  min-h-screen md:overflow-y-auto ">
              {children}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col  mx-auto items-center justify-center h-screen">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              You are not authorized to view this page. Admin access required.
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Please contact your admin for more information or request for
              access
            </p>
            <Button className="mt-4" onClick={() => router.back()}>
              Go back
            </Button>
          </div>
        </>
      )}
    </>
  );
}
