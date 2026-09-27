/**
 * Client-side upload abstraction for the questionnaire's Documents step.
 *
 * Two adapters exist:
 *  - `simulated` (default): files stay in the browser; progress is animated so
 *    the UI can be designed and tested. Nothing is transferred and the UI says so.
 *  - `api`: files are POSTed to /api/upload with real progress events. That
 *    route must be connected to storage first (S3 / Cloudflare R2 / Laravel /
 *    local disk) — see app/api/upload/route.ts.
 *
 * Switch with NEXT_PUBLIC_UPLOAD_MODE=api once the backend is ready.
 */

export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB per file
export const MAX_FILES = 10;

/** Extensions offered in the file picker and accepted by validateFile(). */
export const ACCEPTED_EXTENSIONS = [
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".mp4",
  ".mov",
  ".doc",
  ".docx",
  ".dwg",
  ".dxf",
  ".zip",
] as const;

export const ACCEPT_ATTRIBUTE = ACCEPTED_EXTENSIONS.join(",");

export type UploadMode = "simulated" | "api";

export const uploadMode: UploadMode = process.env.NEXT_PUBLIC_UPLOAD_MODE === "api" ? "api" : "simulated";

export interface UploadResult {
  id: string;
  url?: string;
}

export interface UploadAdapter {
  upload(file: File, onProgress: (percent: number) => void, signal?: AbortSignal): Promise<UploadResult>;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export type FileProblem =
  | { code: "maxFiles"; max: number }
  | { code: "fileTooLarge"; name: string; max: string }
  | { code: "fileType"; name: string };

/** Returns a locale-independent problem description, or null when the file is accepted. */
export function validateFile(file: File, existingCount: number): FileProblem | null {
  if (existingCount >= MAX_FILES) return { code: "maxFiles", max: MAX_FILES };
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return { code: "fileTooLarge", name: file.name, max: formatFileSize(MAX_FILE_SIZE_BYTES) };
  }
  const ext = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
  if (!(ACCEPTED_EXTENSIONS as readonly string[]).includes(ext)) {
    return { code: "fileType", name: file.name };
  }
  return null;
}

function createId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `f_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

const simulatedAdapter: UploadAdapter = {
  upload(file, onProgress, signal) {
    return new Promise((resolve, reject) => {
      const total = 700 + Math.min(file.size / 50000, 900);
      const start = performance.now();
      let frame = 0;
      const tick = () => {
        if (signal?.aborted) return reject(new DOMException("Aborted", "AbortError"));
        const pct = Math.min(100, Math.round(((performance.now() - start) / total) * 100));
        onProgress(pct);
        if (pct >= 100) return resolve({ id: createId() });
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
      signal?.addEventListener("abort", () => cancelAnimationFrame(frame), { once: true });
    });
  },
};

const apiAdapter: UploadAdapter = {
  upload(file, onProgress, signal) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const form = new FormData();
      form.append("file", file);
      xhr.open("POST", "/api/upload");
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
      };
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const json = JSON.parse(xhr.responseText) as { id: string; url?: string };
            resolve(json);
          } catch {
            reject(new Error("Unexpected upload response."));
          }
        } else {
          reject(new Error(`Upload failed (${xhr.status}).`));
        }
      };
      xhr.onerror = () => reject(new Error("Upload failed."));
      signal?.addEventListener("abort", () => xhr.abort(), { once: true });
      xhr.send(form);
    });
  },
};

export function getUploadAdapter(): UploadAdapter {
  return uploadMode === "api" ? apiAdapter : simulatedAdapter;
}
