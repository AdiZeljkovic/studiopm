"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DURATION, EASE_OUT, VIEWPORT } from "@/lib/motion";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left";
  onMount?: boolean;
}

/** Clip-path mask reveal for images, paired with a subtle inner scale. */
export function ImageReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  onMount = false,
}: ImageRevealProps) {
  const hidden = direction === "up" ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)";
  const visible = "inset(0 0 0 0)";
  return (
    <m.div
      className={cn("relative overflow-hidden", className)}
      initial={{ clipPath: hidden }}
      {...(onMount
        ? { animate: { clipPath: visible } }
        : { whileInView: { clipPath: visible }, viewport: VIEWPORT })}
      transition={{ duration: DURATION.image, delay, ease: EASE_OUT }}
    >
      <m.div
        className="h-full w-full"
        initial={{ scale: 1.08 }}
        {...(onMount
          ? { animate: { scale: 1 } }
          : { whileInView: { scale: 1 }, viewport: VIEWPORT })}
        transition={{ duration: DURATION.image + 0.4, delay, ease: EASE_OUT }}
      >
        {children}
      </m.div>
    </m.div>
  );
}
