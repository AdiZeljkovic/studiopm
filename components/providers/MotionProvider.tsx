"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Global motion settings. `reducedMotion="user"` disables transform-based
 * animation for visitors who prefer reduced motion while keeping opacity
 * transitions, which is the behaviour the design intends.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
