import type { Metadata } from "next";

export const metadata: Metadata = { title: "Now — Ani" };

/**
 * Now.
 *
 * The live site's Now page is a placeholder ("Nothing here yet"). The handoff
 * fills it from real facts only — the two things actually being built, the work
 * item at Travelers, and the next task on the Whoop concept. Nothing here is
 * aspirational filler.
 */
const items = [
  {
    label: "Building",
    title: "WHOOP Ambient Coach",
    body: "A member-experience concept and working prototype — dashboard rings plus Sleep, Nutrition, Cycle, Stress and Coach surfaces, playable in the browser. In progress, not live yet.",
  },
  {
    label: "Building",
    title: "Restaurant Finder",
    body: "A food journal and discovery app: Overpass search ranked against stated cuisine preferences, Nominatim geocoding, visit history and ratings persisted locally. Goes up here once it's shareable.",
  },
  {
    label: "At work",
    title: "Claude-assisted load automation",
    body: "Designing automation workflows that integrate AWS services with secure API-key authentication to load data into MDM tenants, replacing the manual load process.",
  },
  {
    label: "Next",
    title: "A walkthrough recording",
    body: "Recording a screen capture of the ring → coach → nutrition → cycle flow, and clearing the iOS review notes: inputs under 16px zoom the page on focus, and the bottom nav needs a safe-area inset.",
  },
];

export default function NowPage() {
  return (
    <div className="mx-auto w-full" style={{ maxWidth: 900, padding: "clamp(90px,13vh,160px) clamp(20px,4vw,40px) clamp(80px,10vh,140px)" }}>
      <div className="site-eyebrow">Now · August 2026</div>
      <h2 className="font-semibold" style={{ marginTop: 16, fontSize: "clamp(28px,3.4vw,44px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
        What I&rsquo;m working on.
      </h2>

      <div style={{ marginTop: 38, display: "flex", flexDirection: "column", gap: 16 }}>
        {items.map((it) => (
          <div key={it.title} className="rounded-[20px] border" style={{ padding: 26, background: "var(--surface-soft)", borderColor: "var(--surface-border)" }}>
            <div style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--accent)" }}>
              {it.label}
            </div>
            <div style={{ marginTop: 12, fontSize: 17, fontWeight: 500, letterSpacing: "-0.015em" }}>{it.title}</div>
            <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.55, maxWidth: "66ch", color: "var(--muted)" }}>{it.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
