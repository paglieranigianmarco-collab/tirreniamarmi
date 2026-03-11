"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-sans font-medium tracking-widest uppercase text-xs transition-all duration-300 ease-expo-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-charcoal text-cream hover:bg-charcoal-light border border-charcoal",
    outline:
      "bg-transparent text-charcoal border border-charcoal hover:bg-charcoal hover:text-cream",
    ghost:
      "bg-transparent text-charcoal hover:text-stone-dark border border-transparent",
  };

  const sizes = {
    sm: "px-5 py-2.5",
    md: "px-7 py-3.5",
    lg: "px-10 py-4",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
