/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "@/lib/axiosInstance";
import config from "@/lib/config";
// import { User } from "@/types";
import axios from "axios";

export async function fetchProfile(
): Promise<any> {
  try {
    
    const response = await axiosInstance.get(`${config.apiUrl}/profile`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "Error fetching profile");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}