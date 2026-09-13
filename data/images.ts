/**
 * Central image registry.
 *
 * Every photograph on the site is referenced from here. All images are
 * currently Unsplash placeholders chosen for art direction only. They are
 * NOT Studio Portmix projects and are never presented as such in the UI.
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

  spaces: {
    residences: unsplash(
      "1600607687939-ce8a6c25118c",
      "Open-plan living room with a timber feature wall opening onto a terrace",
      "4/3",
      1800,
    ),
    apartments: unsplash(
      "1600607687644-c7171b42498f",
      "Minimal bedroom with grey textiles and a glazed door to the garden",
      "4/5",
      1600,
    ),
    secondHomes: unsplash(
      "1616627561839-074385245ff6",
      "Bedroom with plaster wall, oak bed and rust-coloured linen",
      "4/5",
      1600,
    ),
    hospitality: unsplash(
      "1560624052-449f5ddf0c31",
      "Restaurant interior with terrazzo floor and timber roof structure",
      "16/9",
      2000,
    ),
    restaurants: unsplash(
      "1517248135467-4c7edcad34c4",
      "Restaurant dining room with dark timber and warm lighting",
      "4/5",
      1600,
    ),
    hotels: unsplash(
      "1566665797739-1674de7a421a",
      "Hotel bedroom with timber slats and layered bedding",
      "3/2",
      1800,
    ),
    investment: unsplash(
      "1631679706909-1844bbd07221",
      "Bright neutral living room prepared for rental",
      "4/3",
      1600,
    ),
    professional: unsplash(
      "1497366754035-f200968a6e72",
      "Office corridor with steel-framed glass partitions",
      "4/3",
      1600,
    ),
  },

  architects: {
    // TODO: replace with real portraits of the two Studio Portmix architects
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

  heritage: unsplash(
    "1481277542470-605612bd2d61",
    "White double interior doors opening onto a pale oak floor",
    "4/5",
    1600,
  ),

  gallery: [
    unsplash("1600607688066-890987f18a86", "Bathroom with marble walls and a floating oak vanity", "4/5", 1600),
    unsplash("1549187774-b4e9b0445b41", "Cognac leather sofa in dappled afternoon light", "3/2", 1800),
    unsplash("1507652313519-d4e9174996dd", "Freestanding bath in a concrete-walled bathroom with a palm", "1/1", 1600),
    unsplash("1600566752355-35792bedcfea", "Dark bathroom with freestanding bath and slot window", "4/5", 1600),
    unsplash("1600566753151-384129cf4e3e", "Living room opening through sliding glazing onto a pool terrace", "16/9", 2000),
    unsplash("1585128792020-803d29415281", "Walnut sideboard on herringbone parquet in a bright room", "3/4", 1400),
    unsplash("1524230572899-a752b3835840", "Sequence of white plaster arches and steps", "3/2", 1800),
  ],
} as const;

export type ServiceImageKey = keyof typeof images.services;
export type SpaceImageKey = keyof typeof images.spaces;
