"use client";

import Exercise from "@/models/Exercise";
import { User } from "@/models/User";
import { useFormState, useFormStatus } from "react-dom";
import { createWorkoutProgram } from "@/server/actions";

export default function CreateWorkoutProgram({
  exercises,
  clients,
}: {
  exercises: Exercise[] | undefined;
  clients: User[] | undefined;
}) {
  let initialState = {
    message: null,
    success: null,
  };
  const { pending, data } = useFormStatus();
  const [state, formAction] = useFormState(createWorkoutProgram, initialState);

  return (
    <form className="max-w-md mx-auto mt-8" action={formAction}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Workout Program Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      {/* Client Dropdown */}
      <div className="mb-4">
        <label
          htmlFor="clientDropdown"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Select Client
        </label>
        <select
          id="client"
          name="client"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>
            Choose a client
          </option>
          {clients?.map((client) => (
            <option key={client?.userId} value={client?.userId}>
              {client?.firstName}
            </option>
          ))}
        </select>
      </div>

      {/* Exercise Dropdown */}
      <div className="mb-4">
        <label
          htmlFor="exerciseDropdown"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Select Exercise
        </label>
        <select
          id="exercise"
          name="exercise"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>
            Choose an exercise
          </option>
          {exercises?.map((exercise) => (
            <option key={exercise.exerciseId} value={exercise.exerciseId}>
              {exercise.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <button
          type="submit"
          aria-disabled={pending}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Workout Program
        </button>
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </div>
    </form>
  );
}
