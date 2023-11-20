"use client";

import React, { useState } from "react";
import useToast from "@/hooks/useToast";
import { useSession } from "next-auth/react";
import { useFormState, useFormStatus } from "react-dom";
import Exercise from "@/models/Exercise";
import WorkoutProgram from "@/models/WorkoutProgram";
import { addExercise } from "@/server/actions";
import { ChangeEvent } from "react";

export default function AddExercise({
  workoutPrograms,
  exercises,
}: {
  workoutPrograms: WorkoutProgram[] | undefined;
  exercises: Exercise[] | undefined;
}) {
  let initialState = {
    message: null,
    success: null,
  };
  const { pending, data } = useFormStatus();
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
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Name
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
      <div className="mb-4">
        <label
          htmlFor="sets"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Sets
        </label>
        <input
          type="number"
          id="sets"
          name="sets"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="repetitions"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Repetitions
        </label>
        <input
          type="number"
          id="repetitions"
          name="repetitions"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="time"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Time
        </label>
        <input
          type="text"
          id="time"
          name="time"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4 text-center">
        <button
          type="submit"
          aria-disabled={pending}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </div>
    </form>
  );
}
