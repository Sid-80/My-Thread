"use client";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UserData } from "@/types";
import { UploadButton, UploadDropzone } from "@uploadthing/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const { data: session } = useSession();
  const [userImage, setUserImage] = useState("");
  const [userData,setUserData] = useState({
    _id:"",
    following:[],
    followers:[],
    username:"",
    email:"",
    updatedAt:"",
    avatar:"",
  });
  const router = useRouter();

  const getData = async() => {
    await axios({
      url: "/api/getUser/",
      method: "POST",
      data: { email: session?.user?.email },
    })
    .then((res)=>{
      console.log(res.data);
      setUserData((user:any)=>({
        ...user,
        _id:res.data.user[0]._id,
        username:res.data.user[0].username,
        followers:res.data.user[0].followers,
        following:res.data.user[0].following,
        email:res.data.user[0].email,
        avatar:res.data.user[0].avatar,
      }))
    })
  }
      
    

  useEffect(()=>{
    getData();
  },[])

  return (
    <div className="flex-1 p-5">
      <div className="flex flex-col items-center justify-center">
        {userData.avatar ? (
          <img src={userData.avatar} alt="user" width={300} height={300} />
        ) : (
          <Image
            src={"/assets/User.svg"}
            width={80}
            height={80}
            className=""
            alt=""
          />
        )}
        <div className="sm:!flex hidden bg-slate-500 rounded-md overflow-hidden">
          <UploadButton<OurFileRouter>
            endpoint="imageUploader"
            appearance={{
              button: {
                color: "#ffffff",
                backgroundColor: "#000814",

                fontSize: "10px",
                width: "200px",
                display: "flex",
                flexDirection: "column",
                height: "70px",
              },
              container: {
                width: "200px",
                height: "60px",
                display: "flex",
                flexDirection: "column",
                background: "gray",
              },
              allowedContent: {
                fontSize: "10px",
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
      <div className="flex flex-col gap-4 p-10">
        <div className="flex flex-col">
          <label className="text-[#adb5bd] text-sm font-semibold">
            Username
          </label>
          <input
            type="text"
            className=" p-1 px-2 rounded-md focus:bg-[#b8d0eb] bg-[#669bbc] outline-none focus:ring-2"
            value={userData.username}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[#adb5bd] text-sm font-semibold">Email</label>
          <input
            type="text"
            disabled
            className=" p-1 px-2 rounded-md focus:bg-[#b8d0eb] disabled:cursor-not-allowed bg-[#669bbc] outline-none focus:ring-2"
            value={userData.email}
          />
        </div>
      </div>
    </div>
  );
}
