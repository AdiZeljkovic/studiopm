import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { format } from "@/lib/i18n";
import type { Content, Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";

interface FooterProps {
  content: Content["footer"];
  locale: Locale;
}

const linkClass = "link-underline text-[0.875rem] text-ivory/85 transition-colors hover:text-ivory";

/** Compact footer: brand line, navigation and legal links, then a slim bottom bar. */
export function Footer({ content, locale }: FooterProps) {
  const year = new Date().getFullYear();
  // Social profile URLs live in lib/site-config.ts; empty ones render as disabled labels.
  const social: Record<string, string | null> = {
    instagram: siteConfig.contact.instagram,
    linkedin: siteConfig.contact.linkedin,
  };

  return (
    <footer className="bg-ink text-ivory">
      <Container className="pt-12 pb-8 lg:pt-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-[1.375rem] font-light leading-none tracking-[-0.02em]">
              {content.wordmark.join(" ")}
            </p>
            <p className="mt-3 text-[0.8125rem] text-ivory/55">{content.region}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {content.navigation.map((link) => (
                <li key={link.href}>
                  <Link href={`/${locale}${link.href}`} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line-dark pt-6 text-[0.75rem] text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p className="tracking-[0.02em]">{format(content.copyright, { year })}</p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {content.secondary.map((link) => (
              <li key={link.label}>
                {link.href in social ? (
                  social[link.href] ? (
                    <a href={social[link.href]!} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-ivory">
                      {link.label}
                    </a>
                  ) : (
                    <span className="text-ivory/30" title="Link to be added">
                      {link.label}
                    </span>
                  )
                ) : (
                  <Link href={`/${locale}${link.href}`} className="link-underline hover:text-ivory">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <a href="#top" className="group inline-flex items-center gap-2 hover:text-ivory">
                <span>{content.backToTop}</span>
                <ArrowUp
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-3 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5"
                />
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
