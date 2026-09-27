import type { ServiceImageKey } from "@/data/images";

/** Shared shapes used by the locale dictionaries (en.ts, fr.ts). */

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: ServiceImageKey;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  involves: string;
}

export interface ChoiceOption<T extends string = string> {
  value: T;
  label: string;
  hint?: string;
}
