import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { defaultLocale, locales } from "@/lib/i18n";

/**
 * Only indexable pages are listed: the home page in each language.
 * Privacy and legal pages are marked noindex, so they stay out.
 * Update CONTENT_UPDATED when the page content changes meaningfully.
 */
const CONTENT_UPDATED = new Date("2026-10-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}/${l}`])),
    "x-default": `${siteConfig.url}/${defaultLocale}`,
  };
  return locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: "monthly",
    priority: locale === defaultLocale ? 1 : 0.9,
    alternates: { languages },
    images: [`${siteConfig.url}${siteConfig.shareImage.path}`],
  }));
}
