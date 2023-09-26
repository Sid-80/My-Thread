import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function LeftBar() {
  const pathname = usePathname();
  return (
    <div className="bg-[#0d1b2a] flex flex-col gap-8 h-full p-5">
      <Link
        href={"/"}
        className={`${
          pathname === "/" ? "bg-[#9d4edd] shadow-md" : null
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
        href={"/search"}
        className={`${
          pathname === "/search" ? "bg-[#9d4edd] shadow-md" : null
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
        href={"/activity"}
        className={`${
          pathname === "/activity" ? "bg-[#9d4edd] shadow-md" : null
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
        href={"/communities"}
        className={`${
          pathname === "/communities" ? "bg-[#9d4edd] shadow-md" : null
        } p-2 text-white rounded-md px-2  font-semibold flex items-center justify-start gap-2 w-[150px]`}
      >
        <Image
          src={"/assets/Group.svg"}
          width={20}
          height={20}
          className=""
          alt=""
        />
        Communities
      </Link>
      <Link
        href={"/profile"}
        className={`${
          pathname === "/activity" ? "bg-[#9d4edd] shadow-md" : null
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
