import { cache } from "react";
import { getContent, type Content, type Locale } from "@/lib/i18n";
import { images as slikeIzKoda, type SiteImage } from "@/data/images";
import { siteConfig } from "@/lib/site-config";

/**
 * Sadržaj stranice = tekst iz PortMix CMS-a preko teksta iz koda.
 * ---------------------------------------------------------------
 * `data/content/{en,fr}.ts`, `data/images.ts` i `siteConfig.contact` ostaju
 * podrazumijevani sadržaj: sve što CMS ne vrati (ne odgovara, prazno polje)
 * prikazuje se iz koda. Bez `CMS_URL` sajt radi kao i ranije.
 *
 * CMS vraća isti oblik kao rječnik (`/api/sadrzaj/studio?locale=xx`), osim:
 *  - liste kratkih tekstova (naslovi u redovima, liste) su tekst, jedan red po stavci;
 *  - sistemske vrijednosti (id, value, image) nisu u CMS-u — uzimaju se iz koda.
 *
 * Keš: oznaka `cms`; CMS poslije svake izmjene zove `/api/cms-osvjezi`.
 */

export const CMS_OZNAKA = "cms";
const CMS_URL = process.env.CMS_URL?.trim().replace(/\/+$/, "");

export type Slike = typeof slikeIzKoda;
export type Kontakt = { -readonly [K in keyof typeof siteConfig.contact]: (typeof siteConfig.contact)[K] };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type J = Record<string, any>;

/** Polja koja Payload dodaje svakom redu/globalu — nisu tekst sajta. */
const SISTEMSKI = new Set(["id", "createdAt", "updatedAt", "globalType", "blockType", "blockName", "kod", "slika"]);

/** Vrijednosti koje su u kodu ključevi, ne tekst (id reda, vrijednost odgovora, oznaka slike) — ostaju iz koda. */
const KLJUCEVI_KODA = new Set(["id", "value", "image", "icon"]);

/** Prazan red istog oblika kao red iz koda — za novi red iz panela (tekst dolazi iz CMS-a). */
function prazanRed<T>(z: T): T {
  if (typeof z === "string") return "" as T;
  if (Array.isArray(z)) return [] as T;
  if (z && typeof z === "object") {
    const out: J = {};
    for (const [k, zv] of Object.entries(z as J)) if (!KLJUCEVI_KODA.has(k)) out[k] = prazanRed(zv);
    return out as T;
  }
  return z;
}

const dvaMjesta = (i: number) => String(i + 1).padStart(2, "0");

/**
 * Lista redova iz panela. Red nosi `kod` (id stavke u kodu ili njen redni broj): po njemu
 * se nalazi stavka iz koda (prazno polje = njen tekst, uz to id i slika), i kad je red
 * premješten. Novi red nema `kod` — samo tekst iz panela. Redni broj („01") ide po mjestu.
 * Odgovori upitnika (stavke sa `value`) su fiksni — po mjestu, kao i forma.
 */
function prekrijListu<T>(z: readonly T[], v: unknown): T[] {
  const lista = Array.isArray(v) ? (v as J[]) : [];
  if (!lista.length) return [...z];
  if (z.some((x) => x && typeof x === "object" && "value" in (x as J))) return z.map((zi, i) => prekrij(zi, lista[i]));
  return lista.map((vi, i) => {
    const kod = typeof vi?.kod === "string" ? vi.kod : null;
    const zi = kod === null ? undefined : z.find((x, j) => String((x as J)?.id ?? j) === kod);
    const red = prekrij(zi ?? prazanRed(z[0]), vi) as J;
    if ("number" in red) red.number = dvaMjesta(i);
    if ("id" in (z[0] as J) && !zi) red.id = `stavka-${i + 1}`;
    return red as T;
  });
}

/** Generičko spajanje: vrijednost iz CMS-a preko vrijednosti iz koda, istim oblikom. */
function prekrij<T>(z: T, v: unknown): T {
  if (typeof z === "string") return (typeof v === "string" && v.trim() ? v : z) as T;
  if (Array.isArray(z)) {
    if (z.every((x) => typeof x === "string")) {
      if (typeof v !== "string") return z;
      const redovi = v.split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
      return (redovi.length ? redovi : z) as T;
    }
    return prekrijListu(z, v) as T;
  }
  if (z && typeof z === "object") {
    const izvor = (v && typeof v === "object" ? v : {}) as J;
    const out: J = {};
    for (const [k, zv] of Object.entries(z as J)) out[k] = KLJUCEVI_KODA.has(k) ? zv : prekrij(zv, izvor[k]);
    // tekst kojeg u kodu nema (npr. pomoć ispod ponuđenog odgovora u upitniku) — iz CMS-a
    for (const [k, cv] of Object.entries(izvor))
      if (!(k in out) && !SISTEMSKI.has(k) && typeof cv === "string" && cv.trim()) out[k] = cv;
    return out as T;
  }
  if (z === undefined && typeof v === "string" && v.trim()) return v as T;
  return z;
}

