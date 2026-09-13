"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import type { SiteImage } from "@/data/images";

/** Hero photograph with a slow settle from 1.05 to 1. */
export function HeroImage({ image }: { image: SiteImage }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ scale: 1.05 }}
      animate={{ scale: 1 }}
      transition={{ duration: 2.4, ease: EASE_OUT }}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover object-[50%_40%]"
      />
    </motion.div>
  );
}
