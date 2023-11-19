"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, FormEvent } from "react";
import { useSession } from "next-auth/react";
import Exercise from "@/models/Exercise";
import WorkoutProgram from "@/models/WorkoutProgram";
import { ToastContainer } from "react-toastify";
import NotifyToast from "@/components/NotifyToast";

export default function AddExercise({
  workoutPrograms,
  exercises,
}: {
  workoutPrograms: WorkoutProgram[];
  exercises: Exercise[];
}) {
  const { data: session } = useSession();
  const [addingExistingExercise, setAddingExistingExercise] = useState(true);
  const [selectedExistingExercise, setSelectedExistingExercise] = useState<
    Exercise | undefined
  >(undefined);

  const mutation = useMutation({
    mutationFn: async (newExercise: Exercise) => {
      const url =
        "https://afefitness2023.azurewebsites.net/api/Exercises/Program/" +
        workoutProgramId;

      if (session?.user?.token === undefined) {
        NotifyToast({ type: "error", message: "Authentication error!" });
        return;
      }
      try {
        const response = await axios.post(url, newExercise, {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
            Accept: "application/json",
          },
        });

        console.log(response);
        NotifyToast({
          type: "success",
          message: "Exercise created successfully!",
        });
        return response;
      } catch (error) {
        NotifyToast({ type: "error", message: "Error creating exercise!" });
        console.error(error);
        throw error;
      }
    },
  });

  const [workoutProgramId, setWorkoutProgramId] = useState<number | undefined>(
    undefined,
  );

  const [exerciseData, setExerciseData] = useState<Exercise>({
    exerciseId: 0,
    name: "",
    description: "",
    sets: 0,
    repetitions: 0,
    time: "",
    workoutProgramId: workoutProgramId,
    personalTrainerId: Number(session?.user?.id),
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setExerciseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleExistingExerciseChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedExerciseId = parseInt(e.target.value, 10);
    const selectedExercise = exercises.find(
      (exercise) => exercise.exerciseId === selectedExerciseId,
    );
    setSelectedExistingExercise(selectedExercise);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (addingExistingExercise && selectedExistingExercise) {
      mutation.mutate({
        ...selectedExistingExercise,
        workoutProgramId: workoutProgramId,
      });
    } else {
      mutation.mutate(exerciseData);
    }

    setAddingExistingExercise(addingExistingExercise);
    setSelectedExistingExercise(undefined);
  };

  const handleWorkoutProgramChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedWorkoutProgramId = parseInt(e.target.value, 10);
    setWorkoutProgramId(selectedWorkoutProgramId);
    setExerciseData((prevData) => ({
      ...prevData,
      workoutProgramId: selectedWorkoutProgramId,
    }));
  };

  return (
    <>
      <ToastContainer />
      <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
        {/* Workout Program Dropdown */}
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
            onChange={handleWorkoutProgramChange}
            value={workoutProgramId || ""}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" disabled>
              Choose a workout program
            </option>
            {workoutPrograms.map((program) => (
              <option
                key={program.workoutProgramId}
                value={program.workoutProgramId}
              >
                {program.name}
              </option>
            ))}
          </select>
        </div>

        {addingExistingExercise ? (
          // Dropdown for existing exercises
          <div className="mb-4">
            <label
              htmlFor="existingExercise"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Select Existing Exercise
            </label>
            <select
              id="existingExercise"
              name="existingExercise"
              onChange={handleExistingExerciseChange}
              value={selectedExistingExercise?.exerciseId || ""}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="" disabled>
                Choose an existing exercise
              </option>
              {exercises.map((exercise) => (
                <option key={exercise.exerciseId} value={exercise.exerciseId}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          // Form fields for creating a new exercise
          <>
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
                value={exerciseData.name}
                onChange={handleChange}
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
                value={exerciseData.description}
                onChange={handleChange}
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
                value={exerciseData.sets}
                onChange={handleChange}
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
                value={exerciseData.repetitions}
                onChange={handleChange}
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
                value={exerciseData.time}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <button
            type="button"
            onClick={() => setAddingExistingExercise((prev) => !prev)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {addingExistingExercise
              ? "Add New Exercise"
              : "Add Existing Exercise"}
          </button>
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
