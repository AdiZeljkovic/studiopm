"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { imageLibrary } from "@/lib/newsletter/library";
import { resolveImage } from "@/lib/newsletter/render";
import { iconNames, type IconName } from "@/lib/newsletter/types";

export function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="border-b border-line">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-6 py-4 text-left"
      >
        <span className="label text-ink">{title}</span>
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.5}
          className={cn("size-4 text-taupe transition-transform", open && "rotate-180")}
        />
      </button>
      {open ? <div className="space-y-4 px-6 pb-6">{children}</div> : null}
    </section>
  );
}

const inputClass =
  "mt-1.5 block w-full border border-line-strong bg-ivory-light px-3 py-2 text-[0.875rem] text-ink placeholder:text-taupe-light focus:border-ink focus:outline-none";

export function TextField({
  label,
  value,
  onChange,
  hint,
  multiline = false,
  rows = 3,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  multiline?: boolean;
  rows?: number;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="label-sm block text-taupe">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={cn(inputClass, "resize-y leading-relaxed")}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
      )}
      {hint ? <p className="mt-1 text-[0.75rem] leading-snug text-taupe">{hint}</p> : null}
    </div>
  );
}

/** Image chooser: client photo library, PortMix photos, or any https URL. */
export function ImageField({
  label,
  value,
  onChange,
  previewBase,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  previewBase: string;
}) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const thumb = value ? resolveImage(value, 160, 110, previewBase) : "";

  return (
    <div>
      <p className="label-sm text-taupe">{label}</p>
      <div className="mt-1.5 flex items-center gap-3">
        <div className="h-[55px] w-[80px] shrink-0 overflow-hidden border border-line bg-sand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {thumb ? <img src={thumb} alt="" className="h-full w-full object-cover" /> : null}
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="label-sm border border-line-strong px-3 py-2 text-ink hover:border-ink"
        >
          Choisir une image
        </button>
      </div>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={label}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div className="flex max-h-[88vh] w-full max-w-4xl flex-col bg-ivory">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <p className="label">{label}</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Fermer" className="p-1 text-taupe hover:text-ink">
                <X className="size-4" strokeWidth={1.5} />
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                {imageLibrary.map((img) => (
                  <button
                    key={img.id}
                    type="button"
                    title={img.alt}
                    onClick={() => {
                      onChange(img.id);
                      setOpen(false);
                    }}
                    className={cn(
                      "relative aspect-[4/3] overflow-hidden border-2 bg-sand",
                      value === img.id ? "border-brand" : "border-transparent hover:border-line-strong",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={resolveImage(img.id, 200, 150, previewBase)}
                      alt={img.alt}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    {img.id.startsWith("/") ? (
                      <span className="label-sm absolute left-1.5 top-1.5 bg-ink px-1.5 py-0.5 text-ivory">PortMix</span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
            <form
              className="flex gap-3 border-t border-line px-6 py-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (/^https:\/\//.test(url.trim())) {
                  onChange(url.trim());
                  setUrl("");
                  setOpen(false);
                }
              }}
            >
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Ou collez l’adresse d’une image (https://…)"
                className={cn(inputClass, "mt-0 flex-1")}
              />
              <button type="submit" className="label-sm bg-ink px-4 text-ivory">
                Utiliser
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function IconField({
  value,
  onChange,
  previewBase,
}: {
  value: IconName;
  onChange: (value: IconName) => void;
  previewBase: string;
}) {
  return (
    <div>
      <p className="label-sm text-taupe">Icône</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {iconNames.map((name) => (
          <button
            key={name}
            type="button"
            title={name}
            aria-pressed={value === name}
            onClick={() => onChange(name)}
            className={cn(
              "flex size-9 items-center justify-center border bg-ivory-light",
              value === name ? "border-brand" : "border-line hover:border-line-strong",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${previewBase}/email-assets/icons/${name}-ink.png`} alt={name} className="size-5" />
          </button>
        ))}
      </div>
    </div>
  );
}
