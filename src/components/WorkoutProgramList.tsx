import WorkoutProgram from "@/models/WorkoutProgram";
import WorkoutProgramDetails from "@/components/WorkoutProgramDetails";

export default function WorkoutProgramList({
  workoutPrograms,
}: {
  workoutPrograms: WorkoutProgram[];
}) {
  return workoutPrograms.map((workoutProgram) => (
    <div key={workoutProgram.workoutProgramId} className="py-2 px-4 bg-green-100">
      <div className="flex justify-between items-center">
          <h3 className="p-2 text-2xl font-semibold">{workoutProgram.name}</h3>
        <div className="text-right">
          <p className="p-2 text-gray-500">{workoutProgram.description}</p>
        </div>
      </div>

      <WorkoutProgramDetails
        workoutProgramId={workoutProgram.workoutProgramId}
      />
    </div>
  ));
}
