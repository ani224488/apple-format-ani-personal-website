"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useIsCompact } from "@/lib/use-capability";

/**
 * A clipping frame for the glows.
 *
 * The page root sets `overflow-x: clip`, but that only landed in Safari 16 —
 * on older iOS it falls back to `visible` and these 600px circles push the
 * document sideways. An absolutely positioned wrapper with plain
 * `overflow: hidden` contains them everywhere. It's safe to make this a scroll
 * container because it holds nothing but decoration: no sticky descendants to
 * break, nothing focusable to scroll into view.
 */
function GlowFrame({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {children}
    </div>
  );
}

/**
 * The three ambient glows behind the hero, drifting at different rates as you
 * scroll. Different speeds are what read as depth — matched speeds would just
 * look like the whole background moving.
 *
 * On phones they hold still. Transform-animating three ~600px circles under
 * `filter: blur(90px)` forces the compositor to re-rasterise an enormous blur
 * every frame, which was the main cause of the scroll stutter; the glows are
 * also shrunk and their blur radius cut under a mobile media query in
 * globals.css, so the look survives at a fraction of the cost.
 */
export function HeroGlows() {
  const reduced = useReducedMotion();
  const compact = useIsCompact();
  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 900], [0, 140]);
  const y2 = useTransform(scrollY, [0, 900], [0, 250]);
  const y3 = useTransform(scrollY, [0, 1400], [0, 360]);
  const fade = useTransform(scrollY, [0, 700], [1, 0.35]);

  if (reduced || compact) {
    return (
      <GlowFrame>
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="hero-glow hero-glow-3" />
      </GlowFrame>
    );
  }

  return (
    <GlowFrame>
      <motion.div
        className="hero-glow hero-glow-1"
        style={{ y: y1, ["--glow-fade" as string]: fade }}
      />
      <motion.div
        className="hero-glow hero-glow-2"
        style={{ y: y2, ["--glow-fade" as string]: fade }}
      />
      <motion.div className="hero-glow hero-glow-3" style={{ y: y3 }} />
    </GlowFrame>
  );
}
