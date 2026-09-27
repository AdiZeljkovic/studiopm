/**
 * Central image registry.
 *
 * Every photograph on the site is referenced from here. All images are
 * currently Unsplash placeholders chosen for art direction only. They are
 * NOT Studio PortMix projects. Replace them with real photography as soon
 * as it is available.
 *
 * To replace with real photography:
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

export const images = {
  hero: unsplash(
    "1600607687920-4e2a09cf159d",
    "Dining space with a concrete wall, open staircase, oak floor and floor-to-ceiling glazing",
    "16/9",
    2800,
  ),

  manifesto: unsplash(
    "1501045661006-fcebe0257c3f",
    "Leather and steel armchair against a plaster wall, lit by a side window",
    "4/5",
    1600,
  ),

  visualBreak: unsplash(
    "1600585154084-4e5fe7c39198",
    "Living room with a timber-clad wall, stone fireplace and glazing onto a deck",
    "21/9",
    2800,
  ),

  services: {
    analysis: unsplash(
      "1605774337664-7a846e9cdf17",
      "Calm living room with a low sofa, oak table and neutral textiles",
      "4/5",
      1600,
    ),
    architecture: unsplash(
      "1618219908412-a29a1bb7b86e",
      "Interior with timber-clad ceiling and herringbone parquet",
      "4/5",
      1600,
    ),
    visualization: unsplash(
      "1616628188859-7a11abb6fcc9",
      "Hand sketching layouts on paper cards",
      "4/5",
      1600,
    ),
    materials: unsplash(
      "1616627561950-9f746e330187",
      "Lime plaster wall with oak bed frame and striped linen",
      "4/5",
      1600,
    ),
    bespoke: unsplash(
      "1622372738946-62e02505feb3",
      "Dark bespoke kitchen joinery with oak fronts and a glass cabinet",
      "4/5",
      1600,
    ),
    coordination: unsplash(
      "1502005229762-cf1b2da7c5d6",
      "Open staircase with timber treads in a double-height interior",
      "4/5",
      1600,
    ),
    implementation: unsplash(
      "1600585152220-90363fe7e115",
      "Kitchen with oak cabinetry, white island and pendant lighting",
      "4/5",
      1600,
    ),
  },

  advantage: {
    main: unsplash(
      "1533044309907-0fa3413da946",
      "Close-up of a dry-stone interior wall beside glazing and a woven chair",
      "3/4",
      1800,
    ),
    detail: unsplash(
      "1540932239986-30128078f3c5",
      "Cluster of brass pendant lights against a grey wall",
      "3/4",
      1200,
    ),
  },

  architects: {
    // TODO: replace with real portraits of the two Studio PortMix architects
    // when supplied. Until then we only show working situations, never faces.
    main: unsplash(
      "1503387762-592deb58ef4e",
      "Hands drawing on architectural plans with a scale ruler",
      "4/3",
      1800,
    ),
    detail: unsplash(
      "1616628188502-413f2fe46e5e",
      "Hands arranging blank paper cards on a dark table",
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
