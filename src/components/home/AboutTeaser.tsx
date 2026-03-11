"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { SLIDE_LEFT, SLIDE_RIGHT } from "@/lib/animations";
import { IMAGES } from "@/lib/unsplash";

export default function AboutTeaser() {
  const t = useTranslations("home.about_teaser");
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });

  return (
    <section ref={ref} className="py-20 md:py-28 bg-cream-dark">
      <div className="max-w-site mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Image */}
          <motion.div
            variants={SLIDE_LEFT}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative aspect-[4/5] overflow-hidden"
          >
            <Image
              src={IMAGES.about.teaser}
              alt="Tirrenia Marmi workshop"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          {/* Text */}
          <motion.div
            variants={SLIDE_RIGHT}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            <SectionLabel>{t("label")}</SectionLabel>

            <h2 className="font-display text-display-lg text-charcoal">
              {t("title")}
            </h2>

            <p className="font-sans text-sm text-stone-dark leading-relaxed">
              {t("body")}
            </p>

            <p className="font-display italic text-sm text-stone">
              {t("detail")}
            </p>

            <div className="pt-2">
              <Link
                href={`/${locale}/about`}
                className="inline-flex items-center font-sans text-[10px] tracking-[0.18em] uppercase border border-charcoal px-7 py-3.5 text-charcoal hover:bg-charcoal hover:text-cream transition-all duration-300"
              >
                {t("cta")}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
