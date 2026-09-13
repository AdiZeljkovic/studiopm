import { cn } from "@/lib/cn";

interface SectionFolioProps {
  index?: string;
  label: string;
  meta?: string;
  tone?: "dark" | "light";
  className?: string;
}

/**
 * Magazine-style running head: a full-width hairline with the section
 * number and title on the left and a short measurement-like note on the right.
 */
export function SectionFolio({ index, label, meta, tone = "dark", className }: SectionFolioProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "label-sm flex items-baseline justify-between gap-6 border-t pt-4",
        dark ? "border-line text-taupe" : "border-line-dark text-ivory/60",
        className,
      )}
    >
      <p className="flex items-center gap-3">
        {index ? (
          <>
            <span className="tabular-nums text-brand">{index}</span>
            <span aria-hidden="true" className={cn("h-px w-6", dark ? "bg-line-strong" : "bg-ivory/30")} />
          </>
        ) : null}
        <span className={dark ? "text-ink" : "text-ivory"}>{label}</span>
      </p>
      {meta ? <p className="hidden text-right sm:block">{meta}</p> : null}
    </div>
  );
}
