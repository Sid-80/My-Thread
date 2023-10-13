"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function LeftBar() {
  const pathname = usePathname();
  return (
    <div className="bg-[#0d1b2a] flex flex-col gap-8 h-full p-5">
      <Link
        href={"/dashboard"}
        className={`${
          pathname === "/dashboard" ? "bg-[#9d4edd] shadow-md" : null
        } p-2 text-white rounded-md px-2  font-semibold flex items-center justify-start gap-2 w-[150px]`}
      >
        <Image
          src={"/assets/Home.svg"}
          width={20}
          height={20}
          className=""
          alt=""
        />
        Home
      </Link>
      <Link
        href={"/dashboard/search"}
        className={`${
          pathname === "/dashboard/search" ||
          pathname.includes("/dashboard/search/")
            ? "bg-[#9d4edd] shadow-md"
            : null
        } p-2 text-white rounded-md px-2  font-semibold flex items-center justify-start gap-2 w-[150px]`}
      >
        <Image
          src={"/assets/Search.svg"}
          width={20}
          height={20}
          className=""
          alt=""
        />
        Search
      </Link>
      <Link
        href={"/dashboard/activity"}
        className={`${
          pathname === "/dashboard/activity" ? "bg-[#9d4edd] shadow-md" : null
        } p-2 text-white rounded-md px-2  font-semibold flex items-center justify-start gap-2 w-[150px]`}
      >
        <Image
          src={"/assets/Like.svg"}
          width={20}
          height={20}
          className=""
          alt=""
        />
        Activity
      </Link>
      <Link
        href={"/dashboard/create"}
        className={`${
          pathname === "/dashboard/create" ? "bg-[#9d4edd] shadow-md" : null
        } p-2 text-white rounded-md px-2  font-semibold flex items-center justify-start gap-2 w-[150px]`}
      >
        <Image
          src={"/assets/Group.svg"}
          width={20}
          height={20}
          className=""
          alt=""
        />
        Create
      </Link>
      <Link
        href={"/dashboard/profile"}
        className={`${
          pathname === "/dashboard/profile" ? "bg-[#9d4edd] shadow-md" : null
        } p-2 text-white rounded-md px-2  font-semibold flex items-center justify-start gap-2 w-[150px]`}
      >
        <Image
          src={"/assets/Profile.svg"}
          width={20}
          height={20}
          className=""
          alt=""
        />
        Profile
      </Link>
    </div>
  );
}