/** Slika iz biblioteke CMS-a → oblik iz koda (omjer ostaje iz koda, jer na njega računa raspored). */
function slika(v: unknown, z: SiteImage): SiteImage {
  if (!v || typeof v !== "object" || typeof (v as J).url !== "string") return z;
  const m = v as J;
  const fokus =
    typeof m.focalX === "number" && typeof m.focalY === "number" && (m.focalX !== 50 || m.focalY !== 50)
      ? `${m.focalX}% ${m.focalY}%`
      : undefined;
  return {
    src: m.url,
    alt: typeof m.alt === "string" && m.alt.trim() ? m.alt : z.alt,
    ratio: z.ratio,
    source: "local",
    ...(fokus ? { position: fokus } : {}),
  };
}

function slike(z: J, v: unknown): J {
  const izvor = (v && typeof v === "object" ? v : {}) as J;
  const out: J = {};
  for (const [k, zv] of Object.entries(z)) out[k] = "src" in (zv as J) ? slika(izvor[k], zv as SiteImage) : slike(zv as J, izvor[k]);
  return out;
}

function kontakt(v: unknown): Kontakt {
  const z = siteConfig.contact;
  const c = (v && typeof v === "object" ? v : {}) as J;
  const t = (x: unknown, d: string | null) => (typeof x === "string" && x.trim() ? x.trim() : d);
  const adresa =
    typeof c.addressLines === "string" ? c.addressLines.split(/\r?\n/).map((s: string) => s.trim()).filter(Boolean) : [];
  return {
    email: t(c.email, z.email),
    phone: t(c.phone, z.phone),
    addressLines: adresa.length ? adresa : z.addressLines,
    instagram: t(c.instagram, z.instagram),
    linkedin: t(c.linkedin, z.linkedin),
  };
}

/**
 * Zadnji uspješan odgovor CMS-a (u memoriji procesa). Ako CMS nakratko ne odgovara
 * (restart, deploy), stranica se pravi od njega — a ne od starog teksta iz koda,
 * koji bi se onda keširao do sat vremena. Pri buildu jedan pokušaj (bez čekanja).
 */
const zadnjiDobar = new Map<string, J>();
const pokusaja = () => (process.env.NEXT_PHASE === "phase-production-build" ? 1 : 3);
const pauza = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function povuci(locale: Locale): Promise<J | null> {
  if (!CMS_URL) return null;
  for (let i = 0; i < pokusaja(); i++) {
    if (i) await pauza(1000 * i);
    try {
      const res = await fetch(`${CMS_URL}/api/sadrzaj/studio?locale=${locale}`, {
        next: { tags: [CMS_OZNAKA], revalidate: 3600 },
        signal: AbortSignal.timeout(5000),
      });
      if (res.ok) {
        const d = (await res.json()) as J;
        zadnjiDobar.set(locale, d);
        return d;
      }
      if (res.status < 500) break;
    } catch {
      /* CMS ne odgovara — novi pokušaj */
    }
  }
  return zadnjiDobar.get(locale) ?? null;
}

export type Sadrzaj = { t: Content; images: Slike; contact: Kontakt };

/**
 * Fotografija svake usluge: iz njenog reda u panelu, inače iz koda (po `kod`-u reda);
 * nova usluga bez fotografije dobija prvu fotografiju usluga iz koda. Novi ključevi
 * (`stavka-5`) idu u isti registar, pa komponenta radi kao i ranije.
 */
function slikeUsluga(t: Content, d: J | null, images: Slike) {
  const redovi = Array.isArray(d?.expertise?.services) ? (d!.expertise.services as J[]) : [];
  const izKoda = slikeIzKoda.services as Record<string, SiteImage>;
  const prva = Object.values(izKoda)[0];
  const registar = { ...images.services } as Record<string, SiteImage>;
  t.expertise.services.forEach((s, i) => {
    // nova usluga (iz panela) nema oznaku slike iz koda — ključ je njen id
    const kljuc = (s.image as string | undefined) ?? s.id;
    const zadana = (images.services as Record<string, SiteImage>)[kljuc] ?? prva;
    registar[kljuc] = slika(redovi[i]?.slika, zadana);
    (s as { image: string }).image = kljuc;
  });
  return { ...images, services: registar } as Slike;
}

/** Tekst, fotografije i kontakt za jezik (jednom po renderu). */
export const getSadrzaj = cache(async (locale: Locale): Promise<Sadrzaj> => {
  const d = await povuci(locale);
  const t = prekrij(getContent(locale), d);
  return {
    t,
    images: slikeUsluga(t, d, slike(slikeIzKoda as J, d?.slike) as Slike),
    contact: kontakt(d?.kontakt),
  };
});
