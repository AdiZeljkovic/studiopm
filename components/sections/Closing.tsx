import type { Content } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";

interface ClosingProps {
  content: Content["closing"];
}

export function Closing({ content }: ClosingProps) {
  const { email, phone, addressLines } = siteConfig.contact;
  const placeholder = <span className="text-taupe-light">{content.contact.placeholder}</span>;

  return (
    <section className="border-t border-line bg-ivory-light">
      <Container className="py-24 lg:py-36">
        <div className="grid grid-cols-12 gap-x-6 gap-y-14">
          <div className="col-span-12 lg:col-span-7">
            <SplitLines lines={content.statement} className="text-display-lg" serifLines={[1]} />
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.2}>
              <p className="label">{content.name}</p>
              <p className="label-sm mt-2 text-taupe">{content.discipline}</p>

              {/* Contact details come from lib/site-config.ts. Empty values show
                  a neutral placeholder rather than invented information. */}
              <dl className="mt-10 border-t border-line">
                <div className="grid grid-cols-[5rem_1fr] gap-4 border-b border-line py-4">
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
                <div className="grid grid-cols-[5rem_1fr] gap-4 border-b border-line py-4">
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
                <div className="grid grid-cols-[5rem_1fr] gap-4 border-b border-line py-4">
                  <dt className="label-sm pt-1 text-taupe">{content.contact.address}</dt>
                  <dd className="text-[0.9375rem]">
                    {addressLines?.length
                      ? addressLines.map((line) => (
                          <span key={line} className="block">
                            {line}
                          </span>
                        ))
                      : placeholder}
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
