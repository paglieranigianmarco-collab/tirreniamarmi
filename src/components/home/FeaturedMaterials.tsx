"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { FADE_UP, STAGGER_CONTAINER, SCALE_IN } from "@/lib/animations";
import { IMAGES } from "@/lib/unsplash";

const featured = [
  {
    slug: "nero-etrusco",
    name: "Nero Etrusco",
    category: "Exclusive — Marble",
    image: IMAGES.materials.nero_etrusco,
  },
  {
    slug: "bianco-vietnamita",
    name: "Bianco Vietnamita",
    category: "Exclusive — Marble",
    image: IMAGES.materials.bianco_vietnamita,
  },
  {
    slug: "carrara-marble",
    name: "Carrara Marble",
    category: "Marble",
    image: IMAGES.materials.carrara,
  },
];

export default function FeaturedMaterials() {
  const t = useTranslations("home.featured_materials");
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-cream">
      <div className="max-w-site mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <motion.div variants={FADE_UP}>
              <SectionLabel className="mb-4">{t("label")}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={FADE_UP}
              className="font-display text-display-xl text-charcoal max-w-md"
            >
              {t("title").split("\n").map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </motion.h2>
          </div>
          <motion.div variants={FADE_UP} className="flex flex-col gap-4 md:items-end">
            <p className="font-sans text-sm text-stone-dark leading-relaxed max-w-xs md:text-right">
              {t("subtitle")}
            </p>
            <Link
              href={`/${locale}/materials`}
              className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.18em] uppercase text-charcoal hover:text-stone-dark transition-colors"
            >
              {t("cta")} →
            </Link>
          </motion.div>
        </motion.div>

        {/* Asymmetric Grid */}
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Large card left */}
          <motion.div variants={SCALE_IN}>
            <MaterialCard
              locale={locale}
              material={featured[0]}
              className="aspect-[3/4] md:aspect-auto md:h-[680px]"
            />
          </motion.div>

          {/* Two stacked on right */}
          <div className="flex flex-col gap-4">
            {featured.slice(1).map((m) => (
              <motion.div key={m.slug} variants={SCALE_IN} className="flex-1">
                <MaterialCard
                  locale={locale}
                  material={m}
                  className="aspect-landscape md:aspect-auto md:h-full"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MaterialCard({
  locale,
  material,
  className,
}: {
  locale: string;
  material: (typeof featured)[0];
  className?: string;
}) {
  const tMat = useTranslations("materials");

  return (
    <Link
      href={`/${locale}/materials/${material.slug}`}
      className={`group relative overflow-hidden block ${className}`}
    >
      <Image
        src={material.image}
        alt={material.name}
        fill
        className="object-cover transition-transform duration-700 ease-expo-out group-hover:scale-[1.05]"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/70 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
        <div>
          <span className="block font-sans text-[9px] tracking-[0.2em] uppercase text-stone mb-1">
            {material.category}
          </span>
          <span className="font-display text-xl text-cream italic">
            {material.name}
          </span>
        </div>
        <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-stone opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {tMat("view_detail")} →
        </span>
      </div>
    </Link>
  );
}
