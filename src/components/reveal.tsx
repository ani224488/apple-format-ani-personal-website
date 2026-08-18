"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import {
  easeOutStrong,
  revealDuration,
  revealLift,
  revealScale,
} from "@/lib/motion";

/**
 * Fades content in as it enters the viewport, once — the workhorse of the
 * scroll experience.
 *
 * The motion is a small scale-up plus a short lift over a full second, rather
 * than the longer, faster slide it used to be. Apple's pages almost never
 * translate an element far; they move it barely at all and take their time
 * doing it, which is most of why their reveals read as expensive.
 */
export function Reveal({
  children,
  delay = 0,
  y = revealLift,
  scale = revealScale,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  scale?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: revealDuration, ease: easeOutStrong, delay }}
    >
      {children}
    </motion.div>
  );
}
