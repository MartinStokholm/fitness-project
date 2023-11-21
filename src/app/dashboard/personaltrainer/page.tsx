import Link from "next/link";
import { checkSession } from "@/server/actions";
import { redirect } from "next/navigation";

export default async function TrainerPage() {
  const session = await checkSession();
  if (session?.role?.toLowerCase() !== "personaltrainer") {
    redirect("/dashboard/" + session?.role?.toLowerCase());
  }
  return <main className="flex flex-col items-center w-full "></main>;
}
