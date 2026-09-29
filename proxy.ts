import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

/**
 * 1. Protects the newsletter editor (/newsletter, /api/newsletter/*) with
 *    HTTP basic auth: NEWSLETTER_USER (default "portmix") and
 *    NEWSLETTER_PASSWORD. Without a password the editor is open in
 *    development and disabled in production.
 * 2. Sends visitors without a locale in the URL to /en or /fr, based on
 *    the browser's Accept-Language header (French by default).
 */
function preferredLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .filter((entry) => entry.lang)
    .sort((a, b) => b.q - a.q);
  const match = ranked.find((entry) => (locales as readonly string[]).includes(entry.lang));
  return (match?.lang as Locale | undefined) ?? defaultLocale;
}

function newsletterAuth(request: NextRequest) {
  const password = process.env.NEWSLETTER_PASSWORD;
  const user = process.env.NEWSLETTER_USER ?? "portmix";

  if (!password) {
    if (process.env.NODE_ENV === "production") {
      return new NextResponse("Newsletter editor disabled: set NEWSLETTER_PASSWORD.", { status: 503 });
    }
    return NextResponse.next();
  }

  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    try {
      const [u, ...rest] = atob(header.slice(6)).split(":");
      if (u === user && rest.join(":") === password) return NextResponse.next();
    } catch {
      // fall through to the challenge
    }
  }
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Studio PortMix newsletter", charset="UTF-8"' },
  });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /**
   * 🚨 Dvostruka kosa crta ruši cijelu aplikaciju.
   *
   * `//newsletter` preglednik čita kao adresu SA DRUGE DOMENE (protokolu
   * relativnu), pa Nextov ruter pri prvom `replaceState` dobije
   * `https://newsletter/` i baci `SecurityError`. Posjetilac vidi „This page
   * couldn't load“ — bez ijedne poruke sa servera, jer je sam odgovor bio 200.
   *
   * Uhvaćeno 29.9.2026.: takva adresa se lako napravi rukom ili iz linka koji
   * već završava kosom crtom. Zato se višestruke crte sažimaju prije svega
   * ostalog — i prije provjere lozinke, da se prijava ne traži dvaput.
   *
   * ⚠️ Iza obrnutog posrednika ovo se NEĆE okinuti: Traefik sam sažme crte
   * prije prosljedđivanja, pa Next dobije već uredan `/newsletter` i vrati
   * 200 — dok preglednik u adresnoj traci i dalje ima `//` i njegov ruter
   * pukne. Tamo se ne može popraviti sa servera; ispravna adresa je jedini
   * lijek. Ovo štiti razvoj i svako posluživanje bez posrednika (provjereno:
   * direktno kontejneru `//newsletter` → 308 na `/newsletter`).
   */
  if (pathname.startsWith("//")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/\/{2,}/g, "/");
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/newsletter" || pathname.startsWith("/newsletter/") || pathname.startsWith("/api/newsletter")) {
    return newsletterAuth(request);
  }
  if (pathname.startsWith("/api/")) return;

  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and any file with an extension (images, icons,
  // email assets, robots.txt, sitemap.xml, ...). Email assets must stay public.
  matcher: ["/((?!_next|.*\\..*).*)"],
};
