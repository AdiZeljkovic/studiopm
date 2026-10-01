"use client";

import { m } from "framer-motion";

/** Thin vertical line with a slowly travelling highlight, plus a rotated label. */
export function HeroScrollCue({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-3" aria-hidden="true">
      <span className="label-sm rotate-180 text-ivory/70 [writing-mode:vertical-rl]">{label}</span>
      <span className="relative block h-16 w-px overflow-hidden bg-ivory/25">
        <m.span
          className="absolute inset-x-0 top-0 h-6 bg-ivory"
          initial={{ y: "-100%" }}
          animate={{ y: "400%" }}
          transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 }}
        />
      </span>
    </div>
  );
}
