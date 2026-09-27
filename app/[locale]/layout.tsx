import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Instrument_Serif } from "next/font/google";
import "../globals.css";
import { siteConfig } from "@/lib/site-config";
import { getContent, hasLocale, localeLabels, locales } from "@/lib/i18n";
import { images } from "@/data/images";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { HashLinkHandler } from "@/components/providers/HashLinkHandler";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = getContent(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t.meta.title, template: `%s | ${siteConfig.name}` },
    description: t.meta.description,
    applicationName: siteConfig.name,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      type: "website",
      locale: localeLabels[locale].og,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeLabels[l].og),
      url: `/${locale}`,
      siteName: siteConfig.name,
      title: t.meta.title,
      description: t.meta.description,
      // TODO: replace with a dedicated 1200×630 Open Graph image once real photography exists.
      images: [{ url: images.hero.src, width: 1600, height: 900, alt: images.hero.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [images.hero.src],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f2ec",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getContent(locale);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: t.meta.description,
    url: `${siteConfig.url}/${locale}`,
    areaServed: "CH",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.showroom.locality,
      addressCountry: siteConfig.showroom.country,
    },
    parentOrganization: { "@type": "Organization", name: siteConfig.parentBrand },
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
  };

  return (
    <html lang={locale} className={`${geist.variable} ${instrumentSerif.variable} h-full`}>
      <body id="top" className="flex min-h-full flex-col">
        <MotionProvider>
          <HashLinkHandler />
          <SkipLink label={t.common.skipToContent} />
          <Header
            locale={locale}
            links={t.navigation.primary}
            cta={t.navigation.cta}
            labels={{
              openMenu: t.common.openMenu,
              closeMenu: t.common.closeMenu,
              menu: t.common.menu,
              close: t.common.close,
              language: t.common.language,
            }}
            meta={t.hero.meta}
          />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer content={t.footer} locale={locale} />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
