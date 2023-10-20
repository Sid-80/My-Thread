import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

export default async function Home({children}:{children:React.ReactNode}) {
  const session = await getServerSession(options);
  if (session) {
    return (
      redirect("/dashboard")
    );
  } else {
    redirect("/login");
  }
}
