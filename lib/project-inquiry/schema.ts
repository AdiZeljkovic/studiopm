import { z } from "zod";

/**
 * Single source of truth for the project questionnaire.
 * Used by the client form (React Hook Form) and the API route.
 */
export const clientTypes = ["private", "investor", "business", "other"] as const;
export const projectTypes = ["new-construction", "renovation", "transformation", "bespoke", "other"] as const;
export const propertyTypes = ["house", "apartment", "second-residence", "establishment", "investment", "other"] as const;
export const projectStages = ["exploring", "property-identified", "planning", "plans-available", "construction-started", "other"] as const;
export const timings = ["asap", "3-months", "3-6-months", "6-12-months", "12-plus", "not-sure"] as const;
export const sources = ["recommendation", "search", "social", "portmix", "other"] as const;

export const attachmentStatuses = ["pending", "uploading", "ready", "error"] as const;

const optionalEnum = <const T extends readonly [string, ...string[]]>(values: T) => z.enum(values).optional();

const optionalText = (max: number, message: string) => z.string().trim().max(max, message).optional();

const checkboxList = <const T extends readonly [string, ...string[]]>(values: T, message: string) =>
  z.array(z.enum(values)).min(1, message);

export const attachmentSchema = z.object({
  id: z.string(),
  name: z.string().max(255),
  size: z.number().nonnegative(),
  type: z.string().max(120),
  status: z.enum(attachmentStatuses),
  /** Set once a real storage backend returns a location. */
  url: z.string().optional(),
});

/**
 * Validation messages are keys, translated in the UI through
 * content.inquiry.validation so the schema stays locale-independent.
 */
export const projectInquirySchema = z.object({
  locale: z.enum(["en", "fr"]).optional(),

  // 01 - Contact
  fullName: z.string().trim().min(2, "fullName"),
  email: z.email("email"),
  phone: z.string().trim().min(6, "phone"),
  location: z.string().trim().min(2, "location"),
  clientType: z.enum(clientTypes, { message: "clientType" }),

  // 02 - Project
  projectTypes: checkboxList(projectTypes, "projectTypes"),
  propertyType: optionalEnum(propertyTypes),
  spaces: optionalText(2000, "tooLong"),

  // 03 - Vision
  description: z.string().trim().min(20, "description"),
  references: optionalText(3000, "tooLong"),

  // 04 - Timeline
  stage: optionalEnum(projectStages),
  timing: optionalEnum(timings),
  timeline: optionalText(3000, "tooLong"),

  // 05 - Documents
  attachments: z.array(attachmentSchema).max(10, "maxFiles"),

  // 06 - Finish
  source: optionalEnum(sources),
  notes: optionalText(3000, "tooLong"),
  consent: z.boolean().refine((v) => v === true, {
    message: "consent",
  }),
});

export type ProjectInquiry = z.infer<typeof projectInquirySchema>;
export type Attachment = z.infer<typeof attachmentSchema>;

/**
 * Native radio groups report `null` when nothing is selected and checkbox
 * groups can report `false` through React Hook Form. Normalise those values
 * before validation so optional questions never block a step.
 */
export function normaliseInquiryValues(values: ProjectInquiry): ProjectInquiry {
  const raw = values as Record<string, unknown>;
  const enumKeys = ["propertyType", "stage", "timing", "source"] as const;
  const textKeys = ["spaces", "references", "timeline", "notes"] as const;
  const next: Record<string, unknown> = { ...raw };
  for (const key of enumKeys) {
    if (next[key] === null || next[key] === "" || next[key] === false) next[key] = undefined;
  }
  for (const key of textKeys) {
    if (next[key] === null || next[key] === undefined) next[key] = "";
  }
  const pt = next.projectTypes;
  next.projectTypes = Array.isArray(pt) ? pt : typeof pt === "string" && pt ? [pt] : [];
  next.attachments = Array.isArray(next.attachments) ? next.attachments : [];
  next.consent = next.consent === true;
  return next as ProjectInquiry;
}

export const INQUIRY_STEP_COUNT = 6;

/** Fields validated when leaving each step (index = step). */
export const stepFields: ReadonlyArray<ReadonlyArray<keyof ProjectInquiry>> = [
  ["fullName", "email", "phone", "location", "clientType"],
  ["projectTypes", "propertyType", "spaces"],
  ["description", "references"],
  ["stage", "timing", "timeline"],
  ["attachments"],
  ["source", "notes", "consent"],
];

export const inquiryDefaultValues: ProjectInquiry = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  clientType: undefined as unknown as ProjectInquiry["clientType"],
  projectTypes: [],
  propertyType: undefined,
  spaces: "",
  description: "",
  references: "",
  stage: undefined,
  timing: undefined,
  timeline: "",
  attachments: [],
  source: undefined,
  notes: "",
  consent: false,
};
