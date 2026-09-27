"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";
import type { Locale } from "@/lib/i18n";
import type { NavLink } from "@/data/content/types";
import { Logo } from "@/components/layout/Logo";
import { LanguageSwitch } from "@/components/layout/LanguageSwitch";

interface HeaderProps {
  locale: Locale;
  links: readonly NavLink[];
  cta: NavLink;
  labels: { openMenu: string; closeMenu: string; menu: string; close: string; language: string };
  meta: readonly string[];
}

export function Header({ locale, links, cta, labels, meta }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const home = `/${locale}`;
  const to = (hash: string) => `${home}${hash}`;

  // Header surface: transparent over the hero, translucent ivory afterwards.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track the section currently in view for the active navigation state.
  useEffect(() => {
    const targets = links
      .map((l) => document.getElementById(l.href.replace("#", "")))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        });
        const top = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
        setActive(top ? `#${top[0]}` : null);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.1, 0.25] },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [links]);

  // Mobile menu: lock scroll, close on Escape, manage focus.
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 120);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      toggle?.focus({ preventScroll: true });
    };
  }, [open, close]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-700 ease-[var(--ease-out-expo)]",
        scrolled && !open
          ? "border-b border-line/80 bg-ivory/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-20">
        <Logo href={home} priority className="relative z-[60]" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-10">
            {links.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={to(link.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "link-underline text-[0.8125rem] tracking-[0.04em] transition-colors duration-500",
                      isActive ? "text-brand [&::after]:scale-x-100" : "text-ink",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-8 lg:flex">
          <LanguageSwitch locale={locale} label={labels.language} />
          <Link
            href={to(cta.href)}
            className="group label inline-flex items-center gap-3 bg-brand px-5 py-3 text-ivory transition-colors duration-500 ease-[var(--ease-out-expo)] hover:bg-ink"
          >
            <span>{cta.label}</span>
            <ArrowRight
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="relative z-[60] flex items-center gap-4 lg:hidden">
          {!open ? (
            <Link
              href={to(cta.href)}
              className="label-sm inline-flex h-9 items-center bg-brand px-3 text-ivory"
            >
              {cta.label}
            </Link>
          ) : null}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            className="-mr-2 flex h-11 items-center gap-3 px-2"
          >
            <span className="label hidden sm:inline">{open ? labels.close : labels.menu}</span>
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-6 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open && "translate-y-[5.5px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-px w-6 bg-ink transition-transform duration-500 ease-[var(--ease-out-expo)]",
                  open && "-translate-y-[5.5px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-navigation"
            key="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="fixed inset-0 z-[55] flex flex-col bg-ivory lg:hidden"
          >
            <div className="container-site flex h-full flex-col pt-24 pb-10">
              <nav aria-label="Mobile" className="flex-1">
                <ul className="flex flex-col border-t border-line">
                  {links.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.08 + i * 0.06, ease: EASE_OUT }}
                      className="border-b border-line"
                    >
                      <Link
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={to(link.href)}
                        onClick={close}
                        className="flex items-baseline justify-between py-5"
                      >
                        <span className="text-display-sm">{link.label}</span>
                        <span className="label-sm tabular-nums text-taupe">0{i + 1}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
                <LanguageSwitch locale={locale} label={labels.language} className="mt-8" onNavigate={close} />
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT }}
                className="flex flex-col gap-8"
              >
                <Link
                  href={to(cta.href)}
                  onClick={close}
                  className="group label inline-flex w-full items-center justify-between bg-brand px-6 py-5 text-ivory"
                >
                  <span>{cta.label}</span>
                  <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-4" />
                </Link>
                <ul className="label-sm flex flex-wrap gap-x-6 gap-y-2 text-taupe">
                  {meta.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
