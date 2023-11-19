"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import Exercise from "@/models/Exercise";
import { ToastContainer } from "react-toastify";
import NotifyToast from "@/components/NotifyToast";

export default function CreateExercise() {
  const { data: session } = useSession();

  const mutation = useMutation({
    mutationFn: async (newExercise: Exercise) => {
      const url = "https://afefitness2023.azurewebsites.net/api/Exercises";

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

  const [exerciseData, setExerciseData] = useState<Exercise>({
    exerciseId: 0,
    name: "",
    description: "",
    sets: 0,
    repetitions: 0,
    time: "",
    personalTrainerId: Number(session?.user?.id),
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setExerciseData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(exerciseData);
    // Optionally, you can reset the form after submission
    setExerciseData({
      exerciseId: 0,
      name: "",
      description: "",
      sets: 0,
      repetitions: 0,
      time: "",
      workoutProgramId: 0,
      personalTrainerId: 0,
    });
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

        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Exercise
          </button>
        </div>
      </form>
    </>
  );
}
