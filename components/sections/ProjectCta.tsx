import type { Content } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionFolio } from "@/components/ui/SectionFolio";
import { SplitLines } from "@/components/ui/SplitLines";
import { ArrowLink } from "@/components/ui/ArrowLink";

interface ProjectCtaProps {
  content: Content["projectCta"];
}

export function ProjectCta({ content }: ProjectCtaProps) {
  return (
    <section>
      <Container className="py-20 lg:py-32">
        <Reveal y={0}>
          <SectionFolio index={content.index} label={content.label} meta={content.meta} />
        </Reveal>
        <div className="mt-20 grid grid-cols-12 gap-x-6 lg:mt-36">
          <div className="col-span-12 lg:col-span-10 lg:col-start-2">
            <SplitLines lines={content.title} className="text-display-lg lg:text-display-xl" serifLines={[1]} />
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-lg text-lede text-taupe">{content.body}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <ArrowLink href={content.cta.href} variant="solid" className="mt-12">
                {content.cta.label}
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
