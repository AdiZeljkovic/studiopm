"use client";

import type { ReactNode, RefObject } from "react";
import { pad } from "./Progress";

interface StepShellProps {
  index: number;
  title: readonly string[];
  intro: string;
  aside?: string;
  headingRef: RefObject<HTMLHeadingElement | null>;
  children: ReactNode;
}

/**
 * Two-column step layout: number, title and contextual explanation on the
 * left (sticky on desktop), fields on the right.
 */
export function StepShell({ index, title, intro, aside, headingRef, children }: StepShellProps) {
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-10">
      <div className="col-span-12 lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <p aria-hidden="true" className="figure-serif text-[4.5rem] leading-none text-line-strong lg:text-[6rem]">
            {pad(index + 1)}
          </p>
          <h2 ref={headingRef} tabIndex={-1} className="mt-4 text-display-md uppercase tracking-[-0.01em] focus:outline-none">
            {title.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 max-w-sm text-body text-ink/80">{intro}</p>
          {aside ? (
            <p className="mt-6 max-w-sm border-t border-line pt-5 text-[0.8125rem] leading-relaxed text-taupe">
              {aside}
            </p>
          ) : null}
        </div>
      </div>
      <div className="col-span-12 lg:col-span-7 lg:col-start-6">
        <div className="space-y-12">{children}</div>
      </div>
    </div>
  );
}
