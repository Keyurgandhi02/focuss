import { Navbar } from "@/components/Navbar/Navbar";
import { GlobalModal } from "@/components/ui/GlobalModal";
import { AppInitializer } from "@/components/ui/AppInitializer";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen overflow-x-hidden flex flex-col bg-black">
        <div
          className="fixed inset-0 -z-10"
          style={{
            background:
              "linear-gradient(to bottom right, #0f172a, #1e293b, #000000)",
            backgroundAttachment: "fixed",
          }}
        />
        <AppInitializer />
        <main className="flex-1 w-full px-4 md:px-6 lg:px-10">{children}</main>
        <Navbar />
        <GlobalModal />
      </body>
    </html>
  );
}
