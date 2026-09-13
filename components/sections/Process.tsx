import type { Content } from "@/lib/i18n";
import { images } from "@/data/images";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Figure } from "@/components/ui/Figure";

interface ProcessProps {
  content: Content["process"];
  inspirationLabel: string;
}

/**
 * Six steps laid out as an editorial grid: number, title, a fuller
 * description and a line saying what the step concretely involves.
 */
export function Process({ content, inspirationLabel }: ProcessProps) {
  return (
    <section id="approach" className="scroll-mt-16 bg-sand lg:scroll-mt-20">
      <Container className="py-20 lg:py-32">
        <SectionIntro
          index={content.index}
          label={content.label}
          meta={content.meta}
          title={content.title}
          intro={content.intro}
          serifLines={[1]}
        />

        <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-14 lg:mt-24">
          <aside className="col-span-12 sm:col-span-6 lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <ImageReveal>
                <Figure
                  image={images.architects.detail}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  caption={
                    <>
                      <span>{content.imageCaption}</span>
                      <span>{inspirationLabel}</span>
                    </>
                  }
                />
              </ImageReveal>
              <Reveal delay={0.2}>
                <p className="label-sm mt-10 text-taupe">{content.principlesLabel}</p>
                <ol className="mt-3 border-t border-line-strong">
                  {content.principles.map((principle, i) => (
                    <li
                      key={principle}
                      className="flex items-baseline justify-between border-b border-line-strong py-3"
                    >
                      <span className="text-display-sm">{principle}</span>
                      <span className="label-sm tabular-nums text-brand">0{i + 1}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </aside>

          <ol className="col-span-12 grid border-t border-line-strong sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {content.steps.map((step, i) => (
              <li
                key={step.number}
                className={cn(
                  "border-b border-line-strong py-8 lg:py-10",
                  i % 2 === 0 ? "sm:pr-8 lg:pr-10" : "sm:border-l sm:pl-8 lg:pl-10",
                )}
              >
                <Reveal delay={(i % 2) * 0.1}>
                  <span className="figure-serif block text-[3.25rem] text-ink lg:text-[3.75rem]">{step.number}</span>
                  <h3 className="mt-5 text-display-sm">{step.title}</h3>
                  <p className="mt-4 max-w-sm text-body text-taupe">{step.description}</p>
                  <p className="label-sm mt-6 flex items-start gap-3 text-ink">
                    <span aria-hidden="true" className="mt-[0.3em] size-1.5 shrink-0 bg-brand" />
                    <span>{step.involves}</span>
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
