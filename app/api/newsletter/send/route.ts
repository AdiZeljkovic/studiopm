import { NextResponse } from "next/server";
import { z } from "zod";
import { renderNewsletter } from "@/lib/newsletter/render";
import { isNewsletterDoc } from "@/lib/newsletter/storage";
import { newsletterAssetBase } from "@/lib/newsletter/config";

export const runtime = "nodejs";

/**
 * POST /api/newsletter/send  { to: string, doc: NewsletterDoc }
 *
 * Sends a single TEST email of the current newsletter. Bulk sending to the
 * subscriber list is meant to happen in the email platform (Brevo,
 * Mailchimp, ...) using the exported HTML, which handles consent,
 * unsubscribe and deliverability.
 *
 * Provider: Resend (https://resend.com), via its HTTP API. Configure
 *   RESEND_API_KEY=re_...
 *   NEWSLETTER_FROM="Studio PortMix <newsletter@your-verified-domain>"
 * Without these, the route answers 501 and nothing is sent.
 * Protected by the same basic auth as the editor (see proxy.ts).
 */
const bodySchema = z.object({
  to: z.email(),
  doc: z.unknown(),
});

export async function POST(request: Request) {
  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || !isNewsletterDoc(parsed.data.doc)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NEWSLETTER_FROM;
  if (!apiKey || !from) {
    return NextResponse.json({ ok: false, error: "not-configured" }, { status: 501 });
  }

  const doc = parsed.data.doc;
  const html = renderNewsletter(doc, { assetBase: newsletterAssetBase });

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({ from, to: [parsed.data.to], subject: `[TEST] ${doc.subject}`, html }),
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false, error: "provider", status: response.status }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
