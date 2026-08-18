// Spring presets per the apple-design skill: critically damped (bounce: 0) is
// the default for anything that isn't momentum-driven. Only add bounce when a
// drag/flick gesture precedes the motion.
export const springs = {
  default: { type: "spring" as const, bounce: 0, duration: 0.4 },
  momentum: { type: "spring" as const, bounce: 0.2, duration: 0.4 },
  // Slow and heavy — for elements settling into place on scroll, not for input
  // feedback, where 0.4s is already at the edge of feeling laggy.
  settle: { type: "spring" as const, bounce: 0, duration: 0.9 },
};

export const easeOutStrong = [0.23, 1, 0.32, 1] as const;
export const easeInOutStrong = [0.77, 0, 0.175, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};

/**
 * The reveal Apple actually uses: a small scale change plus a short lift, run
 * slowly. The instinct is to move an element further and faster; the opposite
 * reads as more expensive. 0.96 is deliberate — at 0.9 the scale becomes the
 * subject of the animation instead of a side effect of it.
 */
export const revealScale = 0.96;
export const revealDuration = 1;
export const revealLift = 8;

export function stagger(index: number, step = 0.05) {
  return { delay: index * step };
}
