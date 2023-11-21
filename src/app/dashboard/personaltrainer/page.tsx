import Link from "next/link";
import { checkSession } from "@/server/actions";
import { redirect } from "next/navigation";

export default async function TrainerPage() {
  const session = await checkSession();
  if (session?.role?.toLowerCase() !== "personaltrainer") {
    redirect("/dashboard/" + session?.role?.toLowerCase());
  }
  return (
    <main className="flex flex-col items-center w-full ">
      <div className="hover:scale-105 w-full lg:w-1/4 xl:w-1/4 p-4">
        <Link href="personaltrainer/clients/">
          <div className="bg-blue-500 rounded-lg p-4 h-32">
            <h2 className="text-white font-semibold">Clients</h2>
            <p className="text-white text-opacity-75">
              View and manage your clients
            </p>
          </div>
        </Link>
      </div>

      <div className="hover:scale-105 w-full lg:w-1/4 xl:w-1/4 p-4">
        <Link href="personaltrainer/workoutprograms/">
          <div className="bg-green-500 rounded-lg p-4 h-32">
            <h2 className="text-white font-semibold">Workout Programs</h2>
            <p className="text-white text-opacity-75">
              Manage workout programs
            </p>
          </div>
        </Link>
      </div>

      <div className="hover:scale-105 w-full lg:w-1/4 xl:w-1/4 p-4">
        <Link href="personaltrainer/exercises/">
          <div className="bg-yellow-500 rounded-lg p-4 h-32">
            <h2 className="text-white font-semibold">Exercises</h2>
            <p className="text-white text-opacity-75">Add and edit exercises</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
