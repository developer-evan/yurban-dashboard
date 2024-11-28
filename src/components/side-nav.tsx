"use client";
import Link from "next/link";
import { FaUser, FaThLarge } from "react-icons/fa";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Bike, CarFront, LogOut, Settings, UserCog } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface SidebarProps {
  active: string;
  setActive: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, setActive }) => {
  const router = useRouter();

  // Set active state on click and persist in localStorage
  const handleSetActive = (item: string) => {
    setActive(item);
    localStorage.setItem("activeSidebar", item);
  };

  // Initialize active state from localStorage on component mount
  useEffect(() => {
    const savedActive = localStorage.getItem("activeSidebar");
    if (savedActive) {
      setActive(savedActive);
    }
  }, [setActive]);

  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <div className="h-screen sticky top-0 border-r text-slate-800 flex flex-col w-56 bg-white shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 h-14 border-b bg-gray-50 text-xl font-bold sticky top-0 z-50">
        <Image
          src="/yurbann.png"
          alt="Yurban Rides"
          width={40}
          height={40}
          className="rounded-full"
        />
        <p>Yurban Rides</p>
      </div>

      {/* Menu Items */}
      <div className="flex flex-col flex-grow mt-4 space-y-2">
        <Link href="/dashboard" legacyBehavior>
          <a
            className={`flex items-center px-6 py-3 ${
              active === "Overview"
                ? "text-white bg-gray-700"
                : "hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => handleSetActive("Overview")}
          >
            <FaThLarge className="mr-4" />
            Overview
          </a>
        </Link>
        <Link href="/drivers" legacyBehavior>
          <a
            className={`flex items-center px-6 py-3 ${
              active === "Drivers"
                ? "text-white bg-gray-700"
                : "hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => handleSetActive("Drivers")}
          >
            <CarFront className="mr-4" />
            Drivers
          </a>
        </Link>
        <Link href="/customers" legacyBehavior>
          <a
            className={`flex items-center px-6 py-3 ${
              active === "Customers"
                ? "text-white bg-gray-700"
                : "hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => handleSetActive("Customers")}
          >
            <UserCog className="mr-4" />
            Customers
          </a>
        </Link>
        <Link href="/rides" legacyBehavior>
          <a
            className={`flex items-center px-6 py-3 ${
              active === "Rides"
                ? "text-white bg-gray-700"
                : "hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => handleSetActive("Rides")}
          >
            <Bike className="mr-4" />
            Rides
          </a>
        </Link>
        <Link href="/profile" legacyBehavior>
          <a
            className={`flex items-center px-6 py-3 ${
              active === "Profile"
                ? "text-white bg-gray-700"
                : "hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => handleSetActive("Profile")}
          >
            <FaUser className="mr-4" />
            Profile
          </a>
        </Link>
        <Link href="/settings" legacyBehavior>
          <a
            className={`flex items-center px-6 py-3 ${
              active === "Settings"
                ? "text-white bg-gray-700"
                : "hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => handleSetActive("Settings")}
          >
            <Settings className="mr-4" />
            Settings
          </a>
        </Link>
      </div>

      {/* Logout Button */}
      <div className="mt-auto mb-4 px-6">
        <Button
          variant="outline"
          className="w-full bg-transparent flex items-center justify-center px-4 py-2 text-red-600 border border-red-600  hover:bg-red-600 hover:text-white transition"
          onClick={handleLogout}
        >
          <LogOut className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
