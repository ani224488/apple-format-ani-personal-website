"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { springs, easeOutStrong } from "@/lib/motion";

// Mirrors the data model in the Ambient Coach repo so this demo stays a
// faithful recreation rather than an approximation.
type Goal = "strength" | "endurance" | "sleep" | "wellness";
type BiomarkerKey = "recovery" | "strain" | "sleep";

const GOALS: { key: Goal; label: string }[] = [
  { key: "strength", label: "Build Strength" },
  { key: "endurance", label: "Improve Endurance" },
  { key: "sleep", label: "Sleep Better" },
  { key: "wellness", label: "General Wellness" },
];

const BIOMARKERS: {
  key: BiomarkerKey;
  label: string;
  value: number;
  max: number;
  unit: string;
  zoneLabel: string;
}[] = [
  { key: "recovery", label: "Recovery", value: 78, max: 100, unit: "%", zoneLabel: "Green" },
  { key: "strain", label: "Strain", value: 9.4, max: 21, unit: "", zoneLabel: "Moderate" },
  { key: "sleep", label: "Sleep", value: 91, max: 100, unit: "%", zoneLabel: "Best of the week" },
];

const INSIGHTS: Record<BiomarkerKey, Record<Goal, string>> = {
  recovery: {
    strength:
      "78% recovery — plenty of room to load today. Front-load your heaviest lifts before 2pm while HRV is still elevated.",
    endurance:
      "78% recovery clears you for a longer aerobic session. Keep the first 20 minutes conversational, then build.",
    sleep:
      "Recovery's solid, but it's downstream of sleep. Tonight's the one that actually moves this number.",
    wellness: "78% is a green light. Nothing to force today — just don't skip the walk.",
  },
  strain: {
    strength:
      "9.4 strain so far. You've got 4–6 points of headroom before it eats into tomorrow's recovery — enough for one more working-set block.",
    endurance:
      "9.4 and climbing steady. That's a solid aerobic base-building pace — hold it, don't spike it.",
    sleep:
      "9.4 strain by this hour usually means a harder time falling asleep tonight. Ease off after 6pm if you can.",
    wellness: "9.4 is a normal, sustainable day. You don't need to chase a number here.",
  },
  sleep: {
    strength:
      "91% sleep performance — that's what actually earned today's recovery. Protect this before you protect the workout.",
    endurance:
      "91% sleep performance. Your aerobic system rebuilt overnight — today's the day to spend it.",
    sleep: "91% — best night this week. Whatever you did yesterday (early dinner, dim lights), repeat it.",
    wellness: "91% sleep performance. That's the real number to be proud of today.",
  },
};

const NUTRITION_METRICS = [
  { label: "Hydration", value: "68%", note: "of daily target" },
  { label: "Protein", value: "104g", note: "logged today" },
  { label: "Last meal", value: "2.1 hrs", note: "before bed" },
  { label: "Caffeine cutoff", value: "6 hrs", note: "before bed" },
];

const NUTRITION_INSIGHTS: Record<Goal, string> = {
  strength:
    "104g protein logged — a bit short of what yesterday's strain calls for. Add ~30g post-workout to actually bank the adaptation.",
  endurance:
    "Hydration's at 68% of target. That's the lever most likely to cap an endurance session before strain does.",
  sleep:
    "Last meal was 2.1 hours before bed — under the 3-hour buffer that protects deep sleep. That's the likely reason for the dip.",
  wellness:
    "Nothing urgent here — hydration and protein are both in a reasonable range today.",
};

/** Recovery is the one metric that earns color; everything else stays mono. */
function ringColor(key: BiomarkerKey, value: number) {
  if (key !== "recovery") return "var(--demo-ink)";
  if (value >= 67) return "var(--demo-green)";
  if (value >= 34) return "var(--demo-yellow)";
  return "var(--demo-red)";
}

const STEP_LABELS = [
  "Set a goal",
  "Pick a signal",
  "Insight arrives",
  "Nutrition",
  "The difference",
];

