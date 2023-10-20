"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Card from "../Thread/Card";
import { Threads, UserData } from "@/types";


export default function AllPosts() {
  const { data: session } = useSession();
  const [userData, setuserData] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<Threads[]>([]);
  const [liked, setLiked] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["userPosts", liked],
    queryFn: async () => {
      const res = await axios({
        url: "/api/getUser/",
        method: "POST",
        data: { email: session?.user?.email },
      });
      setuserData(res.data.user[0]);
      const { data } = await axios({
        url: "/api/getThreads/",
        method: "POST",
        data: {
          _id: [...res.data.user[0].following, res.data.user[0]._id],
        },
      });
      setPosts(data.posts);
      return data.posts;
    },
  });

  if (isLoading || !data) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-5 gap-4">
      {posts.map((post, index) => (
        <Card
          userData={userData}
          key={index}
          setLiked={setLiked}
          liked={liked}
          like={post.like}
          createdAt={post.createdAt}
          id={post._id}
          author={post.author}
          threadText={post.threadText}
        />
      ))}
    </div>
  );
}
