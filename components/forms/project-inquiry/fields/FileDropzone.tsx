"use client";

import { useCallback, useId, useRef, useState, type DragEvent } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { format } from "@/lib/i18n";
import { useValidationMessages } from "../messages";
import type { Attachment, ProjectInquiry } from "@/lib/project-inquiry/schema";
import {
  ACCEPT_ATTRIBUTE,
  MAX_FILES,
  MAX_FILE_SIZE_BYTES,
  formatFileSize,
  getUploadAdapter,
  uploadMode,
  validateFile,
  type FileProblem,
} from "@/lib/project-inquiry/upload";
import { FieldMessage } from "./FieldChrome";

interface FileDropzoneProps {
  labels: {
    title: string;
    hint: string;
    browse: string;
    remove: string;
    uploading: string;
    ready: string;
    error: string;
    simulatedNotice: string;
  };
}

function createLocalId(): string {
  return `att_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function FileDropzone({ labels }: FileDropzoneProps) {
  const inputId = useId();
  const { getValues, setValue } = useFormContext<ProjectInquiry>();
  const { field, fieldState } = useController<ProjectInquiry, "attachments">({ name: "attachments" });
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const messages = useValidationMessages();
  const describe = useCallback(
    (problem: FileProblem) => {
      const { code, ...values } = problem;
      const template = messages?.[code];
      return template ? format(template, values) : code;
    },
    [messages],
  );
  const controllers = useRef(new Map<string, AbortController>());
  const adapter = useRef(getUploadAdapter());

  const patch = useCallback(
    (id: string, changes: Partial<Attachment>) => {
      const current = getValues("attachments");
      setValue(
        "attachments",
        current.map((a) => (a.id === id ? { ...a, ...changes } : a)),
        { shouldDirty: true },
      );
    },
    [getValues, setValue],
  );

  const startUpload = useCallback(
    (attachment: Attachment, file: File) => {
      const controller = new AbortController();
      controllers.current.set(attachment.id, controller);
      adapter.current
        .upload(file, (pct) => setProgress((p) => ({ ...p, [attachment.id]: pct })), controller.signal)
        .then((result) => patch(attachment.id, { status: "ready", url: result.url }))
        .catch((err: unknown) => {
          if (err instanceof DOMException && err.name === "AbortError") return;
          patch(attachment.id, { status: "error" });
        })
        .finally(() => controllers.current.delete(attachment.id));
    },
    [patch],
  );

  const addFiles = useCallback(
    (list: FileList | File[]) => {
      setLocalError(null);
      const current = getValues("attachments");
      const additions: { attachment: Attachment; file: File }[] = [];
      for (const file of Array.from(list)) {
        const problem = validateFile(file, current.length + additions.length);
        if (problem) {
          setLocalError(describe(problem));
          continue;
        }
        additions.push({
          attachment: { id: createLocalId(), name: file.name, size: file.size, type: file.type, status: "uploading" },
          file,
        });
      }
      if (!additions.length) return;
      field.onChange([...current, ...additions.map((a) => a.attachment)]);
      additions.forEach(({ attachment, file }) => startUpload(attachment, file));
    },
    [describe, field, getValues, startUpload],
  );

  const remove = useCallback(
    (id: string) => {
      controllers.current.get(id)?.abort();
      controllers.current.delete(id);
      setValue(
        "attachments",
        getValues("attachments").filter((a) => a.id !== id),
        { shouldDirty: true },
      );
      setProgress((p) => {
        const next = { ...p };
        delete next[id];
        return next;
      });
    },
    [getValues, setValue],
  );

  const onDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const error = fieldState.error?.message ?? localError ?? undefined;
  const hint = format(labels.hint, { maxSize: formatFileSize(MAX_FILE_SIZE_BYTES), maxFiles: MAX_FILES });

  return (
    <div>
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center border border-dashed px-6 py-14 text-center transition-colors duration-300 sm:py-20",
          "has-focus-visible:outline has-focus-visible:outline-1 has-focus-visible:outline-offset-4 has-focus-visible:outline-brand",
          dragging ? "border-brand bg-brand/[0.035]" : "border-line-strong hover:border-ink",
        )}
      >
        <input
          id={inputId}
          type="file"
          multiple
          accept={ACCEPT_ATTRIBUTE}
          className="sr-only"
          onChange={(e) => {
            if (e.target.files?.length) addFiles(e.target.files);
            e.target.value = "";
          }}
          onBlur={field.onBlur}
        />
        <Upload aria-hidden="true" strokeWidth={1} className="size-6 text-taupe" />
        <span className="mt-5 text-[1.0625rem] text-ink">{labels.title}</span>
        <span className="mt-2 max-w-sm text-[0.8125rem] leading-relaxed text-taupe">{hint}</span>
        <span className="label mt-6 inline-flex border border-line-strong px-4 py-2 text-ink">{labels.browse}</span>
      </label>

      <FieldMessage error={error} errorId={`${inputId}-error`} />

      {field.value.length ? (
        <ul className="mt-8 border-t border-line">
          {field.value.map((file) => {
            const pct = progress[file.id] ?? (file.status === "ready" ? 100 : 0);
            return (
              <li key={file.id} className="border-b border-line py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[0.9375rem] text-ink">{file.name}</p>
                    <p className="label-sm mt-1.5 flex gap-3 text-taupe">
                      <span>{formatFileSize(file.size)}</span>
                      <span aria-hidden="true">/</span>
                      <span className={cn(file.status === "error" && "text-brand")}>
                        {file.status === "ready"
                          ? labels.ready
                          : file.status === "error"
                            ? labels.error
                            : `${labels.uploading} ${pct}%`}
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(file.id)}
                    aria-label={`${labels.remove} ${file.name}`}
                    className="-mr-2 flex size-9 shrink-0 items-center justify-center text-taupe transition-colors hover:text-brand"
                  >
                    <X aria-hidden="true" strokeWidth={1.25} className="size-4" />
                  </button>
                </div>
                <div className="relative mt-3 h-px w-full bg-line" aria-hidden="true">
                  <div
                    className={cn(
                      "absolute left-0 top-0 h-px transition-[width] duration-300 ease-out",
                      file.status === "error" ? "bg-brand/40" : "bg-brand",
                    )}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}

      {uploadMode === "simulated" ? (
        <p className="label-sm mt-6 flex items-start gap-3 text-taupe-light">
          <span aria-hidden="true" className="mt-[0.35em] size-1.5 shrink-0 rounded-full bg-brand/60" />
          <span className="normal-case tracking-normal">{labels.simulatedNotice}</span>
        </p>
      ) : null}
    </div>
  );
}
