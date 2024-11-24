"use client";
import Link from "next/link";
import { FaUser, FaThLarge } from "react-icons/fa";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Bike, CarFront, LogOut, Settings, SquareTerminal, UserCog } from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  active: string;
  setActive: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, setActive }) => {
  const router = useRouter();

  const handleLogout = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <div className="h-screen border-r text-slate-800 flex flex-col w-60">
      {/* Header */}
      <div className="flex items-center justify-center gap-3 h-14 border-b bg-gray-50 text-xl font-bold">
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
                : "hover:bg-gray-700 hover:text-white "
            }`}
            onClick={() => setActive("Overview")}
          >
            <FaThLarge className="mr-4" />
            Overview
          </a>
        </Link>
        <Link href="/drivers" legacyBehavior>
          <a
            className={`flex items-center px-6 py-3 ${
              active === "Apps"
                ? "text-white bg-gray-700 "
                : "hover:bg-gray-700 hover:text-white "
            }`}
            onClick={() => setActive("Drivers")}
          >
            <CarFront className="mr-4" />
            Drivers
          </a>
        </Link>
        <Link href="/customers" legacyBehavior>
          <a
            className={`flex items-center px-6 py-3 ${
              active === "Customers"
                ? "text-white bg-gray-700 "
                : "hover:bg-gray-700 hover:text-white "
            }`}
            onClick={() => setActive("Customers")}
          >
            <UserCog className="mr-4" />
            Customers
          </a>
        </Link>
        <Link href="/rides" legacyBehavior>
          <a
            className={`flex items-center px-6 py-3 ${
              active === "Rides"
                ? "text-white bg-gray-700 "
                : "hover:bg-gray-700 hover:text-white "
            }`}
            onClick={() => setActive("Rides")}
          >
            <Bike className="mr-4" />
            Rides
          </a>
        </Link>
        <Link href="/profile" legacyBehavior>
          <a
            className={`flex items-center px-6 py-3 ${
              active === "Profile"
                ? "text-white bg-gray-700 "
                : "hover:bg-gray-700 hover:text-white "
            }`}
            onClick={() => setActive("Profile")}
          >
            <FaUser className="mr-4" />
            Profile
          </a>
        </Link>
        <Link href="/settings" legacyBehavior>
          <a
            className={`flex items-center px-6 py-3 ${
              active === "Settings"
                ? "text-white bg-gray-700 "
                : "hover:bg-gray-700 hover:text-white "
            }`}
            onClick={() => setActive("Settings")}
          >
            <Settings className="mr-4" />
            Settings
          </a>
        </Link>
        {/* Financial Data Dropdown */}
        {/* <div>
          <button
            className={`flex items-center justify-between w-full px-6 py-3 ${
              active === "Financial Data"
                ? "text-white bg-gray-700 "
                : "hover:bg-gray-700 hover:text-white "
            }`}
            onClick={() => setIsFinancialDataOpen(!isFinancialDataOpen)}
          >
            <span className="flex items-center">
              <FaChartLine className="mr-4" />
              More
            </span>
            {isFinancialDataOpen ? (
              <FiChevronDown className="ml-2" />
            ) : (
              <FiChevronRight className="ml-2" />
            )}
          </button>
          {isFinancialDataOpen && (
            <div className="pl-5 mt-2 space-y-2">
              <Link href="/financial-data/accounts" legacyBehavior>
                <a
                  className={`block px-3 py-2  ${
                    active === "Accounts"
                      ? "text-white bg-gray-700 "
                      : "hover:bg-gray-700 hover:text-white "
                  }`}
                  onClick={() => setActive("Accounts")}
                >
                  Accounts
                </a>
              </Link>
              <Link href="/financial-data/transactions" legacyBehavior>
                <a
                  className={`block px-3 py-2  ${
                    active === "Transactions"
                      ? "text-white bg-gray-700 "
                      : "hover:bg-gray-700 hover:text-white "
                  }`}
                  onClick={() => setActive("Transactions")}
                >
                  Transactions
                </a>
              </Link>
              <Link href="/financial-data/statements" legacyBehavior>
                <a
                  className={`block px-3 py-2  ${
                    active === "Statements"
                      ? "text-white bg-gray-700 "
                      : "hover:bg-gray-700 hover:text-white "
                  }`}
                  onClick={() => setActive("Statements")}
                >
                  Statements
                </a>
              </Link>
              <Link href="/financial-data/income" legacyBehavior>
                <a
                  className={`block px-3 py-2  ${
                    active === "Income"
                      ? "text-white bg-gray-700 "
                      : "hover:bg-gray-700 hover:text-white "
                  }`}
                  onClick={() => setActive("Income")}
                >
                  Income
                </a>
              </Link>
            </div>
          )}
        </div> */}
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
