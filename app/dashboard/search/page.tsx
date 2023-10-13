"use client";
import LeftBar from "@/components/Dashboard/LeftBar";
import RightBar from "@/components/Dashboard/RightBar";
import SerachResult from "@/components/Search/SerachResult";
import TextSearch from "@/components/Search/TextSearch";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function Page() {
  const { data, isLoading } = useQuery({
    queryKey: ["userSearch"],
    queryFn: async () => {
      const { data } = await axios.get("/api/users");
      return data.users;
    },
  });
  const [text, setText] = useState("");

  return (
    <div className="flex-1 flex flex-col gap-4 overflow-hidden items-center justify-start p-6">
      <TextSearch text={text} setText={setText} />
      <div className="flex flex-1 flex-col items-center justify-start w-full ">
        {data
          ?.filter((val: any) => {
            if (text === "") {
              return val;
            } else if (
              val.username.toLowerCase().includes(text.toLowerCase())
            ) {
              return val;
            }
          })
          .map((d: any, index: number) => (
            <SerachResult id={d._id} key={index} avatar={d.avatar} username={d.username} />
          ))}
      </div>
    </div>
  );
}
