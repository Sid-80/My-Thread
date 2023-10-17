import Image from "next/image";

function DeleteTrash() {
  return (
    <Image
      onClick={()=>{}}
      src={"/assets/trash.svg"}
      width={20}
      height={20}
      className=""
      alt=""
    />
  );
}

export default DeleteTrash;
