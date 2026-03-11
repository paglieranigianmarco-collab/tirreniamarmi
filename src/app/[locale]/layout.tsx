import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { locales } from "@/i18n";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isIt = locale === "it";
  return {
    title: {
      default: "Tirrenia Marmi",
      template: "%s — Tirrenia Marmi",
    },
    description: isIt
      ? "Fornitore di pietra naturale pregiata dal cuore della Toscana. Marmi, quartziti, graniti, onici e travertini selezionati da tre generazioni."
      : "Premium natural stone supplier from the heart of Tuscany. Marble, quartzite, granite, onyx and travertine selected by three generations.",
    keywords: isIt
      ? ["marmo", "marmi", "Pietrasanta", "pietra naturale", "Carrara", "Toscana"]
      : ["marble", "natural stone", "Pietrasanta", "Carrara", "Tuscany", "Italy"],
    openGraph: {
      siteName: "Tirrenia Marmi",
      locale: locale === "it" ? "it_IT" : "en_US",
      type: "website",
    },
    alternates: {
      canonical: `https://www.tirreniamarmi.com/${locale}`,
      languages: {
        "it-IT": `https://www.tirreniamarmi.com/it`,
        "en-US": `https://www.tirreniamarmi.com/en`,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as "en" | "it")) notFound();

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main>{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
