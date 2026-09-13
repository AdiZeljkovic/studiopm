import { Container } from "@/components/ui/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";

interface LegalPageProps {
  title: string;
  intro: string;
  placeholder: string;
  backLabel: string;
}

/** Shared shell for the privacy policy and legal notice placeholder pages. */
export function LegalPage({ title, intro, placeholder, backLabel }: LegalPageProps) {
  return (
    <Container className="pt-32 pb-24 lg:pt-44 lg:pb-36">
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 lg:col-span-7 lg:col-start-3">
          <h1 className="text-display-lg">{title}</h1>
          <p className="mt-8 max-w-xl text-lede text-taupe">{intro}</p>
          {/* TODO: replace with the final legal text supplied by Studio Portmix. */}
          <p className="mt-12 border-t border-line pt-6 text-body text-taupe-light">{placeholder}</p>
          <ArrowLink href="/" className="mt-16">
            {backLabel}
          </ArrowLink>
        </div>
      </div>
    </Container>
  );
}
