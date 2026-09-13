"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { DURATION, EASE_OUT, VIEWPORT } from "@/lib/motion";

type HeadingTag = "h1" | "h2" | "h3" | "p";

interface SplitLinesProps {
  lines: readonly string[];
  as?: HeadingTag;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  onMount?: boolean;
  /** Render the given lines (by index) in the italic serif face. */
  serifLines?: readonly number[];
}

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
} as const;

/**
 * Line-by-line masked headline reveal. Lines are authored explicitly so the
 * typographic breaks are art-directed rather than left to the browser.
 */
export function SplitLines({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  onMount = false,
  serifLines = [],
}: SplitLinesProps) {
  const MotionTag = motionTags[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      {...(onMount ? { animate: "visible" } : { whileInView: "visible", viewport: VIEWPORT })}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: delay, staggerChildren: stagger } },
      }}
    >
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
          <motion.span
            className={cn(
              "block will-change-transform",
              serifLines.includes(i) && "display-serif",
              lineClassName,
            )}
            variants={{
              hidden: { y: "105%", opacity: 0 },
              visible: {
                y: "0%",
                opacity: 1,
                transition: { duration: DURATION.slow, ease: EASE_OUT },
              },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
