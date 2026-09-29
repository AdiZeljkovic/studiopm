/**
 * Newsletter document model. One document can be rendered with any of the
 * three templates; each template uses the subset of fields it needs
 * (see `templateUses` in templates.ts).
 */
export type TemplateId = "classique" | "nuit" | "sable";
export type NewsletterLocale = "fr" | "en";

export const iconNames = [
  "scan-search",
  "box",
  "panels-top-left",
  "layers",
  "settings",
  "house",
  "ruler",
  "pencil-ruler",
  "drafting-compass",
  "compass",
  "lamp",
  "lightbulb",
  "sofa",
  "armchair",
  "door-open",
  "hammer",
  "palette",
  "key-round",
  "clock",
  "building-2",
  "messages-square",
] as const;
export type IconName = (typeof iconNames)[number];

export interface ServiceBlock {
  icon: IconName;
  /** Library id ("unsplash:…", "/images/…") or absolute URL. */
  image: string;
  title: string;
  text: string;
}

export interface NewsletterDoc {
  id: string;
  name: string;
  updatedAt: string;
  template: TemplateId;
  locale: NewsletterLocale;
  logoStyle: "mono" | "color";

  subject: string;
  preheader: string;

  header: {
    /** Short line(s) shown next to the logo. Use a line break for two lines. */
    tagline: string;
  };

  hero: {
    kicker: string;
    title: string;
    text: string;
    ctaLabel: string;
    ctaUrl: string;
    image: string;
  };

  services: {
    title: string;
    intro: string;
    items: ServiceBlock[];
    ctaLabel: string;
    ctaUrl: string;
  };

  feature: {
    label: string;
    title: string;
    text: string;
    ctaLabel: string;
    ctaUrl: string;
    image: string;
  };

  footer: {
    location: string;
    email: string;
    website: string;
    websiteUrl: string;
    unsubscribeLabel: string;
    /** Merge tag of the sending platform, e.g. {{ unsubscribe }} (Brevo) or *|UNSUB|* (Mailchimp). */
    unsubscribeUrl: string;
    legal: string;
  };
}

export interface RenderOptions {
  /** Absolute origin used for logos, icons and local images, e.g. https://www.studio-portmix.ch */
  assetBase: string;
}
