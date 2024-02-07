import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LC-Pilot",
  description:
    "Live AI assistant to streamline the growth of your algorithmic skill.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col p-2 min-h-screen`}>
        <Navbar />
        <div className="flex flex-grow w-full h-full">{children}</div>
      </body>
    </html>
  );
}
