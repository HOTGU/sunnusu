"use client";

import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  useController,
} from "react-hook-form";

interface TextareaProps {
  name: string;
  control: Control<FieldValues>;
  errors: FieldErrors;
  required: boolean;
  disabled?: boolean;
  label: string;
}

const Textarea = ({
  name,
  control,
  errors,
  required,
  disabled,
  label,
}: TextareaProps) => {
  const { field } = useController({ control, name, rules: { required } });

  return (
    <div className="w-full relative">
      <textarea
        placeholder=" "
        id={name}
        {...field}
        disabled={disabled}
        className={`peer w-full min-h-[150px] p-2 pt-6 pl-4 bg-white font-semibold border rounded-md transition disabled:opacity-70 disabled:bg-zinc-100 disabled:cursor-not-allowed resize-none ${
          errors[name] && "border border-rose-500"
        }`}
      ></textarea>
      <label
        htmlFor={name}
        className="absolute pointer-cursor duration-150 scale-[0.85] left-4 top-1 origin-[0] text-zinc-400 peer-placeholder-shown:scale-[1.05] peer-placeholder-shown:top-5 peer-placeholder-shown:left-4 peer-placeholder-shown:text-zinc-400 peer-focus:top-1 peer-focus:scale-75 peer-focus:left-4 peer-focus:text-black"
      >
        {label}
      </label>
    </div>
  );
};

export default Textarea;