const STEP_HINTS = [
  "Pick one — the coaching changes with it.",
  "Sample data, not real WHOOP output.",
  "The insight arrives with the number.",
  "The input sitting underneath all three.",
  "Same data. Same screen.",
];

export function WhoopWalkthrough() {
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [marker, setMarker] = useState<BiomarkerKey | null>(null);

  const canAdvance = step === 0 ? goal !== null : step === 1 ? marker !== null : true;
  const atEnd = step === STEP_LABELS.length - 1;

  function reset() {
    setStep(0);
    setGoal(null);
    setMarker(null);
  }

  return (
    <div className="demo-frame overflow-hidden rounded-3xl border border-[var(--demo-line)]">
      <div className="flex items-center justify-between border-b border-[var(--demo-line)] px-5 py-3.5">
        <div className="flex items-center gap-2" aria-hidden>
          {STEP_LABELS.map((label, i) => (
            <span
              key={label}
              className="h-1.5 rounded-full transition-all duration-300 ease-out"
              style={{
                width: i === step ? 20 : 6,
                background: i <= step ? "var(--demo-ink)" : "var(--demo-line)",
              }}
            />
          ))}
        </div>
        <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--demo-muted)]">
          {step + 1} / {STEP_LABELS.length} &middot; {STEP_LABELS[step]}
        </p>
      </div>

      {/* Taller floor on narrow screens: the same step content wraps to more
          lines there, so a single min-height sized for desktop let the panel
          resize between steps. */}
      <div className="relative min-h-[380px] px-5 py-7 sm:min-h-[330px] sm:px-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease: easeOutStrong }}
          >
            {step === 0 && <GoalStep goal={goal} onPick={setGoal} />}
            {step === 1 && <MarkerStep marker={marker} onPick={setMarker} />}
            {step === 2 && goal && marker && <InsightStep goal={goal} markerKey={marker} />}
            {step === 3 && goal && <NutritionStep goal={goal} />}
            {step === 4 && goal && marker && <DifferenceStep goal={goal} markerKey={marker} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[var(--demo-line)] px-5 py-4">
        <button
          onClick={() => (atEnd ? reset() : setStep((s) => Math.max(0, s - 1)))}
          disabled={step === 0}
          className="rounded-full border border-[var(--demo-line)] px-4 py-2 text-sm font-medium text-[var(--demo-ink)] transition-all duration-150 ease-out enabled:active:scale-[0.97] disabled:opacity-30"
        >
          {atEnd ? "Start over" : "Back"}
        </button>

        <p className="hidden text-xs text-[var(--demo-muted)] sm:block">
          {STEP_HINTS[step]}
        </p>

        <button
          onClick={() => setStep((s) => Math.min(STEP_LABELS.length - 1, s + 1))}
          disabled={!canAdvance || atEnd}
          className="rounded-full bg-[var(--demo-ink)] px-4 py-2 text-sm font-medium text-[var(--demo-bg)] transition-all duration-150 ease-out enabled:active:scale-[0.97] disabled:opacity-30"
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-[var(--demo-line)] bg-[var(--demo-panel)] px-4 py-3 text-[0.95rem] leading-6">
      {children}
    </div>
  );
}

