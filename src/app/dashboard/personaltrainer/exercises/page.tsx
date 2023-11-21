import ExerciseList from "@/components/ExerciseList";
import CreateExerciseForm from "@/components/CreateExerciseForm";
import { checkSession, getAllExercises } from "@/server/actions";

export default async function ExercisesPage() {
  const exercises = await getAllExercises();
  const session = await checkSession();
  return (
    <main className="flex items-center justify-between">
      <div className="w-full p-4">
        <div className="bg-blue-200 p-6 shadow-2xl border-4 border-blue-100-300 rounded-t-2xl mb-12">
          <h2 className="text-4xl text-center text-gray-800 pb-8">
            Create an exercise without a workout
          </h2>
          <CreateExerciseForm />
        </div>
        <div className="bg-blue-200 p-6 shadow-2xl border-4 border-blue-100-300 rounded-t-2xl mb-12">
          <h2 className="text-4xl text-center text-gray-800 pb-8">
            {session?.name}
            {"'s"} exercises
          </h2>
          <ExerciseList exercises={exercises.data} />
        </div>
      </div>
    </main>
  );
}
