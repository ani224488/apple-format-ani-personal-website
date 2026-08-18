import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ProjectGallery } from "@/components/project-gallery";

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

      <ProjectGallery projects={projects} />
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.36-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}
