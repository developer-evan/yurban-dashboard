"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { AuthProvider } from "@/components/provider/context/AuthProvider";
// import { ThemeProvider } from "../ui/theme-provider";
// import { ThemeProvider } from "./components/theme-provider.tsx";

const queryClient = new QueryClient();
interface MainProviderProps {
  children: React.ReactNode;
}
export default function MainProvider({ children }: MainProviderProps) {
  return (
    <>
      {/* <ThemeProvider
        attribute="class"
        // defaultTheme="system"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      > */}
        <QueryClientProvider client={queryClient}>
          {/* <AuthProvider> */}
            <div className="font-ubunt">{children}</div>
          {/* </AuthProvider> */}
        </QueryClientProvider>
      {/* </ThemeProvider> */}
    </>
  );
}