"use client";

import { useWatch } from "react-hook-form";
import { format } from "@/lib/i18n";
import type { Content } from "@/lib/i18n";
import type { ProjectInquiry } from "@/lib/project-inquiry/schema";
import type { ChoiceOption } from "@/data/content/types";

interface SummaryProps {
  content: Content["inquiry"];
  onEdit: (step: number) => void;
}

const labelFor = (options: readonly ChoiceOption[], value?: string) =>
  options.find((o) => o.value === value)?.label;

const truncate = (text: string, max = 180) => (text.length > max ? `${text.slice(0, max).trimEnd()}…` : text);

/** Review block shown on the final step. */
export function Summary({ content, onEdit }: SummaryProps) {
  const values = useWatch<ProjectInquiry>();
  const s = content.steps;
  const empty = s.finish.summary.empty;

  const rows: { step: number; label: string; value?: string }[] = [
    { step: 0, label: s.contact.fields.fullName, value: values.fullName },
    { step: 0, label: s.contact.fields.email, value: values.email },
    { step: 0, label: s.contact.fields.phone, value: values.phone },
    { step: 0, label: s.contact.fields.location, value: values.location },
    { step: 0, label: s.contact.clientType.question, value: labelFor(s.contact.clientType.options, values.clientType) },
    {
      step: 1,
      label: s.project.projectTypes.question,
      value: values.projectTypes
        ?.map((v) => labelFor(s.project.projectTypes.options, v))
        .filter(Boolean)
        .join(", "),
    },
    { step: 1, label: s.project.propertyType.question, value: labelFor(s.project.propertyType.options, values.propertyType) },
    { step: 2, label: s.vision.description.label, value: values.description ? truncate(values.description) : undefined },
    { step: 3, label: s.timeline.stage.question, value: labelFor(s.timeline.stage.options, values.stage) },
    { step: 3, label: s.timeline.timing.question, value: labelFor(s.timeline.timing.options, values.timing) },
    {
      step: 4,
      label: s.documents.title.join(" "),
      value:
        values.attachments && values.attachments.length > 0
          ? values.attachments.length === 1
            ? s.finish.summary.attachmentsOne
            : format(s.finish.summary.attachmentsMany, { count: values.attachments.length })
          : undefined,
    },
  ];

  return (
    <div>
      <p className="label-sm text-taupe">{s.finish.summary.title}</p>
      <dl className="mt-4 border-t border-line">
        {rows.map((row) => (
          <div
            key={`${row.step}-${row.label}`}
            className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[11rem_1fr_auto]"
          >
            <dt className="label-sm pt-0.5 text-taupe sm:col-start-1">{row.label}</dt>
            <dd className="col-span-2 text-[0.9375rem] leading-snug text-ink sm:col-span-1 sm:col-start-2">
              {row.value || <span className="text-taupe-light">{empty}</span>}
            </dd>
            <dd className="col-start-2 row-start-1 sm:col-start-3">
              <button
                type="button"
                onClick={() => onEdit(row.step)}
                className="label-sm link-underline text-taupe transition-colors hover:text-brand"
              >
                {content.nav.edit}
              </button>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
