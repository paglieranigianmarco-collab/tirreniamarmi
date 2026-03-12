"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

interface ConfiguratorGateProps {
  onAccess: (name: string, email: string) => void;
}

export default function ConfiguratorGate({ onAccess }: ConfiguratorGateProps) {
  const t = useTranslations("configurator");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      onAccess(name.trim(), email.trim());
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/95 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-cream p-10 md:p-12">
        {/* Logo */}
        <p className="font-display font-medium tracking-[0.15em] uppercase text-xs text-gold mb-6 text-center">
          Tirrenia Marmi
        </p>

        {/* Eyebrow */}
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold mb-3 text-center">
          {t("gate_eyebrow")}
        </p>

        {/* Heading */}
        <h2 className="font-display text-4xl md:text-5xl text-charcoal leading-tight text-center mb-4 whitespace-pre-line">
          {t("gate_title")}
        </h2>

        {/* Subtitle */}
        <p className="font-sans text-sm text-stone leading-relaxed text-center mb-8">
          {t("gate_subtitle")}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[10px] tracking-[0.18em] uppercase text-charcoal">
              {t("gate_name")}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("gate_name_placeholder")}
              className="border border-stone bg-white px-3 py-2.5 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal placeholder:text-stone/60"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-[10px] tracking-[0.18em] uppercase text-charcoal">
              {t("gate_email")}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("gate_email_placeholder")}
              className="border border-stone bg-white px-3 py-2.5 font-sans text-sm text-charcoal focus:outline-none focus:border-charcoal placeholder:text-stone/60"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-charcoal text-cream font-sans text-[10px] tracking-[0.18em] uppercase px-8 py-4 mt-2 hover:bg-charcoal/90 transition-colors"
          >
            {t("gate_cta")}
          </button>
        </form>

        {/* Disclaimer */}
        <p className="font-sans text-[10px] text-stone text-center mt-4 leading-relaxed">
          {t("gate_note")}
        </p>
      </div>
    </div>
  );
}
