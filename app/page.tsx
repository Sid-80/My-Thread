"use client"
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import LeftBar from "@/components/Dashboard/LeftBar";

export default async function Home() {
  return (
    <section className="flex flex-1">
      <LeftBar />
    </section>
  )
}
