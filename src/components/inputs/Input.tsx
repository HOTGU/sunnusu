"use client";

import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  useController,
} from "react-hook-form";

interface InputProps {
  control: Control<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  name: string;
  label: string;
  required?: boolean;
  type?: "text" | "email" | "password";
}

const Input = ({
  control,
  errors,
  disabled,
  required,
  name,
  label,
  type = "text",
}: InputProps) => {
  const { field } = useController({
    control,
    name,
    rules: {
      required,
    },
  });

  return (
    <div className="relative w-full">
      <input
        className={`peer w-full p-2 pt-6 pl-4 bg-white font-semibold border rounded-md transition disabled:opacity-70 disabled:bg-zinc-100 disabled:cursor-not-allowed ${
          errors[name] && "border border-rose-500"
        }`}
        placeholder=" "
        type={type}
        disabled={disabled}
        name={field.name}
        value={field.value}
        onChange={field.onChange}
        id={`${name}-input`}
      />
      <label
        htmlFor={`${name}-input`}
        className="absolute pointer-cursor duration-150 scale-[0.85] left-4 top-1 origin-[0] text-zinc-400 peer-placeholder-shown:scale-[1.05] peer-placeholder-shown:top-5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-zinc-400 peer-focus:top-1 peer-focus:scale-75 peer-focus:left-4 peer-focus:text-black"
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
