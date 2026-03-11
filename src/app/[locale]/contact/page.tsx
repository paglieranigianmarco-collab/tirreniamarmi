import Image from "next/image";
import { useTranslations } from "next-intl";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import ContactForm from "@/components/contact/ContactForm";
import { IMAGES } from "@/lib/unsplash";

export default function ContactPage() {
  const t = useTranslations("contact");

  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end">
        <Image
          src={IMAGES.hero.contact}
          alt="Contact Tirrenia Marmi"
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
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-site mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">
            {/* Info Column */}
            <div className="md:col-span-2 flex flex-col gap-8">
              <div>
                <p className="font-display text-display-md text-charcoal italic mb-6">
                  {t("info.title")}
                </p>

                <div className="flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-stone mb-1">
                        {t("info.address_label")}
                      </p>
                      <p className="font-sans text-sm text-charcoal leading-relaxed whitespace-pre-line">
                        {t("info.address")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone size={16} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-stone mb-1">
                        {t("info.phone_label")}
                      </p>
                      <a
                        href="tel:+390584757088"
                        className="font-sans text-sm text-charcoal hover:text-stone-dark transition-colors"
                      >
                        +39 0584 757088
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail size={16} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-stone mb-1">
                        {t("info.email_label")}
                      </p>
                      <a
                        href="mailto:info@tirreniamarmi.com"
                        className="font-sans text-sm text-charcoal hover:text-stone-dark transition-colors"
                      >
                        info@tirreniamarmi.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock size={16} className="text-gold mt-0.5 shrink-0" />
                    <div>
                      <p className="font-sans text-[10px] tracking-[0.15em] uppercase text-stone mb-1">
                        {t("info.hours_label")}
                      </p>
                      <p className="font-sans text-sm text-charcoal">{t("info.hours")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="md:col-span-3">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] relative overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2850.2!2d10.2319!3d43.9689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDU4JzA4LjAiTiAxMMKwMTMnNTQuOCJF!5e0!3m2!1sen!2sit!4v1"
          width="100%"
          height="400"
          style={{ border: 0, filter: "grayscale(100%) contrast(1.1)" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Tirrenia Marmi location"
        />
      </section>
    </>
  );
}
