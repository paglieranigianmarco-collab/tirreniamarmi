"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { FADE_UP, STAGGER_CONTAINER, SCALE_IN } from "@/lib/animations";
import { materials } from "@/lib/data/materials";
import { MaterialCategory } from "@/types/material";
import { IMAGES } from "@/lib/unsplash";

const CATEGORIES: { key: "all" | MaterialCategory; labelKey: string }[] = [
  { key: "all", labelKey: "filter_all" },
  { key: "marble", labelKey: "Marble" },
  { key: "quartzite", labelKey: "Quartzite" },
  { key: "granite", labelKey: "Granite" },
  { key: "onyx", labelKey: "Onyx" },
  { key: "travertine", labelKey: "Travertine" },
];

export default function MaterialsPage() {
  const t = useTranslations("materials");
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<"all" | MaterialCategory>("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const filtered =
    activeCategory === "all"
      ? materials
      : materials.filter((m) => m.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end">
        <Image
          src={IMAGES.hero.materials}
          alt="Natural stone materials"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/70 via-charcoal-dark/20 to-transparent" />
        <div className="relative z-10 max-w-site mx-auto px-6 md:px-10 pb-16 w-full">
          <SectionLabel light className="mb-4">{t("hero.label")}</SectionLabel>
          <h1 className="font-display text-display-xl text-cream">
            {t("hero.title").split("\n").map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section ref={ref} className="py-16 md:py-20 bg-cream">
        <div className="max-w-site mx-auto px-6 md:px-10">
          {/* Intro */}
          <motion.p
            variants={FADE_UP}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-sans text-sm text-stone-dark mb-10 max-w-xl"
          >
            {t("intro")}
          </motion.p>

          {/* Category Filter */}
          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-wrap gap-2 mb-12"
          >
            {CATEGORIES.map((cat) => (
              <motion.button
                key={cat.key}
                variants={FADE_UP}
                onClick={() => setActiveCategory(cat.key)}
                className={`font-sans text-[10px] tracking-[0.15em] uppercase px-5 py-2 border transition-all duration-300 ${
                  activeCategory === cat.key
                    ? "bg-charcoal text-cream border-charcoal"
                    : "bg-transparent text-charcoal border-stone hover:border-charcoal"
                }`}
              >
                {cat.key === "all" ? t("filter_all") : cat.labelKey}
              </motion.button>
            ))}
          </motion.div>

          {/* Materials Grid */}
          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((material) => (
              <motion.div key={material.slug} variants={SCALE_IN}>
                <Link
                  href={`/${locale}/materials/${material.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-portrait overflow-hidden mb-4">
                    <Image
                      src={material.image}
                      alt={material.name}
                      fill
                      className="object-cover transition-transform duration-700 ease-expo-out group-hover:scale-[1.05]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {material.exclusive && (
                      <div className="absolute top-3 right-3">
                        <span className="font-sans text-[9px] tracking-[0.15em] uppercase px-2 py-1 bg-cream/90 text-charcoal">
                          Exclusive
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-sans text-[9px] tracking-[0.18em] uppercase text-stone mb-1">
                        {material.category}
                      </p>
                      <h3 className="font-display italic text-lg text-charcoal">
                        {locale === "it" ? material.nameIt : material.name}
                      </h3>
                    </div>
                    <span className="font-sans text-[10px] tracking-[0.12em] uppercase text-stone opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("view_detail")} →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
