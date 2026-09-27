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
 * Editorial hero: the photograph fills the viewport, and an ivory block
 * carrying the headline rises out of its lower-left corner, the way a
 * magazine opener breaks the image edge. No dark overlay is needed.
 */
export function Hero({ content }: HeroProps) {
  return (
    <section className="relative bg-ivory">
      <div className="relative h-[82svh] min-h-[560px] w-full overflow-hidden bg-sand lg:h-[100svh] lg:max-h-[1100px] lg:min-h-[680px]">
        <HeroImage image={images.hero} />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/45 via-ink/10 to-transparent"
        />

        <div className="container-site absolute inset-x-0 bottom-0 flex items-end justify-end pb-8 lg:pb-12">
          <Reveal onMount delay={1.4} y={12} className="flex items-end gap-8 text-ivory lg:gap-12">
            <div className="hidden flex-col items-end gap-4 sm:flex">
              <p className="label flex items-center gap-3">
                <span className="tabular-nums text-brand">{content.indicator.number}</span>
                <span aria-hidden="true" className="text-ivory/50">
                  /
                </span>
                <span>{content.indicator.label}</span>
              </p>
              <ul className="label-sm text-right text-ivory/70">
                {content.meta.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
            <HeroScrollCue label={content.scroll} />
          </Reveal>
        </div>
      </div>

      {/* Ivory headline block, flush with the left edge, overlapping the image. */}
      <div className="container-site">
        <div className="relative z-10 -mt-[24vh] -ml-5 max-w-[1180px] bg-ivory pt-8 pr-6 pl-5 sm:-ml-8 sm:pt-10 sm:pr-12 sm:pl-8 lg:-mt-[30vh] lg:-ml-12 lg:pt-14 lg:pr-20 lg:pl-12 2xl:-ml-16 2xl:pl-16">
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
            className="mt-7 text-[clamp(2.75rem,6.3vw,7.5rem)] font-light leading-[0.94] tracking-[-0.035em] text-ink sm:mt-9"
            serifLines={[2]}
          />

          <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-10 lg:mt-14">
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
