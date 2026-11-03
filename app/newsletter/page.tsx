import { redirect } from "next/navigation";
import { EditorLoader } from "@/components/newsletter/EditorLoader";

/**
 * Newsletteri se od PortMix CMS-a prave u panelu (nacrti u bazi, pregled, probni mail).
 * Kad je CMS podešen, ova adresa vodi tamo; bez CMS-a ostaje stari editor u pregledniku.
 */
export default function NewsletterPage() {
  const cms = process.env.CMS_URL?.trim().replace(/\/+$/, "");
  if (cms) redirect(`${cms}/admin/collections/newsletteri`);
  return <EditorLoader />;
}