function GoalStep({ goal, onPick }: { goal: Goal | null; onPick: (g: Goal) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <Bubble>I&rsquo;m your Coach. First — what&rsquo;s the goal right now?</Bubble>
      <div className="flex flex-wrap gap-2">
        {GOALS.map((g) => {
          const active = goal === g.key;
          return (
            <button
              key={g.key}
              onClick={() => onPick(g.key)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-150 ease-out active:scale-[0.97] ${
                active
                  ? "border-[var(--demo-ink)] bg-[var(--demo-ink)] text-[var(--demo-bg)]"
                  : "border-[var(--demo-line)] bg-[var(--demo-panel)] text-[var(--demo-ink)] hover:border-[var(--demo-ink)]"
              }`}
            >
              {g.label}
            </button>
          );
        })}
      </div>
      <p className="text-xs leading-5 text-[var(--demo-muted)]">
        Nothing is shown until the coach knows what you&rsquo;re training for. The
        same number means different things depending on the answer.
      </p>
    </div>
  );
}

function MarkerStep({
  marker,
  onPick,
}: {
  marker: BiomarkerKey | null;
  onPick: (m: BiomarkerKey) => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <Bubble>
        Got it. Here are your three core signals &mdash; which do you want to check
        first?
      </Bubble>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        {BIOMARKERS.map((b) => {
          const active = marker === b.key;
          return (
            <button
              key={b.key}
              onClick={() => onPick(b.key)}
              aria-pressed={active}
              className={`flex flex-col items-start gap-1 rounded-2xl border px-4 py-3 text-left transition-all duration-150 ease-out active:scale-[0.98] ${
                active
                  ? "border-[var(--demo-ink)] bg-[var(--demo-panel)]"
                  : "border-[var(--demo-line)] bg-[var(--demo-panel)] hover:border-[var(--demo-ink)]"
              }`}
            >
              <span className="text-lg font-semibold tracking-[-0.01em]">{b.label}</span>
              <span className="text-xs text-[var(--demo-muted)]">
                {b.value}
                {b.unit} &middot; {b.zoneLabel}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Ring({
  markerKey,
  size = 168,
  animate = true,
  className,
}: {
  markerKey: BiomarkerKey;
  size?: number;
  animate?: boolean;
  /* CSS width/height override the width/height attributes, and the viewBox
     scales the labels with it — so a responsive class resizes the whole ring
     without a second set of type sizes. */
  className?: string;
}) {
  const reduced = useReducedMotion();
  const b = BIOMARKERS.find((x) => x.key === markerKey)!;
  const stroke = size < 120 ? 8 : 12;
  const radius = size / 2 - stroke;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(b.value / b.max, 1));
  const color = ringColor(b.key, b.value);
  const shouldAnimate = animate && !reduced;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`shrink-0 ${className ?? ""}`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--demo-line)"
        strokeWidth={stroke}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: shouldAnimate ? circumference : offset }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: shouldAnimate ? 1.1 : 0, ease: easeOutStrong }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="47%"
        textAnchor="middle"
        fontWeight={700}
        fontSize={size * 0.22}
        letterSpacing="-0.02em"
        fill="var(--demo-ink)"
      >
        {b.value}
        {b.unit}
      </text>
      <text
        x="50%"
        y="63%"
        textAnchor="middle"
        fontSize={size * 0.068}
        letterSpacing="1.5"
        fill="var(--demo-muted)"
      >
        {b.zoneLabel.toUpperCase()}
      </text>
    </svg>
  );
}

/** Types text out one character at a time once `delay` has elapsed. */
function useTypewriter(text: string, delay: number) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (reduced) {
      setShown(text);
      return;
    }
    setShown("");
    let interval: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      let i = 0;
      interval = setInterval(() => {
        i += 1;
        setShown(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
        // 24ms rather than 16: a 16ms interval asks for a React re-render every
        // frame, which is most of a phone's frame budget spent on one string.
      }, 24);
    }, delay);

    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, delay, reduced]);

  return { shown, done: shown.length >= text.length };
}

/**
 * Renders the typed text on top of an invisible copy of the finished string, so
 * the box is already at its final height on the very first character.
 *
 * Without it the container grows line by line as the text arrives and pushes
 * the Back/Next buttons down the screen while you're mid-read — which is what
 * made the demo feel like it was jumping around on a phone. `visibility:
 * hidden` still occupies layout, which is the whole point; `display: none`
 * would not.
 */
function TypedLine({
  full,
  shown,
  done,
  className,
}: {
  full: string;
  shown: string;
  done: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className ?? ""}`}>
      <p className="invisible" aria-hidden>
        {full}
      </p>
      <p className="absolute inset-0">
        {shown}
        {!done && <span className="demo-caret" aria-hidden />}
      </p>
    </div>
  );
}

function InsightStep({ goal, markerKey }: { goal: Goal; markerKey: BiomarkerKey }) {
  const insight = INSIGHTS[markerKey][goal];
  const { shown, done } = useTypewriter(insight, 900);
  const goalLabel = GOALS.find((g) => g.key === goal)?.label;

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-8">
      <Ring
        markerKey={markerKey}
        className="h-[132px] w-[132px] sm:h-[168px] sm:w-[168px]"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--demo-muted)]">
            Coach
          </p>
          <span className="rounded-full border border-[var(--demo-line)] px-2 py-0.5 text-[10px] uppercase tracking-[0.08em] text-[var(--demo-muted)]">
            {goalLabel}
          </span>
        </div>
        <TypedLine
          full={insight}
          shown={shown}
          done={done}
          className="mt-3 text-[1.05rem] leading-7"
        />
        <p className="mt-1 text-xs leading-5 text-[var(--demo-muted)]">
          No tap. No chat screen. The ring finishes drawing and the reading is
          already there.
        </p>
      </div>
    </div>
  );
}

function NutritionStep({ goal }: { goal: Goal }) {
  const insight = NUTRITION_INSIGHTS[goal];
  const { shown, done } = useTypewriter(insight, 500);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {NUTRITION_METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.default, delay: i * 0.06 }}
            className="rounded-2xl border border-[var(--demo-line)] bg-[var(--demo-panel)] p-4"
          >
            <p className="text-[11px] uppercase tracking-[0.08em] text-[var(--demo-muted)]">
              {m.label}
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-[-0.02em]">
              {m.value}
            </p>
            <p className="mt-0.5 text-xs text-[var(--demo-muted)]">{m.note}</p>
          </motion.div>
        ))}
      </div>

      <div>
        <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--demo-muted)]">
          Coach
        </p>
        <TypedLine
          full={insight}
          shown={shown}
          done={done}
          className="mt-2 max-w-lg text-[1.05rem] leading-7"
        />
        <p className="mt-1 text-xs leading-5 text-[var(--demo-muted)]">
          Recovery, strain, and sleep all sit downstream of what you ate and
          when. This tab was the piece I added that the real app doesn&rsquo;t
          have.
        </p>
      </div>
    </div>
  );
}

