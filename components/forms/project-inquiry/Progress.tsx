"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";

interface ProgressProps {
  eyebrow: string;
  step: number;
  names: readonly string[];
  onJump: (index: number) => void;
  navLabel: string;
}

export const pad = (n: number) => String(n).padStart(2, "0");

export function Progress({ eyebrow, step, names, onJump, navLabel }: ProgressProps) {
  const total = names.length;
  return (
    <div>
      <div className="flex items-end justify-between gap-6 pb-5">
        <div>
          <p className="label text-taupe">{eyebrow}</p>
          <p className="mt-2 text-display-sm tabular-nums">
            <span>{pad(step + 1)}</span>
            <span className="text-taupe-light"> / {pad(total)}</span>
          </p>
        </div>
        <nav aria-label={navLabel} className="hidden md:block">
          <ol className="flex gap-6 lg:gap-8">
            {names.map((name, i) => {
              const state = i === step ? "current" : i < step ? "done" : "todo";
              const content = (
                <>
                  <span className="mr-2 tabular-nums">{pad(i + 1)}</span>
                  {name}
                </>
              );
              return (
                <li
                  key={name}
                  aria-current={state === "current" ? "step" : undefined}
                  className={cn(
                    "label-sm transition-colors duration-500",
                    state === "current" ? "text-brand" : state === "done" ? "text-ink" : "text-taupe-light",
                  )}
                >
                  {state === "done" ? (
                    <button type="button" onClick={() => onJump(i)} className="link-underline">
                      {content}
                    </button>
                  ) : (
                    <span>{content}</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
      <div className="relative h-px w-full bg-line" aria-hidden="true">
        <motion.div
          className="absolute left-0 top-0 h-px bg-brand"
          initial={false}
          animate={{ width: `${((step + 1) / total) * 100}%` }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        />
      </div>
    </div>
  );
}
