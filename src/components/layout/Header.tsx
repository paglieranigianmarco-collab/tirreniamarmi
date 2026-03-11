"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import LocaleSwitcher from "./LocaleSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: `/${locale}/about`, label: t("about") },
    { href: `/${locale}/materials`, label: t("materials") },
    { href: `/${locale}/projects`, label: t("projects") },
    { href: `/${locale}/contact`, label: t("contact") },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-expo-out",
          scrolled || menuOpen
            ? "bg-cream/95 backdrop-blur-sm border-b border-stone-light"
            : "bg-transparent"
        )}
      >
        <div className="max-w-site mx-auto px-6 md:px-10 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className={cn(
              "font-display font-medium tracking-[0.15em] uppercase text-sm transition-colors",
              scrolled || menuOpen ? "text-charcoal" : "text-cream"
            )}
          >
            Tirrenia Marmi
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-sans text-[10px] font-medium tracking-[0.18em] uppercase transition-colors hover:opacity-70",
                  scrolled ? "text-charcoal" : "text-cream"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-5">
            <div className="hidden md:block">
              <LocaleSwitcher light={!scrolled} />
            </div>
            <Link
              href={`/${locale}/contact`}
              className={cn(
                "hidden md:inline-flex items-center font-sans text-[10px] font-medium tracking-[0.18em] uppercase px-5 py-2.5 border transition-all duration-300",
                scrolled
                  ? "border-charcoal text-charcoal hover:bg-charcoal hover:text-cream"
                  : "border-cream/70 text-cream hover:border-cream hover:bg-cream/10"
              )}
            >
              {t("cta")}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={cn(
                "md:hidden transition-colors",
                scrolled || menuOpen ? "text-charcoal" : "text-cream"
              )}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-cream flex flex-col justify-center px-8 transition-all duration-500 ease-expo-out",
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col gap-6 mb-12">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-display-md text-charcoal hover:text-stone-dark transition-colors"
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-stone-light pt-6 flex items-center justify-between">
          <LocaleSwitcher />
          <Link
            href={`/${locale}/contact`}
            onClick={() => setMenuOpen(false)}
            className="font-sans text-[10px] tracking-[0.18em] uppercase border border-charcoal px-5 py-2.5"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </>
  );
}
