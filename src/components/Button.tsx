"use client";

import React from "react";

interface ButtonProps {
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  label: string;
  action: () => void;
}

const Button = ({ disabled, outline, small, label, action }: ButtonProps) => {
  return (
    <button
      onClick={action}
      className={`border rounded-md w-full font-semibold hover:opacity-70 transition ${
        disabled && "cursor-not-allowed opacity-70"
      } ${outline ? " border-black" : "bg-sky-500 text-white"}
      ${small ? "p-2" : "p-4"}`}
    >
      {label}
    </button>
  );
};

export default Button;
