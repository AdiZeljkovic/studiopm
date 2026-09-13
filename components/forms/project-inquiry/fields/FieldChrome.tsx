import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FieldLabelProps {
  htmlFor?: string;
  children: ReactNode;
  optionalLabel?: string;
  as?: "label" | "legend";
  className?: string;
}

/** Small uppercase field label with an optional "Optional" marker. */
export function FieldLabel({ htmlFor, children, optionalLabel, as = "label", className }: FieldLabelProps) {
  const content = (
    <>
      <span>{children}</span>
      {optionalLabel ? (
        <span className="ml-3 normal-case tracking-normal text-taupe-light">{optionalLabel}</span>
      ) : null}
    </>
  );
  if (as === "legend") {
    return <legend className={cn("label-sm text-taupe", className)}>{content}</legend>;
  }
  return (
    <label htmlFor={htmlFor} className={cn("label-sm block text-taupe", className)}>
      {content}
    </label>
  );
}

interface FieldMessageProps {
  hint?: string;
  hintId?: string;
  error?: string;
  errorId?: string;
}

/** Hint below a field; the error replaces nothing and stays quiet in tone. */
export function FieldMessage({ hint, hintId, error, errorId }: FieldMessageProps) {
  if (!hint && !error) return null;
  return (
    <div className="mt-2 space-y-1">
      {hint ? (
        <p id={hintId} className="text-[0.8125rem] leading-relaxed text-taupe">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-[0.8125rem] leading-relaxed text-brand">
          {error}
        </p>
      ) : null}
    </div>
  );
}
