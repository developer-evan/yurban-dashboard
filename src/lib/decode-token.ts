/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";

/**
 * Function to handle an authentication token, decode it, and store user data in sessionStorage
 * @param {string} token - The JWT access token
 */
export function decodeAuthToken(token: string) {
  try {
    const decoded: any = jwtDecode(token);
    const user_id = decoded.sub;
    const role = decoded.role;
    const username = decoded.username;

    // Store the decoded data in sessionStorage
    sessionStorage.setItem("user_id", user_id);
    // sessionStorage.setItem("roles", JSON.stringify(roles));
    sessionStorage.setItem("role", role);
    sessionStorage.setItem("username", username);

    console.log("Stored user data in sessionStorage:", {
      user_id,
      role,
      username,
    });
  } catch (error) {
    console.error("Error decoding token:", error);
    throw error;
  }
}