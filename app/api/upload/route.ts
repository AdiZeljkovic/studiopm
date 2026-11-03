import { NextResponse } from "next/server";
import { ACCEPTED_EXTENSIONS, MAX_FILE_SIZE_BYTES } from "@/lib/project-inquiry/upload";
import { ogranicenje } from "@/lib/ogranicenje";

export const runtime = "nodejs";

// Po IP adresi: 30 fajlova u 10 minuta (upitnik prima najviše 10).
const previse = ogranicenje(30, 10 * 60 * 1000);

/**
 * POST /api/upload  (multipart/form-data, field "file")
 *
 * Fajl ide u PortMix CMS (`/api/prilozi/forma/studio`, sa servera, ista tajna kao upit)
 * i tamo čeka upit. Odgovor `{ id, ref }`: `ref` se šalje uz upit, pa ga panel veže
 * za taj upit. Bez CMS_URL / INQUIRY_WEBHOOK_SECRET → 501 (ništa se ne pretvara da je sačuvano).
 *
 * Klijent ovu rutu koristi tek uz NEXT_PUBLIC_UPLOAD_MODE=api.
 */
export async function POST(request: Request) {
  const cms = process.env.CMS_URL?.replace(/\/+$/, "");
  const tajna = process.env.INQUIRY_WEBHOOK_SECRET;
  if (!cms || !tajna) {
    return NextResponse.json({ error: "Upload storage is not configured." }, { status: 501 });
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_FILE_SIZE_BYTES + 64 * 1024) {
    return NextResponse.json({ error: "File is too large." }, { status: 413 });
  }
  if (previse(request)) {
    return NextResponse.json({ error: "Too many files. Please try again later." }, { status: 429 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return NextResponse.json({ error: "File is too large." }, { status: 413 });
  }
  const ext = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
  if (!(ACCEPTED_EXTENSIONS as readonly string[]).includes(ext)) {
    return NextResponse.json({ error: "Unsupported file type." }, { status: 415 });
  }

  const zaCms = new FormData();
  zaCms.append("file", file, file.name);
  try {
    const odgovor = await fetch(`${cms}/api/prilozi/forma/studio`, {
      method: "POST",
      headers: { authorization: `Bearer ${tajna}` },
      body: zaCms,
      signal: AbortSignal.timeout(120_000),
    });
    const d = (await odgovor.json().catch(() => ({}))) as { kljuc?: string };
    if (!odgovor.ok || !d.kljuc) {
      return NextResponse.json({ error: "The file could not be stored." }, { status: odgovor.status === 413 ? 413 : 502 });
    }
    return NextResponse.json({ id: d.kljuc, ref: d.kljuc });
  } catch {
    return NextResponse.json({ error: "The file could not be stored." }, { status: 502 });
  }
}
