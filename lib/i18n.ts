import { en } from "@/data/content/en";
import { fr } from "@/data/content/fr";

/**
 * Localization entry point.
 *
 * All user-facing copy lives in data/content/<locale>.ts and every route
 * lives under app/[locale]. To add a language (e.g. German):
 *   1. Create data/content/de.ts exporting a `Content` object.
 *   2. Add "de" to `locales` and register it in `dictionaries`.
 *   3. Add its label to `localeLabels`.
 */
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];

/** Used when the browser expresses no usable language preference. */
export const defaultLocale: Locale = "fr";

export const localeLabels: Record<Locale, { short: string; long: string; og: string }> = {
  en: { short: "EN", long: "English", og: "en_GB" },
  fr: { short: "FR", long: "Français", og: "fr_CH" },
};

export type Content = typeof en;

const dictionaries: Record<Locale, Content> = { en, fr };

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getContent(locale: Locale = defaultLocale): Content {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

/** Tiny template helper: format("{count} files", { count: 3 }) */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in values ? String(values[key]) : `{${key}}`,
  );
}
