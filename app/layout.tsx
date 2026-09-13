import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { getContent } from "@/lib/i18n";
import { images } from "@/data/images";
import { MotionProvider } from "@/components/providers/MotionProvider";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        // TODO: replace with a dedicated 1200×630 Open Graph image once
        // real photography or brand artwork is available.
        url: images.hero.src,
        width: 1600,
        height: 900,
        alt: images.hero.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [images.hero.src],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f2ec",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const t = getContent();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    areaServed: siteConfig.region,
    parentOrganization: { "@type": "Organization", name: siteConfig.parentBrand },
    // Address, telephone and email are added once provided in lib/site-config.ts.
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
  };

  return (
    <html lang={siteConfig.locale} className={`${geist.variable} ${instrumentSerif.variable} h-full`}>
      <body id="top" className="flex min-h-full flex-col">
        <MotionProvider>
          <SkipLink label={t.common.skipToContent} />
          <Header
            links={t.navigation.primary}
            cta={t.navigation.cta}
            labels={{
              openMenu: t.common.openMenu,
              closeMenu: t.common.closeMenu,
              menu: t.common.menu,
              close: t.common.close,
            }}
            meta={t.hero.meta}
          />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer content={t.footer} />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
