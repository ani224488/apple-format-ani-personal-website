// Spring presets per the apple-design skill: critically damped (bounce: 0) is
// the default for anything that isn't momentum-driven. Only add bounce when a
// drag/flick gesture precedes the motion.
export const springs = {
  default: { type: "spring" as const, bounce: 0, duration: 0.4 },
  momentum: { type: "spring" as const, bounce: 0.2, duration: 0.4 },
};

export const easeOutStrong = [0.23, 1, 0.32, 1] as const;
export const easeInOutStrong = [0.77, 0, 0.175, 1] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};

export function stagger(index: number, step = 0.05) {
  return { delay: index * step };
}
