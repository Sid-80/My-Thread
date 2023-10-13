"use client";
import Card from "@/components/Thread/Card";
import { Threads, UserData } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    id: string;
  };
};



export default function Page({ params: { id } }: Props) {
  const [userData, setuserData] = useState<UserData | null>(null);
  const [userThreads, setUserThreads] = useState<Threads[]>([]);
  const [liked, setLiked] = useState(false);
  const { data: session } = useSession();

  const getUser = async () => {
    try {
      const { data } = await axios({
        url: "/api/getUser/",
        method: "POST",
        data: { _id: id },
      });
      setuserData(data.user[0]);

      const res = await axios({
        url: "/api/getThreads/",
        data: { email: data.user[0].email },
        method: "POST",
      });
      setUserThreads(res.data.posts);
    } catch (e) {
      console.log(e);
    }
  };

  const followHandler = async () => {
    const { data, status } = await axios({
      url: "/api/follow/",
      method: "POST",
      data: JSON.stringify({
        userEmail: session?.user?.email,
        profileEmail: userData?.email,
      }),
    });
    if (status === 200) getUser();
  };

  const unFollowHandler = async () => {
    const { data, status } = await axios({
      url: "/api/follow/",
      method: "PUT",
      data: JSON.stringify({
        userEmail: session?.user?.email,
        profileEmail: userData?.email,
      }),
    });
    if (status === 200) getUser();
  };

  console.log(userData)

  useEffect(() => {
    getUser();
  }, [liked]);

  return (
    <div className="text-white flex flex-col items-center justify-start p-4 flex-1">
      <div className="w-[70%] flex flex-col">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center justify-center gap-4">
          {userData?.avatar ? (
                  <img
                    src={userData.avatar}
                    width={80}
                    height={80}
                    className=" rounded-full"
                  />
                ) : (
                  <Image
                    src={"/assets/User.svg"}
                    width={40}
                    height={40}
                    className=""
                    alt=""
                  />
                )}
            <h1 className="text-lg">{userData?.username}</h1>
          </div>
          {userData?.followers.includes(session?.user?.email!) ? (
            <button
              onClick={() => unFollowHandler()}
              className="bg-[#ff9770] text-xs text-black p-2 font-bold rounded-lg"
            >
              FOLLOWING
            </button>
          ) : (
            <button
              onClick={() => followHandler()}
              className="bg-[#ff9770] text-xs text-black p-2 font-bold rounded-lg"
            >
              FOLLOW
            </button>
          )}
        </div>
        <div className="flex w-full items-center justify-between">
          <p className="text-[#adb5bd]">{userData?.email}</p>
          <div className="flex gap-4 py-2">
            <div>{userData?.followers.length} Followers</div>
            <div>{userData?.following.length} Following</div>
          </div>
        </div>
        <div className="border-0 border-b-2 border-slate-400 w-full"></div>
        <div className="flex flex-col gap-4 p-5">
          {userThreads.map((th, index) => (
            <Card
              userData={userData}
              liked={liked}
              setLiked={setLiked}
              id={th._id}
              createdAt={th.createdAt}
              key={index}
              author={th.author}
              threadText={th.threadText}
              like={th.like}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
