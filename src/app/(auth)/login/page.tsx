/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { handlelogin } from "@/utils/handlelogin";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
 import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

function Login() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    phoneNumber: "",
    pin: "",
  });
  const loginMutation = useMutation({
    mutationFn: async () => handlelogin(values.phoneNumber, values.pin),
    onSuccess: () => {
      router.push("/dashboard");
      toast.success("Login successful");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  // if (loginMutation.data && loginMutation.isSuccess) {

  //    router.push("/dashboard");
  // }
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Toaster />
      <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <Image
          src="/yurbann.png"
          alt="Yurban Rides"
          width={60}
          height={60}
          className="rounded-full mx-auto flex"
          />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Log in to your Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back! Please enter your details to continue.
          </p>
        </div>
        {loginMutation.isError && (
          <div className="text-red-500 text-sm mt-4">
            {(loginMutation.error as any)?.response?.data?.message ??
              "An error occurred"}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <Label
              htmlFor="phoneNumber"
              className="text-gray-700 dark:text-gray-300"
            >
              Phone Number:
            </Label>
            <Input
              type="text"
              id="phoneNumber"
              value={values.phoneNumber}
              onChange={(e) =>
                setValues({ ...values, phoneNumber: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>
          <div className="relative">
            <Label
              htmlFor="pin"
              className="text-gray-700 dark:text-gray-300"
            >
              Pin
            </Label>
            <Input
              type={showPassword ? "number" : "password"}
              id="pin"
              value={values.pin}
              onChange={(e) =>
                setValues({ ...values, pin: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
            <div
              className="absolute inset-y-0 right-0 top-6 flex items-center px-3 cursor-pointer"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <EyeOff className="text-gray-500 w-5 h-5" />
              ) : (
                <Eye className="text-gray-500 w-5 h-5" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Label
              htmlFor="remember"
              className="flex items-center text-gray-700 dark:text-gray-300"
            >
              <Input type="checkbox" id="remember" className="mr-2 w-4" />
              Remember me
            </Label>
            <Link
              href="#"
              className="text-gray-700 hover:underline"
            >
              {/* bg-gray-700 */}
              Forgot Password?
            </Link>
          </div>
          <Button
            type="submit"
            className="w-full bg-gray-700 text-white hover:bg-gray-600 p-3 flex items-center justify-center rounded-lg"
          >
            <LogIn className="w-5 h-5 mr-2" />
            {loginMutation.isPending ? "Logging in..." : "Log in"}
          </Button>
        </form>
       
      </div>
    </div>
  );
}

export default Login;
