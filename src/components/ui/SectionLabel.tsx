import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}

export default function SectionLabel({ children, className, light }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-sans text-[10px] font-medium tracking-[0.2em] uppercase",
        light ? "text-stone" : "text-stone-dark",
        className
      )}
    >
      <span className={cn("block h-px w-6", light ? "bg-stone" : "bg-stone-dark")} />
      {children}
    </span>
  );
}
