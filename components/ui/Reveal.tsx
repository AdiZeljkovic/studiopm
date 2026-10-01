"use client";

import { m, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { DURATION, EASE_OUT, VIEWPORT } from "@/lib/motion";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  /** Trigger on mount (hero) instead of on scroll into view. */
  onMount?: boolean;
}

/** Fade + short vertical translate, triggered once on scroll. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = DURATION.base,
  onMount = false,
  ...rest
}: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      {...(onMount
        ? { animate: { opacity: 1, y: 0 } }
        : { whileInView: { opacity: 1, y: 0 }, viewport: VIEWPORT })}
      transition={{ duration, delay, ease: EASE_OUT }}
      {...rest}
    >
      {children}
    </m.div>
  );
}
