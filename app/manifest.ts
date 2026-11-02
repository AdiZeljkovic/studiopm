import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { defaultLocale } from "@/lib/i18n";
import { getSadrzaj } from "@/lib/cms";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const { t } = await getSadrzaj(defaultLocale);
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: t.meta.description,
    start_url: `/${defaultLocale}`,
    display: "browser",
    background_color: "#f5f2ec",
    theme_color: "#f5f2ec",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
