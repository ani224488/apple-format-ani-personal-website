import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";
import { WhoopWalkthrough } from "@/components/whoop-walkthrough";
import { PortalDemo } from "@/components/portal-demo";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Projects — Ani" };

  return {
    title: `${project.title} — Ani`,
    description: project.tagline,
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <article className="fade-up mx-auto max-w-4xl">
      <Link
        href="/projects"
        className="group inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-150 hover:text-foreground"
      >
        <span
          aria-hidden
          className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
        >
          &larr;
        </span>
        Projects
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h1 className="text-[clamp(2rem,5vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
            {project.title}
          </h1>
          {project.status && (
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-600 dark:text-amber-400">
              {project.status}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <span className="tabular-nums">{project.year}</span>
          {project.links.map((link) =>
            link.isPrivate || !link.href ? (
              <span
                key={link.label}
                className="inline-flex items-center gap-1.5"
                title="This repository is private"
              >
                <LockIcon />
                {link.label} &middot; private repo
              </span>
            ) : (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent transition-opacity duration-150 hover:opacity-80"
              >
                {link.label} &rarr;
              </a>
            )
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-surface-border bg-surface px-3 py-1 text-xs text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <section className="mt-10 flex flex-col gap-4">
        {project.overview.map((paragraph, i) => (
          <p key={i} className="max-w-2xl text-[1.05rem] leading-7 text-muted">
            {paragraph}
          </p>
        ))}
      </section>

      {project.caseStudy && (
        <section className="mt-14">
          <SectionHeading>The case</SectionHeading>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {project.caseStudy.map((point, i) => (
              <Reveal key={point.n} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-surface-border bg-surface p-5">
                  <p className="text-xs tabular-nums text-muted">{point.n}</p>
                  <p className="mt-1 text-sm font-medium">{point.label}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{point.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {project.walkthrough === "whoop" && (
        <section className="mt-14">
          <SectionHeading>How it works</SectionHeading>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            <span className="font-medium text-foreground">
              This one&rsquo;s live — go ahead and use it.
            </span>{" "}
            A working recreation of the core flow, running right here in your
            browser. Pick a goal, choose a signal, see where the coaching lands
            — then the nutrition layer underneath it.
          </p>
          <Reveal className="mt-6">
            <WhoopWalkthrough />
          </Reveal>
        </section>
      )}

      {project.portalDemo && (
        <section className="mt-14">
          <SectionHeading>The portal</SectionHeading>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            <span className="font-medium text-foreground">
              Also live — poke at it.
            </span>{" "}
            A slice of the seven-screen portal: tap a ring and the coaching
            opens against it, log a meal and watch the coaching account for it,
            drag the cycle day and every reading is re-read against the phase.
          </p>
          <Reveal className="mt-6">
            <PortalDemo />
          </Reveal>
        </section>
      )}

      {project.decisions && (
        <section className="mt-14">
          <SectionHeading>Decisions</SectionHeading>
          <div className="mt-5 flex flex-col gap-3">
            {project.decisions.map((decision, i) => (
              <Reveal key={decision.heading} delay={i * 0.06}>
                <div className="rounded-2xl border border-surface-border bg-surface p-5 sm:p-6">
                  <h3 className="text-sm font-medium">{decision.heading}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {decision.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {project.next && (
        <section className="mt-14">
          <SectionHeading>What&rsquo;s next</SectionHeading>
          <ul className="mt-5 flex flex-col gap-3">
            {project.next.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-6 text-muted"
              >
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.disclaimer && (
        <p className="mt-14 border-t border-surface-border pt-6 text-xs leading-5 text-muted">
          {project.disclaimer}
        </p>
      )}
    </article>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">
      {children}
    </h2>
  );
}

function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
