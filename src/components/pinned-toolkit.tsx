"use client";

import { useRef, useState, type ComponentType } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useIsCompact } from "@/lib/use-capability";
import { Reveal } from "@/components/reveal";
import {
  PythonIcon,
  DatabaseIcon,
  CloudIcon,
  SparkleIcon,
  MapPinIcon,
  GitBranchIcon,
  LayersIcon,
} from "@/components/icons";

type Tool = { label: string; icon: ComponentType };

/**
 * Lives here rather than in the page because the page is a server component
 * and these icons are functions — React can't serialise a component across the
 * server/client boundary, so the list has to be declared on the client side of
 * it. Order is meaningful: it's roughly how often each one gets used, and the
 * pinned scroll reads it top to bottom.
 */
const TOOLKIT: Tool[] = [
  { label: "Python", icon: PythonIcon },
  { label: "SQL", icon: DatabaseIcon },
  { label: "Cloud (AWS · Azure)", icon: CloudIcon },
  { label: "Databricks / ETL", icon: LayersIcon },
  { label: "Claude / AI-Assisted Dev", icon: SparkleIcon },
  { label: "GIS / ArcGIS", icon: MapPinIcon },
  { label: "Git", icon: GitBranchIcon },
];

const ROW = 68; // px — fixed so the centring maths below is exact
const WINDOW = ROW * 5; // five rows visible, the middle one active

/**
 * The Toolkit as a pinned section: it sticks to the viewport while the list
 * advances through a fixed window, then releases. This is the scroll move
 * Apple's product pages are built on — the page stops, one thing happens, the
 * page continues.
 *
 * The list translates so the active row stays dead centre, which is why ROW is
 * a fixed pixel height rather than intrinsic: the offset is
 * `-progress * (n - 1) * ROW`, and that only lands on centre if every row is
 * exactly ROW tall.
 *
 * Phones and reduced-motion get the original static grid. Pinning costs a tall
 * scroll container and a scroll-linked transform per row, and on a small screen
 * it mostly reads as the page having stopped responding.
 */
export function PinnedToolkit({ tools = TOOLKIT }: { tools?: Tool[] }) {
  const outer = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const compact = useIsCompact();
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: outer,
    offset: ["start start", "end end"],
  });

  const n = tools.length;
  const y = useTransform(scrollYProgress, [0, 1], [0, -(n - 1) * ROW]);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const i = Math.round(p * (n - 1));
    setActive((prev) => (prev === i ? prev : i));
  });

  if (reduced || compact) {
    return <StaticToolkit tools={tools} />;
  }

  return (
    <div ref={outer} className="relative" style={{ height: `${n * 52}vh` }}>
      <div className="sticky top-0 flex h-svh items-center">
        <div className="grid w-full gap-10 sm:grid-cols-[minmax(0,240px)_1fr] sm:gap-16">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">
              Toolkit
            </h2>
            <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
              What I reach for on most days, roughly in order of how often.
            </p>
            <p className="mt-6 font-mono text-xs tabular-nums text-accent">
              {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </p>
            <div className="mt-3 h-px w-full max-w-[180px] bg-surface-border">
              <motion.div
                className="h-px origin-left bg-accent"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
          </div>

          <div
            className="relative overflow-hidden"
            style={{
              height: WINDOW,
              maskImage:
                "linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent)",
            }}
          >
            <motion.ul
              className="absolute inset-x-0 top-0"
              style={{ y, paddingTop: (WINDOW - ROW) / 2 }}
            >
              {tools.map((tool, i) => (
                <ToolRow
                  key={tool.label}
                  tool={tool}
                  index={i}
                  total={n}
                  progress={scrollYProgress}
                />
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToolRow({
  tool,
  index,
  total,
  progress,
}: {
  tool: Tool;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const Icon = tool.icon;

  // Each row owns a slice of the scroll range, is at full strength across its
  // own slot, and ramps down to resting by the time the neighbouring row is
  // centred. Expressed as a function of progress rather than a keyframe range:
  // a four-point range has to stay monotonically increasing at every item
  // count, and the edge rows push their outer stops past 0 and 1, which the
  // browser rejects outright.
  const span = 1 / total;
  const centre = (index + 0.5) * span;

  const strength = (p: number) => {
    const d = Math.abs(p - centre) / span; // 0 at centre, 1 at the next centre
    if (d <= 0.5) return 1;
    return Math.max(0, 1 - (d - 0.5) / 0.5);
  };

  const opacity = useTransform(progress, (p) => 0.22 + strength(p) * 0.78);
  const x = useTransform(progress, (p) => -8 * (1 - strength(p)));

  return (
    <motion.li
      className="flex items-center gap-4"
      style={{ height: ROW, opacity, x }}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-surface-border bg-surface text-accent">
        <Icon />
      </span>
      <span className="text-[clamp(1.1rem,2.4vw,1.6rem)] font-medium tracking-[-0.02em]">
        {tool.label}
      </span>
    </motion.li>
  );
}

/** The pre-pin layout, kept for phones and reduced motion. */
function StaticToolkit({ tools }: { tools: Tool[] }) {
  return (
    <div className="grid gap-8 sm:grid-cols-[minmax(0,190px)_1fr] sm:gap-12">
      <div className="sm:sticky sm:top-28 sm:self-start">
        <Reveal>
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">
            Toolkit
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            What I reach for on most days, roughly in order of how often.
          </p>
        </Reveal>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {tools.map(({ label, icon: Icon }, i) => (
          <Reveal key={label} delay={i * 0.05}>
            <div className="flex h-full flex-col items-start gap-3 rounded-2xl border border-surface-border bg-surface p-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-accent">
                <Icon />
              </span>
              <span className="text-sm text-muted">{label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
