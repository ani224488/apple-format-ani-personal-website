import type { Metadata } from "next";
import { basePath } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume — Ani",
};

const experience = [
  {
    role: "Associate Software Engineer",
    org: "Travelers",
    period: "February 2025 — Present",
    location: "Hartford, CT",
    points: [
      "Build and maintain scalable data pipelines in Databricks, automating ETL/ELT processes and enhancing data modeling workflows across enterprise MDM systems.",
      "Leverage Claude (Anthropic) as an AI-assisted development tool to generate, refactor, and document Python and SQL code, improving day-to-day development efficiency and reducing turnaround time on routine engineering tasks.",
      "Design Claude-assisted automation workflows integrating AWS services and secure API-key authentication to automate data loading into MDM tenants, eliminating tedious manual load processes.",
      "Develop reusable Python scripts for automation, orchestration, and validation of data processes, applying OOP principles for consistency across environments.",
      "Optimize database queries using Oracle SQL and Microsoft SQL Server, improving performance and maintainability for large-scale datasets.",
      "Support cloud-based development using AWS S3 for data storage and Azure DevOps for CI/CD pipeline execution and version control.",
    ],
  },
  {
    role: "Data Analytics Intern — BI&A Geospatial",
    org: "Travelers",
    period: "June 2024 — August 2024",
    location: "Hartford, CT",
    points: [
      "Automated SQL query execution and ETL processes using Python to significantly reduce manual effort and improve data accuracy.",
      "Collaborated with a senior software engineer to design and optimize SQL databases for scalable data storage.",
      "Built Python scripts to automate the extraction, transformation, and loading of data between SQL tables, ensuring data integrity.",
    ],
  },
  {
    role: "Operations Leadership Intern — Claim Services BI&A",
    org: "Travelers",
    period: "June 2023 — August 2023",
    location: "Hartford, CT",
    points: [
      "Led a company-wide hackathon team to a first-place finish, demonstrating leadership, technical creativity, and cross-functional collaboration.",
      "Assisted Scrum Master with Rally Board upkeep and PI Planning documentation, gaining hands-on agile project management experience.",
      "Coordinated a shared drive redesign to improve file organization and accessibility for team members.",
    ],
  },
  {
    role: "Sales Associate",
    org: "GNC",
    period: "June 2022 — August 2022",
    location: "Glastonbury, CT",
    points: [
      "Consulted with customers daily to assess health and nutrition goals, translating needs into tailored product recommendations that drove sales and repeat business.",
      "Managed point-of-sale transactions and daily cash reconciliation, building a foundation in business operations, revenue tracking, and financial accountability.",
    ],
  },
];

const achievements = [
  {
    title: "Hackathon — First Place",
    detail:
      "Led a company-wide Travelers hackathon team to a first-place finish across cross-functional competitors.",
  },
  {
    title: "Academic Honors",
    detail: "Dean's List (Fall '22, Spring '23, Fall '24) and New England Scholar (2024) at UConn.",
  },
  {
    title: "Revived Geography Club / Men's Club Basketball Head Coach",
    detail:
      "Restored UConn's Geography Club and secured multi-year funding while leading student geospatial projects; became UConn Men's Club Basketball Head Coach.",
  },
];

const skillGroups = [
  { label: "Languages", items: ["Python", "SQL (Oracle, MS SQL Server, Snowflake)", "JavaScript", "R"] },
  {
    label: "Data & Cloud",
    items: ["Databricks", "AWS (S3)", "Azure DevOps", "ETL/ELT Pipelines", "Master Data Management", "CI/CD"],
  },
  {
    label: "AI Tools",
    items: ["Claude (Anthropic)", "AI-Assisted Development", "Prompt Engineering", "API Integration & Key Management"],
  },
  { label: "Tools", items: ["ArcGIS Pro", "ArcGIS Online", "QGIS", "Figma", "Git"] },
  { label: "Methods", items: ["Agile/Scrum", "OOP", "Data Governance", "Data Modeling", "UI/UX"] },
];

