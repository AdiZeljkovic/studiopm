import type { Content } from "@/lib/i18n";
import { images } from "@/data/images";
import { Reveal } from "@/components/ui/Reveal";
import { SplitLines } from "@/components/ui/SplitLines";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { HeroImage } from "@/components/sections/HeroImage";
import { HeroScrollCue } from "@/components/sections/HeroScrollCue";

interface HeroProps {
  content: Content["hero"];
}

/**
 * Editorial hero. The photograph starts under the header and fills exactly
 * the first screen; the ivory headline panel sits inside that screen at the
 * bottom-left, so the full sentence is always readable without scrolling.
 * Intro, facts and actions continue below in the same ivory.
 */
export function Hero({ content }: HeroProps) {
  const panelPad = "px-5 sm:px-8 lg:px-12 2xl:px-16";
  const panelShift = "-ml-5 sm:-ml-8 lg:-ml-12 2xl:-ml-16";

  return (
    <section className="relative bg-ivory pt-[72px] lg:pt-24">
      <div className="relative h-[calc(80svh-72px)] min-h-[480px] w-full overflow-hidden bg-sand lg:h-[calc(100svh-96px)] lg:min-h-[560px] lg:max-h-[980px]">
        <HeroImage image={images.hero} />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/40 via-ink/10 to-transparent"
        />

        <div className="container-site absolute inset-x-0 bottom-0 hidden items-end justify-end pb-8 sm:flex lg:pb-10">
          <Reveal onMount delay={1.4} y={12} className="flex items-end gap-8 text-ivory lg:gap-12">
            <div className="hidden flex-col items-end gap-4 md:flex">
              <p className="label flex items-center gap-3">
                <span className="tabular-nums text-brand">{content.indicator.number}</span>
                <span aria-hidden="true" className="text-ivory/50">
                  /
                </span>
                <span>{content.indicator.label}</span>
              </p>
              <ul className="label-sm text-right text-ivory/75">
                {content.meta.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <HeroScrollCue label={content.scroll} />
          </Reveal>
        </div>

        {/* Headline panel: always inside the first screen. */}
        <div className="container-site absolute inset-x-0 bottom-0">
          <div className={`relative z-10 inline-block max-w-full bg-ivory pt-7 pb-6 sm:pt-9 sm:pb-8 lg:pt-11 lg:pb-9 ${panelShift} ${panelPad} lg:pr-20`}>
            <Reveal onMount delay={0.5} y={12}>
              <p className="label flex flex-wrap items-center gap-x-4 gap-y-1 text-taupe">
                <span className="text-ink normal-case tracking-[0.03em]">{content.eyebrow[0]}</span>
                <span aria-hidden="true" className="h-px w-8 bg-line-strong" />
                <span>{content.eyebrow[1]}</span>
              </p>
            </Reveal>

            <SplitLines
              as="h1"
              lines={content.headline}
              onMount
              delay={0.65}
              className="mt-5 text-[clamp(2.125rem,5.2vw,6rem)] font-light leading-[0.95] tracking-[-0.035em] text-ink sm:mt-7"
              serifLines={[2]}
            />
          </div>
        </div>
      </div>

      <div className="container-site">
        <div className={`${panelShift} ${panelPad} max-w-[1180px] pt-8 pb-4 lg:pt-12`}>
          <div className="grid grid-cols-12 gap-x-6 gap-y-10">
            <Reveal onMount delay={1.1} className="col-span-12 lg:col-span-5">
              <p className="text-lede max-w-md text-ink/75">{content.intro}</p>
            </Reveal>
            <Reveal onMount delay={1.25} className="col-span-12 sm:col-span-9 lg:col-span-5 lg:col-start-8">
              <p className="label-sm text-taupe">{content.factsLabel}</p>
              <ul className="mt-3 border-t border-line">
                {content.facts.map((item) => (
                  <li key={item} className="border-b border-line py-3 text-[0.9375rem] leading-snug text-ink">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal onMount delay={1.45} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5 lg:mt-12">
            <ArrowLink href={content.primaryCta.href} variant="brand">
              {content.primaryCta.label}
            </ArrowLink>
            <ArrowLink href={content.secondaryCta.href}>{content.secondaryCta.label}</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
