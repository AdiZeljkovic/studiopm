import type { Content } from "@/lib/i18n";
import { Container } from "@/components/ui/Container";
import { ProjectInquiryForm } from "@/components/forms/project-inquiry/ProjectInquiryForm";

interface ProjectInquirySectionProps {
  content: Content["inquiry"];
}

export function ProjectInquirySection({ content }: ProjectInquirySectionProps) {
  return (
    <section id="project-inquiry" className="scroll-mt-16 border-t border-line lg:scroll-mt-20">
      <Container className="py-24 lg:py-36">
        <ProjectInquiryForm content={content} privacyHref="/privacy" />
      </Container>
    </section>
  );
}
