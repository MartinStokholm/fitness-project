import { FC } from "react";

interface InputProps {
  type: "text" | "number" | "email" | "password";
  label: string;
  name: string;
  placeholder?: string;
  error?: boolean;
  required?: boolean;
  disabled?: boolean;
}

const FormInput: FC<InputProps> = ({
  type,
  label,
  name,
  placeholder,
  error,
  disabled,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block text-sm font-medium text-gray-600"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        type={type}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={label}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <p className="error">Input filed cannot be empty!</p>}
    </div>
  );
};

export default FormInput;
