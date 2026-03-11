"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.enum(["general", "quote", "sample"]),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { subject: "general" },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-4 py-12">
        <CheckCircle size={32} className="text-gold" />
        <h3 className="font-display text-2xl text-charcoal italic">{t("success_title")}</h3>
        <p className="font-sans text-sm text-stone-dark">{t("success_body")}</p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-stone bg-transparent px-4 py-3 font-sans text-sm text-charcoal placeholder:text-stone focus:outline-none focus:border-charcoal transition-colors";
  const labelClass = "block font-sans text-[10px] tracking-[0.15em] uppercase text-stone-dark mb-2";
  const errorClass = "font-sans text-[10px] text-red-500 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <h3 className="font-display text-2xl text-charcoal italic mb-2">{t("title")}</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{t("name")} *</label>
          <input
            {...register("name")}
            placeholder={t("name_placeholder")}
            className={inputClass}
          />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{t("company")}</label>
          <input
            {...register("company")}
            placeholder={t("company_placeholder")}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>{t("email")} *</label>
          <input
            {...register("email")}
            type="email"
            placeholder={t("email_placeholder")}
            className={inputClass}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass}>{t("phone")}</label>
          <input
            {...register("phone")}
            type="tel"
            placeholder={t("phone_placeholder")}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>{t("subject")}</label>
        <select {...register("subject")} className={inputClass}>
          <option value="general">{t("subject_general")}</option>
          <option value="quote">{t("subject_quote")}</option>
          <option value="sample">{t("subject_sample")}</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>{t("message")} *</label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder={t("message_placeholder")}
          className={inputClass}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {status === "error" && (
        <p className="font-sans text-xs text-red-500">{t("error")}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex items-center justify-center font-sans text-[10px] font-medium tracking-[0.18em] uppercase px-8 py-4 bg-charcoal text-cream hover:bg-charcoal-light transition-colors disabled:opacity-50 self-start"
      >
        {status === "loading" ? "..." : t("submit")}
      </button>
    </form>
  );
}
