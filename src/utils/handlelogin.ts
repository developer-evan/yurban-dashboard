import axios from "axios";
import { decodeAuthToken } from "@/lib/decode-token";
import config from "@/lib/config";
import { axiosInstance } from "@/lib/axiosInstance";

// Define the data structure
type LoginData = {
  phoneNumber: string;
  pin: string;
};

// Define the response structure
type LoginResponse = {
  token: string;
};

export async function handlelogin(
  phoneNumber: string,
  pin: string
): Promise<string> {
  // Check if the token exists in sessionStorage
  // const existingToken = sessionStorage.getItem('session_token');
  // if (existingToken) {
  //   console.log('Using existing token:', existingToken);
  //   decodeAuthToken(existingToken);
  //   return existingToken;
  // }

  const data: LoginData = {
    phoneNumber,
    pin
  };
  try {
    const response = await axiosInstance.post<LoginResponse>(
      `${config.apiUrl}/auth/login`,
      data,
      {
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    );
    const { token } = response.data;
    console.log("Access Token:", token);

    // Store the access token in sessionStorage
    sessionStorage.setItem("session_token", token);
    decodeAuthToken(token);
    return token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle axios-specific error
      console.error("Axios error:", error.response?.data);
    } else {
      // Handle non-axios-specific error
      console.error("Unknown error:", error);
    }
    throw error;
  }
}

// Define an interface for the register data

