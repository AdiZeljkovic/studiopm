import type { ChoiceOption, NavLink, ProcessStep, ServiceItem } from "@/data/content/types";

/**
 * English content dictionary.
 *
 * The shape of this object defines the `Content` type (see lib/i18n.ts);
 * every other locale file must match it exactly.
 * Brand spelling: always "PortMix" with a capital M.
 */
export const en = {
  meta: {
    title: "Studio PortMix | Interior Architecture & Design",
    description:
      "Studio PortMix designs and realises bespoke interiors, from concept to completion, combining interior architecture, custom joinery and practical project expertise. Showroom in Echandens, Switzerland.",
  },

  common: {
    skipToContent: "Skip to content",
    menu: "Menu",
    close: "Close",
    openMenu: "Open navigation",
    closeMenu: "Close navigation",
    language: "Language",
  },

  navigation: {
    primary: [
      { label: "Studio", href: "#studio" },
      { label: "Expertise", href: "#expertise" },
      { label: "Approach", href: "#approach" },
      { label: "Contact", href: "#contact" },
    ] satisfies NavLink[],
    cta: { label: "Start a project", href: "#project-inquiry" } satisfies NavLink,
  },

  hero: {
    eyebrow: ["Studio PortMix", "Interior architecture"],
    headline: ["Spaces shaped", "around the way", "you live."],
    intro:
      "From the first idea to the final detail, Studio PortMix creates thoughtful interiors where architecture, materials and everyday life come together.",
    factsLabel: "The studio",
    facts: [
      "A design studio specialising in bespoke interiors and joinery",
      "600 m² showroom in Echandens, Switzerland",
      "Built on PortMix joinery expertise",
    ],
    primaryCta: { label: "Start a project", href: "#project-inquiry" },
    secondaryCta: { label: "Discover the studio", href: "#studio" },
    indicator: { number: "01", label: "Studio" },
    meta: ["Interior architecture", "Echandens, Switzerland"],
    scroll: "Scroll",
  },

  studio: {
    index: "01",
    label: "The studio",
    meta: "Echandens, Switzerland",
    statement: ["Beautiful interiors begin", "with understanding", "how you live."],
    body:
      "Studio PortMix brings together interior architecture, bespoke design and real-world construction expertise to create spaces that are coherent, functional and deeply personal.",
    team: {
      title: ["Our interior architects", "by your side."],
      text:
        "From the first conversation to the last detail, you work directly with the interior architects who design your project. We take the time to listen, to understand how you live and how the space works, and we stay with you through every decision.",
    },
    audience: {
      label: "For whom",
      text:
        "We work with private clients as well as establishments and investors who want to create or transform a space: houses, apartments, second homes, restaurants, hotels, holiday rentals, guesthouses, Airbnb, chalets and professional spaces. We adapt our support to every project.",
    },
    showroom: {
      label: "Showroom, Echandens",
      title: "Visits by appointment only.",
      text:
        "Our showroom is a place to take time: to talk through your project, see and touch materials, and make decisions calmly. Because we receive you by appointment, we are entirely available to you throughout your visit.",
      cta: { label: "Book a visit", href: "#contact" },
    },
  },

  visualBreak: {
    label: "Interior atmosphere",
  },

  expertise: {
    index: "02",
    label: "Expertise",
    meta: "From concept to completion",
    title: ["From the first sketch", "to the final detail."],
    intro:
      "One studio for the whole interior: analysis, architecture, materials, bespoke elements and the coordination needed to bring everything to completion.",
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
    label: "Design & joinery",
    meta: "Since 2017",
    title: ["Built on PortMix", "joinery expertise."],
    lede: "We don't only design interiors. We know how every element is made.",
    body:
      "Since 2017, PortMix has worked in interior joinery across French-speaking Switzerland: interior doors, wardrobes, bespoke furniture and demanding fit-outs alongside construction and real-estate professionals. That hands-on knowledge of materials, details and execution shapes every Studio PortMix design from the first sketch, and lets us coordinate craftsmen and specialists with clarity through to completion.",
    keywords: ["Design", "Material", "Craft", "Execution"],
  },

  process: {
    index: "04",
    label: "Our approach",
    meta: "Six steps",
    title: ["A clear process,", "from idea to reality."],
    intro:
      "Six steps, one continuous conversation. Each decision comes at the right moment, there are no surprises on site, and you always know what comes next.",
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
          "When required, we coordinate craftsmen, specialists and project partners, with a single point of contact for the whole project.",
        involves: "Craftsmen, specialists and project partners",
      },
      {
        number: "06",
        title: "Realize",
        description:
          "We follow the project through implementation and final detailing, making sure that what was drawn is exactly what gets built.",
        involves: "Site follow-up and final details",
      },
    ] satisfies ProcessStep[],
  },

  projectCta: {
    index: "05",
    label: "Start a project",
    meta: "A first conversation",
    title: ["Have a space", "in mind?"],
    body: "Tell us where you are today. We will take the time to understand where you want to go.",
    cta: { label: "Tell us about your project", href: "#project-inquiry" },
  },

  inquiry: {
    eyebrow: "Your project",
    stepNames: ["Contact", "Project", "Vision", "Timeline", "Documents", "Finish"],
    stepsNavLabel: "Questionnaire steps",
    nav: {
      previous: "Previous",
      next: "Continue",
      submit: "Send my project",
      sending: "Sending",
      edit: "Edit",
      optional: "Optional",
    },
    draft: {
      restored: "We restored your previous answers.",
      clear: "Start again",
    },
    errors: {
      submit: "Something went wrong while sending your request. Please try again in a moment.",
    },
    validation: {
      fullName: "Please enter your full name.",
      email: "Please enter a valid email address.",
      phone: "Please enter a phone number we can reach you on.",
      location: "Please tell us where the project is located.",
      clientType: "Please choose the option that describes you best.",
      projectTypes: "Please select at least one project type.",
      description: "A few lines are enough, but please tell us a little more.",
      consent: "Please confirm that we may contact you about your project.",
      tooLong: "This text is too long.",
      maxFiles: "You can attach up to {max} files.",
      fileTooLarge: "{name} is larger than {max}.",
      fileType: "{name} is not a supported file type.",
    },
    steps: {
      contact: {
        title: ["Let's talk about", "your project"],
        intro:
          "Are you planning a new build, renovation or interior transformation? A few details will help us understand your project before our first conversation.",
        aside:
          "We only need enough to prepare properly for a first exchange. Everything else can wait for the conversation itself.",
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
          ] satisfies ChoiceOption[],
        },
      },
      project: {
        title: ["Your project"],
        intro: "What kind of project are we looking at, and where does it take place?",
        aside:
          "Select everything that applies. Many projects combine a renovation with bespoke joinery or a change of layout.",
        projectTypes: {
          question: "What type of project are you planning?",
          options: [
            { value: "new-construction", label: "New construction" },
            { value: "renovation", label: "Renovation" },
            { value: "transformation", label: "Transformation", hint: "Reconfiguration of an existing space" },
            { value: "bespoke", label: "Bespoke interiors", hint: "Furniture & joinery" },
            { value: "other", label: "Other" },
          ] satisfies ChoiceOption[],
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
          ] satisfies ChoiceOption[],
        },
        spaces: {
          label: "Which spaces are involved?",
          hint: "Tell us which rooms or spaces are concerned and, if possible, their approximate area.",
          placeholder: "e.g. Kitchen and living room, approx. 55 m², plus a master bedroom with dressing",
        },
      },
      vision: {
        title: ["Your project", "in a few words"],
        intro:
          "There is no need for a finished brief. A first impression of what you are hoping for is all we need to start.",
        aside:
          "Think about what is not working today, what you would like to feel in the space, and anything that must stay.",
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
        aside:
          "Let us know where things stand today and, if you already have an idea, when you would like the project to be completed.",
        stage: {
          question: "Current stage",
          options: [
            { value: "exploring", label: "Just exploring" },
            { value: "property-identified", label: "Property identified" },
            { value: "planning", label: "Planning stage" },
            { value: "plans-available", label: "Plans available" },
            { value: "construction-started", label: "Construction started" },
            { value: "other", label: "Other" },
          ] satisfies ChoiceOption[],
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
          ] satisfies ChoiceOption[],
        },
        details: {
          label: "Anything else about the stage or timing of your project?",
          placeholder: "e.g. We move in next spring and would like the kitchen finished before then",
        },
      },
      documents: {
        title: ["Your", "documents"],
        intro: "You can attach any documents that may help us better understand your project.",
        aside:
          "Existing plans, dimensioned plans, photographs, videos, inspiration images, sketches or any other relevant documents.",
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
          question: "How did you hear about Studio PortMix?",
          options: [
            { value: "recommendation", label: "Recommendation" },
            { value: "search", label: "Google / search engine" },
            { value: "social", label: "Instagram / social media" },
            { value: "portmix", label: "PortMix" },
            { value: "other", label: "Other" },
          ] satisfies ChoiceOption[],
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
          label: "I agree that Studio PortMix may use the information provided to contact me regarding my project.",
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
    index: "06",
    label: "Contact",
    meta: "Showroom by appointment",
    statement: ["Every project starts", "with a conversation."],
    name: "Studio PortMix",
    discipline: "Interior architecture",
    contact: {
      email: "Email",
      phone: "Phone",
      showroom: "Showroom",
      showroomValue: "Echandens, Switzerland",
      appointment: "Visits by appointment only",
      placeholder: "To be confirmed",
    },
    cta: { label: "Start a project", href: "#project-inquiry" },
  },

  footer: {
    wordmark: ["Studio", "PortMix"],
    navigation: [
      { label: "Studio", href: "#studio" },
      { label: "Expertise", href: "#expertise" },
      { label: "Approach", href: "#approach" },
      { label: "Contact", href: "#contact" },
      { label: "Start a project", href: "#project-inquiry" },
    ] satisfies NavLink[],
    secondary: [
      { label: "Instagram", href: "instagram" },
      { label: "Privacy", href: "/privacy" },
      { label: "Legal notice", href: "/legal" },
    ] satisfies NavLink[],
    region: "Interior architecture, Echandens, Switzerland",
    copyright: "© {year} Studio PortMix. All rights reserved.",
    backToTop: "Back to top",
  },

  legalPages: {
    privacy: {
      title: "Privacy policy",
      intro: "This page will describe how Studio PortMix handles personal data submitted through this website.",
      placeholder: "Content to be provided by Studio PortMix.",
    },
    legal: {
      title: "Legal notice",
      intro: "Company information and legal details for Studio PortMix.",
      placeholder: "Content to be provided by Studio PortMix.",
    },
    back: "Back to studio",
  },

  notFound: {
    title: "This page does not exist.",
    body: "The address may have changed, or the page may have been moved.",
    cta: "Back to studio",
  },
};
