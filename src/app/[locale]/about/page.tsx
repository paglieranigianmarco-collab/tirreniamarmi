"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Gem, Clock, Target } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { FADE_UP, STAGGER_CONTAINER, SLIDE_LEFT, SLIDE_RIGHT } from "@/lib/animations";
import { IMAGES } from "@/lib/unsplash";

const timelineItems = [
  { yearKey: "1950s_year", titleKey: "1950s_title", descKey: "1950s_desc" },
  { yearKey: "1970s_year", titleKey: "1970s_title", descKey: "1970s_desc" },
  { yearKey: "1990s_year", titleKey: "1990s_title", descKey: "1990s_desc" },
  { yearKey: "2000s_year", titleKey: "2000s_title", descKey: "2000s_desc" },
  { yearKey: "today_year", titleKey: "today_title", descKey: "today_desc" },
];

export default function AboutPage() {
  const t = useTranslations("about");
  const introRef = useRef(null);
  const timelineRef = useRef(null);
  const facilityRef = useRef(null);
  const valuesRef = useRef(null);

  const introInView = useInView(introRef, { once: true, margin: "-80px 0px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-80px 0px" });
  const facilityInView = useInView(facilityRef, { once: true, margin: "-80px 0px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px 0px" });

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <Image
          src={IMAGES.hero.about}
          alt="Tirrenia Marmi — Our Story"
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

      {/* Intro */}
      <section ref={introRef} className="py-20 md:py-28 bg-cream">
        <div className="max-w-site mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
            <motion.div
              variants={SLIDE_LEFT}
              initial="hidden"
              animate={introInView ? "visible" : "hidden"}
            >
              <SectionLabel className="mb-6">{t("intro.label")}</SectionLabel>
              <h2 className="font-display text-display-lg text-charcoal">
                {t("intro.title")}
              </h2>
            </motion.div>
            <motion.div
              variants={SLIDE_RIGHT}
              initial="hidden"
              animate={introInView ? "visible" : "hidden"}
              className="flex flex-col gap-4"
            >
              {t("intro.body").split("\n\n").map((para, i) => (
                <p key={i} className="font-sans text-sm text-stone-dark leading-relaxed">
                  {para}
                </p>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-20 md:py-28 bg-cream-dark">
        <div className="max-w-site mx-auto px-6 md:px-10">
          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate={timelineInView ? "visible" : "hidden"}
            className="mb-12"
          >
            <motion.div variants={FADE_UP}>
              <SectionLabel className="mb-4">{t("timeline.label")}</SectionLabel>
            </motion.div>
            <motion.h2 variants={FADE_UP} className="font-display text-display-lg text-charcoal">
              {t("timeline.title")}
            </motion.h2>
          </motion.div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-stone-light hidden md:block" />

            <div className="flex flex-col gap-0">
              {timelineItems.map((item, i) => (
                <motion.div
                  key={item.yearKey}
                  initial={{ opacity: 0, y: 24 }}
                  animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-6 py-10 border-b border-stone-light md:border-0 ${
                    i % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  {/* Left side */}
                  <div className={i % 2 === 0 ? "md:pr-16" : "md:order-2 md:pl-16"}>
                    <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone mb-2 block">
                      {t(`timeline.${item.yearKey}` as Parameters<typeof t>[0])}
                    </span>
                    <h3 className="font-display text-xl text-charcoal italic mb-3">
                      {t(`timeline.${item.titleKey}` as Parameters<typeof t>[0])}
                    </h3>
                    <p className="font-sans text-sm text-stone-dark leading-relaxed">
                      {t(`timeline.${item.descKey}` as Parameters<typeof t>[0])}
                    </p>
                  </div>

                  {/* Dot */}
                  <div className="hidden md:flex absolute left-1/2 top-10 -translate-x-1/2 w-3 h-3 rounded-full bg-charcoal border-2 border-cream" />

                  {/* Right empty or fills on alternating */}
                  <div className={i % 2 !== 0 ? "md:order-1" : ""} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Facility */}
      <section ref={facilityRef} className="relative py-20 md:py-28 overflow-hidden">
        <Image
          src={IMAGES.about.facility}
          alt="Tirrenia Marmi facility"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-charcoal-dark/70" />
        <div className="relative z-10 max-w-site mx-auto px-6 md:px-10">
          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate={facilityInView ? "visible" : "hidden"}
            className="max-w-xl"
          >
            <motion.div variants={FADE_UP}>
              <SectionLabel light className="mb-6">{t("facility.label")}</SectionLabel>
            </motion.div>
            <motion.h2 variants={FADE_UP} className="font-display text-display-lg text-cream mb-6">
              {t("facility.title")}
            </motion.h2>
            <motion.p variants={FADE_UP} className="font-sans text-sm text-stone leading-relaxed mb-10">
              {t("facility.body")}
            </motion.p>
            <motion.div variants={STAGGER_CONTAINER} className="grid grid-cols-3 gap-6">
              {[
                { value: t("facility.stat1"), label: t("facility.stat1_label") },
                { value: t("facility.stat2"), label: t("facility.stat2_label") },
                { value: t("facility.stat3"), label: t("facility.stat3_label") },
              ].map((stat) => (
                <motion.div key={stat.label} variants={FADE_UP} className="text-center">
                  <span className="block font-display text-display-md text-cream mb-1">
                    {stat.value}
                  </span>
                  <span className="font-sans text-[9px] tracking-[0.15em] uppercase text-stone">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section ref={valuesRef} className="py-20 md:py-28 bg-cream">
        <div className="max-w-site mx-auto px-6 md:px-10">
          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="mb-12"
          >
            <motion.div variants={FADE_UP}>
              <SectionLabel className="mb-4">{t("values.label")}</SectionLabel>
            </motion.div>
            <motion.h2 variants={FADE_UP} className="font-display text-display-lg text-charcoal">
              {t("values.title")}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate={valuesInView ? "visible" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 border-t border-stone-light pt-10"
          >
            {[
              { icon: Gem, title: t("values.craft_title"), desc: t("values.craft_desc") },
              { icon: Clock, title: t("values.heritage_title"), desc: t("values.heritage_desc") },
              { icon: Target, title: t("values.precision_title"), desc: t("values.precision_desc") },
            ].map((value) => (
              <motion.div key={value.title} variants={FADE_UP}>
                <value.icon size={24} className="text-gold mb-4" />
                <h3 className="font-display text-xl text-charcoal italic mb-3">
                  {value.title}
                </h3>
                <p className="font-sans text-sm text-stone-dark leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
