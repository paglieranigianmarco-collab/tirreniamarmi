"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FADE_UP, STAGGER_CONTAINER } from "@/lib/animations";

export default function StatsBar() {
  const t = useTranslations("home.stats");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const stats = [
    { value: t("years"), label: t("years_label") },
    { value: t("sqm"), label: t("sqm_label") },
    { value: t("families"), label: t("families_label") },
    { value: t("finishes"), label: t("finishes_label") },
  ];

  return (
    <section ref={ref} className="bg-charcoal py-14 md:py-16">
      <div className="max-w-site mx-auto px-6 md:px-10">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={FADE_UP}
              className="flex flex-col items-center text-center md:border-r md:last:border-r-0 border-charcoal-light"
            >
              <span className="font-display text-display-lg text-cream mb-2">
                {stat.value}
              </span>
              <span className="font-sans text-[10px] tracking-[0.18em] uppercase text-stone">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
