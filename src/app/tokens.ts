/**
 * The redesign's token layer, scoped to `.v2` rather than `:root`.
 *
 * Everything here is destined for `globals.css` once the design is swapped over
 * the live routes. Keeping it scoped for now means the preview can carry a full
 * palette — including redefinitions of tokens the current site already uses —
 * without changing a single pixel of `/`, `/resume`, `/projects` or `/now`.
 *
 * Values are transcribed from the handoff README's token table. The light amber
 * is deliberately not the dark one: #ffb340 on #fbfbfd measures 1.73:1 and
 * fails the 4.5:1 rule, so light mode uses #8a4b00 at 6.58:1.
 */
export const SITE_TOKENS = `
.site {
  --background: #0a0a0a;
  --foreground: #f5f5f7;
  --muted: #a1a1a6;
  --accent: #0a84ff;
  --accent-hi: #5fb0ff;
  --accent-foreground: #ffffff;
  --surface: rgba(255, 255, 255, 0.06);
  --surface-strong: rgba(255, 255, 255, 0.10);
  --surface-soft: rgba(255, 255, 255, 0.03);
  --hover: rgba(255, 255, 255, 0.05);
  --surface-border: rgba(255, 255, 255, 0.12);
  --border-strong: rgba(255, 255, 255, 0.16);
  --hairline: rgba(255, 255, 255, 0.08);
  --wordmark: rgba(245, 245, 247, 0.07);
  --scrim: rgba(10, 10, 10, 0.7);
  --glow-a: rgba(10, 132, 255, 0.18);
  --glow-b: rgba(191, 90, 242, 0.13);
  --amber: #ffb340;
  --amber-bg: rgba(255, 159, 10, 0.12);
  --amber-border: rgba(255, 159, 10, 0.4);

  background: var(--background);
  color: var(--foreground);
}

:root.light .site {
  --background: #fbfbfd;
  --foreground: #1d1d1f;
  --muted: #6e6e73;
  --accent: #0071e3;
  --accent-hi: #0a84ff;
  --accent-foreground: #ffffff;
  --surface: rgba(0, 0, 0, 0.04);
  --surface-strong: rgba(0, 0, 0, 0.07);
  --surface-soft: rgba(0, 0, 0, 0.02);
  --hover: rgba(0, 0, 0, 0.04);
  --surface-border: rgba(0, 0, 0, 0.08);
  --border-strong: rgba(0, 0, 0, 0.14);
  --hairline: rgba(0, 0, 0, 0.06);
  --wordmark: rgba(29, 29, 31, 0.07);
  --scrim: rgba(251, 251, 253, 0.78);
  --glow-a: rgba(0, 113, 227, 0.09);
  --glow-b: rgba(175, 82, 222, 0.07);
  --amber: #8a4b00;
  --amber-bg: rgba(255, 159, 10, 0.14);
  --amber-border: rgba(180, 110, 10, 0.34);
}

/* Mono eyebrow: 10.5px / 0.16em / uppercase / muted, per the type spec. */
.site-eyebrow {
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}

.site-amber-pill {
  color: var(--amber);
  background: var(--amber-bg);
  border: 1px solid var(--amber-border);
}

/* The status dot on the hero's eyebrow pill. */
@keyframes v2-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.82); }
}

.site-dot {
  animation: v2-pulse 2.4s cubic-bezier(0.23, 1, 0.32, 1) infinite;
}

/* The dashed accent path travelling the pipeline DAG. */
@keyframes v2-dash {
  to { stroke-dashoffset: -28; }
}

.site-dag-flow {
  stroke-dasharray: 5 9;
  animation: v2-dash 1.6s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .site-dot,
  .site-dag-flow {
    animation: none;
  }
}
`;
