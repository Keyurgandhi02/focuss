"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from "@/components/Navbar/Navbar";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
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
        </body>
      </html>
    </QueryClientProvider>
  );
}
