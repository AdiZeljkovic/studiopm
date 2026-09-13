/**
 * Central site configuration.
 *
 * Contact details are intentionally left empty: nothing here is invented.
 * Fill in the real values when the client provides them — every place in the
 * UI that shows contact information reads from this object.
 */
export const siteConfig = {
  name: "Studio Portmix",
  legalName: "Studio Portmix",
  parentBrand: "Portmix",
  title: "Studio Portmix | Interior Architecture & Design",
  description:
    "Studio Portmix creates thoughtful, bespoke interiors from concept to realization, combining interior architecture, custom design and practical project expertise.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en",
  region: "French-speaking Switzerland",
  portmixSince: 2017,
  contact: {
    // TODO: replace with the real studio contact details.
    email: null as string | null,
    phone: null as string | null,
    addressLines: null as string[] | null,
    instagram: null as string | null,
  },
} as const;

export type SiteConfig = typeof siteConfig;
