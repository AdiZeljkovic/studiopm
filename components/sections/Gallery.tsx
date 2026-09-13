import type { Content } from "@/lib/i18n";
import { images } from "@/data/images";
import { Container } from "@/components/ui/Container";
import { SectionFolio } from "@/components/ui/SectionFolio";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { Figure } from "@/components/ui/Figure";

interface GalleryProps {
  content: Content["gallery"];
}

/** Irregular editorial grid; index order matches data/images.ts gallery. */
const placement = [
  "col-span-8 sm:col-span-5 lg:col-span-4",
  "col-span-12 sm:col-span-7 lg:col-span-6 lg:col-start-7 lg:mt-36",
  "col-span-6 sm:col-span-5 lg:col-span-4 lg:col-start-2 lg:-mt-6",
  "col-span-6 sm:col-span-5 sm:col-start-8 lg:col-span-3 lg:col-start-8 lg:mt-28",
  "col-span-12 lg:col-span-8",
  "col-span-7 sm:col-span-4 lg:col-span-3 lg:col-start-10 lg:mt-32",
  "col-span-12 sm:col-span-9 sm:col-start-3 lg:col-span-6 lg:col-start-4 lg:mt-10",
] as const;

const sizes = [
  "(min-width: 1024px) 30vw, (min-width: 640px) 42vw, 66vw",
  "(min-width: 1024px) 48vw, (min-width: 640px) 58vw, 100vw",
  "(min-width: 1024px) 30vw, (min-width: 640px) 42vw, 50vw",
  "(min-width: 1024px) 22vw, (min-width: 640px) 42vw, 50vw",
  "(min-width: 1024px) 64vw, 100vw",
  "(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 58vw",
  "(min-width: 1024px) 48vw, (min-width: 640px) 75vw, 100vw",
] as const;

export function Gallery({ content }: GalleryProps) {
  return (
    <section id="gallery" className="overflow-hidden">
      <Container className="py-20 lg:py-32">
        <Reveal y={0}>
          <SectionFolio index={content.index} label={content.label} meta={content.meta} />
        </Reveal>
        <div className="mt-14 grid grid-cols-12 items-end gap-x-6 gap-y-8 lg:mt-20">
          <div className="col-span-12 lg:col-span-7">
            <SplitLines lines={content.title} className="text-display-lg lg:text-display-xl" serifLines={[1]} />
          </div>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.2}>
              <p className="max-w-sm text-body text-taupe">{content.intro}</p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-16 grid grid-cols-12 gap-x-4 gap-y-12 sm:gap-x-6 lg:mt-28 lg:gap-y-20">
          {images.gallery.map((image, i) => (
            <li key={image.src} className={placement[i]}>
              <Reveal delay={(i % 3) * 0.08}>
                <Figure
                  image={image}
                  sizes={sizes[i]}
                  hover
                  caption={
                    <>
                      <span>{content.captions[i]}</span>
                      <span className="tabular-nums">0{i + 1}</span>
                    </>
                  }
                />
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="label-sm mt-16 border-t border-line pt-4 text-taupe">{content.disclaimer}</p>
      </Container>
    </section>
  );
}
