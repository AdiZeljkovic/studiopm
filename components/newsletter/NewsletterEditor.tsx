"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowUp, Copy, Download, FileDown, FileUp, Monitor, Plus, Send, Smartphone, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { createNewsletter } from "@/lib/newsletter/defaults";
import { renderNewsletter } from "@/lib/newsletter/render";
import { serviceLimit, templates, templateUses, type FieldKey } from "@/lib/newsletter/templates";
import { deleteDraft, isNewsletterDoc, lastDraftId, listDrafts, saveDraft } from "@/lib/newsletter/storage";
import { isLocalAssetBase, newsletterAssetBase } from "@/lib/newsletter/config";
import type { NewsletterDoc, NewsletterLocale, ServiceBlock, TemplateId } from "@/lib/newsletter/types";
import { IconField, ImageField, Section, TextField } from "@/components/newsletter/controls";

type Group = "hero" | "services" | "feature" | "footer" | "header";

function initialDoc(): NewsletterDoc {
  const drafts = listDrafts();
  const last = lastDraftId();
  return drafts.find((d) => d.id === last) ?? drafts[0] ?? createNewsletter("classique", "fr");
}

function download(filename: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const slug = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "newsletter";

export function NewsletterEditor() {
  const [doc, setDoc] = useState<NewsletterDoc>(initialDoc);
  const [drafts, setDrafts] = useState<NewsletterDoc[]>(() => listDrafts());
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [notice, setNotice] = useState<string | null>(null);
  const [testOpen, setTestOpen] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);

  const previewBase = typeof window !== "undefined" ? window.location.origin : newsletterAssetBase;
  const uses = templateUses[doc.template];
  const show = (key: FieldKey) => uses.has(key);
  const limit = serviceLimit[doc.template];

  // Autosave (debounced).
  useEffect(() => {
    const t = window.setTimeout(() => setDrafts(saveDraft(doc)), 500);
    return () => window.clearTimeout(t);
  }, [doc]);

  // Preview uses this origin so local logos/photos load; exports use the public site address.
  const previewHtml = useMemo(() => renderNewsletter(doc, { assetBase: previewBase }), [doc, previewBase]);
  const exportHtml = () => renderNewsletter(doc, { assetBase: newsletterAssetBase });

  const flash = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(null), 3200);
  };

  const update = (patch: Partial<NewsletterDoc>) =>
    setDoc((d) => ({ ...d, ...patch, updatedAt: new Date().toISOString() }));
  const updateGroup = <G extends Group>(group: G, patch: Partial<NewsletterDoc[G]>) =>
    setDoc((d) => ({ ...d, [group]: { ...d[group], ...patch }, updatedAt: new Date().toISOString() }));
  const updateItem = (index: number, patch: Partial<ServiceBlock>) =>
    setDoc((d) => ({
      ...d,
      services: { ...d.services, items: d.services.items.map((it, i) => (i === index ? { ...it, ...patch } : it)) },
      updatedAt: new Date().toISOString(),
    }));
  const moveItem = (index: number, delta: number) =>
    setDoc((d) => {
      const items = [...d.services.items];
      const target = index + delta;
      if (target < 0 || target >= items.length) return d;
      [items[index], items[target]] = [items[target], items[index]];
      return { ...d, services: { ...d.services, items }, updatedAt: new Date().toISOString() };
    });
  const removeItem = (index: number) =>
    setDoc((d) => ({
      ...d,
      services: { ...d.services, items: d.services.items.filter((_, i) => i !== index) },
      updatedAt: new Date().toISOString(),
    }));
  const addItem = () =>
    setDoc((d) => ({
      ...d,
      services: {
        ...d.services,
        items: [...d.services.items, { icon: "ruler", image: "unsplash:1765371513189-44702dcee4be", title: "", text: "" }],
      },
      updatedAt: new Date().toISOString(),
    }));

  const openDraft = (id: string) => {
    const found = drafts.find((d) => d.id === id);
    if (found) setDoc(found);
  };

  const newDraft = (template: TemplateId, locale: NewsletterLocale) => {
    const fresh = createNewsletter(template, locale);
    setDoc(fresh);
    flash("Nouvelle newsletter créée.");
  };

  const applyTemplateTexts = () => {
    const base = createNewsletter(doc.template, doc.locale);
    setDoc({ ...base, id: doc.id, name: doc.name });
    flash("Textes et images du modèle appliqués.");
  };

  const copyHtml = async () => {
    try {
      await navigator.clipboard.writeText(exportHtml());
      flash("HTML copié. Collez-le dans votre outil d’envoi (Brevo, Mailchimp…).");
    } catch {
      flash("Copie impossible dans ce navigateur. Utilisez « Télécharger HTML ».");
    }
  };

  const importJson = async (file: File) => {
    try {
      const data = JSON.parse(await file.text()) as unknown;
      if (!isNewsletterDoc(data)) throw new Error("invalid");
      setDoc({ ...data, updatedAt: new Date().toISOString() });
      flash("Brouillon importé.");
    } catch {
      flash("Ce fichier n’est pas un brouillon de newsletter valide.");
    }
  };

  const localAssets = isLocalAssetBase(newsletterAssetBase);

  return (
    <div className="flex h-screen flex-col">
      {/* Top bar */}
      <header className="flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-line bg-ivory px-6 py-3">
        <div className="mr-auto">
          <p className="label text-ink">Studio PortMix</p>
          <p className="text-[0.8125rem] text-taupe">Éditeur de newsletter</p>
        </div>

        <label className="flex items-center gap-2 text-[0.8125rem]">
          <span className="text-taupe">Brouillon</span>
          <select
            value={doc.id}
            onChange={(e) => openDraft(e.target.value)}
            className="max-w-[220px] border border-line-strong bg-ivory-light px-2 py-1.5"
          >
            {drafts.some((d) => d.id === doc.id) ? null : <option value={doc.id}>{doc.name}</option>}
            {drafts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name} · {new Date(d.updatedAt).toLocaleDateString("fr-CH")}
              </option>
            ))}
          </select>
        </label>

        <NewMenu onCreate={newDraft} />

        <ToolbarButton
          icon={<Copy className="size-3.5" />}
          label="Dupliquer"
          onClick={() => {
            const copy = createNewsletter(doc.template, doc.locale);
            setDoc({ ...doc, id: copy.id, name: `${doc.name} (copie)`, updatedAt: new Date().toISOString() });
            flash("Copie créée.");
          }}
        />
        <ToolbarButton
          icon={<Trash2 className="size-3.5" />}
          label="Supprimer"
          onClick={() => {
            if (!window.confirm(`Supprimer « ${doc.name} » ?`)) return;
            const rest = deleteDraft(doc.id);
            setDrafts(rest);
            setDoc(rest[0] ?? createNewsletter("classique", "fr"));
          }}
        />

        <span aria-hidden="true" className="hidden h-6 w-px bg-line sm:block" />

        <ToolbarButton icon={<Copy className="size-3.5" />} label="Copier HTML" onClick={copyHtml} />
        <ToolbarButton
          icon={<Download className="size-3.5" />}
          label="Télécharger HTML"
          onClick={() => download(`${slug(doc.name)}.html`, exportHtml(), "text/html")}
        />
        <ToolbarButton
          icon={<FileDown className="size-3.5" />}
          label="Exporter"
          onClick={() => download(`${slug(doc.name)}.json`, JSON.stringify(doc, null, 2), "application/json")}
        />
        <ToolbarButton icon={<FileUp className="size-3.5" />} label="Importer" onClick={() => importRef.current?.click()} />
        <input
          ref={importRef}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void importJson(file);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => setTestOpen(true)}
          className="label-sm inline-flex items-center gap-2 bg-brand px-3 py-2 text-ivory hover:bg-ink"
        >
          <Send className="size-3.5" strokeWidth={1.5} />
          Envoyer un test
        </button>
      </header>

      {notice ? (
        <p role="status" className="border-b border-line bg-ink px-6 py-2 text-[0.8125rem] text-ivory">
          {notice}
        </p>
      ) : null}
      {localAssets ? (
        <p className="border-b border-line bg-brand/10 px-6 py-2 text-[0.8125rem] text-ink">
          Adresse des images : {newsletterAssetBase}. Avant un envoi réel, définissez NEXT_PUBLIC_NEWSLETTER_ASSET_BASE
          avec l’adresse du site en ligne, sinon le logo, les icônes et les photos PortMix ne s’afficheront pas chez
          les destinataires.
        </p>
      ) : null}

      <div className="flex min-h-0 flex-1">
        {/* Form */}
        <aside className="w-full max-w-[440px] shrink-0 overflow-y-auto border-r border-line bg-ivory">
          <Section title="Modèle">
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(templates) as TemplateId[]).map((id) => {
                const t = templates[id];
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => update({ template: id })}
                    aria-pressed={doc.template === id}
                    className={cn(
                      "border p-2 text-left",
                      doc.template === id ? "border-brand" : "border-line hover:border-line-strong",
                    )}
                  >
                    <span className="flex h-12 flex-col overflow-hidden border border-line">
                      <span className="h-2.5" style={{ background: t.headerBg }} />
                      <span className="flex-1" style={{ background: id === "sable" ? "#d9ccb9" : "#5b4d42" }} />
                      <span className="h-3" style={{ background: t.body }} />
                      <span className="h-2" style={{ background: t.footerBg }} />
                    </span>
                    <span className="mt-2 block text-[0.8125rem] text-ink">{t.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-[0.75rem] leading-snug text-taupe">{templates[doc.template].description}</p>

            <div className="grid grid-cols-2 gap-3">
              <label className="text-[0.8125rem]">
                <span className="label-sm block text-taupe">Langue</span>
                <select
                  value={doc.locale}
                  onChange={(e) => update({ locale: e.target.value as NewsletterLocale })}
                  className="mt-1.5 w-full border border-line-strong bg-ivory-light px-2 py-2"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                </select>
              </label>
              <label className="text-[0.8125rem]">
                <span className="label-sm block text-taupe">Logo</span>
                <select
                  value={doc.logoStyle}
                  onChange={(e) => update({ logoStyle: e.target.value as NewsletterDoc["logoStyle"] })}
                  className="mt-1.5 w-full border border-line-strong bg-ivory-light px-2 py-2"
                >
                  <option value="mono">Monochrome</option>
                  <option value="color">Couleur (rouge)</option>
                </select>
              </label>
            </div>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Remplacer les textes et images actuels par ceux du modèle ?")) applyTemplateTexts();
              }}
              className="label-sm text-taupe underline underline-offset-4 hover:text-ink"
            >
              Appliquer les textes type du modèle et de la langue
            </button>
          </Section>

          <Section title="Envoi">
            <TextField label="Nom interne" value={doc.name} onChange={(v) => update({ name: v })} />
            <TextField label="Objet de l’e-mail" value={doc.subject} onChange={(v) => update({ subject: v })} />
            <TextField
              label="Texte d’aperçu"
              value={doc.preheader}
              onChange={(v) => update({ preheader: v })}
              hint="Affiché après l’objet dans la boîte de réception."
            />
          </Section>

          <Section title="En-tête">
            <TextField
              label="Mention à côté du logo"
              multiline
              rows={2}
              value={doc.header.tagline}
              onChange={(v) => updateGroup("header", { tagline: v })}
            />
          </Section>

          <Section title="Ouverture">
            {show("hero.kicker") ? (
              <TextField label="Surtitre" value={doc.hero.kicker} onChange={(v) => updateGroup("hero", { kicker: v })} />
            ) : null}
            <TextField
              label="Titre"
              multiline
              rows={3}
              value={doc.hero.title}
              onChange={(v) => updateGroup("hero", { title: v })}
              hint="Un retour à la ligne crée une nouvelle ligne dans l’e-mail."
            />
            {show("hero.text") ? (
              <TextField label="Texte" multiline value={doc.hero.text} onChange={(v) => updateGroup("hero", { text: v })} />
            ) : null}
            <div className="grid grid-cols-2 gap-3">
              <TextField label="Bouton" value={doc.hero.ctaLabel} onChange={(v) => updateGroup("hero", { ctaLabel: v })} />
              <TextField label="Lien du bouton" value={doc.hero.ctaUrl} onChange={(v) => updateGroup("hero", { ctaUrl: v })} />
            </div>
            <ImageField
              label="Image d’ouverture"
              value={doc.hero.image}
              onChange={(v) => updateGroup("hero", { image: v })}
              previewBase={previewBase}
            />
          </Section>

          <Section title="Services">
            <TextField label="Titre" value={doc.services.title} onChange={(v) => updateGroup("services", { title: v })} />
            {show("services.intro") ? (
              <TextField
                label="Texte d’introduction"
                multiline
                rows={2}
                value={doc.services.intro}
                onChange={(v) => updateGroup("services", { intro: v })}
              />
            ) : null}

            <p className="text-[0.75rem] text-taupe">
              Ce modèle affiche {limit} élément{limit > 1 ? "s" : ""}
              {doc.services.items.length > limit ? ` (les suivants sont ignorés)` : ""}.
            </p>

            {doc.services.items.map((item, i) => (
              <div key={i} className={cn("space-y-3 border border-line p-4", i >= limit && "opacity-50")}>
                <div className="flex items-center justify-between">
                  <span className="label-sm text-taupe">Élément {String(i + 1).padStart(2, "0")}</span>
                  <span className="flex gap-1">
                    <IconButton label="Monter" onClick={() => moveItem(i, -1)} disabled={i === 0}>
                      <ArrowUp className="size-3.5" />
                    </IconButton>
                    <IconButton label="Descendre" onClick={() => moveItem(i, 1)} disabled={i === doc.services.items.length - 1}>
                      <ArrowDown className="size-3.5" />
                    </IconButton>
                    <IconButton label="Supprimer" onClick={() => removeItem(i)}>
                      <Trash2 className="size-3.5" />
                    </IconButton>
                  </span>
                </div>
                <TextField label="Titre" multiline rows={2} value={item.title} onChange={(v) => updateItem(i, { title: v })} />
                {show("services.itemText") ? (
                  <TextField label="Texte" multiline rows={2} value={item.text} onChange={(v) => updateItem(i, { text: v })} />
                ) : null}
                {show("services.itemIcon") ? (
                  <IconField value={item.icon} onChange={(v) => updateItem(i, { icon: v })} previewBase={previewBase} />
                ) : null}
                {show("services.itemImage") ? (
                  <ImageField label="Image" value={item.image} onChange={(v) => updateItem(i, { image: v })} previewBase={previewBase} />
                ) : null}
              </div>
            ))}
            {doc.services.items.length < 6 ? (
              <button
                type="button"
                onClick={addItem}
                className="label-sm inline-flex items-center gap-2 border border-line-strong px-3 py-2 hover:border-ink"
              >
                <Plus className="size-3.5" /> Ajouter un élément
              </button>
            ) : null}

            {show("services.cta") ? (
              <div className="grid grid-cols-2 gap-3">
                <TextField label="Bouton" value={doc.services.ctaLabel} onChange={(v) => updateGroup("services", { ctaLabel: v })} />
                <TextField label="Lien du bouton" value={doc.services.ctaUrl} onChange={(v) => updateGroup("services", { ctaUrl: v })} />
              </div>
            ) : null}
          </Section>

          <Section title="Bloc final">
            {show("feature.label") ? (
              <TextField label="Surtitre" value={doc.feature.label} onChange={(v) => updateGroup("feature", { label: v })} />
            ) : null}
            <TextField label="Titre" multiline rows={2} value={doc.feature.title} onChange={(v) => updateGroup("feature", { title: v })} />
            {show("feature.text") ? (
              <TextField label="Texte" multiline rows={2} value={doc.feature.text} onChange={(v) => updateGroup("feature", { text: v })} />
            ) : null}
            {show("feature.cta") ? (
              <div className="grid grid-cols-2 gap-3">
                <TextField label="Bouton" value={doc.feature.ctaLabel} onChange={(v) => updateGroup("feature", { ctaLabel: v })} />
                <TextField label="Lien du bouton" value={doc.feature.ctaUrl} onChange={(v) => updateGroup("feature", { ctaUrl: v })} />
              </div>
            ) : null}
            <ImageField label="Image" value={doc.feature.image} onChange={(v) => updateGroup("feature", { image: v })} previewBase={previewBase} />
          </Section>

          <Section title="Pied de page" defaultOpen={false}>
            <TextField label="Lieu" value={doc.footer.location} onChange={(v) => updateGroup("footer", { location: v })} />
            <TextField label="E-mail" value={doc.footer.email} onChange={(v) => updateGroup("footer", { email: v })} />
            <div className="grid grid-cols-2 gap-3">
              <TextField label="Site (affiché)" value={doc.footer.website} onChange={(v) => updateGroup("footer", { website: v })} />
              <TextField label="Site (lien)" value={doc.footer.websiteUrl} onChange={(v) => updateGroup("footer", { websiteUrl: v })} />
            </div>
            <TextField label="Mention légale" multiline rows={2} value={doc.footer.legal} onChange={(v) => updateGroup("footer", { legal: v })} />
            <div className="grid grid-cols-2 gap-3">
              <TextField
                label="Lien de désinscription"
                value={doc.footer.unsubscribeLabel}
                onChange={(v) => updateGroup("footer", { unsubscribeLabel: v })}
              />
              <TextField
                label="Balise de désinscription"
                value={doc.footer.unsubscribeUrl}
                onChange={(v) => updateGroup("footer", { unsubscribeUrl: v })}
              />
            </div>
            <p className="text-[0.75rem] leading-snug text-taupe">
              Utilisez la balise de votre outil d’envoi : Brevo {"{{ unsubscribe }}"}, Mailchimp *|UNSUB|*.
            </p>
          </Section>
        </aside>

        {/* Preview */}
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-line px-6 py-3">
            <p className="min-w-0 truncate text-[0.8125rem]">
              <span className="text-taupe">Objet : </span>
              {doc.subject}
            </p>
            <div className="flex shrink-0 border border-line-strong" role="group" aria-label="Aperçu">
              <DeviceButton active={device === "desktop"} onClick={() => setDevice("desktop")} label="Ordinateur">
                <Monitor className="size-4" strokeWidth={1.5} />
              </DeviceButton>
              <DeviceButton active={device === "mobile"} onClick={() => setDevice("mobile")} label="Mobile">
                <Smartphone className="size-4" strokeWidth={1.5} />
              </DeviceButton>
            </div>
          </div>
          <div className="flex-1 overflow-auto bg-sand-deep p-6">
            <iframe
              title="Aperçu de la newsletter"
              srcDoc={previewHtml}
              className="mx-auto block h-full min-h-[1400px] bg-white shadow-[0_1px_0_rgba(0,0,0,0.05)] transition-[width] duration-300"
              style={{ width: device === "desktop" ? 680 : 390 }}
            />
          </div>
        </main>
      </div>

      {testOpen ? <TestDialog doc={doc} onClose={() => setTestOpen(false)} /> : null}
    </div>
  );
}

