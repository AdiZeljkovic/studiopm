"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { FormProvider, useForm, useFormContext, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";
import type { Content } from "@/lib/i18n";
import {
  INQUIRY_STEP_COUNT,
  inquiryDefaultValues,
  normaliseInquiryValues,
  projectInquirySchema,
  stepFields,
  type ProjectInquiry,
} from "@/lib/project-inquiry/schema";
import { clearDraft, hasDraftContent, parseDraft, readRawDraft, saveDraft } from "@/lib/project-inquiry/draft";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Progress } from "./Progress";
import { StepShell } from "./StepShell";
import { Summary } from "./Summary";
import { SuccessState } from "./SuccessState";
import { TextField } from "./fields/TextField";
import { TextareaField } from "./fields/TextareaField";
import { ChoiceGroup } from "./fields/ChoiceGroup";
import { FileDropzone } from "./fields/FileDropzone";
import { FieldMessage } from "./fields/FieldChrome";

interface ProjectInquiryFormProps {
  content: Content["inquiry"];
  privacyHref: string;
}

type Status = "idle" | "submitting" | "success" | "error";

const LAST_STEP = INQUIRY_STEP_COUNT - 1;
const clampStep = (n: number) => Math.min(Math.max(n, 0), LAST_STEP);
const noopSubscribe = () => () => {};

// The draft is read from localStorage exactly once per page load so that the
// snapshot stays stable across renders (autosave must not re-trigger a restore).
let initialDraftRaw: string | null | undefined;
const readInitialDraft = () => {
  if (initialDraftRaw === undefined) initialDraftRaw = readRawDraft();
  return initialDraftRaw;
};

const zodInquiryResolver = zodResolver(projectInquirySchema);
/** Normalises native form values (null radios, false checkboxes) before Zod runs. */
const inquiryResolver: typeof zodInquiryResolver = (values, context, options) =>
  zodInquiryResolver(normaliseInquiryValues(values), context, options);

