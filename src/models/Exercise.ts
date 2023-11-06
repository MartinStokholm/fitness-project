export type ExerciseDto = {
  name: string;
  description: string;
  sets: number;
  repetitions: number;
  time: string;
};

type Exercise = {
  exerciseId: number;
  name?: string;
  description?: string;
  sets?: number;
  repetitions?: number;
  time?: string;
  workoutProgramId?: number;
  personalTrainerId?: number;
};
export default Exercise;
