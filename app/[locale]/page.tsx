import { notFound } from "next/navigation";
import { getContent, hasLocale } from "@/lib/i18n";
import { images } from "@/data/images";
import { Hero } from "@/components/sections/Hero";
import { Studio } from "@/components/sections/Studio";
import { VisualBreak } from "@/components/sections/VisualBreak";
import { Expertise } from "@/components/sections/Expertise";
import { Advantage } from "@/components/sections/Advantage";
import { Process } from "@/components/sections/Process";
import { ProjectCta } from "@/components/sections/ProjectCta";
import { ProjectInquirySection } from "@/components/sections/ProjectInquirySection";
import { Closing } from "@/components/sections/Closing";

/**
 * Homepage narrative, in the same order as the main menu:
 *  01 Studio      who we are, our interior architects, for whom, showroom
 *  02 Expertise   services, then Design & joinery (the PortMix difference)
 *  04 Approach    six steps
 *  05 Start       questionnaire
 *  06 Contact     coordinates
 */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getContent(locale);

  return (
    <>
      <Hero content={t.hero} />
      <Studio content={t.studio} />
      <VisualBreak content={t.visualBreak} />
      <Expertise content={t.expertise} images={images.services} />
      <Advantage content={t.advantage} />
      <Process content={t.process} />
      <ProjectCta content={t.projectCta} />
      <ProjectInquirySection content={t.inquiry} locale={locale} />
      <Closing content={t.closing} />
    </>
  );
}
