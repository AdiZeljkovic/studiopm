"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { localeLabels, locales, type Locale } from "@/lib/i18n";

interface LanguageSwitchProps {
  locale: Locale;
  label: string;
  className?: string;
  onNavigate?: () => void;
}

/**
 * EN / FR toggle that keeps the visitor on the equivalent page.
 *
 * Uses a plain anchor on purpose: a language change swaps the root layout
 * (html lang, every text), and Next's client navigation would then scroll to
 * the first changed segment instead of the top. A full load always opens the
 * other language at the top of the page.
 */
export function LanguageSwitch({ locale, label, className, onNavigate }: LanguageSwitchProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "");

  return (
    <nav aria-label={label} className={cn("label flex items-center gap-2", className)}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center gap-2">
          {i > 0 ? (
            <span aria-hidden="true" className="text-line-strong">
              /
            </span>
          ) : null}
          {l === locale ? (
            <span aria-current="true" className="text-brand">
              {localeLabels[l].short}
            </span>
          ) : (
            <a
              href={`/${l}${rest}`}
              hrefLang={l}
              lang={l}
              onClick={onNavigate}
              aria-label={localeLabels[l].long}
              className="text-taupe transition-colors duration-300 hover:text-ink"
            >
              {localeLabels[l].short}
            </a>
          )}
        </span>
      ))}
    </nav>
  );
}
