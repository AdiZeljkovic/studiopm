import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface LabelProps {
  index?: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}

/** Small uppercase editorial label, optionally prefixed with a red index. */
export function Label({ index, children, className, tone = "dark" }: LabelProps) {
  return (
    <p
      className={cn(
        "label flex items-center gap-3",
        tone === "dark" ? "text-taupe" : "text-ivory/70",
        className,
      )}
    >
      {index ? (
        <>
          <span className="tabular-nums text-brand">{index}</span>
          <span
            aria-hidden="true"
            className={cn("h-px w-6", tone === "dark" ? "bg-line-strong" : "bg-ivory/40")}
          />
        </>
      ) : null}
      <span>{children}</span>
    </p>
  );
}
