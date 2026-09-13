import type { Metadata } from "next";
import { getContent } from "@/lib/i18n";
import { LegalPage } from "@/components/layout/LegalPage";

const t = getContent();

export const metadata: Metadata = {
  title: t.legalPages.legal.title,
  robots: { index: false, follow: true },
  alternates: { canonical: "/legal" },
};

export default function LegalNoticePage() {
  return <LegalPage {...t.legalPages.legal} backLabel={t.legalPages.back} />;
}
