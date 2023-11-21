"use client";

import { useFormState } from "react-dom";
import { createWorkoutProgram } from "@/server/actions";
import FormInput from "@/components/FormInput";
import FormSubmit from "@/components/FormSubmit";
import { User } from "@/models/User";
import useToast from "@/hooks/useToast";

export default function CreateWorkoutProgram({
  clients,
}: {
  clients: User[] | undefined;
}) {
  let initialState = {
    message: null,
    success: null,
  };
  const [state, formAction] = useFormState(createWorkoutProgram, initialState);
  const showToast = useToast();
  if (state.success) {
    showToast(state.success, "success");
  }

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
      <FormSubmit state={state} />
    </form>
  );
}
