import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import AuthProvider from "@/components/auth/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <Sidebar />
          <div className="w-full h-full pt-16 pl-0 lg:pl-48"> {children}</div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
