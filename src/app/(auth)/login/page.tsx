/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { handlelogin } from "@/utils/handlelogin";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { motion } from "framer-motion";

function Login() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [formError, setFormError] = useState("");
  const pinRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const loginMutation = useMutation({
    mutationFn: async () => {
      if (!phoneNumber.trim()) {
        throw new Error("Phone number is required");
      }
      if (pin.some(digit => !digit)) {
        throw new Error("Please enter a complete PIN");
      }
      return handlelogin(phoneNumber, pin.join(""));
    },
    onSuccess: () => {
      setFormError("");
      router.push("/dashboard");
      toast.success("Login successful");
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || error.message || "Login failed. Please try again.";
      setFormError(errorMessage);
      toast.error(errorMessage);
      // Clear PIN on error
      setPin(["", "", "", ""]);
      pinRefs[0].current?.focus();
    },
  });

  const handlePinChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return; // Allow only numbers
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      // Move to next input if not last digit
      pinRefs[index + 1].current?.focus();
    } else if (value && index === 3) {
      // If last digit is entered and phone number exists, trigger login
      if (phoneNumber.trim()) {
        const completePin = [...newPin.slice(0, 3), value].join('');
        if (completePin.length === 4) {
          loginMutation.mutate();
        }
      } else {
        toast.error("Please enter phone number first");
        setPin(["", "", "", ""]);
        pinRefs[0].current?.focus();
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/auth-bg.svg')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-white dark:bg-gray-800 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-2"
        >
          <Image
            src="/yurbann.png"
            alt="Yurban Rides Logo"
            width={80}
            height={80}
            className="rounded-full shadow-lg"
          />
        </motion.div>
 
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to your Yurban account
          </p>
        </motion.div>

        <motion.form className="space-y-6">
          {formError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-lg bg-red-100 text-red-700 text-sm"
            >
              {formError}
            </motion.div>
          )}

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => {
                setFormError("");
                setPhoneNumber(e.target.value);
              }}
              required
              disabled={loginMutation.isPending}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="space-y-2 text-center">
            <Label htmlFor="pin">PIN</Label>
            <div className="flex justify-center gap-4">
              {pin.map((digit, index) => (
                <Input
                  key={index}
                  ref={pinRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    setFormError("");
                    handlePinChange(index, e.target.value);
                  }}
                  disabled={loginMutation.isPending}
                  className="w-12 h-12 text-center text-lg font-bold border border-gray-300 dark:border-gray-600"
                />
              ))}
            </div>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}

export default Login;
