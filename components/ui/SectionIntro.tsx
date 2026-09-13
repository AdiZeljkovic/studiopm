import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { SectionFolio } from "@/components/ui/SectionFolio";
import { SplitLines } from "@/components/ui/SplitLines";
import { Reveal } from "@/components/ui/Reveal";

interface SectionIntroProps {
  index?: string;
  label: string;
  meta?: string;
  title: readonly string[];
  intro?: string;
  tone?: "dark" | "light";
  className?: string;
  titleClassName?: string;
  serifLines?: readonly number[];
  /** Optional element placed under the intro (e.g. a link). */
  children?: ReactNode;
  align?: "split" | "stack";
}

/**
 * Standard section opener: running head, art-directed headline, optional intro.
 * `split` places the intro on the right-hand columns on desktop.
 */
export function SectionIntro({
  index,
  label,
  meta,
  title,
  intro,
  tone = "dark",
  className,
  titleClassName,
  serifLines,
  children,
  align = "split",
}: SectionIntroProps) {
  return (
    <div className={className}>
      <Reveal y={0}>
        <SectionFolio index={index} label={label} meta={meta} tone={tone} />
      </Reveal>
      <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-8 lg:mt-20">
        <div className={cn("col-span-12", align === "split" ? "lg:col-span-8" : "lg:col-span-9")}>
          <SplitLines
            lines={title}
            className={cn("text-display-lg", titleClassName)}
            serifLines={serifLines}
          />
        </div>
        {intro || children ? (
          <div
            className={cn(
              "col-span-12",
              align === "split"
                ? "lg:col-span-3 lg:col-start-10 lg:self-end"
                : "lg:col-span-6 lg:col-start-4",
            )}
          >
            <Reveal delay={0.2}>
              {intro ? (
                <p className={cn("text-body max-w-md", tone === "dark" ? "text-taupe" : "text-ivory/70")}>
                  {intro}
                </p>
              ) : null}
              {children}
            </Reveal>
          </div>
        ) : null}
      </div>
    </div>
  );
}
