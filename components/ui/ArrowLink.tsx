import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "text" | "outline" | "solid" | "brand";
type Tone = "dark" | "light";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  className?: string;
  external?: boolean;
}

type LinkProps = BaseProps & {
  href: string;
  type?: never;
  onClick?: never;
  disabled?: never;
};

type ButtonProps = BaseProps & {
  href?: never;
  type?: "button" | "submit";
  onClick?: ComponentPropsWithoutRef<"button">["onClick"];
  disabled?: boolean;
};

export type ArrowLinkProps = LinkProps | ButtonProps;

const base =
  "group inline-flex items-center gap-3 label whitespace-nowrap transition-colors duration-500 ease-[var(--ease-out-expo)] disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, Record<Tone, string>> = {
  text: {
    dark: "text-ink hover:text-brand",
    light: "text-ivory hover:text-ivory/70",
  },
  outline: {
    dark: "border border-line-strong px-6 py-4 text-ink hover:border-ink hover:bg-ink hover:text-ivory",
    light: "border border-ivory/50 px-6 py-4 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink",
  },
  solid: {
    dark: "bg-ink px-7 py-4 text-ivory hover:bg-brand",
    light: "bg-ivory px-7 py-4 text-ink hover:bg-brand hover:text-ivory",
  },
  brand: {
    dark: "bg-brand px-7 py-4 text-ivory hover:bg-ink",
    light: "bg-brand px-7 py-4 text-ivory hover:bg-ivory hover:text-ink",
  },
};

/**
 * Text-and-arrow action used for every call to action on the site.
 * Renders a Next.js Link when `href` is given, otherwise a button.
 */
export function ArrowLink(props: ArrowLinkProps) {
  const { children, variant = "text", tone = "dark", className, external } = props;
  const classes = cn(base, variants[variant][tone], className);
  const Icon = external ? ArrowUpRight : ArrowRight;
  const arrow = (
    <Icon
      aria-hidden="true"
      className="size-3.5 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1 group-focus-visible:translate-x-1"
      strokeWidth={1.5}
    />
  );

  if ("href" in props && props.href) {
    return (
      <Link
        href={props.href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        <span>{children}</span>
        {arrow}
      </Link>
    );
  }

  const { type = "button", onClick, disabled } = props as ButtonProps;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      <span>{children}</span>
      {arrow}
    </button>
  );
}
