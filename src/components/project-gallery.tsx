"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/projects";
import { Reveal } from "@/components/reveal";
import { springs } from "@/lib/motion";

/**
 * Below this count a horizontal snap gallery is the wrong pattern: it trades a
 * layout that shows everything at once for one that hides most of it behind a
 * swipe, and with two cards there is nothing to reveal. The gallery switches
 * itself on when a third project lands.
 */
const SNAP_MIN = 3;

export function ProjectGallery({ projects }: { projects: Project[] }) {
  if (projects.length >= SNAP_MIN) {
    return (
      <div
        className="-mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-label="Projects"
        tabIndex={0}
      >
        {projects.map((project) => (
          <div
            key={project.slug}
            className="w-[86%] shrink-0 snap-center sm:w-[56%] lg:w-[42%]"
          >
            <Card project={project} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-12 grid gap-4 lg:grid-cols-2">
      {projects.map((project, i) => (
        <Reveal key={project.slug} delay={i * 0.08} className="h-full">
          <Card project={project} />
        </Reveal>
      ))}

      <div className="flex min-h-[120px] items-center justify-center rounded-2xl border border-dashed border-surface-border p-6 text-center text-sm text-muted">
        More on the way.
      </div>
    </div>
  );
}

function Card({ project }: { project: Project }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="h-full"
      // A spring lift rather than a CSS transition: the card settles instead of
      // arriving, and it reverses correctly if the pointer leaves mid-motion.
      whileHover={reduced ? undefined : { y: -5 }}
      transition={springs.default}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative flex h-full flex-col rounded-2xl border border-surface-border bg-surface p-6 transition-colors duration-200 ease-out hover:border-accent/40 sm:p-7"
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h2 className="text-lg font-medium tracking-[-0.01em]">{project.title}</h2>
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

        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-medium text-accent">
          {project.walkthrough ? "Try the demo" : "Read more"}
          <span
            aria-hidden
            className="transition-transform duration-200 ease-out group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.36-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}
