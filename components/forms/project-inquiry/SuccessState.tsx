"use client";

import { m } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import type { Content } from "@/lib/i18n";
import { ArrowLink } from "@/components/ui/ArrowLink";

interface SuccessStateProps {
  content: Content["inquiry"]["success"];
}

export function SuccessState({ content }: SuccessStateProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE_OUT }}
      className="grid grid-cols-12 gap-x-6 py-6 lg:py-16"
      role="status"
      aria-live="polite"
    >
      <div className="col-span-12 lg:col-span-8 lg:col-start-3">
        <div aria-hidden="true" className="mb-10 h-px w-12 bg-brand" />
        <h2 className="text-display-xl">
          <span className="font-serif italic">{content.title}</span>
        </h2>
        <p className="mt-8 max-w-lg text-lede text-taupe">{content.body}</p>
        <ArrowLink href="#top" variant="outline" className="mt-12">
          {content.cta}
        </ArrowLink>
      </div>
    </m.div>
  );
}
