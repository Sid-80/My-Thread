import Image from "next/image";
import { SetStateAction } from "react";

type Props = {
  text:string;
  setText:React.Dispatch<SetStateAction<string>>;
}

export default function TextSearch({text,setText}:Props) {
  return (
    <div className=" bg-[#9d4edd] text-white flex rounded-md overflow-hidden p-2">
      <Image src={'/assets/Search.svg'} width={25} height={25} className="" alt="" />
      <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Search..." type="text" className="bg-[#9d4edd] outline-none p-1 text-base font-semibold sm:w-[450px]" />
    </div>
  )
}