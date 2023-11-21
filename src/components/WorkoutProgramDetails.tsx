import WorkoutProgram from "@/models/WorkoutProgram";

export default function WorkoutProgramDetails({
  workoutProgram,
}: {
  workoutProgram: WorkoutProgram;
}) {
  const exerciseCount = workoutProgram.exercises.length;

  return (
    <div className="bg-white pt-4 rounded-md">
      <h2 className="text-xl font-light mx-4 mt-2">
        Contains {exerciseCount}{" "}
        {exerciseCount === 1 ? "exercise " : "exercises "}
      </h2>
      <ul>
        {workoutProgram.exercises.map((exercise) => (
          <li key={exercise.exerciseId} className="py-2">
            <div className="flex flex-col">
              <div>
                <div className="flex justify-between mx-6 my-2">
                  <h3 className="text-lg font-semibold">⭐ {exercise.name}</h3>
                  <p className="text-xl text-center mr-4 font-extralight">
                    ⌚ : {exercise.time || "N/A"}
                  </p>
                </div>
                <p className="text-gray-500 mx-8">{exercise.description}</p>
              </div>

              <div className="flex mt-4 justify-between mx-8 mb-6">
                <p className="text-2xl font-light">
                  {"Perform: "}
                  {exercise.sets || "N/A"}
                  {exercise.sets === 1 ? " set " : " sets "}
                  of {exercise.repetitions || "N/A"}
                  {exercise.repetitions === 1
                    ? " repetition "
                    : " repetitions "}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
