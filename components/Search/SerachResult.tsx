import Image from "next/image";
import Link from "next/link";

type Props = {
  username: string;
  avatar: string;
  id: string;
};
export default function SerachResult({ username, id, avatar }: Props) {
  return (
    <div className="text-white flex items-center justify-between rounded-md p-4 gap-4 w-[70%]">
      <div className="flex items-center justify-center gap-2">
        {avatar ? (
          <img src={avatar} width={50} height={50} className=" rounded-full" />
        ) : (
          <Image
            src={"/assets/User.svg"}
            width={45}
            height={45}
            alt=""
          />
        )}
        <h1>{username}</h1>
      </div>
      <Link
        href={`/dashboard/search/${id}`}
        className="bg-[#9d4edd] rounded-md text-base font-medium p-1 px-3"
      >
        View
      </Link>
    </div>
  );
}
