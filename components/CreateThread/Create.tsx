"use client";
import { UserData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function Create() {
  const { data: session } = useSession();
  const [threadText, setText] = useState("");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios({
        url: "/api/thread",
        method: "POST",
        data: JSON.stringify({
          threadText,
          author: session?.user.id,
        }),
      });
      if (res.status === 200) setText("");
    } catch (e) {
      console.log(e);
    }
  };
  console.log(session?.user.id)

  return (
    <form onSubmit={(e) => submitHandler(e)} className="flex-1 text-white p-4">
      <p>Thread Text</p>
      <textarea
        placeholder="your-cool-text"
        value={threadText}
        onChange={(e) => setText(e.target.value)}
        className="h-[300px] w-full rounded-md focus:bg-[#b8d0eb] bg-[#669bbc] outline-none text-black p-2 font-medium"
      ></textarea>
      <button type="submit" className="bg-[#9d4edd] p-2 rounded-md text-xs">
        Create
      </button>
    </form>
  );
}
