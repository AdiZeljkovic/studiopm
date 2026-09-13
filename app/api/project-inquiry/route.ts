import { NextResponse } from "next/server";
import { z } from "zod";
import { projectInquirySchema } from "@/lib/project-inquiry/schema";
import { deliverInquiry } from "@/lib/project-inquiry/delivery";

export const runtime = "nodejs";

/**
 * POST /api/project-inquiry
 *
 * Receives the multi-step questionnaire, validates it against the shared
 * Zod schema and hands it to lib/project-inquiry/delivery.ts.
 * See that file for how to connect email or a backend.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  // Honeypot: the client renders a visually hidden "website" field that
  // humans never fill in. Bots that do are silently accepted and dropped.
  if (typeof body === "object" && body !== null && "website" in body && (body as { website?: string }).website) {
    return NextResponse.json({ ok: true, delivered: false, channel: "none" });
  }

  const parsed = projectInquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed.", issues: z.flattenError(parsed.error).fieldErrors },
      { status: 422 },
    );
  }

  try {
    const result = await deliverInquiry(parsed.data, {
      receivedAt: new Date().toISOString(),
      userAgent: request.headers.get("user-agent"),
      referer: request.headers.get("referer"),
    });
    return NextResponse.json({ ok: true, ...result });
  } catch {
    return NextResponse.json(
      { ok: false, error: "The inquiry could not be delivered. Please try again later." },
      { status: 502 },
    );
  }
}
