import type { Content } from "@/lib/i18n";

/**
 * Contenu français. Doit suivre exactement la structure de en.ts.
 * Orthographe de la marque : toujours « PortMix » avec un M majuscule.
 * Les espaces avant « ? », « : », « ; » et « ! » sont des espaces insécables.
 */
export const fr: Content = {
  meta: {
    title: "Studio PortMix | Architecture d’intérieur & design",
    description:
      "Studio PortMix conçoit et réalise des intérieurs sur mesure, de l’idée à la réalisation, en alliant architecture d’intérieur, menuiserie sur mesure et expertise de chantier. Showroom à Echandens, Suisse.",
  },

  common: {
    skipToContent: "Aller au contenu",
    menu: "Menu",
    close: "Fermer",
    openMenu: "Ouvrir la navigation",
    closeMenu: "Fermer la navigation",
    language: "Langue",
  },

  navigation: {
    primary: [
      { label: "Le Studio", href: "#studio" },
      { label: "Savoir-faire", href: "#expertise" },
      { label: "Approche", href: "#approach" },
      { label: "Contact", href: "#contact" },
    ],
    cta: { label: "Démarrer un projet", href: "#project-inquiry" },
  },

  hero: {
    eyebrow: ["Studio PortMix", "Architecture d’intérieur"],
    headline: ["Des espaces pensés", "autour de votre", "façon de vivre."],
    intro:
      "De la première idée au dernier détail, Studio PortMix conçoit des intérieurs réfléchis, où l’architecture, les matériaux et la vie quotidienne se rencontrent.",
    factsLabel: "Le studio",
    facts: [
      "Un studio de design spécialisé dans les intérieurs et la menuiserie sur mesure",
      "Showroom de 600 m² à Echandens, Suisse",
      "Fondé sur l’expertise PortMix en menuiserie",
    ],
    primaryCta: { label: "Démarrer un projet", href: "#project-inquiry" },
    secondaryCta: { label: "Découvrir le studio", href: "#studio" },
    indicator: { number: "01", label: "Studio" },
    meta: ["Architecture d’intérieur", "Echandens, Suisse"],
    scroll: "Défiler",
  },

  studio: {
    index: "01",
    label: "Le Studio",
    meta: "Echandens, Suisse",
    body:
      "Chez Studio PortMix, nous ne pensons pas les espaces selon des modèles préétablis. Nous les imaginons autour de votre façon de vivre, de travailler, de recevoir et de partager. Chaque projet devient ainsi une rencontre entre un lieu, des usages et une personnalité. Notre showroom nous permet de prolonger cette vision, en vous offrant un espace pour découvrir, choisir et construire avec nous les bonnes réponses à votre projet. Parce qu’un espace réussi est avant tout un espace qui vous ressemble.",
    team: {
      title: ["Nos architectes d’intérieur", "à vos côtés."],
      text:
        "De la première rencontre au dernier détail, vous échangez directement avec les architectes d’intérieur qui conçoivent votre projet. Nous prenons le temps de vous écouter, de comprendre votre façon de vivre et le fonctionnement de l’espace, et nous vous accompagnons à chaque décision.",
      services: ["Prescription", "Approvisionnement", "Installation"],
    },
    audience: {
      label: "À qui s’adresse le studio ?",
      text:
        "Nous nous adressons aussi bien aux particuliers qu’aux établissements et investisseurs souhaitant créer ou transformer un espace : maisons, appartements, résidences secondaires, restaurants, hôtels, locations saisonnières, gîtes, Airbnb, chalets ou espaces professionnels. Nous adaptons notre accompagnement à chaque projet.",
    },
    showroom: {
      label: "Showroom, Echandens",
      title: "Visite sur rendez-vous.",
      text:
        "Notre showroom est un lieu où l’on prend le temps : échanger autour de votre projet, voir et toucher les matériaux, décider sereinement. En vous recevant sur rendez-vous, nous sommes entièrement disponibles pour vous pendant toute votre visite.",
      cta: { label: "Prendre rendez-vous", href: "#contact" },
    },
  },

  visualBreak: {
    label: "Ambiance intérieure",
  },

  expertise: {
    index: "02",
    label: "Savoir-faire",
    meta: "De l’idée à la réalisation",
    title: ["De la première esquisse", "au dernier détail."],
    intro:
      "Un seul studio pour l’ensemble de l’intérieur : analyse, architecture, matériaux, éléments sur mesure et la coordination nécessaire pour tout mener à bien.",
    services: [
      {
        id: "analysis",
        number: "01",
        title: "Analyse de l’espace et des besoins",
        description: "Comprendre votre façon de vivre, de circuler et d’utiliser l’espace.",
        image: "analysis",
      },
      {
        id: "architecture",
        number: "02",
        title: "Architecture intérieure",
        description: "Volumes, circulations, agencement et relations entre les espaces.",
        image: "architecture",
      },
      {
        id: "visualization",
        number: "03",
        title: "Plans et visualisations 3D",
        description: "Traduire les idées en un concept architectural clair et une direction visuelle.",
        image: "visualization",
      },
      {
        id: "materials",
        number: "04",
        title: "Matériaux et ambiance",
        description: "Couleurs, textures, finitions, éclairage et mobilier.",
        image: "materials",
      },
      {
        id: "bespoke",
        number: "05",
        title: "Design et menuiserie sur mesure",
        description: "Mobilier et éléments intérieurs conçus pour l’espace.",
        image: "bespoke",
      },
      {
        id: "coordination",
        number: "06",
        title: "Coordination de projet",
        description: "Coordination des spécialistes, des artisans et des intervenants.",
        image: "coordination",
      },
      {
        id: "implementation",
        number: "07",
        title: "Réalisation",
        description: "Accompagnement du chantier jusqu’aux derniers détails.",
        image: "implementation",
      },
    ],
  },

  advantage: {
    index: "03",
    label: "Design & menuiserie",
    meta: "Depuis 2017",
    title: ["Fondé sur l’expertise", "PortMix en menuiserie."],
    lede: "Nous ne faisons pas uniquement du design. Nous savons comment chaque élément est conçu et réalisé.",
    body:
      "Depuis 2017, PortMix est active dans la menuiserie intérieure en Suisse romande : portes intérieures, armoires, mobilier sur mesure et aménagements exigeants, aux côtés des professionnels de la construction et de l’immobilier. Cette connaissance concrète des matériaux, des détails et de l’exécution nourrit chaque projet de Studio PortMix dès la première esquisse, et nous permet de coordonner artisans et spécialistes avec clarté jusqu’à la réalisation.",
    cta: { label: "Découvrir PortMix", href: "https://www.portmix.ch" },
  },

  process: {
    index: "04",
    label: "Notre approche",
    meta: "Six étapes",
    title: ["Un processus clair,", "de l’idée à la réalité."],
    intro:
      "Six étapes, un dialogue continu. Chaque décision arrive au bon moment, sans surprise sur le chantier, et vous savez toujours ce qui vient ensuite.",
    steps: [
      {
        number: "01",
        title: "Découvrir",
        description:
          "Nous commençons par comprendre votre espace, votre mode de vie, vos besoins et vos envies. Nous nous déplaçons sur place ; selon le projet, notamment s’il est encore en construction, le premier rendez-vous peut aussi avoir lieu dans notre showroom ou en visio.",
        involves: "Premier rendez-vous sur place, au showroom ou en visio",
      },
      {
        number: "02",
        title: "Définir",
        description:
          "Nous fixons les priorités, le périmètre, l’orientation spatiale et les exigences du projet, pour que chaque décision s’inscrive dans un cadre clair.",
        involves: "Création du cahier des charges avant étude du projet",
      },
      {
        number: "03",
        title: "Concevoir",
        description:
          "Agencement, volumes, matériaux, couleurs, éclairage et éléments sur mesure prennent forme dans un concept cohérent, affiné avec vous étape par étape.",
        involves: "Agencement, matériaux, éclairage, sur-mesure",
      },
      {
        number: "04",
        title: "Visualiser",
        description:
          "Plans et visualisations 3D permettent d’affiner le projet avant sa réalisation. Vous découvrez l’espace, ses proportions et son atmosphère avant toute construction.",
        involves: "Plans et visualisations 3D",
      },
      {
        number: "05",
        title: "Coordonner",
        description:
          "Si nécessaire, nous coordonnons artisans, spécialistes et partenaires, avec un seul interlocuteur pour l’ensemble du projet.",
        involves: "Artisans, spécialistes et partenaires",
      },
      {
        number: "06",
        title: "Réaliser",
        description:
          "Nous suivons le projet jusqu’à sa réalisation et aux finitions, en veillant à ce que ce qui a été dessiné soit exactement ce qui est construit.",
        involves: "Suivi de chantier et finitions",
      },
    ],
  },

  projectCta: {
    index: "05",
    label: "Démarrer un projet",
    meta: "Un premier échange",
    title: ["Vous avez un espace", "en tête ?"],
    body: "Dites-nous où vous en êtes aujourd’hui. Nous prendrons le temps de comprendre où vous souhaitez aller.",
  },

  inquiry: {
    eyebrow: "Votre projet",
    stepNames: ["Contact", "Projet", "Vision", "Calendrier", "Documents", "Envoi"],
    stepsNavLabel: "Étapes du questionnaire",
    nav: {
      previous: "Précédent",
      next: "Continuer",
      submit: "Envoyer mon projet",
      sending: "Envoi en cours",
      edit: "Modifier",
      optional: "Facultatif",
    },
    draft: {
      restored: "Nous avons restauré vos réponses précédentes.",
      clear: "Recommencer",
    },
    errors: {
      submit: "Une erreur est survenue lors de l’envoi de votre demande. Veuillez réessayer dans un instant.",
    },
    validation: {
      fullName: "Veuillez indiquer votre nom complet.",
      email: "Veuillez indiquer une adresse e-mail valide.",
      phone: "Veuillez indiquer un numéro de téléphone où vous joindre.",
      location: "Veuillez indiquer le lieu du projet.",
      clientType: "Veuillez choisir l’option qui vous correspond le mieux.",
      projectTypes: "Veuillez sélectionner au moins un type de projet.",
      description: "Quelques lignes suffisent, mais dites-nous-en un peu plus.",
      consent: "Veuillez confirmer que nous pouvons vous contacter au sujet de votre projet.",
      tooLong: "Ce texte est trop long.",
      maxFiles: "Vous pouvez joindre jusqu’à {max} fichiers.",
      fileTooLarge: "{name} dépasse {max}.",
      fileType: "Le format de {name} n’est pas pris en charge.",
    },
    steps: {
      contact: {
        title: ["Parlons de", "votre projet"],
        intro:
          "Vous envisagez une construction neuve, une rénovation ou une transformation intérieure ? Quelques informations nous aideront à comprendre votre projet avant notre premier échange.",
        aside:
          "Nous avons simplement besoin de quoi bien préparer un premier échange. Tout le reste peut attendre la conversation elle-même.",
        fields: {
          fullName: "Nom complet",
          email: "E-mail",
          phone: "Téléphone",
          location: "Lieu du projet",
          locationHint: "Ville ou région où se situe le projet",
        },
        clientType: {
          question: "Vous êtes",
          options: [
            { value: "private", label: "Particulier" },
            { value: "investor", label: "Investisseur", hint: "Airbnb, location saisonnière, gîte, etc." },
            { value: "business", label: "Entreprise / établissement", hint: "Hôtel, restaurant, showroom, spa, etc." },
            { value: "other", label: "Autre" },
          ],
        },
      },
      project: {
        title: ["Votre projet"],
        intro: "De quel type de projet s’agit-il, et où se situe-t-il ?",
        aside:
          "Sélectionnez tout ce qui s’applique. Beaucoup de projets combinent une rénovation avec de la menuiserie sur mesure ou un nouvel agencement.",
        projectTypes: {
          question: "Quel type de projet envisagez-vous ?",
          options: [
            { value: "new-construction", label: "Construction neuve" },
            { value: "renovation", label: "Rénovation" },
            { value: "transformation", label: "Transformation", hint: "Reconfiguration d’un espace existant" },
            { value: "bespoke", label: "Aménagement sur mesure", hint: "Mobilier et menuiserie" },
            { value: "other", label: "Autre" },
          ],
        },
        propertyType: {
          question: "Sur quel type de bien ou d’espace portez-vous le projet ?",
          options: [
            { value: "house", label: "Maison" },
            { value: "apartment", label: "Appartement" },
            { value: "second-residence", label: "Résidence secondaire" },
            { value: "establishment", label: "Établissement", hint: "Hôtel, restaurant, showroom, spa" },
            { value: "investment", label: "Bien locatif ou d’investissement" },
            { value: "other", label: "Autre" },
          ],
        },
        spaces: {
          label: "Quels espaces sont concernés ?",
          hint: "Indiquez-nous les pièces ou espaces concernés et, si possible, leur surface approximative.",
          placeholder: "p. ex. Cuisine et séjour, env. 55 m², ainsi qu’une chambre parentale avec dressing",
        },
      },
      vision: {
        title: ["Votre projet", "en quelques mots"],
        intro:
          "Nul besoin d’un cahier des charges abouti. Une première idée de ce que vous souhaitez suffit pour commencer.",
        aside:
          "Pensez à ce qui ne fonctionne pas aujourd’hui, à ce que vous aimeriez ressentir dans l’espace, et à ce qui doit être conservé.",
        description: {
          label: "Comment décririez-vous votre projet et que souhaitez-vous réaliser ?",
          hint: "Quelques lignes suffisent pour nous donner une première compréhension de votre projet.",
          placeholder: "Décrivez la situation actuelle et ce que vous aimeriez changer",
        },
        references: {
          label: "Avez-vous des références ou des inspirations à partager ?",
          hint: "Vous pourrez aussi joindre des images d’inspiration à l’étape Documents.",
          placeholder: "Liens, styles, matériaux, lieux que vous aimez",
        },
      },
      timeline: {
        title: ["Où en êtes-vous", "aujourd’hui ?"],
        intro: "Parlez-nous de l’avancement de votre projet et de votre calendrier.",
        aside:
          "Indiquez-nous où en sont les choses aujourd’hui et, si vous avez déjà une idée, quand vous souhaiteriez que le projet soit terminé.",
        stage: {
          question: "Avancement actuel",
          options: [
            { value: "exploring", label: "Simple réflexion" },
            { value: "property-identified", label: "Bien identifié" },
            { value: "planning", label: "En phase de planification" },
            { value: "plans-available", label: "Plans disponibles" },
            { value: "construction-started", label: "Travaux commencés" },
            { value: "other", label: "Autre" },
          ],
        },
        timing: {
          question: "Délai souhaité",
          options: [
            { value: "asap", label: "Dès que possible" },
            { value: "3-months", label: "D’ici 3 mois" },
            { value: "3-6-months", label: "3 à 6 mois" },
            { value: "6-12-months", label: "6 à 12 mois" },
            { value: "12-plus", label: "Plus de 12 mois" },
            { value: "not-sure", label: "Pas encore défini" },
          ],
        },
        details: {
          label: "Autre chose à nous dire sur l’avancement ou le calendrier de votre projet ?",
          placeholder: "p. ex. Nous emménageons au printemps et aimerions que la cuisine soit terminée avant",
        },
      },
      documents: {
        title: ["Vos", "documents"],
        intro: "Vous pouvez joindre tout document qui nous aiderait à mieux comprendre votre projet.",
        aside:
          "Plans existants, plans cotés, photographies, vidéos, images d’inspiration, croquis ou tout autre document utile.",
        examples: ["Plans existants", "Plans cotés", "Photographies", "Vidéos", "Images d’inspiration", "Croquis"],
        dropzone: {
          title: "Déposez vos fichiers ici ou parcourez",
          hint: "PDF, images, vidéos ou documents. Jusqu’à {maxSize} par fichier, {maxFiles} fichiers au total.",
          browse: "Parcourir",
          remove: "Retirer",
          uploading: "Préparation",
          ready: "Prêt",
          error: "Impossible de joindre",
          simulatedNotice:
            "Le stockage des fichiers n’est pas encore connecté. Les pièces jointes sont mentionnées dans votre demande mais pas transférées.",
        },
        reassurance: "Pas encore de plans ? Aucun problème. Vous pouvez tout de même nous envoyer votre demande.",
      },
      finish: {
        title: ["Un dernier", "détail"],
        intro: "Deux questions rapides, puis un aperçu de ce que vous nous envoyez.",
        aside: "Vous pouvez revenir à chaque étape pour ajuster vos réponses avant l’envoi.",
        source: {
          question: "Comment avez-vous connu Studio PortMix ?",
          options: [
            { value: "recommendation", label: "Recommandation" },
            { value: "search", label: "Google / moteur de recherche" },
            { value: "social", label: "Instagram / réseaux sociaux" },
            { value: "portmix", label: "PortMix" },
            { value: "other", label: "Autre" },
          ],
        },
        notes: {
          label: "Souhaitez-vous nous dire autre chose ?",
          placeholder: "Contraintes, questions, personnes impliquées dans la décision",
        },
        summary: {
          title: "Résumé de votre projet",
          empty: "Non renseigné",
          attachmentsOne: "1 fichier joint",
          attachmentsMany: "{count} fichiers joints",
        },
        consent: {
          label:
            "J’accepte que Studio PortMix utilise les informations fournies pour me contacter au sujet de mon projet.",
          privacyLink: "Politique de confidentialité",
        },
      },
    },
    success: {
      title: "Merci.",
      body:
        "Nous avons bien reçu votre demande. Nous allons étudier les informations transmises et reviendrons vers vous rapidement pour échanger plus en détail sur vos besoins et vos attentes.",
      cta: "Retour au studio",
    },
  },

  closing: {
    index: "06",
    label: "Contact",
    meta: "Showroom sur rendez-vous",
    statement: ["Chaque projet commence", "par une conversation."],
    name: "Studio PortMix",
    discipline: "Architecture d’intérieur",
    contact: {
      email: "E-mail",
      phone: "Téléphone",
      showroom: "Showroom",
      showroomValue: "Echandens, Suisse",
      appointment: "Visites sur rendez-vous",
      social: "Réseaux",
      placeholder: "À confirmer",
    },
    cta: { label: "Démarrer un projet", href: "#project-inquiry" },
  },

  footer: {
    wordmark: ["Studio", "PortMix"],
    navigation: [
      { label: "Le Studio", href: "#studio" },
      { label: "Savoir-faire", href: "#expertise" },
      { label: "Approche", href: "#approach" },
      { label: "Contact", href: "#contact" },
      { label: "Démarrer un projet", href: "#project-inquiry" },
    ],
    secondary: [
      { label: "Instagram", href: "instagram" },
      { label: "LinkedIn", href: "linkedin" },
      { label: "Confidentialité", href: "/privacy" },
      { label: "Mentions légales", href: "/legal" },
    ],
    region: "Architecture d’intérieur, Echandens, Suisse",
    copyright: "© {year} Studio PortMix. Tous droits réservés.",
    backToTop: "Retour en haut",
  },

  legalPages: {
    privacy: {
      title: "Politique de confidentialité",
      intro:
        "Cette page décrira la manière dont Studio PortMix traite les données personnelles transmises via ce site.",
      placeholder: "Contenu à fournir par Studio PortMix.",
    },
    legal: {
      title: "Mentions légales",
      intro: "Informations sur l’entreprise et mentions légales de Studio PortMix.",
      placeholder: "Contenu à fournir par Studio PortMix.",
    },
    back: "Retour au studio",
  },

  notFound: {
    title: "Cette page n’existe pas.",
    body: "L’adresse a peut-être changé, ou la page a été déplacée.",
    cta: "Retour au studio",
  },
};
