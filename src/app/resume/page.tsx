import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume — Ani",
};

const experience = [
  {
    role: "[Role title]",
    org: "[Company name]",
    period: "[Start] — [End]",
    points: ["[What you owned or shipped]", "[A measurable result]"],
  },
];

const education = [
  {
    school: "[School name]",
    detail: "[Degree, field]",
    period: "[Start] — [End]",
  },
];

const skills = ["[Skill]", "[Skill]", "[Skill]", "[Skill]", "[Skill]"];

export default function ResumePage() {
  return (
    <div className="fade-up">
      <div className="flex items-baseline justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-[-0.02em]">Resume</h1>
        <a
          href="/resume.pdf"
          className="shrink-0 rounded-full border border-surface-border bg-surface px-4 py-2 text-sm font-medium transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          Download PDF
        </a>
      </div>
      <p className="mt-2 text-sm text-muted">
        Placeholder content below — swap the bracketed text for your real
        experience once you share it.
      </p>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">
          Experience
        </h2>
        <div className="mt-4 flex flex-col gap-8">
          {experience.map((job) => (
            <div key={job.role}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium">
                  {job.role} · <span className="text-muted">{job.org}</span>
                </h3>
                <span className="text-sm text-muted">{job.period}</span>
              </div>
              <ul className="mt-2 flex flex-col gap-1 text-muted">
                {job.points.map((point) => (
                  <li key={point} className="text-[0.95rem] leading-6">
                    &bull; {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">
          Education
        </h2>
        <div className="mt-4 flex flex-col gap-4">
          {education.map((item) => (
            <div
              key={item.school}
              className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1"
            >
              <h3 className="font-medium">
                {item.school} · <span className="text-muted">{item.detail}</span>
              </h3>
              <span className="text-sm text-muted">{item.period}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">
          Skills
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-surface-border bg-surface px-3 py-1 text-sm text-muted"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
