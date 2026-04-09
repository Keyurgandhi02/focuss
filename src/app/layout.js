"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar/Navbar";
import "./globals.css";
import { GlobalModal } from "@/components/ui/GlobalModal";
import { useEffect } from "react";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" className="h-full">
        <body className="min-h-screen overflow-x-hidden flex flex-col bg-black ">
          <div
            className="fixed inset-0 -z-10"
            style={{
              background:
                "linear-gradient(to bottom right, #0f172a, #1e293b, #000000)",
              backgroundAttachment: "fixed",
            }}
          />
          <main className="flex-1 flex items-center justify-center px-4">
            {children}
          </main>
          <Navbar />
          <GlobalModal />
        </body>
      </html>
    </QueryClientProvider>
  );
}
