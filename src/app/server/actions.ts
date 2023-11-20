"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import User from "@/models/User";
import WorkoutProgram from "@/models/WorkoutProgram";
import Exercise from "@/models/Exercise";

export async function getAllClients() {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;
  const url = "https://afefitness2023.azurewebsites.net/api/Users/Clients";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        ContentType: "application/json",
      },
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
    const token = session?.user?.token;
    const url =
      "https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/trainer/";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: WorkoutProgram[] = await response.json();
    return { data };
  } catch (error) {
    console.log(error);
    return { error: Error };
  }
}

export async function getClientWorkoutPrograms() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const token = session?.user?.token;

    const url =
      "https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/client/" +
      userId;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(userId);
    const data: WorkoutProgram[] = await response.json();
    return { data };
  } catch (error) {
    console.log(error);
    return { error: Error };
  }
}

export async function getAllExercises() {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.user?.token;
    const url = "https://afefitness2023.azurewebsites.net/api/Exercises/";
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: Exercise[] = await response.json();
    return { data };
  } catch (error) {
    return { error: Error };
  }
}
