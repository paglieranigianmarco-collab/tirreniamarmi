"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface LocaleSwitcherProps {
  light?: boolean;
}

export default function LocaleSwitcher({ light }: LocaleSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Replace the current locale prefix in the path
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1 font-sans text-[10px] font-medium tracking-[0.15em] uppercase",
        light ? "text-cream/70" : "text-stone-dark"
      )}
    >
      <button
        onClick={() => switchLocale("it")}
        className={cn(
          "transition-colors",
          locale === "it"
            ? light
              ? "text-cream"
              : "text-charcoal"
            : "hover:text-charcoal"
        )}
      >
        IT
      </button>
      <span className="opacity-30">/</span>
      <button
        onClick={() => switchLocale("en")}
        className={cn(
          "transition-colors",
          locale === "en"
            ? light
              ? "text-cream"
              : "text-charcoal"
            : "hover:text-charcoal"
        )}
      >
        EN
      </button>
    </div>
  );
}
