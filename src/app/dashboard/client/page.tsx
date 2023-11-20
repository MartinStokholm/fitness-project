import WorkoutProgramList from "@/components/WorkoutProgramList";
import { getClientWorkoutPrograms } from "@/server/actions";

export default async function ClientPage() {
  const workoutPrograms = await getClientWorkoutPrograms();

  return (
    <>
      <h1>Client dashboard</h1>
      <div className="flex flex-wrap gap-2 p-4">
        <div className="w-full p-4">
          <div className="bg-zinc-200 p-6 shadow-2xl border-4 border-gray-300 rounded-t-2xl mb-12">
            <h2 className="text-4xl text-center text-gray-800 pb-8">
              My WorkoutPrograms
            </h2>
            <WorkoutProgramList workoutPrograms={workoutPrograms.data} />
          </div>
        </div>
      </div>
    </>
  );
}
