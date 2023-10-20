import axios from "axios";
import Image from "next/image";
import { SetStateAction } from "react";

type Props = {
  id:string;
  setDelete:React.Dispatch<SetStateAction<boolean>>;
  setDelId:React.Dispatch<SetStateAction<string>>;
}

function DeleteTrash({id,setDelete,setDelId}:Props) {
  return (
    <>
    
    <Image
      onClick={()=>{
        setDelete(true);
        setDelId(id);
      }}
      src={"/assets/trash.svg"}
      width={20}
      height={20}
      className=" cursor-pointer"
      alt=""
    />
    </>
  );
}

export default DeleteTrash;
