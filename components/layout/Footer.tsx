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

export function Footer({ content, locale }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-ivory">
      <Container className="pt-20 pb-10 lg:pt-28 lg:pb-12">
        <div aria-hidden="true" className="mb-10 h-px w-12 bg-brand" />

        <p className="text-display-xl leading-[0.9] tracking-[-0.035em]">
          <span className="block">{content.wordmark[0]}</span>
          <span className="block">{content.wordmark[1]}</span>
        </p>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12 border-t border-line-dark pt-10 lg:mt-24">
          <div className="col-span-12 lg:col-span-5">
            <p className="label text-ivory/60 normal-case tracking-[0.03em]">{content.tagline}</p>
            <p className="mt-4 max-w-xs text-body text-ivory/60">{content.region}</p>
          </div>

          <nav aria-label="Footer" className="col-span-6 lg:col-span-3 lg:col-start-7">
            <ul className="flex flex-col gap-3">
              {content.navigation.map((link) => (
                <li key={link.href}>
                  <Link href={`/${locale}${link.href}`} className="link-underline text-[0.9375rem] text-ivory/90">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="col-span-6 flex flex-col gap-3 lg:col-span-3">
            {content.secondary.map((link) => {
              if (link.href === "instagram") {
                // TODO: set siteConfig.contact.instagram to the real profile URL.
                const href = siteConfig.contact.instagram;
                return (
                  <li key={link.label}>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-[0.9375rem] text-ivory/90"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <span className="text-[0.9375rem] text-ivory/40" title="Link to be added">
                        {link.label}
                      </span>
                    )}
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <Link href={`/${locale}${link.href}`} className="link-underline text-[0.9375rem] text-ivory/90">
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-line-dark pt-6 sm:flex-row sm:items-center">
          <p className="label-sm text-ivory/50 normal-case tracking-[0.03em]">{format(content.copyright, { year })}</p>
          <a
            href="#top"
            className="group label-sm inline-flex items-center gap-3 text-ivory/70 transition-colors hover:text-ivory"
          >
            <span>{content.backToTop}</span>
            <ArrowUp
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1"
            />
          </a>
        </div>
      </Container>
    </footer>
  );
}
