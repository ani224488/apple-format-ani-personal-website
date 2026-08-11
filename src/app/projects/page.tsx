import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects — Ani",
};

const projects = [
  {
    title: "Personal Website",
    description:
      "This site. Built from scratch as my first project — a resume, a project log, and a running list of what's next, styled after Apple's fluid interface principles.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    links: [
      { label: "Source", href: "https://github.com/ani224488/apple-format-ani-personal-website" },
    ],
  },
  {
    title: "Whoop Ambient Coach",
    description:
      "A concept redesign of WHOOP's AI coach — folding coaching insights directly into the Recovery, Strain, and Sleep rings as they draw, instead of behind a separate chat screen. Built as a business case study. Not affiliated with, endorsed by, or built using any proprietary WHOOP materials.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    status: "In progress — not live yet",
    links: [
      { label: "Source", href: "https://github.com/ani224488/whoop-ambient-coach" },
    ],
  },
];

export default function ProjectsPage() {
  return (
    <div className="fade-up">
      <h1 className="text-3xl font-semibold tracking-[-0.02em]">Projects</h1>
      <p className="mt-2 text-sm text-muted">
        Things I&rsquo;ve built. More on the way.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <div
            key={project.title}
            className="fade-up rounded-2xl border border-surface-border bg-surface p-6 transition-transform duration-200 ease-out hover:-translate-y-0.5"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center gap-2">
              <h2 className="font-medium">{project.title}</h2>
              {project.status && (
                <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-600 dark:text-amber-400">
                  {project.status}
                </span>
              )}
            </div>
            <p className="mt-2 text-sm leading-6 text-muted">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-surface-border px-2.5 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-4 flex gap-4">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-accent transition-opacity duration-150 hover:opacity-80"
                >
                  {link.label} &rarr;
                </a>
              ))}
            </div>
          </div>
        ))}

        <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-surface-border p-6 text-center text-sm text-muted">
          More projects coming soon.
        </div>
      </div>
    </div>
  );
}
