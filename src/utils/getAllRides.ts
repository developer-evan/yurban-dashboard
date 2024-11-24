/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/lib/axiosInstance";
import config from "@/lib/config";

export const getAllRides = async () => {
  try {
    const response = await axiosInstance.get(`${config.apiUrl}/all-rides`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching rides:", error);
    throw new Error(error.response?.data?.message || "Failed to fetch rides");
  }
};