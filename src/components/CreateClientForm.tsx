"use client";

import { createClient } from "@/server/actions";
import { useFormStatus, useFormState } from "react-dom";
import FormInput from "@/components/FormInput";
import FormSubmit from "@/components/FormSubmit";

export default function CreateClientForm() {
  let initialState = {
    message: null,
    success: null,
  };
  const { pending, data } = useFormStatus();
  const [state, formAction] = useFormState(createClient, initialState);

  return (
    <>
      <form className="max-w-md mx-auto my-8" action={formAction}>
        <FormInput label="First Name" name="firstName" type="text" required />
        <FormInput label="Last Name" name="lastName" type="text" required />
        <FormInput label="Email" name="email" type="email" required />
        <FormInput label="Password" name="password" type="password" required />
        <FormSubmit pending={pending} state={state} />
      </form>
    </>
  );
}