export function ProjectInquiryForm({ content, privacyHref }: ProjectInquiryFormProps) {
  // The saved draft is read from localStorage after hydration (null on the
  // server) and drives the initial step and the "restored" notice.
  const rawDraft = useSyncExternalStore(noopSubscribe, readInitialDraft, () => null);
  const draft = useMemo(() => parseDraft(rawDraft), [rawDraft]);
  const hasDraft = Boolean(draft && hasDraftContent(draft.values));

  const [stepOverride, setStepOverride] = useState<number | null>(null);
  const [draftDismissed, setDraftDismissed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [honeypot, setHoneypot] = useState("");
  const step = stepOverride ?? (hasDraft && draft ? clampStep(draft.step) : 0);
  const restored = hasDraft && !draftDismissed;
  const stepRef = useRef(step);
  const topRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const methods = useForm<ProjectInquiry>({
    resolver: inquiryResolver,
    defaultValues: inquiryDefaultValues,
    mode: "onTouched",
  });
  const { handleSubmit, trigger, subscribe, reset, formState } = methods;

  // Push restored values into the form once the draft is known.
  useEffect(() => {
    if (draft && hasDraftContent(draft.values)) {
      reset({ ...inquiryDefaultValues, ...draft.values });
    }
  }, [draft, reset]);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  // Debounced autosave of every change.
  useEffect(() => {
    let timer: number | undefined;
    const unsubscribe = subscribe({
      formState: { values: true },
      callback: ({ values }) => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => saveDraft(values as Partial<ProjectInquiry>, stepRef.current), 500);
      },
    });
    return () => {
      unsubscribe();
      window.clearTimeout(timer);
    };
  }, [subscribe]);

  const goTo = useCallback((next: number) => {
    const clamped = clampStep(next);
    stepRef.current = clamped;
    setStepOverride(clamped);
    window.requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ block: "start" });
      window.setTimeout(() => headingRef.current?.focus({ preventScroll: true }), 350);
    });
  }, []);

  const next = useCallback(async () => {
    const valid = await trigger([...stepFields[step]], { shouldFocus: true });
    if (valid) goTo(step + 1);
  }, [goTo, step, trigger]);

  const onInvalid = (errors: FieldErrors<ProjectInquiry>) => {
    const firstBadStep = stepFields.findIndex((fields) => fields.some((f) => f in errors));
    if (firstBadStep >= 0 && firstBadStep !== step) goTo(firstBadStep);
  };

  const onValid = async (data: ProjectInquiry) => {
    setStatus("submitting");
    try {
      const response = await fetch("/api/project-inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...normaliseInquiryValues(data), website: honeypot }),
      });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      clearDraft();
      setStatus("success");
      window.requestAnimationFrame(() => topRef.current?.scrollIntoView({ block: "start" }));
    } catch {
      setStatus("error");
    }
  };

  // Enter inside a text input advances the step instead of submitting early.
  const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    if (e.key === "Enter" && target.tagName === "INPUT" && (target as HTMLInputElement).type !== "checkbox") {
      if (step < LAST_STEP) {
        e.preventDefault();
        void next();
      }
    }
  };

  const startAgain = () => {
    clearDraft();
    reset(inquiryDefaultValues);
    setDraftDismissed(true);
    goTo(0);
  };

  const s = content.steps;
  const optional = content.nav.optional;

  if (status === "success") {
    return (
      <div ref={topRef} className="scroll-mt-24">
        <SuccessState content={content.success} />
      </div>
    );
  }

  return (
    <div ref={topRef} className="scroll-mt-24">
      <FormProvider {...methods}>
        <form noValidate onSubmit={(e) => void handleSubmit(onValid, onInvalid)(e)} onKeyDown={onKeyDown}>
          <Progress eyebrow={content.eyebrow} step={step} names={content.stepNames} onJump={goTo} />

          {restored ? (
            <p className="label-sm mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-taupe">
              <span>{content.draft.restored}</span>
              <button type="button" onClick={startAgain} className="link-underline text-brand">
                {content.draft.clear}
              </button>
            </p>
          ) : null}

          {/* Honeypot: hidden from people, tempting for bots. */}
          <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="inquiry-website">Website</label>
            <input
              id="inquiry-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <div className="mt-12 lg:mt-20">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: EASE_OUT }}
              >
                {step === 0 ? (
                  <StepShell index={0} title={s.contact.title} intro={s.contact.intro} aside={s.contact.aside} headingRef={headingRef}>
                    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
                      <TextField name="fullName" label={s.contact.fields.fullName} autoComplete="name" />
                      <TextField name="email" label={s.contact.fields.email} type="email" autoComplete="email" inputMode="email" />
                      <TextField name="phone" label={s.contact.fields.phone} type="tel" autoComplete="tel" inputMode="tel" />
                      <TextField
                        name="location"
                        label={s.contact.fields.location}
                        hint={s.contact.fields.locationHint}
                        autoComplete="address-level2"
                      />
                    </div>
                    <ChoiceGroup name="clientType" type="radio" legend={s.contact.clientType.question} options={s.contact.clientType.options} />
                  </StepShell>
                ) : null}

                {step === 1 ? (
                  <StepShell index={1} title={s.project.title} intro={s.project.intro} aside={s.project.aside} headingRef={headingRef}>
                    <ChoiceGroup name="projectTypes" type="checkbox" legend={s.project.projectTypes.question} options={s.project.projectTypes.options} />
                    <ChoiceGroup
                      name="propertyType"
                      type="radio"
                      legend={s.project.propertyType.question}
                      options={s.project.propertyType.options}
                      optionalLabel={optional}
                    />
                    <TextareaField
                      name="spaces"
                      label={s.project.spaces.label}
                      hint={s.project.spaces.hint}
                      placeholder={s.project.spaces.placeholder}
                      optionalLabel={optional}
                    />
                  </StepShell>
                ) : null}

                {step === 2 ? (
                  <StepShell index={2} title={s.vision.title} intro={s.vision.intro} aside={s.vision.aside} headingRef={headingRef}>
                    <TextareaField
                      name="description"
                      label={s.vision.description.label}
                      hint={s.vision.description.hint}
                      placeholder={s.vision.description.placeholder}
                      size="lg"
                    />
                    <TextareaField
                      name="references"
                      label={s.vision.references.label}
                      hint={s.vision.references.hint}
                      placeholder={s.vision.references.placeholder}
                      optionalLabel={optional}
                    />
                  </StepShell>
                ) : null}

                {step === 3 ? (
                  <StepShell index={3} title={s.timeline.title} intro={s.timeline.intro} aside={s.timeline.aside} headingRef={headingRef}>
                    <ChoiceGroup name="stage" type="radio" legend={s.timeline.stage.question} options={s.timeline.stage.options} optionalLabel={optional} />
                    <ChoiceGroup name="timing" type="radio" legend={s.timeline.timing.question} options={s.timeline.timing.options} optionalLabel={optional} />
                    <TextareaField
                      name="timeline"
                      label={s.timeline.details.label}
                      placeholder={s.timeline.details.placeholder}
                      optionalLabel={optional}
                      size="lg"
                    />
                  </StepShell>
                ) : null}

                {step === 4 ? (
                  <StepShell index={4} title={s.documents.title} intro={s.documents.intro} aside={s.documents.aside} headingRef={headingRef}>
                    <ul className="label-sm flex flex-wrap gap-x-5 gap-y-2 text-taupe">
                      {s.documents.examples.map((example) => (
                        <li key={example}>{example}</li>
                      ))}
                    </ul>
                    <FileDropzone labels={s.documents.dropzone} />
                    <p className="text-body text-taupe">{s.documents.reassurance}</p>
                  </StepShell>
                ) : null}

                {step === 5 ? (
                  <StepShell index={5} title={s.finish.title} intro={s.finish.intro} aside={s.finish.aside} headingRef={headingRef}>
                    <ChoiceGroup name="source" type="radio" legend={s.finish.source.question} options={s.finish.source.options} optionalLabel={optional} />
                    <TextareaField name="notes" label={s.finish.notes.label} placeholder={s.finish.notes.placeholder} optionalLabel={optional} />
                    <Summary content={content} onEdit={goTo} />
                    <ConsentField label={s.finish.consent.label} linkLabel={s.finish.consent.privacyLink} href={privacyHref} />
                  </StepShell>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-14 grid grid-cols-12 gap-x-6">
            <div className="col-span-12 flex items-center justify-between border-t border-line pt-6 lg:col-span-7 lg:col-start-6">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={() => goTo(step - 1)}
                  className="group label inline-flex items-center gap-3 text-taupe transition-colors hover:text-ink"
                >
                  <ArrowLeft
                    aria-hidden="true"
                    strokeWidth={1.5}
                    className="size-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-x-1"
                  />
                  <span>{content.nav.previous}</span>
                </button>
              ) : (
                <span />
              )}
              {step < LAST_STEP ? (
                <ArrowLink type="button" onClick={() => void next()} variant="solid">
                  {content.nav.next}
                </ArrowLink>
              ) : (
                <ArrowLink type="submit" variant="solid" disabled={status === "submitting" || formState.isSubmitting}>
                  {status === "submitting" ? content.nav.sending : content.nav.submit}
                </ArrowLink>
              )}
            </div>
            {status === "error" ? (
              <div className="col-span-12 lg:col-span-7 lg:col-start-6">
                <FieldMessage error={content.errors.submit} errorId="inquiry-submit-error" />
              </div>
            ) : null}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

interface ConsentFieldProps {
  label: string;
  linkLabel: string;
  href: string;
}

function ConsentField({ label, linkLabel, href }: ConsentFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProjectInquiry>();
  const error = errors.consent?.message;
  return (
    <div>
      <label
        className={cn(
          "group flex cursor-pointer items-start gap-4 border px-5 py-4 transition-colors duration-300",
          "has-checked:border-brand has-checked:bg-brand/[0.035]",
          "has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand",
          error ? "border-brand/50" : "border-line hover:border-line-strong",
        )}
      >
        <input type="checkbox" {...register("consent")} className="sr-only" />
        <span
          aria-hidden="true"
          className="mt-[0.3rem] size-3 shrink-0 border border-line-strong transition-colors duration-300 group-has-checked:border-brand group-has-checked:bg-brand"
        />
        <span className="text-[0.9375rem] leading-snug text-ink">
          {label}{" "}
          <Link href={href} className="link-underline text-taupe" target="_blank" rel="noopener noreferrer">
            {linkLabel}
          </Link>
        </span>
      </label>
      <FieldMessage error={error} errorId="inquiry-consent-error" />
    </div>
  );
}
