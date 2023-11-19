import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import WorkoutProgramList from "@/components/WorkoutProgramList";
import CreateWorkoutProgram from "@/components/CreateWorkoutProgram";
import AddExercise from "@/components/AddExercise";
import { ToastContainer } from "react-toastify";

export default async function WorkoutProgramsPage() {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;

  // Fetch workout programs
  const workoutProgramsUrl =
    "https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/trainer/";
  const workoutProgramsResponse = await fetch(workoutProgramsUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
  const workoutPrograms = await workoutProgramsResponse.json();

  // Fetch exercises
  const exercisesUrl =
    "https://afefitness2023.azurewebsites.net/api/Exercises/";
  const exercisesResponse = await fetch(exercisesUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const exercises = await exercisesResponse.json();

  // Fetch exercises
  const clientsUrl =
    "https://afefitness2023.azurewebsites.net/api/Users/Clients";
  const clientsResponse = await fetch(clientsUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const clients = await clientsResponse.json();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ToastContainer />
      <div className="w-full p-4">
        <div className="bg-zinc-200 p-6 shadow-2xl border-4 border-gray-300 rounded-t-2xl mb-12">
          <h2 className="text-4xl text-center text-gray-800 pb-8">
            My WorkoutPrograms
          </h2>
          <WorkoutProgramList workoutPrograms={workoutPrograms} />
        </div>

        <div className="bg-zinc-200 p-6 shadow-2xl border-4 border-gray-300 rounded-t-2xl mb-12">
          <h2 className="text-4xl text-center text-gray-800 pb-8">
            Create new program
          </h2>
          <CreateWorkoutProgram exercises={exercises} clients={clients} />
        </div>

        <div className="bg-zinc-200 p-6 shadow-2xl border-4 border-gray-300 rounded-t-2xl mb-12">
          <h2 className="text-4xl text-center text-gray-800 pb-8">
            Add exercise to existing workout program
          </h2>
          <AddExercise
            workoutPrograms={workoutPrograms}
            exercises={exercises}
          />
        </div>
      </div>
    </main>
  );
}
