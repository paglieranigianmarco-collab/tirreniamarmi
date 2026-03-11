"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { IMAGES } from "@/lib/unsplash";
import { FADE_UP, STAGGER_CONTAINER } from "@/lib/animations";

export default function Hero() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  return (
    <section className="relative h-screen min-h-[600px] flex items-end">
      {/* Background Image */}
      <Image
        src={IMAGES.hero.homepage}
        alt="Carrara marble texture"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/80 via-charcoal-dark/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-site mx-auto px-6 md:px-10 pb-16 md:pb-24">
        <motion.div
          variants={STAGGER_CONTAINER}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          <motion.span
            variants={FADE_UP}
            className="block font-sans text-[10px] text-stone tracking-[0.25em] uppercase mb-6"
          >
            {t("eyebrow")}
          </motion.span>

          <motion.h1
            variants={STAGGER_CONTAINER}
            initial="hidden"
            animate="visible"
            className="font-display text-display-2xl text-cream mb-8 leading-none"
          >
            {t("headline")
              .split("\n")
              .map((line, i) => (
                <motion.span key={i} variants={FADE_UP} className="block">
                  {line}
                </motion.span>
              ))}
          </motion.h1>

          <motion.p
            variants={FADE_UP}
            className="font-sans text-sm text-stone leading-relaxed mb-10 max-w-sm"
          >
            {t("subheadline")}
          </motion.p>

          <motion.div variants={FADE_UP} className="flex items-center gap-4">
            <Link
              href={`/${locale}/materials`}
              className="inline-flex items-center font-sans text-[10px] font-medium tracking-[0.18em] uppercase px-7 py-3.5 bg-cream text-charcoal hover:bg-stone-light transition-colors duration-300"
            >
              {t("cta_primary")}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="inline-flex items-center font-sans text-[10px] font-medium tracking-[0.18em] uppercase px-7 py-3.5 border border-cream/70 text-cream hover:border-cream hover:bg-cream/10 transition-all duration-300"
            >
              {t("cta_secondary")}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 right-8 md:right-10 flex flex-col items-center gap-3"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-px h-12 bg-stone/50"
        />
      </motion.div>
    </section>
  );
}
