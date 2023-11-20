"use server";

import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";
import WorkoutProgram from "@/models/WorkoutProgram";
import Exercise from "@/models/Exercise";
import User from "@/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import axios from "axios";

export async function getAllClients() {
  const session = await getServerSession(authOptions);
  const url = "https://afefitness2023.azurewebsites.net/api/Users/Clients";
  try {
    const response = await fetch(url, {
      next: { tags: ["clients"] },
      method: "GET",
      headers: { Authorization: `Bearer ${session?.user?.token}` },
    });

    const data: User[] = await response.json();
    return { data };
  } catch (error) {
    return { error: error };
  }
}

export async function getTrainerWorkoutPrograms() {
  try {
    const session = await getServerSession(authOptions);
    const url =
      "https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/trainer/";
    const response = await fetch(url, {
      next: { tags: ["trainerWorkoutPrograms"] },
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    const data: WorkoutProgram[] = await response.json();
    return { data };
  } catch (error) {
    return { error: Error };
  }
}

export async function getClientWorkoutPrograms() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const url =
      "https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/client/" +
      userId;
    const response = await fetch(url, {
      next: { tags: ["clientWorkoutPrograms"] },
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    const data: WorkoutProgram[] = await response.json();
    return { data };
  } catch (error) {
    return { error: Error };
  }
}

export async function getAllExercises() {
  try {
    const session = await getServerSession(authOptions);
    const url = "https://afefitness2023.azurewebsites.net/api/Exercises/";
    const response = await fetch(url, {
      next: { tags: ["exercises"] },
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    const data: Exercise[] = await response.json();
    return { data };
  } catch (error) {
    return { error: Error };
  }
}

export async function createClient(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    const newClient = {
      userId: 0,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      personalTrainerId: Number(session?.user?.id),
      accountType: "Client",
    };
    const url = "https://afefitness2023.azurewebsites.net/api/Users";
    await axios.post(url, newClient, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
        Accept: "application/json",
      },
    });
    revalidateTag("clients");
    return { message: "Client created successfully", success: true };
  } catch (error) {
    return { message: `Failed with error: ${error}`, success: false };
  }
}

export async function createExercise(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    const newExercise = {
      exerciseId: 0,
      name: formData.get("name"),
      description: formData.get("description"),
      sets: formData.get("sets"),
      repetitions: formData.get("repetitions"),
      time: formData.get("time"),
      personalTrainerId: Number(session?.user?.id),
    };
    const url = "https://afefitness2023.azurewebsites.net/api/Exercises";
    await axios.post(url, newExercise, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
        Accept: "application/json",
      },
    });
    revalidateTag("exercises");
    return { message: "Exercise created successfully", success: true };
  } catch (error) {
    return { message: `Failed with error: ${error}`, success: false };
  }
}

export async function addExercise(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    const exerciseToAdd = {
      name: formData.get("name"),
      description: formData.get("description"),
      sets: Number(formData.get("sets")),
      repetitions: Number(formData.get("repetitions")),
      time: formData.get("time"),
    };
    const url =
      "https://afefitness2023.azurewebsites.net/api/Exercises/Program/" +
      formData.get("workoutProgram");
    await axios.post(url, exerciseToAdd, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
        Accept: "application/json",
      },
    });
    revalidateTag("trainerWorkoutPrograms");
    revalidateTag("clientWorkoutPrograms");
    return { message: "Exercise added successfully", success: true };
  } catch (error) {
    return { message: `Failed with error: ${error}`, success: false };
  }
}

export async function createWorkoutProgram(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    const newWorkoutProgram = {
      workoutProgramId: 0,
      name: formData.get("name"),
      description: formData.get("description"),
      exercises: [],
      personalTrainerId: Number(session?.user?.id),
      clientId: Number(formData.get("clientId")),
    };
    const url = "https://afefitness2023.azurewebsites.net/api/WorkoutPrograms";
    await axios.post(url, newWorkoutProgram, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
        Accept: "application/json",
      },
    });
    revalidateTag("trainerWorkoutPrograms");
    revalidateTag("clientWorkoutPrograms");
    return { message: "Workout program created successfully", success: true };
  } catch (error) {
    return { message: `Failed with error: ${error}`, success: false };
  }
}

export async function createPersonalTrainer(
  prevState: any,
  formData: FormData,
) {
  const url = "https://afefitness2023.azurewebsites.net/api/Users";
  const session = await getServerSession(authOptions);
  const newPersonalTrainer = {
    userId: 0,
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    accountType: "PersonalTrainer",
  };

  try {
    await axios.post(url, newPersonalTrainer, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
      },
    });
    revalidateTag("clients");
    return { message: "Personal Trainer created successfully", success: true };
  } catch (error) {
    return { message: `Failed with error: ${error}`, success: false };
  }
}
