"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FADE_UP, STAGGER_CONTAINER } from "@/lib/animations";

export default function CTABand() {
  const t = useTranslations("home.cta_band");
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-charcoal-dark"
    >
      <div className="max-w-site mx-auto px-6 md:px-10 text-center">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center gap-6"
        >
          <motion.h2
            variants={FADE_UP}
            className="font-display text-display-xl text-cream"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={FADE_UP}
            className="font-sans text-sm text-stone leading-relaxed max-w-sm"
          >
            {t("subtitle")}
          </motion.p>
          <motion.div variants={FADE_UP}>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center font-sans text-[10px] font-medium tracking-[0.18em] uppercase px-10 py-4 bg-cream text-charcoal hover:bg-stone-light transition-colors duration-300"
            >
              {t("cta")}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
