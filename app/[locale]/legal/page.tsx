import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/lib/i18n";
import { getSadrzaj } from "@/lib/cms";
import { LegalPage } from "@/components/layout/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/legal">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return {
    title: (await getSadrzaj(locale)).t.legalPages.legal.title,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${locale}/legal`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/legal`])),
    },
  };
}

export default async function LegalNoticePage({ params }: PageProps<"/[locale]/legal">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const { t } = await getSadrzaj(locale);
  return <LegalPage {...t.legalPages.legal} backLabel={t.legalPages.back} backHref={`/${locale}`} />;
}
