"use client";

import dynamic from "next/dynamic";

/** The editor reads drafts from localStorage, so it renders in the browser only. */
const NewsletterEditor = dynamic(
  () => import("@/components/newsletter/NewsletterEditor").then((m) => m.NewsletterEditor),
  {
    ssr: false,
    loading: () => <p className="p-10 text-[0.875rem] text-taupe">Chargement de l’éditeur…</p>,
  },
);

export function EditorLoader() {
  return <NewsletterEditor />;
}