function DifferenceStep({ goal, markerKey }: { goal: Goal; markerKey: BiomarkerKey }) {
  const insight = INSIGHTS[markerKey][goal];

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="rounded-2xl border border-[var(--demo-line)] bg-[var(--demo-panel)] p-5">
        <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--demo-muted)]">
          Today
        </p>
        <div className="mt-4 flex flex-col items-center gap-4">
          <Ring markerKey={markerKey} size={104} animate={false} />
          <div className="w-full rounded-full border border-[var(--demo-line)] px-3 py-2 text-center text-xs text-[var(--demo-muted)]">
            Open Coach &rarr;
          </div>
        </div>
        <p className="mt-4 text-xs leading-5 text-[var(--demo-muted)]">
          The number is here. The meaning is one screen away — so most people
          never get it.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springs.default, delay: 0.15 }}
        className="rounded-2xl border border-[var(--demo-ink)] bg-[var(--demo-panel)] p-5"
      >
        <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--demo-ink)]">
          Ambient
        </p>
        <div className="mt-4 flex flex-col items-center gap-4">
          <Ring markerKey={markerKey} size={104} animate={false} />
          <p className="text-xs leading-5">{insight}</p>
        </div>
        <p className="mt-4 text-xs leading-5 text-[var(--demo-muted)]">
          Same data, same screen — the coaching just doesn&rsquo;t wait to be
          asked for.
        </p>
      </motion.div>
    </div>
  );
}
