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
  const [hideDescribtion, setHideDescribtion] = useState<boolean>(false);
  const handleRowClick = (workoutProgramId: number) => {
    setExpandedRow(expandedRow === workoutProgramId ? null : workoutProgramId);
    hideDescribtion ? setHideDescribtion(false) : setHideDescribtion(true);
  };

  return workoutPrograms?.map((workoutProgram) => (
    <div
      key={workoutProgram.workoutProgramId}
      className={`m-8 bg-blue-100 cursor-pointer ${
        expandedRow === workoutProgram.workoutProgramId ? "" : ""
      }`}
      onClick={() => handleRowClick(workoutProgram.workoutProgramId)}
    >
      <div className="flex flex-col justify-between bg-green-100">
        <h3 className="mx-4 mt-4 p-2 text-2xl font-semibold">
          {workoutProgram.name}
        </h3>

        {hideDescribtion === true && (
          <>
            <p className="p-2 text-gray-500 mx-4">
              {workoutProgram.description}
            </p>
            <p className="p-2 mx-4 italic hover:text-blue-300">Collapse ...</p>
          </>
        )}
        {hideDescribtion === false && (
          <>
            <p className="p-2 mx-4 text-gray-500">
              {workoutProgram.description.substring(0, 175)}...
            </p>
            <p className="p-2 mx-4 font-light italic text-blue-300 hover:text-grey-500 ">
              See more ...
            </p>
          </>
        )}
      </div>
      {expandedRow === workoutProgram.workoutProgramId && (
        <WorkoutProgramDetails workoutProgram={workoutProgram} />
      )}
    </div>
  ));
}
