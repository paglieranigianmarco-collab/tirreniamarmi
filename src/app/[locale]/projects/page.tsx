"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { FADE_UP, STAGGER_CONTAINER, SCALE_IN } from "@/lib/animations";
import { projects } from "@/lib/data/projects";
import { ProjectType } from "@/types/project";
import { IMAGES } from "@/lib/unsplash";

const TYPES: { key: "all" | ProjectType; label: string }[] = [
  { key: "all", label: "filter_all" },
  { key: "architecture", label: "type_architecture" },
  { key: "interior", label: "type_interior" },
  { key: "hospitality", label: "type_hospitality" },
  { key: "residential", label: "type_residential" },
];

export default function ProjectsPage() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const [activeType, setActiveType] = useState<"all" | ProjectType>("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  const filtered =
    activeType === "all"
      ? projects
      : projects.filter((p) => p.type === activeType);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] flex items-end">
        <Image
          src={IMAGES.hero.projects}
          alt="Stone projects"
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

          {/* Type Filter */}
          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-wrap gap-2 mb-12"
          >
            {TYPES.map((type) => (
              <motion.button
                key={type.key}
                variants={FADE_UP}
                onClick={() => setActiveType(type.key)}
                className={`font-sans text-[10px] tracking-[0.15em] uppercase px-5 py-2 border transition-all duration-300 ${
                  activeType === type.key
                    ? "bg-charcoal text-cream border-charcoal"
                    : "bg-transparent text-charcoal border-stone hover:border-charcoal"
                }`}
              >
                {type.key === "all" ? t("filter_all") : t(type.label as Parameters<typeof t>[0])}
              </motion.button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                variants={SCALE_IN}
                className="group"
              >
                <div className="relative aspect-landscape overflow-hidden mb-4">
                  <Image
                    src={project.image}
                    alt={locale === "it" ? project.titleIt : project.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-expo-out group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
                </div>
                <h3 className="font-display italic text-lg text-charcoal mb-1">
                  {locale === "it" ? project.titleIt : project.title}
                </h3>
                <div className="flex items-center gap-3 font-sans text-[10px] tracking-[0.12em] uppercase text-stone">
                  <span>{project.location}</span>
                  <span>·</span>
                  <span>{project.material}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
