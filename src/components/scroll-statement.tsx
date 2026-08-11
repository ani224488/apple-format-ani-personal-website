"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

/**
 * A large statement whose words brighten one at a time as the section moves
 * through the viewport. Scroll-linked rather than triggered, so the text
 * tracks the scrubbing exactly — scrolling back up dims it again.
 */
export function ScrollStatement({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.55"],
  });

  return (
    <div ref={ref} className="flex justify-center px-6">
      <p className="flex max-w-3xl flex-wrap justify-center gap-x-[0.28em] gap-y-1 text-center text-[clamp(1.75rem,5.5vw,3.25rem)] font-semibold leading-[1.15] tracking-[-0.03em]">
        {words.map((word, i) => (
          <Word
            key={`${word}-${i}`}
            word={word}
            index={i}
            total={words.length}
            progress={scrollYProgress}
            reduced={Boolean(reduced)}
          />
        ))}
      </p>
    </div>
  );
}

function Word({
  word,
  index,
  total,
  progress,
  reduced,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  // Each word claims a slice of the scroll range, with a little overlap so the
  // brightening reads as a sweep rather than a sequence of discrete flips.
  const start = index / total;
  const end = (index + 1.6) / total;
  const opacity = useTransform(progress, [start, end], [0.18, 1]);

  if (reduced) {
    return <span>{word}</span>;
  }

  return <motion.span style={{ opacity }}>{word}</motion.span>;
}
