import type { NewsletterDoc } from "@/lib/newsletter/types";

/**
 * Draft storage in the browser (localStorage).
 *
 * Drafts live on the computer and browser where they were written. Use
 * "Exporter le brouillon" / "Importer" in the editor to move them between
 * machines, or replace these functions with calls to a database or API
 * (same signatures) to share drafts between people.
 */
const KEY = "studio-portmix:newsletters:v1";
const LAST_KEY = "studio-portmix:newsletters:last";

function read(): NewsletterDoc[] {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? (parsed as NewsletterDoc[]) : [];
  } catch {
    return [];
  }
}

function write(docs: NewsletterDoc[]) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(docs));
  } catch {
    // Storage full or blocked: drafts can still be exported manually.
  }
}

export function listDrafts(): NewsletterDoc[] {
  return read().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function saveDraft(doc: NewsletterDoc): NewsletterDoc[] {
  const docs = read().filter((d) => d.id !== doc.id);
  docs.push(doc);
  write(docs);
  rememberLast(doc.id);
  return listDrafts();
}

export function deleteDraft(id: string): NewsletterDoc[] {
  write(read().filter((d) => d.id !== id));
  return listDrafts();
}

export function rememberLast(id: string) {
  try {
    window.localStorage.setItem(LAST_KEY, id);
  } catch {
    // ignore
  }
}

export function lastDraftId(): string | null {
  try {
    return window.localStorage.getItem(LAST_KEY);
  } catch {
    return null;
  }
}

/** Minimal shape check used when importing a JSON file. */
export function isNewsletterDoc(value: unknown): value is NewsletterDoc {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.template === "string" &&
    typeof v.subject === "string" &&
    typeof v.hero === "object" &&
    typeof v.services === "object" &&
    typeof v.feature === "object" &&
    typeof v.footer === "object"
  );
}
