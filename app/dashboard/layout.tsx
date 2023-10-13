import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Dashboard/Navbar";
import LeftBar from "@/components/Dashboard/LeftBar";
import RightBar from "@/components/Dashboard/RightBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex flex-col h-screen w-screen bg-[#000505]">
          <Navbar />
          <section className="flex flex-1">
            <LeftBar />
            {children}
            <RightBar />
          </section>
        </main>
      </body>
    </html>
  );
}
