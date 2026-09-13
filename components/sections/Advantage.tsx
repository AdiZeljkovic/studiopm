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
  inspirationLabel: string;
}

/**
 * The studio's differentiator, told in one dark chapter: design that knows
 * how things are built, and the Portmix joinery heritage it grows from.
 */
export function Advantage({ content, inspirationLabel }: AdvantageProps) {
  const { heritage } = content;
  return (
    <section className="bg-ink text-ivory">
      <Container className="py-20 lg:py-32">
        <Reveal y={0}>
          <SectionFolio index={content.index} label={content.label} meta={content.meta} tone="light" />
        </Reveal>

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-20 lg:mt-28">
          <div className="relative col-span-12 pb-16 sm:col-span-10 lg:col-span-6 lg:pb-24">
            <ImageReveal>
              <Figure
                image={images.advantage.main}
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 80vw, 100vw"
                caption={
                  <>
                    <span>{content.captions.main}</span>
                    <span>{inspirationLabel}</span>
                  </>
                }
                captionClassName="text-ivory/50"
              />
            </ImageReveal>
            <div className="absolute right-0 bottom-0 w-[44%] border-[6px] border-ink sm:w-[38%] lg:-right-16 lg:w-[40%]">
              <Reveal delay={0.35}>
                <Figure
                  image={images.advantage.detail}
                  sizes="(min-width: 1024px) 18vw, 40vw"
                  caption={<span>{content.captions.detail}</span>}
                  captionClassName="text-ivory/50"
                />
              </Reveal>
            </div>
          </div>

          <div className="col-span-12 flex flex-col justify-center lg:col-span-5 lg:col-start-8">
            <SplitLines lines={content.title} className="text-display-md" serifLines={[2]} />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-body text-ivory/70">{content.body}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line-dark pt-6 sm:grid-cols-4">
                {content.tags.map((tag, i) => (
                  <li key={tag}>
                    <span className="label-sm block tabular-nums text-brand">0{i + 1}</span>
                    <span className="label mt-3 block text-ivory">{tag}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-12 gap-x-6 gap-y-14 border-t border-line-dark pt-16 lg:mt-36 lg:pt-24">
          <div className="col-span-12 lg:col-span-5">
            <SplitLines lines={heritage.title} className="text-display-md" serifLines={[1]} />
            <div className="mt-8 max-w-md space-y-5">
              {heritage.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.15 + i * 0.1}>
                  <p className={i === 0 ? "text-lede text-ivory/90" : "text-body text-ivory/65"}>{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="col-span-12 sm:col-span-6 lg:col-span-3 lg:col-start-7">
            <Reveal delay={0.3}>
              <ol className="border-t border-line-dark">
                {heritage.timeline.map((entry) => (
                  <li key={entry.label} className="border-b border-line-dark py-5">
                    <span className="label-sm block tabular-nums text-brand">{entry.label}</span>
                    <p className="mt-3 text-body text-ivory/65">{entry.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <div className="col-span-10 sm:col-span-6 lg:col-span-3 lg:col-start-10">
            <ImageReveal direction="left">
              <Figure
                image={images.heritage}
                sizes="(min-width: 1024px) 22vw, (min-width: 640px) 50vw, 85vw"
                caption={
                  <>
                    <span>{content.captions.doors}</span>
                    <span>{inspirationLabel}</span>
                  </>
                }
                captionClassName="text-ivory/50"
              />
            </ImageReveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
