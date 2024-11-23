/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";

type AuthInfo = {
  user_id?: string;
  role?: string;
  username?: string;
  accessToken?: string;
  authInfo?: any;
};
/**
 * Custom hook to get authentication information from sessionStorage
 * @returns {AuthInfo} - An object containing user_id, roles, username, and accessToken or undefined if they do not exist
 */
function useAuthInfo(): AuthInfo {
  const [authInfo, setAuthInfo] = useState<AuthInfo>({
    user_id: undefined,
    role: undefined,
    username: undefined,
    accessToken: undefined,
  });

  useEffect(() => {
    const user_id = sessionStorage.getItem("user_id") || undefined;
    const role = sessionStorage.getItem("role") || undefined;
    const username = sessionStorage.getItem("username") || undefined;
    const accessToken = sessionStorage.getItem("session_token") || undefined;

    setAuthInfo({
      user_id,
      role,
      username,
      accessToken,
    });
  }, []);

  return authInfo;
}

export default useAuthInfo;
