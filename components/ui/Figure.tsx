import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ImageRatio, SiteImage } from "@/data/images";

export const ratioClass: Record<ImageRatio, string> = {
  "1/1": "aspect-square",
  "3/2": "aspect-[3/2]",
  "2/3": "aspect-[2/3]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  "4/5": "aspect-[4/5]",
  "5/4": "aspect-[5/4]",
  "16/9": "aspect-[16/9]",
  "21/9": "aspect-[21/9]",
};

interface FigureProps {
  image: SiteImage;
  /** Override the displayed crop; defaults to the image's intrinsic ratio. */
  ratio?: ImageRatio;
  sizes: string;
  priority?: boolean;
  className?: string;
  frameClassName?: string;
  imageClassName?: string;
  caption?: ReactNode;
  captionClassName?: string;
  hover?: boolean;
}

/**
 * Aspect-locked image with optional editorial caption. Reserves space before
 * the image loads so nothing shifts, and keeps hover motion to a 2.5% scale.
 */
export function Figure({
  image,
  ratio,
  sizes,
  priority,
  className,
  frameClassName,
  imageClassName,
  caption,
  captionClassName,
  hover = false,
}: FigureProps) {
  return (
    <figure className={cn("group/figure", className)}>
      <div
        className={cn(
          "relative w-full overflow-hidden bg-sand",
          ratioClass[ratio ?? image.ratio],
          frameClassName,
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover",
            hover &&
              "transition-transform duration-[1400ms] ease-[var(--ease-out-expo)] group-hover/figure:scale-[1.025]",
            imageClassName,
          )}
        />
      </div>
      {caption ? (
        <figcaption
          className={cn(
            "label-sm mt-3 flex items-baseline justify-between gap-4 text-taupe",
            captionClassName,
          )}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
