import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";
import { WhoopWalkthrough } from "@/components/whoop-walkthrough";
import { PortalDemo } from "@/components/portal-demo";

/**
 * Project detail.
 *
 * The demo components are the existing ones, imported unchanged — the redesign
 * sits on top of them rather than reimplementing the walkthrough, the ring
 * sequencing or the coaching lookup. They carry their own dark device frame,
 * which is meant to stay dark in both site themes the way a product shot does.
 */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetail({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto w-full" style={{ maxWidth: 1180, padding: "clamp(90px,13vh,160px) clamp(20px,4vw,40px) clamp(80px,10vh,140px)" }}>
      <Link href="/projects" className="site-eyebrow inline-flex min-h-11 items-center">
        ← Projects
      </Link>

      <h2 className="font-semibold" style={{ marginTop: 18, fontSize: "clamp(28px,3.6vw,48px)", lineHeight: 1.06, letterSpacing: "-0.03em" }}>
        {project.title}
      </h2>

      <div className="flex flex-wrap items-center" style={{ marginTop: 16, gap: 12 }}>
        <span className="site-eyebrow">{project.year}</span>
        {project.status && (
          <span className="site-amber-pill rounded-full" style={{ padding: "5px 10px", fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            {project.status}
          </span>
        )}
      </div>

      <div style={{ marginTop: 26, maxWidth: "70ch" }}>
        {project.overview.map((para) => (
          <p key={para} style={{ marginBottom: 16, fontSize: 16.5, lineHeight: 1.6, color: "var(--muted)" }}>
            {para}
          </p>
        ))}
      </div>

      {project.caseStudy && (
        <div
          className="grid border-t"
          style={{ marginTop: 44, paddingTop: 32, gap: 24, gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", borderColor: "var(--hairline)" }}
        >
          {project.caseStudy.map((c) => (
            <div key={c.n}>
              <div style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: 11, color: "var(--accent)", letterSpacing: "0.14em" }}>{c.n}</div>
              <div style={{ marginTop: 12, fontSize: 16, fontWeight: 500 }}>{c.label}</div>
              <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.5, color: "var(--muted)" }}>{c.body}</p>
            </div>
          ))}
        </div>
      )}

      {(project.walkthrough || project.portalDemo) && (
        <div style={{ paddingTop: "clamp(60px,8vh,96px)" }}>
          <div className="site-eyebrow">The demo</div>
          <p style={{ marginTop: 14, maxWidth: "62ch", fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
            Runs in your browser. The coaching is a hand-written rule set, not a
            live model, and every number in it is sample data rather than real
            WHOOP output.
          </p>
          <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 30 }}>
            {project.walkthrough === "whoop" && <WhoopWalkthrough />}
            {project.portalDemo && <PortalDemo />}
          </div>
        </div>
      )}

      {project.decisions && (
        <div style={{ paddingTop: "clamp(60px,8vh,96px)" }}>
          <div className="site-eyebrow">Decisions</div>
          <div className="grid" style={{ marginTop: 30, gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}>
            {project.decisions.map((d) => (
              <div key={d.heading} className="rounded-[20px] border" style={{ padding: 26, background: "var(--surface-soft)", borderColor: "var(--surface-border)" }}>
                <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.015em" }}>{d.heading}</div>
                <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.5, color: "var(--muted)" }}>{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.next && (
        <div style={{ paddingTop: "clamp(60px,8vh,96px)", maxWidth: 900 }}>
          <div className="site-eyebrow">What I&rsquo;d do next</div>
          <div style={{ marginTop: 24, display: "grid", gap: 10 }}>
            {project.next.map((n) => (
              <div key={n} style={{ display: "grid", gridTemplateColumns: "14px 1fr", gap: 10, fontSize: 15, lineHeight: 1.55, color: "var(--muted)" }}>
                <span style={{ color: "var(--accent)" }}>·</span>
                <span>{n}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {project.disclaimer && (
        <p style={{ marginTop: 44, maxWidth: "70ch", fontSize: 12.5, lineHeight: 1.5, color: "var(--muted)" }}>
          {project.disclaimer}
        </p>
      )}
    </div>
  );
}
