"use client";

import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 mb-4">
      <label className="text-sm font-medium">
        {label}
      </label>

      <input
        {...props}
        className={`w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500 ${className || ""}`}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}