function ToolbarButton({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="label-sm inline-flex items-center gap-2 text-ink hover:text-brand">
      {icon}
      {label}
    </button>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="flex size-7 items-center justify-center border border-line text-taupe hover:text-ink disabled:opacity-30"
    >
      {children}
    </button>
  );
}

function DeviceButton({
  active,
  onClick,
  label,
  children,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={cn("px-3 py-1.5", active ? "bg-ink text-ivory" : "text-taupe hover:text-ink")}
    >
      {children}
    </button>
  );
}

function NewMenu({ onCreate }: { onCreate: (template: TemplateId, locale: NewsletterLocale) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="label-sm inline-flex items-center gap-2 text-ink hover:text-brand"
      >
        <Plus className="size-3.5" />
        Nouvelle
      </button>
      {open ? (
        <div className="absolute left-0 top-full z-40 mt-2 w-60 border border-line bg-ivory p-2 shadow-lg">
          {(Object.keys(templates) as TemplateId[]).flatMap((id) =>
            (["fr", "en"] as NewsletterLocale[]).map((locale) => (
              <button
                key={`${id}-${locale}`}
                type="button"
                onClick={() => {
                  onCreate(id, locale);
                  setOpen(false);
                }}
                className="block w-full px-3 py-2 text-left text-[0.8125rem] hover:bg-sand"
              >
                {templates[id].label} · {locale === "fr" ? "Français" : "English"}
              </button>
            )),
          )}
        </div>
      ) : null}
    </div>
  );
}

