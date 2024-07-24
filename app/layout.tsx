import { verifySession } from "@/session";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Short Your Links",
  description: "Short and Manage Your Links",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuth } = await verifySession();
  console.log("isAuth:", isAuth);
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.className} relative flex flex-col justify-center items-center overflow-x-hidden mx-auto px-4 sm:px-10 max-w-7xl`}
      >
        {children}
      </body>
    </html>
  );
}
