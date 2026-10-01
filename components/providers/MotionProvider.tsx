"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global motion settings.
 * - LazyMotion + `m` components load only the DOM animation features
 *   (about a third of the full framer-motion bundle). `strict` makes any
 *   accidental `motion.*` import fail loudly in development.
 * - reducedMotion="user" disables transform animation for visitors who
 *   prefer reduced motion while keeping opacity transitions.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
