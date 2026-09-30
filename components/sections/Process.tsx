import type { Content } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";

interface ProcessProps {
  content: Content["process"];
}

/** Six steps in an editorial grid across the full width. */
export function Process({ content }: ProcessProps) {
  return (
    <section id="approach" className="scroll-mt-[72px] bg-sand lg:scroll-mt-24">
      <Container className="py-20 lg:py-32">
        <SectionIntro
          index={content.index}
          label={content.label}
          meta={content.meta}
          title={content.title}
          intro={content.intro}
          serifLines={[1]}
        />

        {/* Six steps on one screen: two rows of three columns on desktop. */}
        <ol className="mt-16 grid border-t border-line-strong sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
          {content.steps.map((step, i) => (
            <li
              key={step.number}
              className={cn(
                "border-b border-line-strong py-8 lg:py-10",
                i % 2 === 1 ? "sm:border-l sm:pl-8" : "sm:pr-8",
                i % 3 === 0 ? "lg:border-l-0 lg:pl-0" : "lg:border-l lg:pl-10",
                i % 3 === 2 ? "lg:pr-0" : "lg:pr-10",
              )}
            >
              <Reveal delay={(i % 3) * 0.08}>
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
      </Container>
    </section>
  );
}
