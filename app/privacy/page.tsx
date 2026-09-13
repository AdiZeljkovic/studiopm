import type { Metadata } from "next";
import { getContent } from "@/lib/i18n";
import { LegalPage } from "@/components/layout/LegalPage";

const t = getContent();

export const metadata: Metadata = {
  title: t.legalPages.privacy.title,
  robots: { index: false, follow: true },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage {...t.legalPages.privacy} backLabel={t.legalPages.back} />;
}
