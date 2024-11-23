"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
// import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// import { resendOtp, verifyOtp } from "@/utils/otpService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resendOtp, verifyOtp } from "@/utils/otpService";

interface OtpFormProps {
  email: string;
  userId: string;
  type: string;
  newPassword?: string;
}

const OtpForm: React.FC<OtpFormProps> = ({
  email,
  userId,
  type,
  newPassword,
}) => {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const otpMutation = useMutation({
    mutationFn: () =>
      verifyOtp(email, Number(otp), userId, type, newPassword ?? ""),
    onSuccess: () => {
      toast.success("OTP verified successfully!");
      router.push("/login");
    },
    onError: (error) => {
      console.error("OTP verification failed:", error);
      toast.error("Invalid OTP. Please try again.");
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: () => resendOtp(userId, type),
    onSuccess: () => {
      toast.success("OTP resent successfully!");
    },
    onError: (error) => {
      console.error("Resending OTP failed:", error);
      toast.error("Failed to resend OTP. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    otpMutation.mutate();
  };

  const handleResendOtp = () => {
    resendOtpMutation.mutate();
  };

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="w-full">
        <div className="mb-4 w-full">
          <Label htmlFor="otp">Enter OTP:</Label>
          <Input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#D96354] hover:bg-[#D96354] text-white"
        >
          {otpMutation.isPending ? "Verifying..." : "Verify OTP"}
        </Button>
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Didn’t receive the OTP?{" "}
            <span
              className="text-[#D96354] cursor-pointer"
              onClick={handleResendOtp}
            >
              Resend OTP
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default OtpForm;