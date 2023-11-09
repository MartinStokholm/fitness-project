import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import WorkoutProgram from "@/models/WorkoutProgram";
import WorkoutProgramList from "@/components/WorkoutProgramList";

export default async function ClientPage() {
  const session = await getServerSession(authOptions);

  const userId = session?.user?.id;
  const token = session?.user?.token;
  const url =
    "https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/client/" +
    userId;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  console.log(data);

  return (
    <>
      <h1>Client dashboard</h1>
      <div className="flex flex-wrap gap-2 p-4">
        <div className="w-full p-4">
          <h2 className="text-4xl pb-8">My WorkoutPrograms</h2>
          <WorkoutProgramList workoutPrograms={data} />
        </div>
      </div>
    </>
  );
}
