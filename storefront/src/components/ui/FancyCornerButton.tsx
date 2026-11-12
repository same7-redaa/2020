import React from "react";
import Link from "next/link";

interface FancyCornerButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  variant?: "dark" | "neon" | "glass";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

export default function FancyCornerButton({
  href,
  onClick,
  children,
  icon,
  variant = "dark",
  size = "md",
  fullWidth = false,
  className = "",
}: FancyCornerButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-7 py-3 text-sm",
    lg: "px-9 py-3.5 text-base",
  }[size];

  const isNeonVariant = variant === "neon";

  const content = (
    <span
      className={`relative flex items-center justify-center ${sizeClasses} overflow-hidden font-black transition-all duration-300 rounded-[8px] group select-none ${
        isNeonVariant
          ? "bg-[#FF8B2C] text-black shadow-[0_0_20px_rgba(255,139,44,0.45)] hover:shadow-[0_0_30px_rgba(255,139,44,0.65)] border border-[#FF8B2C]"
          : "bg-white/5 text-white border border-white/10 hover:border-[#FF8B2C] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(255,139,44,0.25)]"
      } ${fullWidth ? "w-full" : ""}`}
    >
      {/* Top Right Corner Fold */}
      <span
        className={`absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out rounded-bl group-hover:-mr-4 group-hover:-mt-4 ${
          isNeonVariant ? "bg-white" : "bg-[#FF8B2C]"
        }`}
      >
        <span
          className={`absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 ${
            isNeonVariant ? "bg-[#FF8B2C]" : "bg-[#0b0b10]"
          }`}
        />
      </span>

      {/* Bottom Left Corner Fold */}
      <span
        className={`absolute bottom-0 left-0 inline-block w-4 h-4 rotate-180 transition-all duration-500 ease-in-out rounded-bl group-hover:-ml-4 group-hover:-mb-4 ${
          isNeonVariant ? "bg-white" : "bg-[#FF8B2C]"
        }`}
      >
        <span
          className={`absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 ${
            isNeonVariant ? "bg-[#FF8B2C]" : "bg-[#0b0b10]"
          }`}
        />
      </span>

      {/* Background Sliding Fill */}
      <span
        className={`absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out -translate-x-full rounded-[8px] group-hover:translate-x-0 ${
          isNeonVariant ? "bg-[#FFA857]" : "bg-[#FF8B2C]"
        }`}
      />

      {/* Content Label with Rolling Text on Hover */}
      <span
        className={`relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 ease-in-out tracking-wide ${
          isNeonVariant
            ? "text-black font-black"
            : "text-white group-hover:text-black font-black"
        }`}
      >
        <span className="relative inline-block overflow-hidden leading-tight h-[1.35em]">
          <span className="block transform transition-transform duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
            {children}
          </span>
          <span className="absolute top-full left-0 right-0 block transform transition-transform duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
            {children}
          </span>
        </span>
        {icon && icon}
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className={`${fullWidth ? "w-full block" : "inline-block"} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${fullWidth ? "w-full block" : "inline-block"} ${className}`}>
      {content}
    </button>
  );
}

