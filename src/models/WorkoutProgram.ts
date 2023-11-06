import Exercise from "@/models/Exercise";

type WorkoutProgram = {
  workoutProgramId: number;
  name: string;
  description: string;
  exercises: Exercise[];
  personalTrainerId: number;
  clientId: number;
};

export default WorkoutProgram;
