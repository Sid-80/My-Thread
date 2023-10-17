import { UserData, comment } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";
import TimeAgo from "react-timeago";

type Props = {
  userData: UserData | null;
  author: {
    email: string;
    username: string;
    avatar: string;
    _id: string;
  };
  threadText: string;
  like: string[];
  // avatar:string;
  createdAt: string;
  id: string;
  setLiked: React.Dispatch<SetStateAction<boolean>>;
  liked: boolean;
};

export default function Card({
  setLiked,
  author,
  threadText,
  like,
  userData,
  createdAt,
  id,
  liked,
}: Props) {
  const { data: session } = useSession();
  const [showComment, setShowComments] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [allComment, setAllComment] = useState<comment[]>([]);
  const router = useRouter();
  const msgRef = useRef<HTMLDivElement>(null);

  const likeHandler = async () => {
    try {
      const { data } = await axios({
        url: "/api/like/",
        method: "PUT",
        data: JSON.stringify({ id, email: session?.user?.email }),
      });
      setLiked(!liked);
    } catch (e) {
      console.log(e);
    }
  };

  const disLikeHandler = async () => {
    try {
      const { data } = await axios({
        url: "/api/dislike/",
        method: "PUT",
        data: JSON.stringify({ id, email: session?.user?.email }),
      });
      setLiked(!liked);
    } catch (e) {
      console.log(e);
    }
  };

  const submitComment = async () => {
    try {
      const { status } = await axios({
        url: "/api/comment/",
        method: "PUT",
        data: JSON.stringify({
          authorId: userData?._id,
          threadId: id,
          commentText,
        }),
      });
      if (status === 200) {
        setCommentText("");
        getComments();
      };
      setLiked(!liked);
    } catch (e) {
      console.log(e);
    }
  };


  const getComments = async () => {
    try {
      const { data } = await axios({
        url: "/api/comment/",
        method: "POST",
        data: JSON.stringify({
          threadId: id,
        }),
      });
      setAllComment(data.c);
    } catch (e) {
      console.log(e);
    }
  };

  useLayoutEffect(()=>{
    if (msgRef.current) {
      msgRef.current.scrollIntoView();
    }
  },[allComment])

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="bg-[#00171f] hover:ring-2 flex p-2 shadow-md text-white shadow-gray-100/10 gap-2 flex-col w-full rounded-md">
      <div className="flex items-center justify-start gap-4">
        {author.avatar ? (
          <img
            onClick={()=>{router.push(`/dashboard/search/${author._id}`)}}
            src={author.avatar}
            width={50}
            height={50}
            className=" cursor-pointer rounded-full"
          />
        ) : (
          <Image
          onClick={()=>{router.push(`/dashboard/search/${author._id}`)}}
            src={"/assets/User.svg"}
            width={45}
            height={45}
            className="mx-5 cursor-pointer"
            alt=""
          />
        )}
        <div>
          <p className="text-xs text-[#adb5bd]">{author.username}</p>
          <h1>{threadText}</h1>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-8 px-2">
          <button>
            {like.indexOf(session?.user?.email!) > -1 ? (
              <Image
                src={"/assets/RedLike.svg"}
                width={22}
                height={22}
                onClick={() => disLikeHandler()}
                className=""
                alt=""
              />
            ) : (
              <Image
                onClick={() => likeHandler()}
                src={"/assets/Like.svg"}
                width={22}
                height={22}
                className=""
                alt=""
              />
            )}
          </button>
          <button
            onClick={() => {
              showComment ? setShowComments(null) : setShowComments(id);
            }}
          >
            <Image
              src={"/assets/Comment.svg"}
              width={22}
              height={22}
              className=""
              alt=""
            />
          </button>
        </div>
        <TimeAgo date={createdAt} className="text-[#adb5bd] text-sm" />
      </div>
      <div className="flex text-[#adb5bd] gap-5">
        <p className=" text-sm">{like.length} likes</p>
        <p className=" text-sm">{allComment.length} replies</p>
      </div>
      {showComment ? (
        <div className="flex flex-col overflow-hidden">
          <div className="flex flex-col gap-2 px-10 max-h-[200px] overflow-y-auto scrollbar overflow-x-hidden">
            {allComment.map((com, index) => (
              <div
                className="flex gap-2 border border-l-0 rounded-lg border-r-0 p-2 border-[#3c6e71]"
                key={index}
              >
                {com.author.avatar ? (
                  <img
                    onClick={()=>{router.push(`/dashboard/search/${com.author._id}`)}}
                    src={com.author.avatar}
                    width={38}
                    height={38}
                    className="rounded-full cursor-pointer"
                  />
                ) : (
                  <Image
                  onClick={()=>{router.push(`/dashboard/search/${com.author._id}`)}}
                    src={"/assets/User.svg"}
                    width={45}
                    height={45}
                    className="mx-4 cursor-pointer"
                    alt=""
                  />
                )}
                <div className="flex flex-col">
                <p className="text-xs text-[#adb5bd]">{com.author.username}</p>
                  <p className="">{com.text}</p>
                </div>
              </div>
            ))}
            <div ref={msgRef} />
          </div>
          <div className="flex w-full gap-1 p-2 px-5 overflow-hidden">
            {userData?.avatar ? (
              <img
                src={userData?.avatar}
                width={50}
                height={50}
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
            <div className="flex flex-1 rounded-md p-[2px] text-black gap-2 items-center justify-center bg-[#669bbc]">
              <input
                type=""
                value={commentText}
                placeholder="Comment..."
                className=" placeholder:text-[#2b2d42] px-2 rounded-md disabled:cursor-not-allowed bg-transparent outline-none  w-full"
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button onClick={() => submitComment()}>
                <Image
                  src={"/assets/Plane.svg"}
                  width={28}
                  height={28}
                  className="-rotate-45"
                  alt=""
                />
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
