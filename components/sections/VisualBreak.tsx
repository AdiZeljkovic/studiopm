import Image from "next/image";
import type { Content } from "@/lib/i18n";
import { images } from "@/data/images";
import { Container } from "@/components/ui/Container";
import { ImageReveal } from "@/components/ui/ImageReveal";

interface VisualBreakProps {
  content: Content["visualBreak"];
}

export function VisualBreak({ content }: VisualBreakProps) {
  return (
    <section aria-label={content.caption}>
      <ImageReveal className="w-full">
        <div className="relative aspect-[4/3] w-full bg-sand sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src={images.visualBreak.src}
            alt={images.visualBreak.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </ImageReveal>
      <Container>
        <p className="label-sm flex items-center justify-between gap-6 border-b border-line py-4 text-taupe">
          <span>{content.caption}</span>
          <span>{content.detail}</span>
        </p>
      </Container>
    </section>
  );
}
