import type { Content, Locale } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionFolio } from "@/components/ui/SectionFolio";
import { SplitLines } from "@/components/ui/SplitLines";
import { LazyInquiryForm } from "@/components/forms/project-inquiry/LazyInquiryForm";

interface ProjectInquirySectionProps {
  intro: Content["projectCta"];
  content: Content["inquiry"];
  locale: Locale;
}

/**
 * "Start a project": a short invitation followed directly by the
 * questionnaire. Target of every Start a project button (#project-inquiry).
 */
export function ProjectInquirySection({ intro, content, locale }: ProjectInquirySectionProps) {
  return (
    <section id="project-inquiry" className="scroll-mt-[72px] lg:scroll-mt-24">
      <Container className="pt-12 pb-24 lg:pt-16 lg:pb-36">
        <Reveal y={0}>
          <SectionFolio index={intro.index} label={intro.label} meta={intro.meta} />
        </Reveal>

        <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-8 lg:mt-20">
          <div className="col-span-12 lg:col-span-8">
            <SplitLines lines={intro.title} className="text-display-lg lg:text-display-xl" serifLines={[1]} />
          </div>
          <div className="col-span-12 lg:col-span-3 lg:col-start-10 lg:self-end">
            <Reveal delay={0.2}>
              <p className="max-w-sm text-lede text-taupe">{intro.body}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <LazyInquiryForm content={content} locale={locale} privacyHref={`/${locale}/privacy`} />
        </div>
      </Container>
    </section>
  );
}