const education = {
  school: "University of Connecticut",
  degree: "B.S. in Geographical Information Science (GIS)",
  period: "May 2024",
  location: "Storrs, CT",
  honors: "Dean's List (Fall '22, Spring '23, Fall '24); New England Scholar (2024).",
};

const leadership = [
  {
    role: "President, Geography Club",
    org: "University of Connecticut",
    period: "Aug 2022 — May 2024",
    points: [
      "Restored UConn's Geography Club; mentored students and led geospatial data visualization projects with external partners.",
      "Established multi-year club funding through financial review with the UConn Club Board.",
    ],
  },
  {
    role: "Team Lead, Cyber Infrastructure Competition",
    org: "University of Connecticut",
    period: "Aug — Dec 2023",
    points: [
      "Led the GIS team in building a predictive bikeshare model for Manhattan using space-time cube analysis and fishnet-based AI modeling.",
    ],
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  return (
    <div className="fade-up">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.02em]">
            Anirudh Undrakonda
          </h1>
          <p className="mt-1 text-muted">
            Associate Software Engineer · Data Pipelines &amp; ETL · Cloud ·
            Python · SQL
          </p>
        </div>
        <a
          href={`${basePath}/resume.pdf`}
          className="shrink-0 rounded-full border border-surface-border bg-surface px-4 py-2 text-sm font-medium transition-transform duration-150 ease-out active:scale-[0.97]"
        >
          Download PDF
        </a>
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-accent">
        <a href="mailto:aniundrakonda@gmail.com" className="hover:opacity-80">
          aniundrakonda@gmail.com
        </a>
        <a
          href="https://linkedin.com/in/aniundrakonda"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80"
        >
          linkedin.com/in/aniundrakonda
        </a>
        <span className="text-muted">Hartford, CT</span>
      </div>

      <p className="mt-6 max-w-2xl text-[0.95rem] leading-6 text-muted">
        Associate Software Engineer at Travelers, building scalable data
        pipelines and automating ETL/ELT workflows across enterprise MDM
        systems. Combines strong Python and SQL fundamentals with hands-on
        cloud experience (AWS, Azure) and AI-assisted development using
        Claude to accelerate delivery, plus a GIS background and a track
        record of leading technical teams to first-place results.
      </p>

      <section className="mt-12">
        <SectionHeading>Experience</SectionHeading>
        <div className="mt-4 flex flex-col gap-8">
          {experience.map((job) => (
            <div key={job.role}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium">
                  {job.role} · <span className="text-muted">{job.org}</span>
                </h3>
                <span className="text-sm text-muted">{job.period}</span>
              </div>
              <p className="text-sm text-muted">{job.location}</p>
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
        <SectionHeading>Key Achievements</SectionHeading>
        <div className="mt-4 flex flex-col gap-4">
          {achievements.map((item) => (
            <div key={item.title}>
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-1 text-[0.95rem] leading-6 text-muted">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading>Technical Skills</SectionHeading>
        <div className="mt-4 flex flex-col gap-3">
          {skillGroups.map((group) => (
            <div key={group.label} className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-sm font-medium">{group.label}:</span>
              <span className="text-sm text-muted">{group.items.join(", ")}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionHeading>Education</SectionHeading>
        <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-medium">
            {education.school} ·{" "}
            <span className="text-muted">{education.degree}</span>
          </h3>
          <span className="text-sm text-muted">{education.period}</span>
        </div>
        <p className="text-sm text-muted">{education.location}</p>
        <p className="mt-2 text-sm text-muted">Honors: {education.honors}</p>
      </section>

      <section className="mt-12">
        <SectionHeading>Leadership &amp; Projects</SectionHeading>
        <div className="mt-4 flex flex-col gap-8">
          {leadership.map((item) => (
            <div key={item.role}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-medium">
                  {item.role} · <span className="text-muted">{item.org}</span>
                </h3>
                <span className="text-sm text-muted">{item.period}</span>
              </div>
              <ul className="mt-2 flex flex-col gap-1 text-muted">
                {item.points.map((point) => (
                  <li key={point} className="text-[0.95rem] leading-6">
                    &bull; {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
