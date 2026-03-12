import { getTranslations } from "next-intl/server";
import ConfiguratorClient from "@/components/configurator/ConfiguratorClient";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "configurator" });
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}

export default function ConfiguratorePage() {
  return <ConfiguratorClient />;
}
