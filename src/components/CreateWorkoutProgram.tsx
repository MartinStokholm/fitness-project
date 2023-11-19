"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import Exercise from "@/models/Exercise";
import WorkoutProgram from "@/models/WorkoutProgram";
import { User } from "@/models/User";
import { ToastContainer } from "react-toastify";
import NotifyToast from "@/components/NotifyToast";

export default function CreateWorkoutProgram({
  exercises,
  clients,
}: {
  exercises: Exercise[] | undefined;
  clients: User[] | undefined;
}) {
  const { data: session } = useSession();

  const mutation = useMutation({
    mutationFn: async (newWorkout: WorkoutProgram) => {
      const url =
        "https://afefitness2023.azurewebsites.net/api/WorkoutPrograms";

      if (session?.user?.token === undefined) {
        NotifyToast({ type: "error", message: "Authentication error!" });
        return;
      }
      try {
        const response = await axios.post(url, newWorkout, {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
            Accept: "application/json",
          },
        });
        NotifyToast({
          type: "success",
          message: "Workout Program created successfully!",
        });
        return response;
      } catch (error) {
        NotifyToast({
          type: "error",
          message: "Error creating Workout Program!",
        });
        throw error;
      }
    },
  });

  const [workoutProgramData, setWorkoutProgramData] = useState<WorkoutProgram>({
    workoutProgramId: 0,
    name: "",
    description: "",
    exercises: [],
    personalTrainerId: Number(session?.user?.id),
    clientId: 0,
  });

  const handleChangeWorkoutProgram = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setWorkoutProgramData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleAddExercise = (selectedExercise: Exercise) => {
    setWorkoutProgramData((prevData) => ({
      ...prevData,
      exercises: [...prevData.exercises, selectedExercise],
    }));
    console.log(workoutProgramData);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(workoutProgramData);
  };

  return (
    <>
      <ToastContainer />
      <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
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
            value={workoutProgramData.name}
            onChange={handleChangeWorkoutProgram}
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
            value={workoutProgramData.description}
            onChange={handleChangeWorkoutProgram}
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
            id="clientDropdown"
            name="clientDropdown"
            onChange={(e) => {
              const selectedClientId = parseInt(e.target.value, 10);
              setWorkoutProgramData((prevData) => ({
                ...prevData,
                clientId: selectedClientId,
              }));
            }}
            value={workoutProgramData.clientId}
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
            id="exerciseDropdown"
            name="exerciseDropdown"
            onChange={(e) => {
              const selectedExerciseId = parseInt(e.target.value, 10);
              const selectedExercise = exercises?.find(
                (exercise) => exercise.exerciseId === selectedExerciseId,
              );
              if (selectedExercise) {
                handleAddExercise(selectedExercise);
              }
            }}
            value="" // Set the default value to an empty string
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

        {/* Display Selected Exercises */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Selected Exercises</h2>
          <ul>
            {workoutProgramData.exercises.map((exercise) => (
              <li key={exercise.exerciseId}>{exercise.name}</li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Workout Program
          </button>
        </div>
      </form>
    </>
  );
}
