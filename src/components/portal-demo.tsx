"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { easeOutStrong } from "@/lib/motion";

/**
 * A playable slice of the WHOOP portal concept.
 *
 * Deliberately not a port of the real thing — that app is ~4,000 lines across
 * seven routes, and shipping it here would double a codebase and drag Recharts
 * into this bundle for one embed. This recreates the three moments the portal
 * is actually *about*, faithfully enough that the numbers still reconcile:
 *
 *   1. coaching that arrives with the metric rather than behind a tap
 *   2. logging food and watching the coaching account for it
 *   3. a metric read against where you are in your cycle
 *
 * Tabs rather than a linear stepper, because navigation is part of the point.
 */

/* -- data ----------------------------------------------------------------- */

type Metric = "recovery" | "strain" | "sleep";

const RINGS: {
  key: Metric;
  label: string;
  value: number;
  max: number;
  unit: string;
  caption: string;
  color: string;
}[] = [
  { key: "recovery", label: "Recovery", value: 73, max: 100, unit: "%", caption: "Primed", color: "var(--demo-green)" },
  { key: "strain", label: "Strain", value: 14.2, max: 21, unit: "", caption: "Of 21", color: "var(--demo-ink)" },
  { key: "sleep", label: "Sleep", value: 84, max: 100, unit: "%", caption: "7h 22m", color: "var(--demo-ink)" },
];

const RING_COACH: Record<Metric, string> = {
  recovery:
    "73% recovery. HRV at 62ms is above your 58ms average, so your nervous system is better rested than usual. Resting heart rate is one beat off baseline — noise, not signal.",
  strain:
    "14.2 strain, peak heart rate 171. You're above your 13.7 weekly average on a 73% recovery. That's spending a good day rather than overspending it, but the margin is thinner than the number suggests.",
  sleep:
    "84% sleep performance — 7h 22m against an 8h 46m need. You're carrying 43m of debt, and you spent 42m awake across 14 disturbances. The night was fragmented more than it was short.",
};

const PROTEIN_TARGET = 180;
const PROTEIN_BASE = 144;
const CHICKEN_PROTEIN = 53;

/* Phase boundaries for a 26-day cycle — the user's own average, not a
   textbook 28, which is the whole point of the tab. */
const PHASES: { label: string; from: number; to: number; hrv: number; read: string }[] = [
  {
    label: "Menstrual", from: 1, to: 5, hrv: 57,
    read: "HRV is recovering from its luteal low and temperature is dropping back toward baseline. Recovery scores often improve late in this phase even while you feel worst at the start of it.",
  },
  {
    label: "Follicular", from: 6, to: 12, hrv: 64,
    read: "The best window of the cycle. HRV runs at or above baseline, resting heart rate sits low, and sleep is at its most efficient. Schedule your hardest sessions here.",
  },
  {
    label: "Ovulatory", from: 13, to: 15, hrv: 61,
    read: "Peak strength and power, with a small temperature rise at the end of the window marking ovulation itself. HRV may dip for a single day around the spike.",
  },
  {
    label: "Luteal", from: 16, to: 26, hrv: 53,
    read: "HRV falls, resting heart rate rises two to five beats, and sleep gets lighter. None of this is a red flag — it is the expected hormonal signature of the phase, and reading it as a recovery failure is the mistake.",
  },
];

const phaseFor = (day: number) => PHASES.find((p) => day >= p.from && day <= p.to) ?? PHASES[0];

const TABS = [
  { key: "today", label: "Today" },
  { key: "food", label: "Food" },
  { key: "cycle", label: "Cycle" },
] as const;

type Tab = (typeof TABS)[number]["key"];

const HINTS: Record<Tab, string> = {
  today: "Tap a ring — the coaching opens against it",
  food: "Log the chicken, then ask the coach",
  cycle: "Drag the day — every reading is re-read against the phase",
};

/* -- typing --------------------------------------------------------------- */

/**
 * Types a string out without the box growing as it goes: a hidden copy of the
 * finished text holds the height from the first character, and the typed text
 * is overlaid on it. Otherwise the panel shoves the tab bar down mid-sentence.
 */
function Typed({ text }: { text: string }) {
  const reduced = useReducedMotion() ?? false;
  const [shown, setShown] = useState("");
  const [rendered, setRendered] = useState(text);

  if (rendered !== text) {
    setRendered(text);
    setShown("");
  }

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 9);
    return () => clearInterval(id);
  }, [text, reduced]);

  if (reduced) {
    return <p className="text-[0.92rem] leading-6 text-[var(--demo-ink)]">{text}</p>;
  }

  const done = shown.length === text.length;
  return (
    <span className="relative block text-[0.92rem] leading-6 text-[var(--demo-ink)]">
      <span aria-hidden className="invisible block">
        {text}
        <span className="demo-caret" />
      </span>
      <span className="absolute inset-0 block">
        {shown}
        {!done && <span className="demo-caret" />}
      </span>
    </span>
  );
}

