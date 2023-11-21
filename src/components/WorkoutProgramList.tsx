"use client";

import WorkoutProgram from "@/models/WorkoutProgram";
import WorkoutProgramDetails from "@/components/WorkoutProgramDetails";
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
      className={`m-8 bg-green-100 cursor-pointer ${
        expandedRow === workoutProgram.workoutProgramId ? "" : ""
      }`}
      onClick={() => handleRowClick(workoutProgram.workoutProgramId)}
    >
      <div className="flex flex-col justify-between bg-green-100">
        <h3 className="mx-4 mt-4 p-2 text-2xl font-semibold">
          {workoutProgram.name}
        </h3>
        {expandedRow !== workoutProgram.workoutProgramId && (
          <>
            <p className="p-2 mx-4 text-gray-500">
              {workoutProgram.description.substring(0, 175)}...
            </p>
          </>
        )}
      </div>
      {expandedRow === workoutProgram.workoutProgramId && (
        <>
          <p className="p-2 mx-4 text-gray-500">{workoutProgram.description}</p>
          <WorkoutProgramDetails workoutProgram={workoutProgram} />
        </>
      )}
    </div>
  ));
}
