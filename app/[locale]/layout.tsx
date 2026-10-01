import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Geist, Instrument_Serif } from "next/font/google";
import "../globals.css";
import { siteConfig } from "@/lib/site-config";
import { defaultLocale, getContent, hasLocale, localeLabels, locales } from "@/lib/i18n";
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
  const share = siteConfig.shareImage;
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: t.meta.title, template: `%s | ${siteConfig.name}` },
    description: t.meta.description,
    applicationName: siteConfig.name,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.parentBrand,
    formatDetection: { telephone: false, address: false, email: false },
    alternates: {
      canonical: `/${locale}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": `/${defaultLocale}` },
    },
    openGraph: {
      type: "website",
      locale: localeLabels[locale].og,
      alternateLocale: locales.filter((l) => l !== locale).map((l) => localeLabels[l].og),
      url: `/${locale}`,
      siteName: siteConfig.name,
      title: t.meta.title,
      description: t.meta.description,
      images: [{ url: share.path, width: share.width, height: share.height, alt: siteConfig.name, type: "image/jpeg" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [share.path],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
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

  const { contact, showroom } = siteConfig;
  const sameAs = [contact.instagram, contact.linkedin, siteConfig.parentUrl].filter(Boolean);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["ProfessionalService", "HomeAndConstructionBusiness"],
        "@id": `${siteConfig.url}/#studio`,
        name: siteConfig.name,
        description: t.meta.description,
        url: `${siteConfig.url}/${locale}`,
        logo: `${siteConfig.url}${siteConfig.logoPath}`,
        image: `${siteConfig.url}${siteConfig.shareImage.path}`,
        ...(contact.email ? { email: contact.email } : {}),
        ...(contact.phone ? { telephone: contact.phone } : {}),
        address: {
          "@type": "PostalAddress",
          ...(contact.addressLines?.length ? { streetAddress: contact.addressLines.join(", ") } : {}),
          postalCode: showroom.postalCode,
          addressLocality: showroom.locality,
          addressRegion: showroom.region,
          addressCountry: showroom.country,
        },
        areaServed: [
          { "@type": "AdministrativeArea", name: locale === "fr" ? "Suisse romande" : "French-speaking Switzerland" },
          { "@type": "Country", name: "CH" },
        ],
        knowsAbout: t.expertise.services.map((s) => s.title),
        sameAs,
        parentOrganization: { "@type": "Organization", name: siteConfig.parentBrand, url: siteConfig.parentUrl },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        inLanguage: locales,
        publisher: { "@id": `${siteConfig.url}/#studio` },
      },
    ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
