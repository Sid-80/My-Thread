"use client";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Card from "@/components/Thread/Card";
import DeleteTrash from "@/components/Thread/DeleteThread";
import { Threads } from "@/types";
import { UploadDropzone } from "@uploadthing/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Page() {
  const { data: session } = useSession();
  const [userImage, setUserImage] = useState("");
  const [liked, setLiked] = useState(true);
  const [Delete, setDelete] = useState(false);
  const [delId, setDel] = useState("");
  const [userData, setUserData] = useState({
    _id: "",
    following: [],
    followers: [],
    username: "",
    email: "",
    updatedAt: "",
    avatar: "",
    bio: "",
    createdAt: "",
  });
  const [threads, setThreads] = useState([]);
  const router = useRouter();

  const getData = async () => {
    await axios({
      url: "/api/getUser/",
      method: "POST",
      data: { email: session?.user?.email },
    }).then(async (res) => {
      setUserData((user: any) => ({
        ...user,
        _id: res.data.user[0]._id,
        username: res.data.user[0].username,
        followers: res.data.user[0].followers,
        following: res.data.user[0].following,
        email: res.data.user[0].email,
        avatar: res.data.user[0].avatar,
        bio: res.data.user[0]?.bio,
        createdAt: res.data.user[0].createdAt,
      }));
      await axios({
        url: "/api/getThreads/",
        data: { _id: res.data.user[0]._id },
        method: "POST",
      }).then((res) => setThreads(res.data.posts));
    });
  };

  const DeleteHandler = async (id: string) => {
    await axios({
      url: `/api/thread/${id}`,
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        setDelete(false);
        toast.error("Thread Deleted !!", {
          position: "bottom-right",
          autoClose: 8000,
          theme: "dark",
          pauseOnHover: true,
        });
      }
    });
  };

  const UpdateHandler = async () => {
    await axios({
      url: `/api/users`,
      method: "PUT",
      data:JSON.stringify({
        _id:userData._id,
        bio:userData.bio,
        username:userData.username,
      })
    }).then((res) => {
      if (res.status === 200) {
        toast.error("Profile Updated !!", {
          position: "bottom-right",
          autoClose: 8000,
          theme: "dark",
          pauseOnHover: true,
        });
      }
    });
  }

  useEffect(() => {
    getData();
  }, [liked, Delete]);

  return (
    <>
      <div
        className={`flex-1 relative z-0 p-5 ${
          Delete
            ? "overflow-hidden"
            : "overflow-y-auto scrollbar overflow-x-hidden"
        }`}
      >
        <div className="flex text-xs items-end justify-end gap-5 pt-2">
          <button className="border-[#b8d0eb] animate-pulse text-[#b8d0eb] p-2 rounded-md">
            {userData.followers.length} FOLLOWERS
          </button>
          <button className="border-[#b8d0eb] animate-pulse text-[#b8d0eb] p-2 rounded-md">
            {userData.following.length} FOLLOWING
          </button>
        </div>

        <div className="relative flex gap-4 items-center justify-center">
          {userData.avatar ? (
            <img
              src={userData.avatar}
              alt="user"
              className="2xl:w-[300px] xl:w-[200px] w-[150px] rounded-full"
            />
          ) : (
            <Image
              src={"/assets/User.svg"}
              width={80}
              height={80}
              className=""
              alt=""
            />
          )}
          <div className="flex flex-col text-white text-xs items-center justify-center">
            <p className=" text-lg tracking-[5px] font-bold animate-pulse">
              PROFILE PHOTO
            </p>
            <div className="overflow-hidden rounded-xl  bg-slate-300/50 cursor-pointer ">
              <UploadDropzone<OurFileRouter>
                endpoint="imageUploader"
                className="border-0 w-[130px] text-xs h-[60px] p-1 m-1 ut-upload-icon:bg-white ut-label:text-xs ut-allowed-content:ut-uploading:text-red-300"
                appearance={{
                  label: {
                    fontSize: "10px",
                  },
                  allowedContent: {
                    fontSize: "5px",
                  },
                  uploadIcon: {
                    width: "160px",
                    height: "160px",
                  },
                }}
                onClientUploadComplete={async (res) => {
                  // Do something with the response
                  if (res) {
                    const json = JSON.stringify(res);
                    console.log(json);
                    setUserImage(res[0].fileUrl);
                    try {
                      await axios
                        .put("/api/updateUser", {
                          id: userData._id,
                          avatar: res[0].fileUrl,
                        })
                        .then((res) => {
                          if (res.status === 200) router.refresh();
                        })
                        .catch((e) => console.log(e));
                    } catch (e) {
                      console.log(e);
                    }
                  }
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 xl:px-20 px-12 py-2">
          <div className="flex flex-col">
            <label className="text-[#adb5bd] px-1 text-sm font-semibold">
              Username
            </label>
            <input
              type="text"
              className=" p-1 px-2 rounded-md focus:bg-[#b8d0eb] bg-[#669bbc] outline-none focus:ring-2"
              value={userData.username}
              onChange={(e) => {
                setUserData((user: any) => ({
                  ...user,
                  username: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#adb5bd] text-sm px-1 font-semibold">
              Email
            </label>
            <input
              type="text"
              disabled
              className=" p-1 px-2 rounded-md focus:bg-[#b8d0eb] disabled:cursor-not-allowed bg-[#669bbc] outline-none focus:ring-2"
              value={userData.email}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[#adb5bd] text-sm px-1 font-semibold">
              Bio
            </label>
            <textarea
              className=" resize-none focus:resize-y p-1 px-2 rounded-md focus:bg-[#b8d0eb] disabled:cursor-not-allowed bg-[#669bbc] outline-none focus:ring-2"
              value={userData.bio}
              onChange={(e) => {
                setUserData((user: any) => ({
                  ...user,
                  bio: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex items-end justify-end">
            <button onClick={()=>{UpdateHandler()}} className=" text-white hover:ring-2 p-1 px-2 rounded-md hover:bg-transparent bg-[#9d4edd]">
              Update
            </button>
          </div>

          <div className="flex flex-col gap-4 p-5 ">
            {threads.map((th: Threads, index) => (
              <div className="flex gap-4">
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
                <DeleteTrash
                  setDelId={setDel}
                  setDelete={setDelete}
                  id={th._id}
                />
              </div>
            ))}
          </div>
        </div>
        {Delete ? (
          <div className="absolute top-0 left-0 h-screen w-full rounded-xl flex-col p-10 text-white bg-[rgba(31,29,29,0.84)] flex items-center justify-center">
            <div className="flex flex-col blur-none p-5 bg-[#9d4edd] shadow-xl rounded-xl">
              Do you want to delete thread ?
            </div>
            <div className="flex  gap-4 p-2">
              <button
                className="p-1 px-2 flex group rounded-md items-center justify-center gap-1 hover:ring-2"
                onClick={() => DeleteHandler(delId)}
              >
                <Image
                  src={"/assets/Tick.svg"}
                  width={20}
                  height={20}
                  className="opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 group-hover:duration-150"
                  alt=""
                />
                YES
              </button>
              <button
                className="p-1 px-2 flex rounded-md group items-center justify-center gap-1 hover:ring-2"
                onClick={() => setDelete(false)}
              >
                <Image
                  src={"/assets/Cross.svg"}
                  width={20}
                  height={20}
                  className="opacity-0 transition duration-300 ease-in-out group-hover:opacity-100 group-hover:duration-150"
                  alt=""
                />
                NO
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <ToastContainer />
    </>
  );
}
