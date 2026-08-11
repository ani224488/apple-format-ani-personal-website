import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now — Ani",
};

export default function NowPage() {
  return (
    <div className="fade-up mx-auto max-w-3xl">
      <p className="text-sm font-medium text-accent">Now</p>
      <h1 className="mt-2 text-[clamp(2rem,5vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
        What I&rsquo;m up to.
      </h1>
      <p className="mt-3 max-w-md text-[1.05rem] leading-7 text-muted">
        What I&rsquo;m exploring and planning to build next.
      </p>

      <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-surface-border py-20 text-center">
        <p className="text-muted">Nothing here yet — check back soon.</p>
      </div>
    </div>
  );
}
