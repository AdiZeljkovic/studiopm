import type { TemplateId } from "@/lib/newsletter/types";

/** Design tokens and field usage per template (mirrors the client mockups). */
export interface TemplateTheme {
  label: string;
  description: string;
  page: string;
  body: string;
  ink: string;
  muted: string;
  line: string;
  headerBg: string;
  headerInk: string;
  headerMuted: string;
  footerBg: string;
  footerInk: string;
  footerMuted: string;
  footerLine: string;
  logo: "ink" | "ivory";
  footerLogo: "ink" | "ivory";
  footerIcons: "ink" | "ivory";
}

export const templates: Record<TemplateId, TemplateTheme> = {
  classique: {
    label: "Classique",
    description: "Clair, photo sombre en ouverture, services détaillés avec icônes",
    page: "#ebe5dc",
    body: "#f7f3ee",
    ink: "#2a2420",
    muted: "#6f665d",
    line: "#d9d0c4",
    headerBg: "#f7f3ee",
    headerInk: "#2a2420",
    headerMuted: "#6f665d",
    footerBg: "#f7f3ee",
    footerInk: "#2a2420",
    footerMuted: "#6f665d",
    footerLine: "#d9d0c4",
    logo: "ink",
    footerLogo: "ink",
    footerIcons: "ink",
  },
  nuit: {
    label: "Nuit",
    description: "En-tête et pied sombres, trois étapes illustrées",
    page: "#ebe5dc",
    body: "#f4efe8",
    ink: "#2a2420",
    muted: "#6f665d",
    line: "#d9d0c4",
    headerBg: "#2b2420",
    headerInk: "#f4efe8",
    headerMuted: "#cfc5b8",
    footerBg: "#2b2420",
    footerInk: "#f4efe8",
    footerMuted: "#b9ae9f",
    footerLine: "#4a403a",
    logo: "ivory",
    footerLogo: "ivory",
    footerIcons: "ivory",
  },
  sable: {
    label: "Sable",
    description: "Tons sable, ouverture claire, grille d’icônes",
    page: "#ebe5dc",
    body: "#f3ede4",
    ink: "#2a2420",
    muted: "#6f665d",
    line: "#dccfbd",
    headerBg: "#f3ede4",
    headerInk: "#2a2420",
    headerMuted: "#6f665d",
    footerBg: "#f3ede4",
    footerInk: "#2a2420",
    footerMuted: "#6f665d",
    footerLine: "#dccfbd",
    logo: "ink",
    footerLogo: "ink",
    footerIcons: "ink",
  },
};

export type FieldKey =
  | "hero.kicker"
  | "hero.text"
  | "services.intro"
  | "services.itemText"
  | "services.itemIcon"
  | "services.itemImage"
  | "services.cta"
  | "feature.label"
  | "feature.text"
  | "feature.cta";

/** Which optional fields each template displays; the editor hides the others. */
export const templateUses: Record<TemplateId, ReadonlySet<FieldKey>> = {
  classique: new Set<FieldKey>([
    "hero.text",
    "services.itemText",
    "services.itemIcon",
    "feature.label",
    "feature.cta",
  ]),
  nuit: new Set<FieldKey>([
    "hero.kicker",
    "hero.text",
    "services.intro",
    "services.itemText",
    "services.itemImage",
    "services.cta",
    "feature.label",
  ]),
  sable: new Set<FieldKey>([
    "hero.kicker",
    "hero.text",
    "services.itemIcon",
    "feature.label",
    "feature.text",
    "feature.cta",
  ]),
};

/** Maximum number of service blocks rendered by each template. */
export const serviceLimit: Record<TemplateId, number> = { classique: 6, nuit: 3, sable: 6 };
