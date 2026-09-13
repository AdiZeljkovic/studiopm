import type { Content } from "@/lib/i18n";
import { images } from "@/data/images";
import { Container } from "@/components/ui/Container";
import { SectionFolio } from "@/components/ui/SectionFolio";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Figure } from "@/components/ui/Figure";

interface StudioProps {
  content: Content["studio"];
  inspirationLabel: string;
}

/** Who the studio is: the statement, what it does, and the two architects behind it. */
export function Studio({ content, inspirationLabel }: StudioProps) {
  const { architects } = content;
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
              <Figure
                image={images.manifesto}
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 75vw"
                caption={
                  <>
                    <span>{inspirationLabel}</span>
                    <span aria-hidden="true">4 / 5</span>
                  </>
                }
              />
            </ImageReveal>
          </div>

          <div className="col-span-12 sm:col-span-10 lg:col-span-6 lg:col-start-6 lg:self-center">
            <Reveal>
              <p className="text-lede max-w-xl text-ink">{content.body}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-body text-taupe">{content.body2}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-14 border-t border-line pt-16 lg:mt-32 lg:pt-24">
          <div className="col-span-12 lg:col-span-5">
            <SplitLines lines={architects.title} className="text-display-md" serifLines={[1]} />
            <div className="mt-8 max-w-md space-y-5">
              {architects.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.15 + i * 0.1}>
                  <p className={i === 0 ? "text-lede text-ink" : "text-body text-taupe"}>{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.35}>
              <dl className="mt-10 max-w-md border-t border-line">
                {architects.facts.map((fact) => (
                  <div key={fact.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-4">
                    <dt className="label-sm pt-1 text-taupe">{fact.label}</dt>
                    <dd className="text-[0.9375rem] leading-snug">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/*
            TODO: Replace with portraits of the two Studio Portmix architects
            once supplied (update images.architects in data/images.ts). Until
            then the section shows working situations only; no stand-in faces.
          */}
          <div className="relative col-span-12 pb-16 sm:col-span-11 lg:col-span-6 lg:col-start-7 lg:pb-24">
            <ImageReveal>
              <Figure
                image={images.architects.main}
                sizes="(min-width: 1024px) 48vw, (min-width: 640px) 90vw, 100vw"
                caption={
                  <>
                    <span>{content.captions.main}</span>
                    <span>{inspirationLabel}</span>
                  </>
                }
              />
            </ImageReveal>
            <div className="absolute bottom-0 left-0 w-[40%] border-[6px] border-ivory sm:w-[34%] lg:-left-16 lg:w-[36%]">
              <Reveal delay={0.35}>
                <Figure
                  image={images.architects.detail}
                  sizes="(min-width: 1024px) 18vw, 40vw"
                  caption={<span>{content.captions.detail}</span>}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
