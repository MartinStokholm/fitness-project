"use client";

import WorkoutProgram from "@/models/WorkoutProgram";
import WorkoutProgramDetails from "@/app/components/WorkoutProgramDetails";
import { useState } from "react";

export default function WorkoutProgramList({
  workoutPrograms,
}: {
  workoutPrograms: WorkoutProgram[] | undefined;
}) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const handleRowClick = (workoutProgramId: number) => {
    setExpandedRow(expandedRow === workoutProgramId ? null : workoutProgramId);
  };

  return workoutPrograms?.map((workoutProgram) => (
    <div
      key={workoutProgram.workoutProgramId}
      className={`py-2 px-4 bg-green-100 cursor-pointer ${
        expandedRow === workoutProgram.workoutProgramId ? "rounded-b" : ""
      }`}
      onClick={() => handleRowClick(workoutProgram.workoutProgramId)}
    >
      <div className="flex justify-between items-center">
        <h3 className="p-2 text-2xl font-semibold">{workoutProgram.name}</h3>
        <div className="text-right">
          <p className="p-2 text-gray-500">{workoutProgram.description}</p>
        </div>
      </div>
      {expandedRow === workoutProgram.workoutProgramId && (
        <WorkoutProgramDetails workoutProgram={workoutProgram} />
      )}
    </div>
  ));
}
