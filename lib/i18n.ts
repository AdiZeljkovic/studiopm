import { en } from "@/data/content/en";

/**
 * Localization entry point.
 *
 * All user-facing copy lives in data/content/<locale>.ts. The site is
 * English-only for now; to add French or German:
 *   1. Create data/content/fr.ts (and de.ts) exporting a `Content` object.
 *   2. Register it in `dictionaries` below.
 *   3. Route by locale (e.g. app/[locale]/...) or wire a locale switcher and
 *      pass the locale into getContent().
 */
export const locales = ["en", "fr", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type Content = typeof en;

const dictionaries: Partial<Record<Locale, Content>> = {
  en,
  // fr: fr,  // TODO
  // de: de,  // TODO
};

export function getContent(locale: Locale = defaultLocale): Content {
  return dictionaries[locale] ?? en;
}

/** Tiny template helper: format("{count} files", { count: 3 }) */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in values ? String(values[key]) : `{${key}}`,
  );
}
