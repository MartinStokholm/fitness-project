import { useFormStatus } from "react-dom";

interface SubmitProps {
  state: { message: string };
}

const FormSubmit = ({ state }: SubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <div className="mb-4 text-center px-auto">
      <button
        type="submit"
        aria-disabled={pending}
        className="bg-blue-500 text-white p-2 rounded-md mx-auto w-full"
      >
        {pending ? "Submitting..." : "Submit"}
      </button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </div>
  );
};
export default FormSubmit;
