"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useIsCompact } from "@/lib/use-capability";

/**
 * Scrubs the hero out as you scroll past it: a slight shrink, a slight lift,
 * and a fade. Apple opens nearly every product page this way — the effect is
 * that the hero recedes into the page rather than sliding off the top of it.
 *
 * Scroll-linked rather than triggered, so it tracks the scrollbar exactly and
 * reverses on the way back up. Skipped on phones, where the whole hero is
 * roughly one screen tall and there isn't enough scroll distance for the
 * scrub to read as anything but the content dimming for no reason.
 */
export function HeroScrub({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const compact = useIsCompact();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 48]);
  // Gone before the section fully clears, so it isn't still visibly fading
  // while the next section is already the thing being read.
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  if (reduced || compact) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ scale, y, opacity, transformOrigin: "50% 30%", willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
