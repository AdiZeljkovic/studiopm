import type { Metadata } from "next";
import { getContent } from "@/lib/i18n";
import { images } from "@/data/images";
import { Hero } from "@/components/sections/Hero";
import { Studio } from "@/components/sections/Studio";
import { VisualBreak } from "@/components/sections/VisualBreak";
import { Expertise } from "@/components/sections/Expertise";
import { Advantage } from "@/components/sections/Advantage";
import { Spaces } from "@/components/sections/Spaces";
import { Process } from "@/components/sections/Process";
import { Gallery } from "@/components/sections/Gallery";
import { ProjectCta } from "@/components/sections/ProjectCta";
import { ProjectInquirySection } from "@/components/sections/ProjectInquirySection";
import { Closing } from "@/components/sections/Closing";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Homepage narrative:
 *  01 The studio        who we are, what we do, the two architects
 *  02 What we do        seven services
 *  03 Design & build    why the studio is different, Portmix heritage
 *  04 Spaces we shape   typologies
 *  05 Our approach      six steps
 *  06 Gallery           references
 *  07 Start a project   questionnaire
 */
export default function HomePage() {
  const t = getContent();
  const inspiration = t.common.designInspiration;

  return (
    <>
      <Hero content={t.hero} />
      <Studio content={t.studio} inspirationLabel={inspiration} />
      <VisualBreak content={t.visualBreak} />
      <Expertise content={t.expertise} images={images.services} inspirationLabel={inspiration} />
      <Advantage content={t.advantage} inspirationLabel={inspiration} />
      <Spaces content={t.spaces} />
      <Process content={t.process} inspirationLabel={inspiration} />
      <Gallery content={t.gallery} />
      <ProjectCta content={t.projectCta} />
      <ProjectInquirySection content={t.inquiry} />
      <Closing content={t.closing} />
    </>
  );
}
