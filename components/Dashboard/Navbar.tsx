"use client"
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Navbar() {
  return (
    <div className="bg-[#0d1b2a] text-[#e0e1dd] p-4 px-6 flex items-center justify-between">
        <p className=" tracking-[6px] animate-pulse">THREADS</p>
        <button onClick={()=>{signOut()}} className="flex items-center justify-center gap-2 text-xs">
          Sign Out
          <Image src={'/assets/SignOut.svg'} width={20} height={20} className="" alt="" />
        </button>
    </div>
  )
}
