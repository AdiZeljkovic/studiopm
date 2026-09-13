import type { ProjectInquiry } from "@/lib/project-inquiry/schema";

/**
 * Autosave of the questionnaire to localStorage so a visitor can leave and
 * come back without losing their answers. Attachments are excluded because
 * File objects cannot be persisted.
 */
const STORAGE_KEY = "studio-portmix:project-inquiry:v1";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 14; // two weeks

export type DraftValues = Omit<ProjectInquiry, "attachments" | "consent">;

export interface InquiryDraft {
  values: Partial<DraftValues>;
  step: number;
  savedAt: string;
}

function storage(): Storage | null {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}

/** Raw stored string; stable between reads so it can back useSyncExternalStore. */
export function readRawDraft(): string | null {
  try {
    return storage()?.getItem(STORAGE_KEY) ?? null;
  } catch {
    return null;
  }
}

export function parseDraft(raw: string | null): InquiryDraft | null {
  if (!raw) return null;
  try {
    const draft = JSON.parse(raw) as InquiryDraft;
    if (!draft?.savedAt || Date.now() - new Date(draft.savedAt).getTime() > MAX_AGE_MS) {
      clearDraft();
      return null;
    }
    return draft;
  } catch {
    return null;
  }
}

export function loadDraft(): InquiryDraft | null {
  return parseDraft(readRawDraft());
}

export function saveDraft(values: Partial<ProjectInquiry>, step: number): void {
  const store = storage();
  if (!store) return;
  // Strip anything that should not be persisted.
  const { attachments: _attachments, consent: _consent, ...rest } = values;
  void _attachments;
  void _consent;
  const draft: InquiryDraft = { values: rest, step, savedAt: new Date().toISOString() };
  try {
    store.setItem(STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Storage may be full or blocked; autosave is best-effort.
  }
}

export function hasDraftContent(values: Partial<DraftValues>): boolean {
  return Object.values(values).some((v) => (Array.isArray(v) ? v.length > 0 : Boolean(v)));
}

export function clearDraft(): void {
  try {
    storage()?.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
