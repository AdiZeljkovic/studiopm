import type { ServiceImageKey, SpaceImageKey } from "@/data/images";
import type {
  clientTypes,
  projectTypes,
  propertyTypes,
  projectStages,
  timings,
  sources,
} from "@/lib/project-inquiry/schema";

/**
 * English content dictionary.
 *
 * All user-facing copy for the site lives here so that French and German
 * versions can be added as sibling files (fr.ts, de.ts) with the same shape.
 * Keep structure identical across locales; see lib/i18n.ts.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: ServiceImageKey;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  involves: string;
}

export interface SpaceItem {
  id: string;
  number: string;
  title: string;
  descriptor: string;
  image: SpaceImageKey;
}

export interface ChoiceOption<T extends string = string> {
  value: T;
  label: string;
  hint?: string;
}

type ClientType = (typeof clientTypes)[number];
type ProjectType = (typeof projectTypes)[number];
type PropertyType = (typeof propertyTypes)[number];
type ProjectStage = (typeof projectStages)[number];
type Timing = (typeof timings)[number];
type Source = (typeof sources)[number];

export const en = {
  meta: {
    title: "Studio Portmix | Interior Architecture & Design",
    description:
      "Studio Portmix creates thoughtful, bespoke interiors from concept to realization, combining interior architecture, custom design and practical project expertise.",
  },

  common: {
    skipToContent: "Skip to content",
    startProject: "Start a project",
    designInspiration: "Design inspiration",
    referenceImagery: "Reference imagery, not a Studio Portmix project",
    scroll: "Scroll",
    menu: "Menu",
    close: "Close",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
  },

  navigation: {
    primary: [
      { label: "Studio", href: "#studio" },
      { label: "Expertise", href: "#expertise" },
      { label: "Approach", href: "#approach" },
      { label: "Projects", href: "#projects" },
      { label: "Gallery", href: "#gallery" },
    ] satisfies NavLink[],
    cta: { label: "Start a project", href: "#project-inquiry" } satisfies NavLink,
  },

  hero: {
    eyebrow: ["Studio Portmix", "Interior architecture"],
    headline: ["Spaces shaped", "around the way", "you live."],
    intro:
      "From the first idea to the final detail, Studio Portmix creates thoughtful interiors where architecture, materials and everyday life come together.",
    pillarsLabel: "What we do",
    pillars: [
      "Interior architecture & space planning",
      "Materials, lighting & bespoke joinery",
      "Project coordination & realization",
    ],
    factsLabel: "The studio",
    facts: [
      "Two interior architects",
      "Based in French-speaking Switzerland",
      "Built on Portmix joinery expertise since 2017",
    ],
    primaryCta: { label: "Discover the studio", href: "#studio" },
    secondaryCta: { label: "Start a project", href: "#project-inquiry" },
    indicator: { number: "01", label: "Studio" },
    meta: ["Interior architecture", "French-speaking Switzerland"],
    scroll: "Scroll",
  },

  studio: {
    index: "01",
    label: "The studio",
    meta: "Two interior architects",
    statement: ["Beautiful interiors begin", "with understanding", "how you live."],
    body:
      "Studio Portmix brings together interior architecture, bespoke design and real-world construction expertise to create spaces that are coherent, functional and deeply personal.",
    body2:
      "We design and realise interiors for private homes, apartments and second residences, as well as hotels, restaurants, showrooms and professional spaces. New construction, renovation, transformation, bespoke furniture and joinery, through to complete project delivery: one studio for the whole interior.",
    architects: {
      title: ["Two architects.", "One project vision."],
      paragraphs: [
        "Behind Studio Portmix are two interior architects who personally accompany every project. We value direct communication, close collaboration and a deeply individual approach.",
        "From understanding your vision to coordinating its realization, you work with people who know your project in detail. We listen carefully, take time to understand how you live and how the space works, and translate that into one coherent project we then see through to the last detail.",
      ],
      facts: [
        { label: "Studio", value: "Two interior architects" },
        { label: "Based in", value: "French-speaking Switzerland" },
        { label: "Working on", value: "Homes, hospitality & professional spaces" },
        { label: "Rooted in", value: "Portmix interior joinery, since 2017" },
      ],
    },
    captions: {
      main: "Working drawings",
      detail: "Layout studies",
    },
  },

  visualBreak: {
    caption: "Design inspiration",
    detail: "Material & spatial study",
  },

  expertise: {
    index: "02",
    label: "What we do",
    meta: "Seven services",
    title: ["From the first sketch", "to the final detail."],
    intro:
      "One studio for the whole interior: analysis, architecture, materials, bespoke elements and the coordination needed to bring everything to completion.",
    hint: "Select a service",
    services: [
      {
        id: "analysis",
        number: "01",
        title: "Space & needs analysis",
        description: "Understanding how you live, move and use the space.",
        image: "analysis",
      },
      {
        id: "architecture",
        number: "02",
        title: "Interior architecture",
        description: "Planning volumes, circulation, layout and spatial relationships.",
        image: "architecture",
      },
      {
        id: "visualization",
        number: "03",
        title: "Plans & 3D visualization",
        description: "Turning ideas into clear architectural concepts and visual direction.",
        image: "visualization",
      },
      {
        id: "materials",
        number: "04",
        title: "Materials & atmosphere",
        description: "Colours, textures, finishes, lighting and furniture.",
        image: "materials",
      },
      {
        id: "bespoke",
        number: "05",
        title: "Bespoke design & joinery",
        description: "Custom furniture and interior elements designed for the space.",
        image: "bespoke",
      },
      {
        id: "coordination",
        number: "06",
        title: "Project coordination",
        description: "Coordinating specialists, craftsmen and project stakeholders.",
        image: "coordination",
      },
      {
        id: "implementation",
        number: "07",
        title: "Implementation",
        description: "Supporting the project through execution and the final details.",
        image: "implementation",
      },
    ] satisfies ServiceItem[],
  },

  advantage: {
    index: "03",
    label: "Design & implementation",
    meta: "Built on Portmix expertise",
    title: ["Design with an understanding", "of how things are", "actually built."],
    body:
      "Our experience in interior joinery and interior fit-out gives us a practical understanding of materials, detailing and execution. Combined with a trusted network of architects, craftsmen and specialist companies, this allows us to coordinate projects with clarity from concept through completion.",
    tags: ["Design", "Material", "Craft", "Execution"],
    captions: {
      main: "Material study",
      detail: "Lighting detail",
      doors: "Interior doors & joinery",
    },
    heritage: {
      title: ["Built on", "Portmix expertise."],
      paragraphs: [
        "Studio Portmix grows from the experience Portmix has developed since 2017 in interior joinery and demanding interior projects across French-speaking Switzerland: interior doors, wardrobes, custom furniture, and close work with construction and real-estate professionals.",
        "Today, that technical knowledge supports a broader design practice, one capable of thinking about the entire interior rather than isolated elements, and of knowing, at the drawing stage, how each detail will be made.",
      ],
      timeline: [
        { label: "2017", text: "Portmix begins its activity in interior joinery: interior doors, wardrobes and custom furniture." },
        { label: "Today", text: "Studio Portmix extends this expertise into interior architecture and complete project delivery." },
      ],
    },
  },

  spaces: {
    index: "04",
    label: "Spaces we shape",
    meta: "Eight typologies",
    title: ["From private homes", "to hospitality and", "professional spaces."],
    intro:
      "Every brief has a different life inside it. We work across residential, hospitality and commercial interiors, for people who use them and for those who invest in them.",
    items: [
      { id: "residences", number: "01", title: "Private residences", descriptor: "Houses & family homes", image: "residences" },
      { id: "apartments", number: "02", title: "Apartments", descriptor: "City living, reconfigured", image: "apartments" },
      { id: "second-homes", number: "03", title: "Second homes", descriptor: "Mountain, lake & countryside", image: "secondHomes" },
      { id: "hospitality", number: "04", title: "Hospitality", descriptor: "Guest-facing interiors", image: "hospitality" },
      { id: "restaurants", number: "05", title: "Restaurants", descriptor: "Dining rooms & bars", image: "restaurants" },
      { id: "hotels", number: "06", title: "Hotels", descriptor: "Rooms, suites & common areas", image: "hotels" },
      { id: "investment", number: "07", title: "Investment properties", descriptor: "Rental & short-stay", image: "investment" },
      { id: "professional", number: "08", title: "Professional spaces", descriptor: "Showrooms, offices & spas", image: "professional" },
    ] satisfies SpaceItem[],
    disclaimer: "Images are design references and not completed Studio Portmix projects.",
  },

  process: {
    index: "05",
    label: "Our approach",
    meta: "Six steps",
    title: ["A clear process,", "from idea to reality."],
    intro:
      "Six steps, one continuous conversation. The sequence keeps decisions in the right order, avoids surprises on site and means you always know what comes next.",
    principlesLabel: "How we work",
    principles: ["Listen", "Understand", "Translate", "Accompany"],
    imageCaption: "Layout studies",
    steps: [
      {
        number: "01",
        title: "Discover",
        description:
          "We begin by understanding your space, lifestyle, needs and ambitions. A first conversation and a visit on site tell us more than any written brief.",
        involves: "First conversation, site visit, initial brief",
      },
      {
        number: "02",
        title: "Define",
        description:
          "We establish priorities, scope, spatial direction and project requirements, so that every later decision has a clear frame to sit within.",
        involves: "Scope, priorities and requirements",
      },
      {
        number: "03",
        title: "Design",
        description:
          "Layouts, volumes, materials, colours, lighting and bespoke elements are developed into a coherent concept, refined together with you step by step.",
        involves: "Layouts, materials, lighting, bespoke elements",
      },
      {
        number: "04",
        title: "Visualize",
        description:
          "Plans and 3D visualizations help refine the project before execution. You see the space, its proportions and its atmosphere before anything is built.",
        involves: "Plans and 3D visualizations",
      },
      {
        number: "05",
        title: "Coordinate",
        description:
          "When required, we coordinate craftsmen, specialists and project partners, with one point of contact for the whole project and a shared understanding of the details.",
        involves: "Craftsmen, specialists and project partners",
      },
      {
        number: "06",
        title: "Realize",
        description:
          "We follow the project through implementation and final detailing, checking that what was drawn is what gets built, until the space is ready to be lived in.",
        involves: "Site follow-up and final details",
      },
    ],
  },



  gallery: {
    index: "06",
    label: "Gallery",
    meta: "Seven references",
    title: ["Spaces.", "Materials.", "Details."],
    intro: "A selection of interiors and material references that inform the way we think about light, proportion and finish.",
    captions: [
      "Marble & oak",
      "Leather & afternoon light",
      "Concrete & water",
      "Shadow & stone",
      "Timber & glazing",
      "Walnut & herringbone",
      "Plaster & rhythm",
    ],
    disclaimer: "Reference imagery, not Studio Portmix projects.",
  },

  projectCta: {
    index: "07",
    label: "Start a project",
    meta: "A first conversation",
    title: ["Have a space", "in mind?"],
    body: "Tell us where you are today. We will take the time to understand where you want to go.",
    cta: { label: "Tell us about your project", href: "#project-inquiry" },
  },

  inquiry: {
    eyebrow: "Your project",
    stepNames: ["Contact", "Project", "Vision", "Timeline", "Documents", "Finish"],
    nav: {
      previous: "Previous",
      next: "Continue",
      submit: "Send my project",
      sending: "Sending",
      edit: "Edit",
      optional: "Optional",
      required: "Required",
    },
    draft: {
      restored: "We restored your previous answers.",
      clear: "Start again",
    },
    errors: {
      submit: "Something went wrong while sending your request. Please try again in a moment.",
    },
    steps: {
      contact: {
        title: ["Let's talk about", "your project"],
        intro:
          "Are you planning a new build, renovation or interior transformation? A few details will help us understand your project before our first conversation.",
        aside: "We only need enough to prepare properly for a first exchange. Everything else can wait for the conversation itself.",
        fields: {
          fullName: "Full name",
          email: "Email",
          phone: "Phone",
          location: "Project location",
          locationHint: "City or region where the project is located",
        },
        clientType: {
          question: "You are",
          options: [
            { value: "private", label: "Private client" },
            { value: "investor", label: "Investor", hint: "Airbnb, holiday rental, guesthouse, etc." },
            { value: "business", label: "Business / establishment", hint: "Hotel, restaurant, showroom, spa, etc." },
            { value: "other", label: "Other" },
          ] satisfies ChoiceOption<ClientType>[],
        },
      },
      project: {
        title: ["Your project"],
        intro: "What kind of project are we looking at, and where does it take place?",
        aside: "Select everything that applies. Many projects combine a renovation with bespoke joinery or a change of layout.",
        projectTypes: {
          question: "What type of project are you planning?",
          options: [
            { value: "new-construction", label: "New construction" },
            { value: "renovation", label: "Renovation" },
            { value: "transformation", label: "Transformation", hint: "Reconfiguration of an existing space" },
            { value: "bespoke", label: "Bespoke interiors", hint: "Furniture & joinery" },
            { value: "other", label: "Other" },
          ] satisfies ChoiceOption<ProjectType>[],
        },
        propertyType: {
          question: "What type of property or space are you working on?",
          options: [
            { value: "house", label: "House" },
            { value: "apartment", label: "Apartment" },
            { value: "second-residence", label: "Second residence" },
            { value: "establishment", label: "Establishment", hint: "Hotel, restaurant, showroom, spa" },
            { value: "investment", label: "Rental or investment property" },
            { value: "other", label: "Other" },
          ] satisfies ChoiceOption<PropertyType>[],
        },
        spaces: {
          label: "Which spaces are involved?",
          hint: "Tell us which rooms or spaces are concerned and, if possible, their approximate area.",
          placeholder: "e.g. Kitchen and living room, approx. 55 m², plus a master bedroom with dressing",
        },
      },
      vision: {
        title: ["Your project", "in a few words"],
        intro: "There is no need for a finished brief. A first impression of what you are hoping for is all we need to start.",
        aside: "Think about what is not working today, what you would like to feel in the space, and anything that must stay.",
        description: {
          label: "How would you describe your project and what are you hoping to achieve?",
          hint: "A few lines are enough to give us a first understanding of your project.",
          placeholder: "Describe the situation today and what you would like to change",
        },
        references: {
          label: "Do you have any references or inspiration you would like to share?",
          hint: "You can also upload inspiration images in the Documents step.",
          placeholder: "Links, styles, materials, places you love",
        },
      },
      timeline: {
        title: ["Where are you", "today?"],
        intro: "Tell us about the current stage of your project and your timeline.",
        aside: "Let us know where things stand today and, if you already have an idea, when you would like the project to be completed.",
        stage: {
          question: "Current stage",
          options: [
            { value: "exploring", label: "Just exploring" },
            { value: "property-identified", label: "Property identified" },
            { value: "planning", label: "Planning stage" },
            { value: "plans-available", label: "Plans available" },
            { value: "construction-started", label: "Construction started" },
            { value: "other", label: "Other" },
          ] satisfies ChoiceOption<ProjectStage>[],
        },
        timing: {
          question: "Desired timing",
          options: [
            { value: "asap", label: "As soon as possible" },
            { value: "3-months", label: "Within 3 months" },
            { value: "3-6-months", label: "3 to 6 months" },
            { value: "6-12-months", label: "6 to 12 months" },
            { value: "12-plus", label: "More than 12 months" },
            { value: "not-sure", label: "Not sure yet" },
          ] satisfies ChoiceOption<Timing>[],
        },
        details: {
          label: "Anything else about the stage or timing of your project?",
          placeholder: "e.g. We move in next spring and would like the kitchen finished before then",
        },
      },
      documents: {
        title: ["Your", "documents"],
        intro: "You can attach any documents that may help us better understand your project.",
        aside: "Existing plans, dimensioned plans, photographs, videos, inspiration images, sketches or any other relevant documents.",
        examples: ["Existing plans", "Dimensioned plans", "Photographs", "Videos", "Inspiration images", "Sketches"],
        dropzone: {
          title: "Drop files here or browse",
          hint: "PDF, images, video or documents. Up to {maxSize} per file, {maxFiles} files in total.",
          browse: "Browse files",
          remove: "Remove",
          uploading: "Preparing",
          ready: "Ready",
          error: "Could not attach",
          simulatedNotice:
            "File storage is not connected yet. Attachments are listed with your request but not transferred.",
        },
        reassurance: "No plans yet? No problem. You can still send us your request.",
      },
      finish: {
        title: ["One last", "detail"],
        intro: "Two short questions, then a quick look at what you are sending us.",
        aside: "You can go back to any step to adjust your answers before sending.",
        source: {
          question: "How did you hear about Studio Portmix?",
          options: [
            { value: "recommendation", label: "Recommendation" },
            { value: "search", label: "Google / search engine" },
            { value: "social", label: "Instagram / social media" },
            { value: "portmix", label: "Portmix" },
            { value: "other", label: "Other" },
          ] satisfies ChoiceOption<Source>[],
        },
        notes: {
          label: "Anything else you would like us to know?",
          placeholder: "Constraints, questions, people involved in the decision",
        },
        summary: {
          title: "Your project summary",
          empty: "Not provided",
          attachmentsOne: "1 file attached",
          attachmentsMany: "{count} files attached",
        },
        consent: {
          label: "I agree that Studio Portmix may use the information provided to contact me regarding my project.",
          privacyLink: "Privacy Policy",
        },
      },
    },
    success: {
      title: "Thank you.",
      body:
        "We have received your project request. We will review the information you have shared and get back to you shortly to discuss your needs and expectations in more detail.",
      cta: "Back to studio",
    },
  },

  closing: {
    statement: ["Every project starts", "with a conversation."],
    name: "Studio Portmix",
    discipline: "Interior architecture",
    contact: {
      email: "Email",
      phone: "Phone",
      address: "Studio",
      placeholder: "To be confirmed",
    },
  },

  footer: {
    wordmark: ["Studio", "Portmix"],
    navigation: [
      { label: "Studio", href: "#studio" },
      { label: "Expertise", href: "#expertise" },
      { label: "Approach", href: "#approach" },
      { label: "Projects", href: "#projects" },
      { label: "Start a project", href: "#project-inquiry" },
    ] satisfies NavLink[],
    secondary: [
      { label: "Instagram", href: "instagram" },
      { label: "Privacy", href: "/privacy" },
      { label: "Legal notice", href: "/legal" },
    ] satisfies NavLink[],
    tagline: "A Portmix studio",
    region: "Interior architecture, French-speaking Switzerland",
    copyright: "© {year} Studio Portmix. All rights reserved.",
    backToTop: "Back to top",
  },

  legalPages: {
    privacy: {
      title: "Privacy policy",
      intro: "This page will describe how Studio Portmix handles personal data submitted through this website.",
      placeholder: "Content to be provided by Studio Portmix.",
    },
    legal: {
      title: "Legal notice",
      intro: "Company information and legal details for Studio Portmix.",
      placeholder: "Content to be provided by Studio Portmix.",
    },
    back: "Back to studio",
  },

  notFound: {
    title: "This page does not exist.",
    body: "The address may have changed, or the page may have been moved.",
    cta: "Back to studio",
  },
} as const;
