import type { Content } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionFolio } from "@/components/ui/SectionFolio";
import { SplitLines } from "@/components/ui/SplitLines";
import { ArrowLink } from "@/components/ui/ArrowLink";

interface ClosingProps {
  content: Content["closing"];
}

/** Contact coordinates. Target of the "Contact" menu item (#contact). */
export function Closing({ content }: ClosingProps) {
  const { email, phone, addressLines } = siteConfig.contact;
  const placeholder = <span className="text-taupe-light">{content.contact.placeholder}</span>;

  return (
    <section id="contact" className="scroll-mt-[72px] bg-ivory-light lg:scroll-mt-24">
      <Container className="py-20 lg:py-32">
        <Reveal y={0}>
          <SectionFolio index={content.index} label={content.label} meta={content.meta} />
        </Reveal>

        <div className="mt-14 grid grid-cols-12 gap-x-6 gap-y-14 lg:mt-24">
          <div className="col-span-12 lg:col-span-7">
            <SplitLines lines={content.statement} className="text-display-lg" serifLines={[1]} />
            <Reveal delay={0.25}>
              <ArrowLink href={content.cta.href} variant="brand" className="mt-12">
                {content.cta.label}
              </ArrowLink>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.2}>
              <p className="label normal-case tracking-[0.03em]">{content.name}</p>
              <p className="label-sm mt-2 text-taupe">{content.discipline}</p>

              {/* Contact details come from lib/site-config.ts. Empty values show
                  a neutral placeholder rather than invented information. */}
              <dl className="mt-10 border-t border-line">
                <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="label-sm pt-1 text-taupe">{content.contact.showroom}</dt>
                  <dd className="text-[0.9375rem]">
                    {addressLines?.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                    <span className="block">{content.contact.showroomValue}</span>
                    <span className="mt-1 block text-brand">{content.contact.appointment}</span>
                  </dd>
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="label-sm pt-1 text-taupe">{content.contact.email}</dt>
                  <dd className="text-[0.9375rem]">
                    {email ? (
                      <a href={`mailto:${email}`} className="link-underline">
                        {email}
                      </a>
                    ) : (
                      placeholder
                    )}
                  </dd>
                </div>
                <div className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="label-sm pt-1 text-taupe">{content.contact.phone}</dt>
                  <dd className="text-[0.9375rem]">
                    {phone ? (
                      <a href={`tel:${phone.replace(/\s+/g, "")}`} className="link-underline">
                        {phone}
                      </a>
                    ) : (
                      placeholder
                    )}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
