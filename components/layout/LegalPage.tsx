import { Container } from "@/components/ui/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";

interface LegalPageProps {
  title: string;
  intro: string;
  /** „Dernière mise à jour…" — prazno = ne prikazuje se */
  updated?: string;
  /** Odjeljci teksta; u tekstu novi red = novi red na stranici. */
  sections: readonly { title: string; body: string }[];
  backLabel: string;
  backHref: string;
}

/** Shared shell for the privacy policy and the legal notice. */
export function LegalPage({ title, intro, updated, sections, backLabel, backHref }: LegalPageProps) {
  const odjeljci = sections.filter((s) => s.title.trim() || s.body.trim());
  return (
    <Container className="pt-32 pb-24 lg:pt-44 lg:pb-36">
      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-12 lg:col-span-7 lg:col-start-3">
          <h1 className="text-display-lg">{title}</h1>
          <p className="mt-8 max-w-xl text-lede text-taupe">{intro}</p>
          {updated?.trim() ? <p className="label-sm mt-6 text-taupe-light">{updated}</p> : null}
          <div className="mt-12 border-t border-line">
            {odjeljci.map((s, i) => (
              <section key={i} className="grid gap-x-6 gap-y-3 border-b border-line py-8 sm:grid-cols-[minmax(0,14rem)_1fr]">
                <h2 className="label text-ink">{s.title}</h2>
                <p className="whitespace-pre-line text-body text-taupe">{s.body}</p>
              </section>
            ))}
          </div>
          <ArrowLink href={backHref} className="mt-16">
            {backLabel}
          </ArrowLink>
        </div>
      </div>
    </Container>
  );
}
