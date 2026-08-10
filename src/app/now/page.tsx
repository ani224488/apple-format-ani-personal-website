import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now — Ani",
};

export default function NowPage() {
  return (
    <div className="fade-up">
      <h1 className="text-3xl font-semibold tracking-[-0.02em]">Now</h1>
      <p className="mt-2 text-sm text-muted">
        What I&rsquo;m exploring and planning to build next.
      </p>

      <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-surface-border py-20 text-center">
        <p className="text-muted">Nothing here yet — check back soon.</p>
      </div>
    </div>
  );
}
