import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/lib/i18n";
import { getSadrzaj } from "@/lib/cms";
import { LegalPage } from "@/components/layout/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return {
    title: (await getSadrzaj(locale)).t.legalPages.privacy.title,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/privacy`])),
    },
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const { t } = await getSadrzaj(locale);
  return <LegalPage {...t.legalPages.privacy} backLabel={t.legalPages.back} backHref={`/${locale}`} />;
}
