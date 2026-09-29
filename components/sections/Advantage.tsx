import { Fragment } from "react";
import type { Content } from "@/lib/i18n";
import { images } from "@/data/images";
import { Container } from "@/components/ui/Container";
import { SectionFolio } from "@/components/ui/SectionFolio";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Figure } from "@/components/ui/Figure";

interface AdvantageProps {
  content: Content["advantage"];
}

/**
 * The studio's difference in one chapter: design built on PortMix joinery
 * expertise, knowing how every element is actually made.
 */
export function Advantage({ content }: AdvantageProps) {
  return (
    <section className="bg-ink text-ivory">
      <Container className="py-20 lg:py-32">
        <Reveal y={0}>
          <SectionFolio index={content.index} label={content.label} meta={content.meta} tone="light" />
        </Reveal>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-20 lg:mt-28">
          <div className="relative col-span-12 pb-16 sm:col-span-10 lg:col-span-6 lg:pb-24">
            <ImageReveal>
              <Figure image={images.advantage.main} ratio="4/5" sizes="(min-width: 1024px) 45vw, (min-width: 640px) 80vw, 100vw" />
            </ImageReveal>
            <div className="absolute right-0 bottom-0 w-[44%] border-[6px] border-ink sm:w-[38%] lg:-right-16 lg:w-[40%]">
              <Reveal delay={0.35}>
                <Figure image={images.advantage.detail} ratio="3/4" sizes="(min-width: 1024px) 18vw, 40vw" />
              </Reveal>
            </div>
          </div>

          <div className="col-span-12 flex flex-col justify-center lg:col-span-5 lg:col-start-8">
            <SplitLines lines={content.title} className="text-display-md" serifLines={[1]} />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-lede text-ivory">{content.lede}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-md text-body text-ivory/65">{content.body}</p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-20 flex flex-wrap items-baseline gap-x-5 gap-y-3 border-t border-line-dark pt-10 text-display-sm font-light text-ivory lg:mt-28 lg:gap-x-8">
            {content.keywords.map((word, i) => (
              <Fragment key={word}>
                {i > 0 ? <span aria-hidden="true" className="size-1.5 translate-y-[-0.3em] bg-brand" /> : null}
                <span className={i % 2 === 1 ? "display-serif" : undefined}>{word}</span>
              </Fragment>
            ))}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
