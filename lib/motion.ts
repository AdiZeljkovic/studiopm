/**
 * Shared animation vocabulary. Everything on the site should feel slow,
 * precise and editorial — reuse these rather than inventing new curves.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  fast: 0.35,
  base: 0.7,
  slow: 1.0,
  image: 1.4,
} as const;

export const VIEWPORT = { once: true, margin: "-12% 0px -12% 0px" } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT },
  },
} as const;

export const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION.base, ease: EASE_OUT } },
} as const;

export const stagger = (delayChildren = 0.08, staggerChildren = 0.1) =>
  ({
    hidden: {},
    visible: { transition: { delayChildren, staggerChildren } },
  }) as const;