function TestDialog({ doc, onClose }: { doc: NewsletterDoc; onClose: () => void }) {
  const [to, setTo] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "not-configured" | "error">("idle");

  const send = async () => {
    setState("sending");
    try {
      const res = await fetch("/api/newsletter/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ to, doc }),
      });
      if (res.ok) setState("sent");
      else if (res.status === 501) setState("not-configured");
      else setState("error");
    } catch {
      setState("error");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Envoyer un test"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <form
        className="w-full max-w-md space-y-5 bg-ivory p-6"
        onSubmit={(e) => {
          e.preventDefault();
          void send();
        }}
      >
        <p className="label">Envoyer un test</p>
        <p className="text-[0.8125rem] text-taupe">
          Un seul e-mail de test, avec « [TEST] » devant l’objet. L’envoi à vos abonnés se fait depuis votre outil
          d’e-mailing avec le HTML exporté.
        </p>
        <TextField label="Adresse e-mail" value={to} onChange={setTo} placeholder="vous@exemple.ch" />
        {state === "sent" ? <p className="text-[0.8125rem] text-ink">E-mail de test envoyé.</p> : null}
        {state === "not-configured" ? (
          <p className="text-[0.8125rem] text-brand">
            L’envoi n’est pas encore configuré (RESEND_API_KEY et NEWSLETTER_FROM). Utilisez « Copier HTML » en attendant.
          </p>
        ) : null}
        {state === "error" ? <p className="text-[0.8125rem] text-brand">L’envoi a échoué. Vérifiez l’adresse et réessayez.</p> : null}
        <div className="flex justify-end gap-3">
          <button type="button" onClick={onClose} className="label-sm px-3 py-2 text-taupe hover:text-ink">
            Fermer
          </button>
          <button
            type="submit"
            disabled={state === "sending" || !/^\S+@\S+\.\S+$/.test(to)}
            className="label-sm bg-ink px-4 py-2 text-ivory disabled:opacity-40"
          >
            {state === "sending" ? "Envoi…" : "Envoyer"}
          </button>
        </div>
      </form>
    </div>
  );
}
