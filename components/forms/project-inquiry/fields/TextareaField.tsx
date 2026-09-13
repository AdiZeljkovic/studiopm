"use client";

import { useId, type ComponentPropsWithRef } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/cn";
import type { ProjectInquiry } from "@/lib/project-inquiry/schema";
import { FieldLabel, FieldMessage } from "./FieldChrome";

type TextareaName = Extract<
  keyof ProjectInquiry,
  "spaces" | "description" | "references" | "timeline" | "notes"
>;

interface TextareaFieldProps extends Omit<ComponentPropsWithRef<"textarea">, "name"> {
  name: TextareaName;
  label: string;
  hint?: string;
  optionalLabel?: string;
  size?: "md" | "lg";
}

export function TextareaField({
  name,
  label,
  hint,
  optionalLabel,
  size = "md",
  className,
  ...rest
}: TextareaFieldProps) {
  const id = useId();
  const {
    register,
    formState: { errors },
  } = useFormContext<ProjectInquiry>();
  const error = errors[name]?.message;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={className}>
      <FieldLabel htmlFor={id} optionalLabel={optionalLabel}>
        {label}
      </FieldLabel>
      <textarea
        id={id}
        rows={size === "lg" ? 7 : 4}
        {...register(name)}
        {...rest}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        className={cn(
          "mt-3 block w-full resize-y border bg-ivory-light/60 px-4 py-4 text-[1rem] leading-relaxed text-ink transition-[border-color,background-color] duration-300 placeholder:text-taupe-light",
          "focus:border-ink focus:bg-ivory-light focus:outline-none",
          size === "lg" ? "min-h-[12rem]" : "min-h-[7rem]",
          error ? "border-brand" : "border-line-strong",
        )}
      />
      <FieldMessage hintId={hintId} hint={hint} errorId={errorId} error={error} />
    </div>
  );
}
