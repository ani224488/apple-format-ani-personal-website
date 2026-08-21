import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";

export const metadata: Metadata = { title: "Projects — Ani" };

/**
 * Projects index.
 *
 * Content comes from `src/lib/projects.ts` unchanged — this is a presentation
 * pass, so nothing here retypes a tagline or invents a tag. The private-source
 * project renders its link as a muted label rather than an anchor, because a
 * link to a private repo is a 404 with extra steps.
 */
export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full" style={{ maxWidth: 1180, padding: "clamp(90px,13vh,160px) clamp(20px,4vw,40px) clamp(80px,10vh,140px)" }}>
      <div className="site-eyebrow">Projects</div>
      <h2 className="font-semibold" style={{ marginTop: 16, fontSize: "clamp(28px,3.4vw,44px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
        Things I&rsquo;ve built.
      </h2>
      <p style={{ marginTop: 16, maxWidth: "62ch", fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
        Each one has a walkthrough — what the problem was, what I decided, and
        what I&rsquo;d do next.
      </p>

      <div
        className="rounded-2xl border"
        style={{ marginTop: 30, maxWidth: 760, padding: "22px 24px", background: "rgba(10,132,255,0.06)", borderColor: "rgba(10,132,255,0.28)" }}
      >
        <p style={{ fontSize: 15.5, lineHeight: 1.55, color: "var(--muted)" }}>
          <span style={{ color: "var(--foreground)", fontWeight: 500 }}>
            Some of these have small live demos built right into the page.
          </span>{" "}
          They run in your browser — no sign-up, nothing to install. Click around
          and break things, that&rsquo;s what they&rsquo;re there for.
        </p>
      </div>

      <div className="grid" style={{ marginTop: 38, gap: 20, gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))" }}>
        {projects.map((p) => {
          const source = p.links[0];
          return (
            <div
              key={p.slug}
              className="flex flex-col overflow-hidden rounded-3xl border transition-all duration-[400ms] hover:-translate-y-1"
              style={{ background: "var(--surface-soft)", borderColor: "var(--surface-border)", transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)" }}
            >
              <div className="relative" style={{ height: 170, background: "var(--surface-soft)", borderBottom: "1px solid var(--surface-border)" }}>
                <span className="site-eyebrow absolute" style={{ left: 18, bottom: 18 }}>{p.year}</span>
              </div>

              <div className="flex flex-1 flex-col" style={{ padding: 24 }}>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-0.015em" }}>{p.title}</h3>
                  {p.status && (
                    <span className="site-amber-pill rounded-full" style={{ padding: "5px 10px", fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                      In progress
                    </span>
                  )}
                </div>

                <p style={{ marginTop: 14, fontSize: 15, lineHeight: 1.55, color: "var(--muted)" }}>{p.tagline}</p>

                <div className="flex flex-wrap" style={{ marginTop: 18, gap: 7 }}>
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full border" style={{ padding: "6px 11px", fontSize: 12, borderColor: "var(--surface-border)", color: "var(--muted)" }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-5" style={{ marginTop: "auto", paddingTop: 22, fontSize: 14 }}>
                  <Link href={`/projects/${p.slug}`} className="inline-flex min-h-11 items-center" style={{ color: "var(--accent)" }}>
                    Read the walkthrough
                  </Link>
                  {source?.isPrivate ? (
                    <span className="inline-flex min-h-11 items-center" style={{ color: "var(--muted)" }}>
                      Source private
                    </span>
                  ) : source?.href ? (
                    <a href={source.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center" style={{ color: "var(--muted)" }}>
                      {source.label}
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