/* -- rings ---------------------------------------------------------------- */

function Ring({
  value, max, unit, label, caption, color, active, onClick,
}: {
  value: number; max: number; unit: string; label: string;
  caption: string; color: string; active: boolean; onClick: () => void;
}) {
  const size = 92;
  const stroke = 7;
  const r = size / 2 - stroke;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.min(value / max, 1));

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label}: ${value}${unit}. Open coaching.`}
      aria-pressed={active}
      className="flex flex-col items-center gap-2 rounded-2xl p-1.5 transition-transform duration-200 ease-out active:scale-[0.97]"
    >
      <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--demo-muted)]">
        {label}
      </span>
      <span className="relative block" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--demo-line)" strokeWidth={stroke} />
          <motion.circle
            cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color}
            strokeWidth={stroke} strokeLinecap="round" strokeDasharray={c}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.1, ease: easeOutStrong }}
            style={{ filter: active ? `drop-shadow(0 0 8px ${color})` : undefined }}
          />
        </svg>
        <span className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[1.35rem] font-semibold leading-none text-[var(--demo-ink)]">
            {value}
            <span className="text-xs font-normal text-[var(--demo-muted)]">{unit}</span>
          </span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.1em] text-[var(--demo-muted)]">
            {caption}
          </span>
        </span>
      </span>
    </button>
  );
}

/* -- tabs ----------------------------------------------------------------- */

function TodayTab() {
  const [open, setOpen] = useState<Metric | null>(null);

  return (
    <div>
      <div className="flex items-start justify-center gap-2 sm:gap-5">
        {RINGS.map(({ key, ...ring }) => (
          <Ring
            key={key}
            {...ring}
            active={open === key}
            onClick={() => setOpen((cur) => (cur === key ? null : key))}
          />
        ))}
      </div>

      <div className="mt-5 min-h-[132px]">
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.div
              key={open}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: easeOutStrong }}
              className="rounded-2xl border border-[var(--demo-line)] bg-[var(--demo-panel)] p-4"
            >
              <p className="mb-2 text-[10px] uppercase tracking-[0.12em] text-[var(--demo-muted)]">
                Coach
              </p>
              <Typed text={RING_COACH[open]} />
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-6 text-center text-xs text-[var(--demo-muted)]"
            >
              Three numbers, no interpretation. Tap one.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FoodTab() {
  const [logged, setLogged] = useState(false);
  const [asked, setAsked] = useState(false);
  const protein = logged ? PROTEIN_BASE + CHICKEN_PROTEIN : PROTEIN_BASE;
  const pct = Math.min((protein / PROTEIN_TARGET) * 100, 100);

  // The point of the tab: the coaching is derived from the log, so it can
  // never quote a number the bar above it isn't showing.
  const answer = logged
    ? `You're at ${protein}g of protein against a ${PROTEIN_TARGET}g target — ${PROTEIN_TARGET - protein}g short on a 14.2-strain day. That chicken closed most of the gap. Add 30g before bed and the overnight repair window has what it needs.`
    : `You're at ${protein}g of protein against a ${PROTEIN_TARGET}g target — ${PROTEIN_TARGET - protein}g short, on a day you trained hard. Protein is the raw material for the repair that happens overnight.`;

  return (
    <div>
      <div className="rounded-2xl border border-[var(--demo-line)] bg-[var(--demo-panel)] p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-sm text-[var(--demo-ink)]">Protein</span>
          <span className="text-sm tabular-nums text-[var(--demo-muted)]">
            <motion.span
              key={protein}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              className="text-[var(--demo-ink)]"
            >
              {protein}
            </motion.span>
            g / {PROTEIN_TARGET}g
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[rgba(255,255,255,0.08)]">
          <motion.div
            className="h-full rounded-full bg-[var(--demo-green)]"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: easeOutStrong }}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => { setLogged(true); setAsked(false); }}
          disabled={logged}
          className="rounded-full border border-[var(--demo-line)] px-3.5 py-2 text-xs text-[var(--demo-ink)] transition-all duration-150 enabled:active:scale-[0.97] disabled:opacity-30"
        >
          {logged ? "Logged ✓" : "Log 6oz chicken (+53g)"}
        </button>
        <button
          type="button"
          onClick={() => setAsked(true)}
          className="rounded-full bg-[var(--demo-ink)] px-3.5 py-2 text-xs font-medium text-[var(--demo-bg)] transition-all duration-150 active:scale-[0.97]"
        >
          Ask the coach
        </button>
        {logged && (
          <button
            type="button"
            onClick={() => { setLogged(false); setAsked(false); }}
            className="ml-auto rounded-full px-2 py-2 text-[11px] text-[var(--demo-muted)] transition-colors hover:text-[var(--demo-ink)]"
          >
            Reset
          </button>
        )}
      </div>

      <div className="mt-4 min-h-[116px]">
        <AnimatePresence mode="wait" initial={false}>
          {asked ? (
            <motion.div
              key={`${logged}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: easeOutStrong }}
              className="rounded-2xl border border-[var(--demo-line)] bg-[var(--demo-panel)] p-4"
            >
              <p className="mb-2 text-[10px] uppercase tracking-[0.12em] text-[var(--demo-muted)]">
                Coach
              </p>
              <Typed text={answer} />
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pt-5 text-center text-xs leading-5 text-[var(--demo-muted)]"
            >
              Log the chicken first, then ask — the coaching is derived from the
              log, so it can&rsquo;t quote a number the bar isn&rsquo;t showing.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CycleTab() {
  const [day, setDay] = useState(8);
  const phase = useMemo(() => phaseFor(day), [day]);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm text-[var(--demo-ink)]">
          Day {day} &middot;{" "}
          <span style={{ color: "var(--demo-cycle)" }}>{phase.label}</span>
        </p>
        <p className="text-xs tabular-nums text-[var(--demo-muted)]">
          {phase.hrv}ms avg HRV
        </p>
      </div>

      {/* Four segments, always visible. Filling only the active phase and leaving
          the rest transparent read as one bar floating in an empty track; the
          point of the strip is that a cycle has four phases and you are in one
          of them, so the other three have to be legible too. */}
      <div className="mt-3 flex h-2 w-full gap-px overflow-hidden rounded-full">
        {PHASES.map((p) => {
          const active = p.label === phase.label;
          return (
            <motion.div
              key={p.label}
              style={{ width: `${((p.to - p.from + 1) / 26) * 100}%` }}
              animate={{
                backgroundColor: active
                  ? "var(--demo-cycle)"
                  : "rgba(255,255,255,0.10)",
              }}
              transition={{ duration: 0.3, ease: easeOutStrong }}
            />
          );
        })}
      </div>

      <label className="mt-4 block">
        <span className="text-[10px] uppercase tracking-[0.12em] text-[var(--demo-muted)]">
          Cycle day
        </span>
        <input
          type="range"
          min={1}
          max={26}
          value={day}
          onChange={(e) => setDay(Number(e.target.value))}
          className="demo-range mt-1.5"
          aria-label={`Cycle day ${day}, ${phase.label} phase`}
        />
      </label>

      <div className="mt-3 min-h-[124px] rounded-2xl border border-[var(--demo-line)] bg-[var(--demo-panel)] p-4">
        <p className="mb-2 text-[10px] uppercase tracking-[0.12em] text-[var(--demo-muted)]">
          What this phase means for your readings
        </p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.p
            key={phase.label}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: easeOutStrong }}
            className="text-[0.92rem] leading-6 text-[var(--demo-ink)]"
          >
            {phase.read}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -- frame ---------------------------------------------------------------- */

export function PortalDemo() {
  const [tab, setTab] = useState<Tab>("today");
  const liveRef = useRef<HTMLParagraphElement>(null);

  return (
    <div className="demo-frame overflow-hidden rounded-3xl border border-[var(--demo-line)]">
      <div className="flex items-center justify-between gap-3 border-b border-[var(--demo-line)] px-5 py-3.5">
        <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--demo-muted)]">
          Portal concept
        </p>
        <p ref={liveRef} className="text-[11px] text-[var(--demo-muted)]">
          {HINTS[tab]}
        </p>
      </div>

      <div className="min-h-[352px] px-5 py-6 sm:min-h-[326px] sm:px-7">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: easeOutStrong }}
          >
            {tab === "today" && <TodayTab />}
            {tab === "food" && <FoodTab />}
            {tab === "cycle" && <CycleTab />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* The tab bar is part of the concept, not chrome around it — the portal's
          argument is that coaching lives inside the screens you already use. */}
      <div className="grid grid-cols-3 border-t border-[var(--demo-line)]">
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              aria-current={active ? "page" : undefined}
              className="relative py-3.5 text-xs transition-colors duration-150"
              style={{ color: active ? "var(--demo-ink)" : "var(--demo-muted)" }}
            >
              {active && (
                <motion.span
                  layoutId="portal-demo-tab"
                  className="absolute inset-x-5 top-0 h-px bg-[var(--demo-ink)]"
                  transition={{ type: "spring", bounce: 0, duration: 0.35 }}
                />
              )}
              {t.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
