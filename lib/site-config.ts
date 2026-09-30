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
    // TODO: replace with the real studio contact details.
    email: null as string | null,
    phone: null as string | null,
    /** Street address lines; the locality (Echandens) is shown regardless. */
    addressLines: null as string[] | null,
    // TODO: set the real profile URLs; links stay hidden until filled in.
    instagram: null as string | null,
    linkedin: null as string | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;
