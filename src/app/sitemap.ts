import { MetadataRoute } from "next";
import { locales } from "@/i18n";
import { materials } from "@/lib/data/materials";

const BASE_URL = "https://www.tirreniamarmi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/materials", "/projects", "/contact"];

  const pages = locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1.0 : 0.8,
    }))
  );

  const materialPages = locales.flatMap((locale) =>
    materials.map((m) => ({
      url: `${BASE_URL}/${locale}/materials/${m.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...pages, ...materialPages];
}
