import { NextResponse } from "next/server";
import { ACCEPTED_EXTENSIONS, MAX_FILE_SIZE_BYTES } from "@/lib/project-inquiry/upload";

export const runtime = "nodejs";

/**
 * POST /api/upload  (multipart/form-data, field "file")
 *
 * Storage is NOT connected yet. This handler validates the file and returns
 * 501 so nothing silently pretends to persist data. To connect storage,
 * replace the TODO block with one of:
 *
 *  - S3 / Cloudflare R2:
 *      import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
 *      const client = new S3Client({ region, endpoint, credentials });
 *      await client.send(new PutObjectCommand({ Bucket, Key, Body: buffer, ContentType }));
 *      return NextResponse.json({ id: key, url: publicUrl });
 *
 *  - Laravel / external API: forward the multipart body with fetch() and
 *    return the { id, url } the backend responds with.
 *
 *  - Local disk (single server only): fs.promises.writeFile(path.join(UPLOAD_DIR, key), buffer)
 *
 * Then set NEXT_PUBLIC_UPLOAD_MODE=api so the client uses this route.
 */
export async function POST(request: Request) {
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

  // TODO: persist `file` to storage and return { id, url }.
  return NextResponse.json({ error: "Upload storage is not configured." }, { status: 501 });
}
