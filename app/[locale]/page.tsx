import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getSadrzaj } from "@/lib/cms";
import { Hero } from "@/components/sections/Hero";
import { Studio } from "@/components/sections/Studio";
import { VisualBreak } from "@/components/sections/VisualBreak";
import { Expertise } from "@/components/sections/Expertise";
import { Advantage } from "@/components/sections/Advantage";
import { Process } from "@/components/sections/Process";
import { ProjectInquirySection } from "@/components/sections/ProjectInquirySection";
import { Closing } from "@/components/sections/Closing";

/**
 * Homepage narrative, in the same order as the main menu:
 *  01 Studio      who we are, our interior architects, for whom, showroom
 *  02 Expertise   services, then Design & joinery (the PortMix difference)
 *  04 Approach    six steps
 *  05 Start       invitation + questionnaire
 *  06 Contact     coordinates
 */
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const { t, images, contact } = await getSadrzaj(locale);

  return (
    <>
      <Hero content={t.hero} images={images} />
      <Studio content={t.studio} images={images} />
      <VisualBreak content={t.visualBreak} images={images} />
      <Expertise content={t.expertise} images={images.services} />
      <Advantage content={t.advantage} images={images} />
      <Process content={t.process} />
      <ProjectInquirySection intro={t.projectCta} content={t.inquiry} locale={locale} />
      <Closing content={t.closing} contact={contact} />
    </>
  );
}
