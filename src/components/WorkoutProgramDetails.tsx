import WorkoutProgram from "@/models/WorkoutProgram";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function WorkoutProgramDetails({
                                                      workoutProgramId,
                                                    }: {
  workoutProgramId: number | undefined;
}) {

  const session = await getServerSession(authOptions);
  const token = session?.user?.token;
  const url =
      "https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/" +
      workoutProgramId;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data: WorkoutProgram = await response.json();

  return (
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-xl font-semibold">Exercises</h2>
        <ul>
          {data.exercises.map((exercise) => (
              <li key={exercise.exerciseId} className="py-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">{exercise.name}</h3>
                    <p className="text-gray-500">{exercise.description}</p>
                  </div>
                  <div className="text-right">
                    <p>
                      Sets: {exercise.sets || "N/A"}, Repetitions:{" "}
                      {exercise.repetitions || "N/A"}
                    </p>
                    <p>Time: {exercise.time || "N/A"}</p>
                  </div>
                </div>
              </li>
          ))}
        </ul>
      </div>
  );
}
