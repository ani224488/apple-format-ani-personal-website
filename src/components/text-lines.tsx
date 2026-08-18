"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { easeOutStrong } from "@/lib/motion";

/**
 * Reveals a paragraph one rendered line at a time, each sliding up from behind
 * its own mask.
 *
 * Lines are a rendering fact, not a property of the text, so they have to be
 * measured: an off-screen probe with the same width and typography lays the
 * words out, and words sharing an `offsetTop` are one line. The probe exists
 * so the visible paragraph is never mutated mid-measure.
 *
 * The server renders the paragraph as ordinary text — real content in the
 * markup, readable with JS off — and the client swaps in the split version
 * after measuring. That swap is invisible in practice because it happens on
 * mount, long before this paragraph is scrolled to; the `instant` flag covers
 * the case where it is already on screen, so it can't flash from visible to
 * hidden in front of someone.
 */
export function TextLines({
  text,
  className,
  delay = 0,
  step = 0.08,
}: {
  text: string;
  className?: string;
  delay?: number;
  step?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const lastWidth = useRef(0);
  const [lines, setLines] = useState<string[] | null>(null);
  const [instant, setInstant] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const host = ref.current;
    if (!host) return;

    function measure() {
      const el = ref.current;
      const parent = el?.parentElement;
      if (!el || !parent) return;

      const width = el.clientWidth;
      // Re-splitting at an unchanged width would restart the reveal for no
      // reason; height changes from our own swap must not retrigger it.
      if (!width || width === lastWidth.current) return;
      lastWidth.current = width;

      const probe = document.createElement("p");
      probe.className = el.className;
      probe.style.cssText =
        `position:absolute;left:-9999px;top:0;visibility:hidden;` +
        `pointer-events:none;width:${width}px;margin:0;`;
      parent.appendChild(probe);

      const words = text.split(" ").map((word) => {
        const span = document.createElement("span");
        span.textContent = `${word} `;
        probe.appendChild(span);
        return span;
      });

      const grouped: string[] = [];
      let lastTop: number | null = null;
      for (const span of words) {
        const top = Math.round(span.offsetTop);
        const word = (span.textContent ?? "").trim();
        if (top !== lastTop) {
          grouped.push(word);
          lastTop = top;
        } else {
          grouped[grouped.length - 1] += ` ${word}`;
        }
      }

      probe.remove();

      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) setInstant(true);
      setLines(grouped);
    }

    measure();

    // Observe the parent, not the paragraph: swapping in the split lines
    // changes the paragraph's own height and would loop.
    const observer = new ResizeObserver(measure);
    if (host.parentElement) observer.observe(host.parentElement);
    return () => observer.disconnect();
  }, [text, reduced]);

  if (reduced || !lines) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <motion.p
      ref={ref}
      className={className}
      initial={instant ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
    >
      {lines.map((line, i) => (
        // The mask needs room for descenders, so it over-extends and pulls the
        // extra back with a negative margin.
        <span
          key={`${i}-${line}`}
          className="block overflow-hidden pb-[0.14em] mb-[-0.14em]"
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: "106%" }, show: { y: "0%" } }}
            transition={{ duration: 0.9, ease: easeOutStrong }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.p>
  );
}
