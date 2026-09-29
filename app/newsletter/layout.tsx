import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "../globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Newsletter | Studio PortMix",
  robots: { index: false, follow: false },
};

/** Separate root layout: the editor has no website header or footer. */
export default function NewsletterLayout({ children }: LayoutProps<"/newsletter">) {
  return (
    <html lang="fr" className={`${geist.variable} h-full`}>
      <body className="h-full bg-sand text-ink">{children}</body>
    </html>
  );
}
