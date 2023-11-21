"use client";

import FormInput from "@/components/FormInput";
import FormSubmit from "@/components/FormSubmit";
import { useFormState } from "react-dom";
import { createPersonalTrainer } from "@/server/actions";

export default function CreatePersonalTrainerForm() {
  let initialState = {
    message: null,
    success: null,
  };
  const [state, formAction] = useFormState(createPersonalTrainer, initialState);
  return (
    <form className="max-w-md mx-auto my-8" action={formAction}>
      <FormInput label="First Name" name="firstName" type="text" required />
      <FormInput label="Last Name" name="lastName" type="text" required />
      <FormInput label="Email" name="email" type="email" required />
      <FormInput label="Password" name="password" type="password" required />
      <FormSubmit state={state} />
    </form>
  );
}
