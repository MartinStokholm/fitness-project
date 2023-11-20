"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { revalidateTag } from "next/cache";
import User from "@/models/User";
import WorkoutProgram from "@/models/WorkoutProgram";
import Exercise from "@/models/Exercise";
import axios from "axios";

export async function getAllClients() {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;
  const url = "https://afefitness2023.azurewebsites.net/api/Users/Clients";
  try {
    const response = await fetch(url, {
      next: { tags: ["clients"] },
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
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
      next: { tags: ["trainerWorkoutPrograms"] },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
    const token = session?.user?.token;

    const url =
      "https://afefitness2023.azurewebsites.net/api/WorkoutPrograms/client/" +
      userId;
    const response = await fetch(url, {
      next: { tags: ["clientWorkoutPrograms"] },
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
    const token = session?.user?.token;
    const url = "https://afefitness2023.azurewebsites.net/api/Exercises/";
    const response = await fetch(url, {
      next: { tags: ["exercises"] },
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

export async function createClient(prevState: any, formData: FormData) {
  try {
    const session = await getServerSession(authOptions);
    const token = session?.user?.token;
    console.log(session);
    const newClient = {
      userId: 0,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      personalTrainerId: session?.user?.id,
      accountType: "Client",
    };
    const url = "https://afefitness2023.azurewebsites.net/api/Users";
    const response = await axios.post(url, newClient, {
      headers: {
        Authorization: `Bearer ${session?.user?.token}`,
        Accept: "application/json",
      },
    });
    revalidateTag("clients");
    return { message: "Client created successfully" };
  } catch (error) {
    return { message: `Failed with error: ${error}` };
  }
}
