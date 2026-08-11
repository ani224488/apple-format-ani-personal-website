"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { easeOutStrong } from "@/lib/motion";

/**
 * Fades and lifts content as it enters the viewport, once. This is the
 * workhorse of the scroll experience — Apple's pages are mostly this effect
 * applied with restraint and a consistent distance.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.65, ease: easeOutStrong, delay }}
    >
      {children}
    </motion.div>
  );
}
