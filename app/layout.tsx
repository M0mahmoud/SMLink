import Navbar from "@/components/Navbar";
import { verifySession } from "@/session";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Short Your Links",
  description: "Short and Manage Your Links",
  verification: {
    google: "i1Pb2bZvzqGRzaXp0-Yk1lY8zJ7xLgeDm6sn2CZQ4xw",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuth } = await verifySession();
  return (
    <html lang="en">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8929379618118569"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <body
        suppressHydrationWarning
        className={`${inter.className} relative flex flex-col justify-center items-center overflow-x-hidden mx-auto px-4 sm:px-10 max-w-7xl`}
      >
        <Navbar isAuth={isAuth} />
        {children}
      </body>
    </html>
  );
}
