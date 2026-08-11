import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Projects — Ani",
};

export default function ProjectsPage() {
  return (
    <div className="fade-up">
      <p className="text-sm font-medium text-accent">Projects</p>
      <h1 className="mt-2 text-[clamp(2rem,5vw,2.75rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
        Things I&rsquo;ve built.
      </h1>
      <p className="mt-3 max-w-xl text-[1.05rem] leading-7 text-muted">
        Each one has a walkthrough — what the problem was, what I decided, and
        what I&rsquo;d do next.
      </p>

      <div className="mt-6 flex max-w-xl items-start gap-3 rounded-2xl border border-accent/25 bg-accent/[0.06] p-4">
        <span className="mt-0.5 shrink-0 text-accent" aria-hidden>
          <PlayIcon />
        </span>
        <p className="text-sm leading-6 text-muted">
          <span className="font-medium text-foreground">
            Some of these have small live demos built right into the page.
          </span>{" "}
          They run in your browser — no sign-up, nothing to install. Click
          around and break things, that&rsquo;s what they&rsquo;re there for.
        </p>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08} className="h-full">
          <Link
            href={`/projects/${project.slug}`}
            className="group relative flex h-full flex-col rounded-2xl border border-surface-border bg-surface p-6 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/40 sm:p-7"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h2 className="text-lg font-medium tracking-[-0.01em]">
                {project.title}
              </h2>
              {project.walkthrough && (
                <span className="inline-flex items-center gap-1 rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                  <PlayIcon />
                  Live demo
                </span>
              )}
              {project.status && (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                  {project.status}
                </span>
              )}
              <span className="ml-auto text-xs tabular-nums text-muted">
                {project.year}
              </span>
            </div>

            <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
              {project.tagline}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-surface-border px-2.5 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              {project.walkthrough ? "Try the demo" : "Read more"}
              <span
                aria-hidden
                className="transition-transform duration-200 ease-out group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </span>
          </Link>
          </Reveal>
        ))}

        <div className="flex min-h-[120px] items-center justify-center rounded-2xl border border-dashed border-surface-border p-6 text-center text-sm text-muted">
          More on the way.
        </div>
      </div>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.36-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}
