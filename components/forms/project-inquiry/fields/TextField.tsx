"use client";

import { useId, type ComponentPropsWithRef } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/cn";
import type { ProjectInquiry } from "@/lib/project-inquiry/schema";
import { FieldLabel, FieldMessage } from "./FieldChrome";

type TextFieldName = Extract<keyof ProjectInquiry, "fullName" | "email" | "phone" | "location">;

interface TextFieldProps extends Omit<ComponentPropsWithRef<"input">, "name"> {
  name: TextFieldName;
  label: string;
  hint?: string;
  optionalLabel?: string;
}

export function TextField({ name, label, hint, optionalLabel, className, ...rest }: TextFieldProps) {
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
      <input
        id={id}
        {...register(name)}
        {...rest}
        aria-invalid={error ? true : undefined}
        aria-describedby={[hintId, errorId].filter(Boolean).join(" ") || undefined}
        className={cn(
          "mt-3 block w-full border-0 border-b bg-transparent px-0 py-3 text-[1.0625rem] leading-snug text-ink transition-[border-color,box-shadow] duration-300 placeholder:text-taupe-light",
          "focus:border-ink focus:shadow-[0_1px_0_0_var(--color-ink)] focus:outline-none",
          error ? "border-brand" : "border-line-strong",
        )}
      />
      <FieldMessage hintId={hintId} hint={hint} errorId={errorId} error={error} />
    </div>
  );
}
