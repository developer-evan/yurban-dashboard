// src/services/otpService.ts
import { axiosInstance } from "@/lib/axiosInstance";
import config from "@/lib/config";

export const verifyOtp = async (
  email: string,
  otp: number,
  userId: string,
  type: string,
  newPassword: string
) => {
  return axiosInstance.post(`${config.apiUrl}/otp/verify`, {
    // email,
    // otp,
    // id: userId,
    // type,
    email,
    otp: Number(otp),
    id: userId,
    type,
    newPassword,
  });
};

export const resendOtp = async (userId: string, type: string) => {
  return axiosInstance.post(`${config.apiUrl}/otp/resend`, {
    id: userId,
    type,
  });
};