"use client";

import { useId } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/cn";
import type { ProjectInquiry } from "@/lib/project-inquiry/schema";
import type { ChoiceOption } from "@/data/content/types";
import { FieldLabel, FieldMessage } from "./FieldChrome";

type ChoiceName = Extract<
  keyof ProjectInquiry,
  "clientType" | "projectTypes" | "propertyType" | "stage" | "timing" | "source"
>;

interface ChoiceGroupProps {
  name: ChoiceName;
  legend: string;
  options: readonly ChoiceOption[];
  type: "radio" | "checkbox";
  hint?: string;
  optionalLabel?: string;
  columns?: 1 | 2;
}

/**
 * Large, quiet selectable options. Native inputs stay in the DOM (visually
 * hidden) so keyboard and screen-reader behaviour is the browser's own; the
 * selected state is drawn purely with CSS :has() so no extra JS is needed.
 */
export function ChoiceGroup({ name, legend, options, type, hint, optionalLabel, columns = 2 }: ChoiceGroupProps) {
  const id = useId();
  const {
    register,
    formState: { errors },
  } = useFormContext<ProjectInquiry>();
  const error = errors[name]?.message as string | undefined;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <fieldset aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}>
      <FieldLabel as="legend" optionalLabel={optionalLabel}>
        {legend}
      </FieldLabel>
      <div className={cn("mt-4 grid gap-3", columns === 2 && "sm:grid-cols-2")}>
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "group relative flex cursor-pointer items-start gap-4 border px-5 py-4 transition-colors duration-300",
              "border-line hover:border-line-strong",
              "has-checked:border-brand has-checked:bg-brand/[0.035]",
              "has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand",
              error && "border-brand/40",
            )}
          >
            <input type={type} value={option.value} {...register(name)} className="sr-only" />
            <span
              aria-hidden="true"
              className={cn(
                "mt-[0.35rem] size-3 shrink-0 border border-line-strong transition-colors duration-300",
                "group-has-checked:border-brand group-has-checked:bg-brand",
                type === "radio" && "rounded-full",
              )}
            />
            <span className="min-w-0">
              <span className="block text-[0.9375rem] leading-snug text-ink">{option.label}</span>
              {option.hint ? (
                <span className="mt-1 block text-[0.8125rem] leading-snug text-taupe">{option.hint}</span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
      <FieldMessage hintId={hintId} hint={hint} errorId={errorId} error={error} />
    </fieldset>
  );
}
