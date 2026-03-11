"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { FADE_UP, STAGGER_CONTAINER } from "@/lib/animations";
import { projects } from "@/lib/data/projects";

export default function LatestProjects() {
  const t = useTranslations("home.projects");
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const latest = projects.slice(0, 4);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-cream overflow-hidden">
      <div className="max-w-site mx-auto px-6 md:px-10">
        {/* Header */}
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <motion.div variants={FADE_UP}>
              <SectionLabel className="mb-4">{t("label")}</SectionLabel>
            </motion.div>
            <motion.h2
              variants={FADE_UP}
              className="font-display text-display-xl text-charcoal"
            >
              {t("title")}
            </motion.h2>
          </div>
          <motion.div variants={FADE_UP}>
            <p className="font-sans text-sm text-stone-dark mb-4 md:text-right max-w-xs">
              {t("subtitle")}
            </p>
            <Link
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 font-sans text-[10px] tracking-[0.18em] uppercase text-charcoal hover:text-stone-dark transition-colors"
            >
              {t("cta")} →
            </Link>
          </motion.div>
        </motion.div>

        {/* Horizontal scroll grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {latest.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.1,
              }}
              className="group"
            >
              <Link href={`/${locale}/projects`}>
                <div className="relative aspect-[3/4] overflow-hidden mb-3">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-expo-out group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <p className="font-display italic text-sm text-charcoal mb-0.5">
                  {locale === "it" ? project.titleIt : project.title}
                </p>
                <p className="font-sans text-[10px] tracking-[0.12em] uppercase text-stone">
                  {project.location}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
