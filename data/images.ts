/**
 * Central image registry.
 *
 * Every photograph on the site is referenced from here.
 *  - Local files in /public/images/portmix are real PortMix work
 *    (interior doors and joinery, Immeuble Prilly), supplied by the client.
 *  - Unsplash images were selected by the client in the collection
 *    https://unsplash.com/collections/FA6LoMnzhog/Site-internet
 *    (except the approach image, chosen to show client and architect at work).
 *
 * To replace an image:
 *   1. Add files to /public/images/<section>/...
 *   2. Change `src` to the local path (e.g. "/images/hero/living-room.jpg")
 *   3. Keep `ratio` in sync with the new file so layouts do not shift.
 *   4. Remove the Unsplash remotePattern from next.config.ts once no
 *      remote images remain.
 */
export type ImageRatio =
  | "1/1"
  | "3/2"
  | "2/3"
  | "4/3"
  | "3/4"
  | "4/5"
  | "5/4"
  | "16/9"
  | "21/9";

export interface SiteImage {
  src: string;
  alt: string;
  /** Intrinsic aspect ratio of the source, used to reserve layout space. */
  ratio: ImageRatio;
  /** Where the placeholder comes from. Documentation only. */
  source?: "unsplash" | "local";
}

const RATIO_TO_AR: Record<ImageRatio, string> = {
  "1/1": "1:1",
  "3/2": "3:2",
  "2/3": "2:3",
  "4/3": "4:3",
  "3/4": "3:4",
  "4/5": "4:5",
  "5/4": "5:4",
  "16/9": "16:9",
  "21/9": "21:9",
};

function unsplash(id: string, alt: string, ratio: ImageRatio, width = 2400): SiteImage {
  const ar = encodeURIComponent(RATIO_TO_AR[ratio]);
  return {
    src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&crop=entropy&ar=${ar}&w=${width}&q=80`,
    alt,
    ratio,
    source: "unsplash",
  };
}

function local(src: string, alt: string, ratio: ImageRatio): SiteImage {
  return { src, alt, ratio, source: "local" };
}

export const images = {
  hero: unsplash(
    "1762545112336-646c69e4888b",
    "Living room with a wood stove, leather armchairs and large windows onto the forest",
    "16/9",
    2800,
  ),

  // TODO: replace with a real photo of the Echandens showroom.
  manifesto: unsplash(
    "1785873232027-ace4e4d3c9be",
    "Living space with a timber library wall, dining table and chairs",
    "4/5",
    1600,
  ),

  visualBreak: unsplash(
    "1682418460684-673bb7293f65",
    "Living room with a sofa, dining table and chairs in a bright apartment",
    "21/9",
    2800,
  ),

  services: {
    analysis: unsplash(
      "1781249144049-dc1f8a2f5292",
      "Living room with sofa, window and a round pendant lamp",
      "4/5",
      1600,
    ),
    architecture: unsplash(
      "1682418460590-3a0105848ea2",
      "Corridor lined with flush built-in wardrobes and a herringbone floor",
      "4/5",
      1600,
    ),
    visualization: unsplash(
      "1721630175454-0ca4517bb530",
      "Rendered living space with a plaster arch, white sofa and flowering branches",
      "4/5",
      1600,
    ),
    materials: unsplash(
      "1787676560679-c6aefbac8767",
      "Sculptural objects on dark shelving beside a marble fireplace surround",
      "4/5",
      1600,
    ),
    bespoke: unsplash(
      "1682418460503-fe7ee0513023",
      "Bespoke white wardrobe wall with an oak-lined seating niche",
      "4/5",
      1600,
    ),
    coordination: unsplash(
      "1761330439781-7919703f17ef",
      "Entrance with built-in wine storage, timber ceiling and a floating cabinet",
      "4/5",
      1600,
    ),
    implementation: unsplash(
      "1765371512707-9e0e96fd9e5b",
      "Room clad in oak panelling with integrated lighting and tall windows",
      "4/5",
      1600,
    ),
  },

  advantage: {
    // Real PortMix work: oak entrance door and frame, Immeuble Prilly.
    main: local(
      "/images/portmix/prilly-entrance-door.jpg",
      "Oak entrance door set in a concrete stairwell, with an integrated light in the frame",
      "2/3",
    ),
    detail: local(
      "/images/portmix/prilly-door-frame-detail.jpg",
      "Detail of an oak door frame with concealed lighting",
      "2/3",
    ),
  },

  architects: {
    // TODO: replace with real portraits of the Studio PortMix interior architects.
    main: unsplash(
      "1664638413509-6aa486866f9a",
      "Interior architect arranging material samples on a table",
      "4/3",
      1800,
    ),
    detail: unsplash(
      "1765371513189-44702dcee4be",
      "Oak cabinetry with lit shelves and decorative objects",
      "3/4",
      1200,
    ),
  },

  approach: unsplash(
    "1781888699751-15f2b304693c",
    "Two people exchanging fabric and material samples across a table",
    "4/5",
    1600,
  ),
} as const;

export type ServiceImageKey = keyof typeof images.services;
