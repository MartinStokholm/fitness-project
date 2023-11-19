import Exercise from "@/models/Exercise";

export default function ExerciseList({
  exercises,
}: {
  exercises: Exercise[] | undefined;
}) {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <ul>
        {exercises?.map((exercise) => (
          <li key={exercise.exerciseId} className="py-2">
            <div className="flex justify-between items-center w-full">
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
