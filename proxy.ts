import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales, type Locale } from "@/lib/i18n";

/**
 * Sends visitors without a locale in the URL to /en or /fr, based on the
 * browser's Accept-Language header (French by default).
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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API routes and any file with an extension
  // (icons, images, robots.txt, sitemap.xml, ...).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
