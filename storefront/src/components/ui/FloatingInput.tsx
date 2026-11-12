"use client";

import React, { forwardRef } from "react";

export interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
}

const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  (
    {
      label,
      error,
      icon,
      type = "text",
      id,
      className = "",
      containerClassName = "",
      placeholder = " ", // Single space allows CSS :not(:placeholder-shown) trick
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.replace(/\s+/g, "-").toLowerCase() : undefined);

    return (
      <div className={`relative w-full ${containerClassName}`}>
        <div className="relative flex items-center">
          <input
            ref={ref}
            id={inputId}
            type={type}
            placeholder={placeholder}
            className={`peer w-full bg-black/50 text-white font-medium text-sm sm:text-base rounded-2xl border ${
              error
                ? "border-red-500/80 focus:border-red-500 focus:ring-red-500/20"
                : "border-white/10 hover:border-[#FF8B2C]/40 focus:border-[#FF8B2C] focus:ring-[#FF8B2C]/20"
            } px-4 py-3.5 sm:py-4 transition-all duration-200 outline-none focus:ring-4 focus:shadow-[0_0_20px_rgba(255,139,44,0.25)] ${
              icon ? "pl-11" : ""
            } ${className}`}
            {...props}
          />

          {/* Floating Arabic Label (RTL Aligned) */}
          <label
            htmlFor={inputId}
            className={`pointer-events-none absolute right-4 top-3.5 sm:top-4 text-xs sm:text-sm font-bold text-zinc-400 transition-all duration-200 ease-out origin-right 
              peer-focus:-top-2.5 peer-focus:right-3 peer-focus:text-xs peer-focus:text-[#FF8B2C] peer-focus:bg-[#0b0b10] peer-focus:px-2 peer-focus:rounded
              peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:right-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-[#FF8B2C] peer-[:not(:placeholder-shown)]:bg-[#0b0b10] peer-[:not(:placeholder-shown)]:px-2 peer-[:not(:placeholder-shown)]:rounded`}
          >
            {label}
          </label>

          {/* Optional Icon */}
          {icon && (
            <div className="absolute left-4 text-zinc-400 pointer-events-none flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <p className="mt-1.5 text-xs text-red-400 font-medium mr-1 text-right">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export default FloatingInput;
