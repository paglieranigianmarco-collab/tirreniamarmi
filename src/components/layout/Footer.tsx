import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Instagram, Facebook, Youtube } from "lucide-react";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-dark text-stone">
      <div className="max-w-site mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
          {/* Brand */}
          <div>
            <p className="font-display font-medium text-cream tracking-[0.15em] uppercase text-sm mb-4">
              Tirrenia Marmi
            </p>
            <p className="font-sans text-sm text-stone leading-relaxed max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-dark mb-5">
              {t("nav_label")}
            </p>
            <nav className="flex flex-col gap-3">
              {[
                { href: `/${locale}`, label: tNav("home") },
                { href: `/${locale}/about`, label: tNav("about") },
                { href: `/${locale}/materials`, label: tNav("materials") },
                { href: `/${locale}/projects`, label: tNav("projects") },
                { href: `/${locale}/contact`, label: tNav("contact") },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-sans text-sm text-stone hover:text-cream transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-stone-dark mb-5">
              {t("contact_label")}
            </p>
            <div className="flex flex-col gap-3 font-sans text-sm text-stone">
              <p className="leading-relaxed">
                Via Provinciale Vallecchia, 278
                <br />
                55045 Pietrasanta (LU), Italy
              </p>
              <a
                href="tel:+390584757088"
                className="hover:text-cream transition-colors"
              >
                +39 0584 757088
              </a>
              <a
                href="mailto:info@tirreniamarmi.com"
                className="hover:text-cream transition-colors"
              >
                info@tirreniamarmi.com
              </a>
            </div>

            {/* Social */}
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://instagram.com/tirreniamarmi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone hover:text-cream transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com/tirreniamarmi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone hover:text-cream transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://youtube.com/@tirreniamarmi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone hover:text-cream transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-charcoal-light pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-stone-dark">
            {t("copyright", { year })}
          </p>
          <p className="font-sans text-xs text-stone-dark">
            Pietrasanta, Tuscany — Italy
          </p>
        </div>
      </div>
    </footer>
  );
}
