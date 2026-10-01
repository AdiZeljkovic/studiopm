import Image from "next/image";
import type { SiteImage } from "@/data/images";

/**
 * Hero photograph with a slow settle from 1.05 to 1.
 * Pure CSS (see .hero-settle in globals.css): no JavaScript is needed
 * before the largest image of the page can paint.
 */
export function HeroImage({ image }: { image: SiteImage }) {
  return (
    <div className="hero-settle absolute inset-0">
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={70}
        className="object-cover object-[50%_78%]"
      />
    </div>
  );
}
