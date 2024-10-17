import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import NextAuthProvider from "./NextAuthSessProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background antialiased",
          inter.className
        )}
      >
        <NextAuthProvider>
          <main className=" min-h-screen min-w-screen bg-gradient-to-r from-bg-from to-bg-to">
            {children}
            <Toaster />
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
