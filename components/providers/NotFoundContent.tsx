"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Content } from "@/lib/i18n";

/**
 * Tekst stranice 404 iz CMS-a. not-found.tsx je klijentska komponenta bez pristupa
 * sadržaju sa servera, pa ga layout daje kroz kontekst (bez njega: tekst iz koda).
 */
const Ctx = createContext<Content["notFound"] | null>(null);

export function NotFoundContentProvider({ value, children }: { value: Content["notFound"]; children: ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useNotFoundContent = () => useContext(Ctx);
