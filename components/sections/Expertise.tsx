"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { EASE_OUT } from "@/lib/motion";
import type { Content } from "@/lib/i18n";
import type { ServiceImageKey, SiteImage } from "@/data/images";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Figure } from "@/components/ui/Figure";

interface ExpertiseProps {
  content: Content["expertise"];
  images: Record<ServiceImageKey, SiteImage>;
  inspirationLabel: string;
}

const hoverCapable = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export function Expertise({ content, images, inspirationLabel }: ExpertiseProps) {
  const [active, setActive] = useState(0);
  const services = content.services;
  const current = services[active] ?? services[0];

  const onSelect = useCallback((index: number) => {
    // Desktop: hover drives the image, click keeps the item open.
    // Touch: tapping the open item collapses it.
    setActive((prev) => (prev === index && !hoverCapable() ? -1 : index));
  }, []);

  return (
    <section id="expertise" className="scroll-mt-16 lg:scroll-mt-20">
      <Container className="py-24 lg:py-36">
        <SectionIntro
          index={content.index}
          label={content.label}
          meta={content.meta}
          title={content.title}
          intro={content.intro}
          serifLines={[1]}
        />

        <div className="mt-16 grid grid-cols-12 gap-x-6 lg:mt-24">
          <div className="col-span-12 lg:col-span-6">
            <ul className="border-t border-line">
              {services.map((service, i) => {
                const isActive = i === active;
                const panelId = `service-panel-${service.id}`;
                return (
                  <li key={service.id} className="border-b border-line">
                    <button
                      type="button"
                      onClick={() => onSelect(i)}
                      onMouseEnter={() => hoverCapable() && setActive(i)}
                      aria-expanded={isActive}
                      aria-controls={panelId}
                      className="group grid w-full grid-cols-[2.75rem_1fr_auto] items-baseline gap-x-4 py-5 text-left sm:py-6 lg:py-7"
                    >
                      <span
                        className={cn(
                          "label-sm tabular-nums transition-colors duration-500",
                          isActive ? "text-brand" : "text-taupe",
                        )}
                      >
                        {service.number}
                      </span>
                      <span
                        className={cn(
                          "text-display-sm transition-colors duration-500",
                          isActive ? "text-ink" : "text-ink/55 group-hover:text-ink",
                        )}
                      >
                        {service.title}
                      </span>
                      <Plus
                        aria-hidden="true"
                        strokeWidth={1}
                        className={cn(
                          "size-4 self-center text-taupe transition-transform duration-500 ease-[var(--ease-out-expo)]",
                          isActive && "rotate-45 text-brand",
                        )}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.div
                          id={panelId}
                          key="panel"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE_OUT }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-[2.75rem_1fr] gap-x-4 pb-7">
                            <span aria-hidden="true" />
                            <div>
                              <p className="max-w-md text-body text-taupe">{service.description}</p>
                              <div className="mt-6 lg:hidden">
                                <Figure
                                  image={images[service.image]}
                                  ratio="4/3"
                                  sizes="(min-width: 640px) 80vw, 100vw"
                                  caption={
                                    <>
                                      <span>{inspirationLabel}</span>
                                      <span>{service.number}</span>
                                    </>
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand">
                {services.map((service, i) => (
                  <Image
                    key={service.id}
                    src={images[service.image].src}
                    alt={images[service.image].alt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className={cn(
                      "object-cover transition-opacity duration-700 ease-[var(--ease-out-expo)]",
                      i === active ? "opacity-100" : "opacity-0",
                    )}
                    aria-hidden={i !== active}
                  />
                ))}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/40 to-transparent"
                />
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={current.number}
                    aria-hidden="true"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                    className="figure-serif pointer-events-none absolute bottom-5 left-6 text-[7rem] text-ivory"
                  >
                    {current.number}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="label-sm mt-3 flex items-baseline justify-between text-taupe">
                <span>
                  <span className="text-brand">{current.number}</span>
                  <span className="mx-2" aria-hidden="true">
                    /
                  </span>
                  {current.title}
                </span>
                <span>{inspirationLabel}</span>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
