"use client";

import React from "react";
import Link from "next/link";

interface RollingTextButtonProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "neon" | "ghost" | "purple";
  size?: "sm" | "md" | "lg";
}

export default function RollingTextButton({
  children,
  icon,
  iconPosition = "left",
  onClick,
  href,
  className = "",
  variant = "primary",
  size = "md",
}: RollingTextButtonProps) {
  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-xs sm:text-sm gap-2",
    lg: "px-7 py-3.5 text-sm sm:text-base gap-2.5",
  }[size];

  const variantClasses = {
    primary:
      "bg-gradient-to-b from-[#FF8B2C] to-[#E66000] text-[#060608] shadow-[0px_4px_32px_0_rgba(255,139,44,.45)] border border-[#FFA857]/40 hover:shadow-[0px_6px_36px_0_rgba(255,139,44,.65)]",
    secondary:
      "bg-white/[0.04] text-white border border-white/15 hover:border-[#FF8B2C] shadow-[0_4px_24px_rgba(0,0,0,0.6)] hover:bg-white/10",
    neon:
      "bg-[#FF8B2C] text-[#060608] shadow-[0_0_25px_rgba(255,139,44,0.6)] border border-[#FFA857]",
    ghost:
      "bg-transparent text-zinc-300 hover:text-white border border-transparent hover:border-white/10",
    purple:
      "bg-gradient-to-b from-[#8B5CF6] to-[#6D28D9] text-white shadow-[0px_4px_32px_0_rgba(139,92,246,.50)] border border-[#A78BFA]/40 hover:shadow-[0px_6px_36px_0_rgba(139,92,246,.75)]",
  }[variant];

  const textContent = typeof children === "string" ? children : children;

  const inner = (
    <span
      className={`inline-flex items-center justify-center font-black rounded-xl cursor-pointer select-none transition-all active:scale-95 group ${sizeClasses} ${variantClasses} ${className}`}
    >
      {icon && iconPosition === "right" && <span className="shrink-0">{icon}</span>}
      
      {/* Rolling Text Animation Container */}
      <span className="relative inline-block overflow-hidden leading-tight h-[1.35em]">
        {/* Top Text (Slides Up on Hover) */}
        <span className="block transform transition-transform duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
          {textContent}
        </span>
        {/* Bottom Text (Slides into Place from Bottom on Hover) */}
        <span className="absolute top-full left-0 right-0 block transform transition-transform duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
          {textContent}
        </span>
      </span>

      {icon && iconPosition === "left" && (
        <span className="shrink-0 transition-transform duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-x-1">
          {icon}
        </span>
      )}
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="inline-block">
      {inner}
    </button>
  );
}
