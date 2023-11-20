"use client";

import Exercise from "@/models/Exercise";
import { User } from "@/models/User";
import { useFormState, useFormStatus } from "react-dom";
import { createWorkoutProgram } from "@/server/actions";
import FormInput from "@/components/FormInput";
import FormSubmit from "@/components/FormSubmit";

export default function CreateWorkoutProgram({
  exercises,
  clients,
}: {
  exercises: Exercise[] | undefined;
  clients: User[] | undefined;
}) {
  let initialState = {
    message: null,
    success: null,
  };
  const { pending, data } = useFormStatus();
  const [state, formAction] = useFormState(createWorkoutProgram, initialState);

  return (
    <form className="max-w-md mx-auto mt-8" action={formAction}>
      <FormInput label="Name" name="name" type="text" required />
      <FormInput label="Description" name="description" type="text" required />
      {/* Client Dropdown */}
      <div className="mb-4">
        <label
          htmlFor="clientDropdown"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Select Client
        </label>
        <select
          id="clientId"
          name="clientId"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>
            Choose a client
          </option>
          {clients?.map((client) => (
            <option key={client?.userId} value={client?.userId}>
              {client?.firstName}
            </option>
          ))}
        </select>
      </div>
      <FormSubmit pending={pending} state={state} />
    </form>
  );
}
