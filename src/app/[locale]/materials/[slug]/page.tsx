import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { materials } from "@/lib/data/materials";
import SectionLabel from "@/components/ui/SectionLabel";

export function generateStaticParams() {
  return materials.map((m) => ({ slug: m.slug }));
}

export default async function MaterialDetailPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const material = materials.find((m) => m.slug === params.slug);
  if (!material) notFound();

  const locale = await getLocale();
  const t = await getTranslations("materials");

  const name = locale === "it" ? material.nameIt : material.name;
  const description = locale === "it" ? material.descriptionIt : material.description;
  const uses = locale === "it" ? material.usesIt : material.uses;

  const related = materials
    .filter((m) => m.category === material.category && m.slug !== material.slug)
    .slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]">
        <Image
          src={material.image}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/60 via-charcoal-dark/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 max-w-site mx-auto px-6 md:px-10 pb-16">
          <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-stone mb-2">
            {material.category}
          </p>
          <h1 className="font-display text-display-xl text-cream italic">
            {name}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-site mx-auto px-6 md:px-10">
          {/* Back link */}
          <Link
            href={`/${locale}/materials`}
            className="inline-flex items-center font-sans text-[10px] tracking-[0.15em] uppercase text-stone-dark hover:text-charcoal transition-colors mb-10"
          >
            {t("back")}
          </Link>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16">
            {/* Description */}
            <div>
              <SectionLabel className="mb-6">{material.category}</SectionLabel>
              <h2 className="font-display text-display-md text-charcoal italic mb-6">
                {name}
              </h2>
              <p className="font-sans text-sm text-stone-dark leading-relaxed mb-8">
                {description}
              </p>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center font-sans text-[10px] tracking-[0.18em] uppercase px-7 py-3.5 bg-charcoal text-cream hover:bg-charcoal-light transition-colors"
              >
                {t("quote_cta")}
              </Link>
            </div>

            {/* Specs */}
            <div>
              <table className="w-full">
                <tbody>
                  <tr className="border-b border-stone-light">
                    <td className="py-4 font-sans text-[10px] tracking-[0.15em] uppercase text-stone w-1/3">
                      {t("origin_label")}
                    </td>
                    <td className="py-4 font-sans text-sm text-charcoal">
                      {material.origin}
                    </td>
                  </tr>
                  <tr className="border-b border-stone-light">
                    <td className="py-4 font-sans text-[10px] tracking-[0.15em] uppercase text-stone w-1/3">
                      {t("finishes_label")}
                    </td>
                    <td className="py-4 font-sans text-sm text-charcoal">
                      {material.finishes.join(", ")}
                    </td>
                  </tr>
                  <tr className="border-b border-stone-light">
                    <td className="py-4 font-sans text-[10px] tracking-[0.15em] uppercase text-stone w-1/3">
                      {t("uses_label")}
                    </td>
                    <td className="py-4 font-sans text-sm text-charcoal">
                      {uses.join(", ")}
                    </td>
                  </tr>
                  {material.exclusive && (
                    <tr className="border-b border-stone-light">
                      <td className="py-4 font-sans text-[10px] tracking-[0.15em] uppercase text-stone w-1/3">
                        Collection
                      </td>
                      <td className="py-4 font-sans text-sm text-gold">
                        Exclusive — Tirrenia Marmi
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Related Materials */}
          {related.length > 0 && (
            <div>
              <SectionLabel className="mb-8">{t("related_label")}</SectionLabel>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/${locale}/materials/${rel.slug}`}
                    className="group"
                  >
                    <div className="relative aspect-landscape overflow-hidden mb-3">
                      <Image
                        src={rel.image}
                        alt={locale === "it" ? rel.nameIt : rel.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-expo-out group-hover:scale-[1.05]"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                    </div>
                    <p className="font-display italic text-sm text-charcoal">
                      {locale === "it" ? rel.nameIt : rel.name}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
