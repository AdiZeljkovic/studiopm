import type { ProjectInquiry } from "@/lib/project-inquiry/schema";

/**
 * Server-side delivery of a validated project inquiry.
 *
 * Nothing is sent anywhere until a channel is configured. The default
 * behaviour is to accept the submission and report `delivered: false` so the
 * UI can still complete gracefully during development.
 *
 * To connect a backend, pick ONE of the following and implement it here:
 *
 *  1. Generic webhook / Laravel API (already wired below)
 *     Set INQUIRY_WEBHOOK_URL (and optionally INQUIRY_WEBHOOK_SECRET).
 *     The payload is POSTed as JSON: { type, receivedAt, meta, inquiry }.
 *
 *  2. Resend (transactional email)
 *     npm i resend
 *     import { Resend } from "resend";
 *     const resend = new Resend(process.env.RESEND_API_KEY);
 *     await resend.emails.send({ from, to, subject, text: renderInquiryText(inquiry) });
 *
 *  3. SMTP (Nodemailer)
 *     npm i nodemailer
 *     const transport = nodemailer.createTransport({ host, port, auth });
 *     await transport.sendMail({ from, to, subject, text: renderInquiryText(inquiry) });
 *
 * Attachments: the inquiry only carries file metadata. Once uploads are
 * connected (see upload.ts / app/api/upload/route.ts) each attachment will
 * include a `url` you can forward or fetch here.
 */

export interface DeliveryMeta {
  receivedAt: string;
  userAgent?: string | null;
  referer?: string | null;
}

export interface DeliveryResult {
  delivered: boolean;
  channel: "webhook" | "none";
}

export async function deliverInquiry(inquiry: ProjectInquiry, meta: DeliveryMeta): Promise<DeliveryResult> {
  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL;

  if (webhookUrl) {
    const headers: Record<string, string> = { "content-type": "application/json" };
    if (process.env.INQUIRY_WEBHOOK_SECRET) {
      headers.authorization = `Bearer ${process.env.INQUIRY_WEBHOOK_SECRET}`;
    }
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({ type: "project-inquiry", receivedAt: meta.receivedAt, meta, inquiry }),
    });
    if (!response.ok) {
      throw new Error(`Inquiry webhook responded with ${response.status}`);
    }
    return { delivered: true, channel: "webhook" };
  }

  // TODO: connect Resend, SMTP or another provider (see notes above).
  return { delivered: false, channel: "none" };
}

/** Plain-text rendering, handy for email bodies. */
export function renderInquiryText(inquiry: ProjectInquiry): string {
  const lines: string[] = [
    `Name: ${inquiry.fullName}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Location: ${inquiry.location}`,
    `Client type: ${inquiry.clientType}`,
    "",
    `Project types: ${inquiry.projectTypes.join(", ")}`,
    `Property type: ${inquiry.propertyType ?? "-"}`,
    `Spaces: ${inquiry.spaces || "-"}`,
    "",
    `Description:\n${inquiry.description}`,
    "",
    `References: ${inquiry.references || "-"}`,
    `Stage: ${inquiry.stage ?? "-"}`,
    `Timing: ${inquiry.timing ?? "-"}`,
    `Timeline notes: ${inquiry.timeline || "-"}`,
    "",
    `Attachments: ${inquiry.attachments.length ? inquiry.attachments.map((a) => `${a.name} (${a.size} bytes)${a.url ? ` ${a.url}` : ""}`).join("; ") : "-"}`,
    `Source: ${inquiry.source ?? "-"}`,
    `Notes: ${inquiry.notes || "-"}`,
  ];
  return lines.join("\n");
}
