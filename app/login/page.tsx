// `app/dashboard/page.tsx` is the UI for the `/dashboard` URL
"use client";
import React, { FormEvent, useState } from "react";
import "@/app/globals.css"
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [loginInfo, setInfo] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const [validation, setValidation] = useState("");
  const {password,email} = loginInfo
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
        const res = await signIn('credentials',{
            email,password,redirect:false
        })
        // if(res?.error) setValidation("Error !!")
        // console.log(res?.error)
        console.log(res)
        if(res?.ok){
          router.replace('dashboard')
        }
        

    } catch (e) {
        console.log(e)
    }
  };
  return (
    <div className="relative flex bg-[#000814] items-center justify-center h-screen w-screen overflow-hidden">
      <h1 className="absolute font-bold animate-pulse top-4 left-6 tracking-[8px] text-[#caf0f8]">THREADS</h1>
      <form
        onSubmit={(e) => submitHandler(e)}
        className="flex gap-8 flex-col items-center justify-center p-6 sm:p-8 rounded-lg"
      >
        <h1 className="tracking-[6px] animate-pulse text-sm text-[#caf0f8]">
          LOGIN TO THREADS
        </h1>
        <div className="flex flex-col">
          <label className="text-xs font-medium text-[#caf0f8]">Email</label>
          <input
            onChange={(e) => {
              setInfo((prev) => ({
                ...prev,
                email: e.target.value,
              }));
              if(validation !== "") setValidation("")
            }}
            value={loginInfo.email}
            type="text"
            className="bg-[#84a98c] inputAuto text-center rounded-md font-medium p-1 w-[350px] ring-[#cad2c5] focus:ring-2 focus:outline-none text-[#000814]"
          />
          <label className="text-xs mt-4 font-medium text-[#caf0f8]">Password</label>
          <input
            onChange={(e) => {
              setInfo((prev) => ({
                ...prev,
                password: e.target.value,
              }));

              if(validation !== "") setValidation("")
            }}
            value={loginInfo.password}
            type="password"
            className="bg-[#84a98c] inputAuto rounded-md p-1 w-[350px] font-medium ring-[#cad2c5] focus:ring-2 focus:outline-none px-2 text-[#000814]"
          />
          {validation !== "" && <p className="mt-4 text-[#c9184a] text-center text-xs">{validation}</p>}
        </div>
        
        <p className="text-[#caf0f8] mt-[-8px] text-xs">
          Already registered ?{" "}
          <Link href={"/register"} className="underline">
            register
          </Link>
        </p>
        <button
          type="submit"
          className="bg-[#caf0f8] mt-1 hover:bg-[#90e0ef] text-black font-semibold p-1 rounded-lg px-3"
        >
          Continue
        </button>
      </form>
    </div>
  );
}
