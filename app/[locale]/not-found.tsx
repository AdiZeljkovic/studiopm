"use client";

import { useParams } from "next/navigation";
import { getContent, hasLocale, defaultLocale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";

export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale && hasLocale(params.locale) ? params.locale : defaultLocale;
  const t = getContent(locale);
  return (
    <Container className="flex min-h-[70vh] flex-col justify-center pt-32 pb-24">
      <p className="label text-taupe">404</p>
      <h1 className="mt-6 text-display-lg">{t.notFound.title}</h1>
      <p className="mt-6 max-w-md text-body text-taupe">{t.notFound.body}</p>
      <ArrowLink href={`/${locale}`} className="mt-10">
        {t.notFound.cta}
      </ArrowLink>
    </Container>
  );
}
