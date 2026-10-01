/**
 * Central site configuration.
 *
 * Contact details are intentionally left empty: nothing here is invented.
 * Fill in the real values when the client provides them. Every place in the
 * UI that shows contact information reads from this object.
 * Brand spelling: always "PortMix" with a capital M.
 */
export const siteConfig = {
  name: "Studio PortMix",
  legalName: "Studio PortMix",
  parentBrand: "PortMix",
  parentUrl: "https://www.portmix.ch",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  portmixSince: 2017,
  showroom: {
    locality: "Echandens",
    country: "CH",
    size: "600 m²",
  },
  contact: {
    // Same phone and email as PortMix (confirmed by the client, 1 Oct 2026).
    email: "info@portmix.ch" as string | null,
    phone: "+41 21 611 12 14" as string | null,
    /** Street address lines; the locality (Echandens) is shown regardless. */
    addressLines: null as string[] | null,
    instagram: "https://www.instagram.com/studioportmix/" as string | null,
    linkedin: "https://www.linkedin.com/showcase/studio-portmix/about/" as string | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;
