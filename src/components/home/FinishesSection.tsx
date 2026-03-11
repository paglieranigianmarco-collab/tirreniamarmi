"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { FADE_UP, STAGGER_CONTAINER, SCALE_IN } from "@/lib/animations";
import { IMAGES } from "@/lib/unsplash";

export default function FinishesSection() {
  const t = useTranslations("home.finishes");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const finishes = [
    {
      name: t("cannettato_name"),
      desc: t("cannettato_desc"),
      image: IMAGES.finishes.cannettato,
    },
    {
      name: t("rigato_name"),
      desc: t("rigato_desc"),
      image: IMAGES.finishes.rigato,
    },
    {
      name: t("spazzolato_name"),
      desc: t("spazzolato_desc"),
      image: IMAGES.finishes.spazzolato,
    },
  ];

  return (
    <section ref={ref} className="py-20 md:py-28 bg-charcoal">
      <div className="max-w-site mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-14"
        >
          <motion.div variants={FADE_UP} className="flex justify-center mb-4">
            <SectionLabel light>{t("label")}</SectionLabel>
          </motion.div>
          <motion.h2
            variants={FADE_UP}
            className="font-display text-display-xl text-cream mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            variants={FADE_UP}
            className="font-sans text-sm text-stone leading-relaxed max-w-md mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {finishes.map((finish) => (
            <motion.div
              key={finish.name}
              variants={SCALE_IN}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden mb-5">
                <Image
                  src={finish.image}
                  alt={finish.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-expo-out group-hover:scale-[1.05]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <h3 className="font-display text-xl text-cream italic mb-2">
                {finish.name}
              </h3>
              <p className="font-sans text-xs text-stone leading-relaxed">
                {finish.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
