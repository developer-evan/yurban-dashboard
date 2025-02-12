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
import { motion } from "framer-motion";

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

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/auth-bg.svg')] bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-gray-900/90 before:via-gray-900/70 before:to-gray-800/90 dark:before:from-black/90 dark:before:via-gray-900/80 dark:before:to-gray-800/90 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-600/20 via-gray-900/40 to-gray-900/60 animate-gradient"></div>
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 dark:border-gray-700/30 relative z-10"
      >
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mb-8"
        >
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Image
                src="/yurbann.png"
                alt="Yurban Rides"
                width={80}
                height={80}
                className="rounded-full ring-4 ring-white dark:ring-gray-800 shadow-lg"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 dark:from-gray-100 dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to continue to your account
          </p>
        </motion.div>

        {loginMutation.isError && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 mb-6 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm"
          >
            {(loginMutation.error as any)?.response?.data?.message ??
              "An error occurred"}
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label
              htmlFor="phoneNumber"
              className="text-gray-700 dark:text-gray-300"
            >
              Phone Number
            </Label>
            <Input
              type="text"
              id="phoneNumber"
              value={values.phoneNumber}
              onChange={(e) =>
                setValues({ ...values, phoneNumber: e.target.value })
              }
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 transition-all"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="pin" className="text-gray-700 dark:text-gray-300">
              PIN
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "number" : "password"}
                id="pin"
                value={values.pin}
                onChange={(e) => setValues({ ...values, pin: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 transition-all"
                placeholder="Enter your PIN"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Input
                type="checkbox"
                className="rounded border-gray-300 dark:border-gray-600"
              />
              <span>Remember me</span>
            </label>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 hover:underline"
            >
              Forgot PIN?
            </Link>
          </div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-gray-100 via-white to-gray-100 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 text-gray-800 dark:text-white rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              disabled={loginMutation.isPending}
            >
              <LogIn className="w-5 h-5" />
              <span>
                {loginMutation.isPending ? "Signing in..." : "Sign in"}
              </span>
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default Login;
