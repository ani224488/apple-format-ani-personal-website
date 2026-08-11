"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * The three ambient glows behind the hero, drifting at different rates as you
 * scroll. Different speeds are what read as depth — matched speeds would just
 * look like the whole background moving.
 */
export function HeroGlows() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 900], [0, 140]);
  const y2 = useTransform(scrollY, [0, 900], [0, 250]);
  const y3 = useTransform(scrollY, [0, 1400], [0, 360]);
  const fade = useTransform(scrollY, [0, 700], [1, 0.35]);

  if (reduced) {
    return (
      <>
        <div className="hero-glow hero-glow-1" aria-hidden />
        <div className="hero-glow hero-glow-2" aria-hidden />
        <div className="hero-glow hero-glow-3" aria-hidden />
      </>
    );
  }

  return (
    <>
      <motion.div
        className="hero-glow hero-glow-1"
        style={{ y: y1, ["--glow-fade" as string]: fade }}
        aria-hidden
      />
      <motion.div
        className="hero-glow hero-glow-2"
        style={{ y: y2, ["--glow-fade" as string]: fade }}
        aria-hidden
      />
      <motion.div className="hero-glow hero-glow-3" style={{ y: y3 }} aria-hidden />
    </>
  );
}
