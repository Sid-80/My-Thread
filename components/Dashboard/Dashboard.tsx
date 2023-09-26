"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import Navbar from "./Navbar";
import LeftBar from "./LeftBar";

export default function Dashboard() {
  const { data: session } = useSession();
  return (
    <main className="flex flex-col h-screen w-screen bg-[#000505]">
      <Navbar />
      <section className="flex flex-1">
        <LeftBar />
      </section>
    </main>
  );
}
