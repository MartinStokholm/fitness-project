"use client";

import FormInput from "@/components/FormInput";
import FormSubmit from "@/components/FormSubmit";
import { addExercise } from "@/server/actions";
import { useFormState } from "react-dom";
import Exercise from "@/models/Exercise";
import WorkoutProgram from "@/models/WorkoutProgram";

export default function AddExercise({
  workoutPrograms,
}: {
  workoutPrograms: WorkoutProgram[] | undefined;
  exercises: Exercise[] | undefined;
}) {
  let initialState = {
    message: null,
    success: null,
  };
  const [state, formAction] = useFormState(addExercise, initialState);

  return (
    <form className="max-w-md mx-auto mt-8" action={formAction}>
      <div className="mb-4">
        <label
          htmlFor="workoutProgram"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Select Workout Program
        </label>
        <select
          id="workoutProgram"
          name="workoutProgram"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>
            Choose a workout program
          </option>
          {workoutPrograms?.map((program) => (
            <option
              key={program.workoutProgramId}
              value={program.workoutProgramId}
            >
              {program.name}
            </option>
          ))}
        </select>
      </div>
      <label
        htmlFor="exerciseProgram"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Exercise
      </label>
      <FormInput label="Name" name="name" type="text" required />
      <FormInput label="Description" name="description" type="text" required />
      <FormInput label="Sets" name="sets" type="number" required />
      <FormInput
        label="Repetitions"
        name="repetitions"
        type="number"
        required
      />
      <FormInput label="Time" name="time" type="text" required />
      <FormSubmit state={state} />
    </form>
  );
}
