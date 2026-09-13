import type { Content } from "@/lib/i18n";
import { images } from "@/data/images";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { Figure } from "@/components/ui/Figure";

interface SpacesProps {
  content: Content["spaces"];
}

/**
 * Editorial grid placement per item (index order matches content.spaces.items).
 * Offsets (`lg:mt-*`) create the staggered, magazine-like rhythm on desktop.
 */
const placement = [
  "col-span-12 sm:col-span-7 lg:col-span-7",
  "col-span-12 sm:col-span-5 lg:col-span-4 lg:col-start-9 lg:mt-28",
  "col-span-6 sm:col-span-5 lg:col-span-4 lg:col-start-2 lg:-mt-10",
  "col-span-12 sm:col-span-7 lg:col-span-7 lg:col-start-6 lg:mt-20",
  "col-span-6 sm:col-span-4 lg:col-span-4",
  "col-span-12 sm:col-span-8 lg:col-span-6 lg:col-start-6 lg:mt-24",
  "col-span-12 sm:col-span-6 lg:col-span-5 lg:col-start-2 lg:mt-6",
  "col-span-12 sm:col-span-6 lg:col-span-5 lg:col-start-8 lg:mt-32",
] as const;

const sizes = [
  "(min-width: 1024px) 55vw, (min-width: 640px) 58vw, 100vw",
  "(min-width: 1024px) 30vw, (min-width: 640px) 42vw, 100vw",
  "(min-width: 1024px) 30vw, (min-width: 640px) 42vw, 50vw",
  "(min-width: 1024px) 55vw, (min-width: 640px) 58vw, 100vw",
  "(min-width: 1024px) 30vw, (min-width: 640px) 33vw, 50vw",
  "(min-width: 1024px) 48vw, (min-width: 640px) 66vw, 100vw",
  "(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw",
  "(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw",
] as const;

export function Spaces({ content }: SpacesProps) {
  return (
    <section id="projects" className="scroll-mt-16 lg:scroll-mt-20">
      <Container className="py-24 lg:py-36">
        <SectionIntro
          index={content.index}
          label={content.label}
          meta={content.meta}
          title={content.title}
          intro={content.intro}
          serifLines={[2]}
        />

        <ul className="mt-16 grid grid-cols-12 gap-x-4 gap-y-10 sm:gap-x-6 lg:mt-24 lg:gap-y-16">
          {content.items.map((item, i) => (
            <li key={item.id} className={placement[i]}>
              <Reveal delay={(i % 2) * 0.1}>
                <Figure
                  image={images.spaces[item.image]}
                  sizes={sizes[i]}
                  hover
                  caption={
                    <>
                      <span className="text-ink">
                        <span className="tabular-nums text-brand">{item.number}</span>
                        <span aria-hidden="true" className="mx-2">
                          /
                        </span>
                        {item.title}
                      </span>
                      <span className="hidden whitespace-nowrap lg:inline">{item.descriptor}</span>
                    </>
                  }
                />
              </Reveal>
            </li>
          ))}
        </ul>

        <p className="label-sm mt-14 border-t border-line pt-4 text-taupe">{content.disclaimer}</p>
      </Container>
    </section>
  );
}
