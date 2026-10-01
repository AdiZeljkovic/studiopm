import type { NewsletterDoc, NewsletterLocale, TemplateId } from "@/lib/newsletter/types";

/**
 * Starting content for a new newsletter, based on the client mockups.
 * Contact lines (email, website) come from those mockups: confirm them
 * with the client before the first send.
 */
const SITE = "https://www.studio-portmix.ch";

function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `nl_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

const heroCopy: Record<TemplateId, Record<NewsletterLocale, { kicker: string; title: string; text: string }>> = {
  classique: {
    fr: {
      kicker: "",
      title: "Des espaces\nqui vous\nressemblent",
      text: "Architecture intérieure.\nMenuiserie sur mesure.\nDe l’idée à la réalisation.",
    },
    en: {
      kicker: "",
      title: "Spaces that\nreflect\nwho you are",
      text: "Interior architecture.\nBespoke joinery.\nFrom idea to completion.",
    },
  },
  nuit: {
    fr: {
      kicker: "Concevoir · Aménager · Réaliser",
      title: "Des intérieurs\nqui font sens",
      text: "Des espaces fonctionnels et esthétiques, créés sur mesure pour votre quotidien.",
    },
    en: {
      kicker: "Design · Fit out · Realise",
      title: "Interiors\nthat make sense",
      text: "Functional, beautiful spaces, made to measure for everyday life.",
    },
  },
  sable: {
    fr: {
      kicker: "Espaces · Matériaux · Sur mesure",
      title: "L’architecture\nau service\nde votre quotidien",
      text: "Des intérieurs fonctionnels, élégants et durables, conçus selon vos besoins.",
    },
    en: {
      kicker: "Spaces · Materials · Bespoke",
      title: "Architecture\nat the service\nof everyday life",
      text: "Functional, elegant and lasting interiors, designed around your needs.",
    },
  },
};

const heroImage: Record<TemplateId, string> = {
  classique: "unsplash:1785535694900-b8199f0494be",
  nuit: "unsplash:1760072513357-9d450e935a80",
  sable: "unsplash:1762545112336-646c69e4888b",
};

const featureCopy: Record<TemplateId, Record<NewsletterLocale, { label: string; title: string; text: string; ctaLabel: string }>> = {
  classique: {
    fr: { label: "Projets réalisés", title: "Des intérieurs uniques,\npensés pour durer.", text: "", ctaLabel: "Voir nos projets" },
    en: { label: "Completed projects", title: "Unique interiors,\ndesigned to last.", text: "", ctaLabel: "See our projects" },
  },
  nuit: {
    fr: { label: "Studio PortMix", title: "Transformer vos idées\nen espaces de vie uniques.", text: "", ctaLabel: "" },
    en: { label: "Studio PortMix", title: "Turning your ideas\ninto unique living spaces.", text: "", ctaLabel: "" },
  },
  sable: {
    fr: {
      label: "Studio PortMix",
      title: "Des projets\nqui prennent vie",
      text: "Chaque espace est conçu pour refléter votre style de vie et répondre à vos besoins.",
      ctaLabel: "Voir nos projets",
    },
    en: {
      label: "Studio PortMix",
      title: "Projects\nthat come to life",
      text: "Every space is designed to reflect your way of life and answer your needs.",
      ctaLabel: "See our projects",
    },
  },
};

const featureImage: Record<TemplateId, string> = {
  classique: "unsplash:1758565811352-a439bd6f956e",
  nuit: "/images/portmix/prilly-entrance-door.jpg",
  sable: "unsplash:1760072513357-9d450e935a80",
};

const services = {
  fr: [
    { icon: "scan-search", image: "unsplash:1664638413509-6aa486866f9a", title: "Analyse de vos espaces et de vos besoins", text: "Une première rencontre pour comprendre votre projet et vos attentes." },
    { icon: "box", image: "unsplash:1682418460590-3a0105848ea2", title: "Plans et visualisations 3D", text: "Des concepts clairs et réalistes pour vous projeter sereinement." },
    { icon: "panels-top-left", image: "/images/portmix/prilly-door-frame-detail.jpg", title: "Aménagements et menuiseries sur mesure", text: "Des solutions uniques pensées pour votre espace." },
    { icon: "layers", image: "unsplash:1787676560679-c6aefbac8767", title: "Couleurs, matériaux, luminaires et mobilier", text: "Une sélection harmonieuse adaptée à votre style de vie." },
    { icon: "settings", image: "unsplash:1761330439781-7919703f17ef", title: "Coordination et suivi des différentes étapes", text: "Un accompagnement rigoureux de la conception à la réalisation." },
    { icon: "house", image: "unsplash:1765371512707-9e0e96fd9e5b", title: "Accompagnement jusqu’à la réalisation finale", text: "Un projet mené à vos côtés jusqu’à la remise des clés." },
  ],
  en: [
    { icon: "scan-search", image: "unsplash:1664638413509-6aa486866f9a", title: "Analysis of your spaces and needs", text: "A first meeting to understand your project and expectations." },
    { icon: "box", image: "unsplash:1682418460590-3a0105848ea2", title: "Plans and 3D visualisations", text: "Clear, realistic concepts so you can picture the result with confidence." },
    { icon: "panels-top-left", image: "/images/portmix/prilly-door-frame-detail.jpg", title: "Bespoke fit-outs and joinery", text: "Unique solutions designed for your space." },
    { icon: "layers", image: "unsplash:1787676560679-c6aefbac8767", title: "Colours, materials, lighting and furniture", text: "A harmonious selection suited to the way you live." },
    { icon: "settings", image: "unsplash:1761330439781-7919703f17ef", title: "Coordination and follow-up of every stage", text: "Careful support from design through to completion." },
    { icon: "house", image: "unsplash:1765371512707-9e0e96fd9e5b", title: "Support through to final delivery", text: "A project led by your side until the keys are handed over." },
  ],
} as const;

const shortServiceTitles = {
  fr: ["Analyse\nde vos espaces", "Plans et\nvisualisations 3D", "Aménagements\nsur mesure", "Couleurs,\nmatériaux et mobilier", "Coordination\net suivi des étapes", "Réalisation finale"],
  en: ["Analysis\nof your spaces", "Plans and\n3D visualisations", "Bespoke\nfit-outs", "Colours,\nmaterials and furniture", "Coordination\nand follow-up", "Final delivery"],
};

export function createNewsletter(template: TemplateId, locale: NewsletterLocale): NewsletterDoc {
  const fr = locale === "fr";
  const hero = heroCopy[template][locale];
  const feature = featureCopy[template][locale];
  const items = services[locale].map((s, i) => ({
    ...s,
    title: template === "sable" ? shortServiceTitles[locale][i] : s.title,
  }));

  return {
    id: newId(),
    name: fr ? `Newsletter ${templateLabel(template)}` : `${templateLabel(template)} newsletter`,
    updatedAt: new Date().toISOString(),
    template,
    locale,
    logoStyle: "mono",
    subject: fr ? "Des intérieurs pensés pour vous – Studio PortMix" : "Interiors designed around you – Studio PortMix",
    preheader: fr
      ? "Architecture intérieure et menuiserie sur mesure, de l’idée à la réalisation."
      : "Interior architecture and bespoke joinery, from idea to completion.",
    header: {
      tagline: fr ? "Architecture intérieure\n& menuiserie sur mesure" : "Interior architecture\n& bespoke joinery",
    },
    hero: {
      ...hero,
      ctaLabel: fr ? "Découvrir notre approche" : "Discover our approach",
      ctaUrl: `${SITE}/${locale}#approach`,
      image: heroImage[template],
    },
    services: {
      title: fr ? "Notre accompagnement" : "How we support you",
      intro: fr
        ? "De la conception à la réalisation, un accompagnement complet et sur mesure."
        : "From design to completion, complete and tailored support.",
      items: items.map((s) => ({ ...s })) as NewsletterDoc["services"]["items"],
      ctaLabel: fr ? "Découvrir tous nos services" : "Discover all our services",
      ctaUrl: `${SITE}/${locale}#expertise`,
    },
    feature: {
      ...feature,
      ctaUrl: `${SITE}/${locale}#project-inquiry`,
      image: featureImage[template],
    },
    footer: {
      location: fr ? "Showroom à Echandens, Suisse" : "Showroom in Echandens, Switzerland",
      email: "info@portmix.ch",
      website: "www.studio-portmix.ch",
      websiteUrl: SITE,
      unsubscribeLabel: fr ? "Se désinscrire" : "Unsubscribe",
      unsubscribeUrl: "{{ unsubscribe }}",
      legal: fr
        ? "Vous recevez cet e-mail car vous êtes en contact avec Studio PortMix."
        : "You are receiving this email because you are in touch with Studio PortMix.",
    },
  };
}

export function templateLabel(template: TemplateId) {
  return { classique: "Classique", nuit: "Nuit", sable: "Sable" }[template];
}
