import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/options";
import WorkoutProgramList from "@/components/WorkoutProgramList";

export default async function ExercisesPage() {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;
  const url =
      "https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/trainer/";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return (
      <main className="flex min-h-screen flex-col items-center justify-between">
        <div className="w-full p-4">
          <h2 className="text-4xl pb-8">Exercises</h2>
        </div>
      </main>
  );
}
