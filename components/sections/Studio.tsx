import type { Content } from "@/lib/i18n";
import { images } from "@/data/images";
import { Container } from "@/components/ui/Container";
import { SectionFolio } from "@/components/ui/SectionFolio";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Figure } from "@/components/ui/Figure";
import { ArrowLink } from "@/components/ui/ArrowLink";

interface StudioProps {
  content: Content["studio"];
}

/**
 * Who we are, who works on your project, who we work for, and the showroom.
 * One section, no repetition with the rest of the page.
 */
export function Studio({ content }: StudioProps) {
  const { team, audience, showroom } = content;
  return (
    <section id="studio" className="scroll-mt-16 lg:scroll-mt-20">
      <Container className="pt-20 pb-24 lg:pt-28 lg:pb-32">
        <Reveal y={0}>
          <SectionFolio index={content.index} label={content.label} meta={content.meta} />
        </Reveal>

        <div className="mt-14 grid grid-cols-12 gap-x-6 lg:mt-24">
          <div className="col-span-12 lg:col-span-11 lg:col-start-2">
            <SplitLines
              lines={content.statement}
              className="text-display-lg lg:text-display-xl"
              serifLines={[2]}
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-12 lg:mt-24">
          <div className="col-span-9 sm:col-span-6 lg:col-span-4">
            <ImageReveal>
              <Figure image={images.manifesto} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 75vw" />
            </ImageReveal>
          </div>
          <div className="col-span-12 sm:col-span-10 lg:col-span-5 lg:col-start-6 lg:self-center">
            <Reveal>
              <p className="text-lede max-w-xl text-ink">{content.body}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-14 border-t border-line pt-16 lg:mt-32 lg:pt-24">
          <div className="col-span-12 lg:col-span-5">
            <SplitLines lines={team.title} className="text-display-md" serifLines={[1]} />
            <Reveal delay={0.15}>
              <p className="mt-8 max-w-md text-body text-ink/80">{team.text}</p>
            </Reveal>

            <Reveal delay={0.25}>
              <div className="mt-12 max-w-md border-t border-line pt-6">
                <p className="label text-brand">{audience.label}</p>
                <p className="mt-4 text-lede text-ink">{audience.text}</p>
              </div>
            </Reveal>
          </div>

          {/*
            TODO: Replace with portraits of the Studio PortMix interior architects
            once supplied (update images.architects in data/images.ts).
          */}
          <div className="relative col-span-12 pb-16 sm:col-span-11 lg:col-span-6 lg:col-start-7 lg:pb-24">
            <ImageReveal>
              <Figure
                image={images.architects.main}
                sizes="(min-width: 1024px) 48vw, (min-width: 640px) 90vw, 100vw"
              />
            </ImageReveal>
            <div className="absolute bottom-0 left-0 w-[40%] border-[6px] border-ivory sm:w-[34%] lg:-left-16 lg:w-[36%]">
              <Reveal delay={0.35}>
                <Figure image={images.architects.detail} sizes="(min-width: 1024px) 18vw, 40vw" />
              </Reveal>
            </div>
          </div>
        </div>

        <Reveal className="mt-24 lg:mt-32">
          <div className="grid grid-cols-12 gap-x-6 gap-y-8 bg-sand px-6 py-10 sm:px-10 lg:px-14 lg:py-14">
            <div className="col-span-12 lg:col-span-4">
              <p className="label text-taupe">{showroom.label}</p>
              <p className="mt-5 text-display-sm">{showroom.title}</p>
            </div>
            <p className="col-span-12 max-w-xl text-body text-ink/80 lg:col-span-5 lg:col-start-6 lg:self-end">
              {showroom.text}
            </p>
            <div className="col-span-12 lg:col-span-2 lg:col-start-11 lg:self-end lg:justify-self-end">
              <ArrowLink href={showroom.cta.href}>{showroom.cta.label}</ArrowLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
