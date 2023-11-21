"use client";

import { useFormState } from "react-dom";
import { createExercise } from "@/server/actions";
import FormInput from "@/components/FormInput";
import FormSubmit from "@/components/FormSubmit";

export default function CreateExerciseForm() {
  let initialState = {
    message: null,
    success: null,
  };
  const [state, formAction] = useFormState(createExercise, initialState);

  return (
    <form className="max-w-md mx-auto mt-8" action={formAction}>
      <FormInput label="Name" name="name" type="text" required />
      <FormInput label="Description" name="description" type="text" required />
      <FormInput label="Sets" name="sets" type="number" required />
      <FormInput
        label="Repetitions"
        name="repetitions"
        type="number"
        required
      />
      <FormInput label="Time" name="time" type="text" required />
      <FormSubmit state={state} />
    </form>
  );
}
