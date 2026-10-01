"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { ComponentProps } from "react";
import type { ProjectInquiryForm as FormType } from "./ProjectInquiryForm";

type FormProps = ComponentProps<typeof FormType>;

const ProjectInquiryForm = dynamic(() => import("./ProjectInquiryForm").then((m) => m.ProjectInquiryForm), {
  ssr: false,
  loading: () => <FormPlaceholder />,
});

function FormPlaceholder() {
  // Close to the real height of step 1, so content below does not jump when it loads.
  return <div aria-hidden="true" className="min-h-[1480px] sm:min-h-[1150px] lg:min-h-[750px]" />;
}

/**
 * Loads the questionnaire (React Hook Form + Zod, the largest script on the
 * page) only when the visitor gets close to it, so it never competes with
 * the first screen. It also opens as soon as any "Start a project" link is
 * clicked, and when the page is opened directly on #project-inquiry (the
 * browser scrolls there, so the observer fires at once).
 */
export function LazyInquiryForm(props: FormProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setShow(true);
      },
      { rootMargin: "1200px 0px" },
    );
    observer.observe(node);

    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href$='#project-inquiry']");
      if (link) setShow(true);
    };
    document.addEventListener("click", onClick, true);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick, true);
    };
  }, [show]);

  return <div ref={ref}>{show ? <ProjectInquiryForm {...props} /> : <FormPlaceholder />}</div>;
}
