"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PuffLoader } from "react-spinners";
// import Spinner from "@/components/core/models/spinner";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 50); 

    return () => clearTimeout(timer); 
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <PuffLoader color="#000" size={20} />
    </div>
  );
}