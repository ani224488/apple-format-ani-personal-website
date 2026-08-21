import type { Metadata } from "next";

export const metadata: Metadata = { title: "Resume — Ani" };

/**
 * Resume — a reading page, no hero treatment, 900px measure.
 *
 * Copy is lifted verbatim from the previous `/resume` page — nothing is
 * re-summarised, reordered or trimmed on the way through.
 *
 * Deliberately no downloadable PDF. The whole resume is on this page as HTML,
 * so a PDF added nothing but a second copy to keep in sync — and a resume PDF
 * carries a phone number and an email in its header, which a public repo would
 * publish at a guessable URL. Contact details here are LinkedIn only.
 */

const experience = [
  {
    role: "Associate Software Engineer",
    org: "Travelers · Hartford, CT",
    period: "FEB 2025 — PRESENT",
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
    org: "Travelers · Hartford, CT",
    period: "JUN 2024 — AUG 2024",
    points: [
      "Automated SQL query execution and ETL processes using Python to significantly reduce manual effort and improve data accuracy.",
      "Collaborated with a senior software engineer to design and optimize SQL databases for scalable data storage.",
      "Built Python scripts to automate the extraction, transformation, and loading of data between SQL tables, ensuring data integrity.",
    ],
  },
  {
    role: "Operations Leadership Intern — Claim Services BI&A",
    org: "Travelers · Hartford, CT",
    period: "JUN 2023 — AUG 2023",
    points: [
      "Led a company-wide hackathon team to a first-place finish, demonstrating leadership, technical creativity, and cross-functional collaboration.",
      "Assisted Scrum Master with Rally Board upkeep and PI Planning documentation, gaining hands-on agile project management experience.",
      "Coordinated a shared drive redesign to improve file organization and accessibility for team members.",
    ],
  },
  {
    role: "Sales Associate",
    org: "GNC · Glastonbury, CT",
    period: "JUN 2022 — AUG 2022",
    points: [
      "Consulted with customers daily to assess health and nutrition goals, translating needs into tailored product recommendations that drove sales and repeat business.",
      "Managed point-of-sale transactions and daily cash reconciliation, building a foundation in business operations, revenue tracking, and financial accountability.",
    ],
  },
];

const skillGroups = [
  { label: "Languages", items: "Python, SQL (Oracle, MS SQL Server, Snowflake), JavaScript, R" },
  { label: "Data & Cloud", items: "Databricks, AWS (S3), Azure DevOps, ETL/ELT pipelines, Master Data Management, CI/CD" },
  { label: "AI Tools", items: "Claude (Anthropic), AI-assisted development, prompt engineering, API integration & key management" },
  { label: "Tools", items: "ArcGIS Pro, ArcGIS Online, QGIS, Figma, Git" },
  { label: "Methods", items: "Agile/Scrum, OOP, data governance, data modeling, UI/UX" },
];

const achievements = [
  { title: "Hackathon — First Place", detail: "Led a company-wide Travelers hackathon team to a first-place finish across cross-functional competitors." },
  { title: "Academic Honors", detail: "Dean's List (Fall '22, Spring '23, Fall '24) and New England Scholar (2024) at UConn." },
  { title: "Revived Geography Club / Men's Club Basketball Head Coach", detail: "Restored UConn's Geography Club and secured multi-year funding while leading student geospatial projects; became UConn Men's Club Basketball Head Coach." },
];

const leadership = [
  {
    role: "President, Geography Club",
    org: "University of Connecticut",
    period: "AUG 2022 — MAY 2024",
    points: [
      "Restored UConn's Geography Club; mentored students and led geospatial data visualization projects with external partners.",
      "Established multi-year club funding through financial review with the UConn Club Board.",
    ],
  },
  {
    role: "Team Lead, Cyber Infrastructure Competition",
    org: "University of Connecticut",
    period: "AUG — DEC 2023",
    points: [
      "Led the GIS team in building a predictive bikeshare model for Manhattan using space-time cube analysis and fishnet-based AI modeling.",
    ],
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-eyebrow border-b" style={{ marginTop: 52, paddingBottom: 14, borderColor: "var(--hairline)" }}>
      {children}
    </div>
  );
}

function Block({ role, org, period, points }: { role: string; org: string; period: string; points: string[] }) {
  return (
    <div className="border-b" style={{ padding: "26px 0", borderColor: "var(--hairline)" }}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 style={{ fontSize: 17, fontWeight: 500 }}>{role}</h3>
        <span className="site-eyebrow">{period}</span>
      </div>
      <p style={{ marginTop: 5, fontSize: 14.5, color: "var(--muted)" }}>{org}</p>
      <div style={{ marginTop: 14, display: "grid", rowGap: 9 }}>
        {points.map((pt) => (
          <div key={pt} style={{ display: "grid", gridTemplateColumns: "14px 1fr", gap: 8, fontSize: 15, lineHeight: 1.55, color: "var(--muted)" }}>
            <span style={{ color: "var(--accent)" }}>·</span>
            <span>{pt}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="mx-auto w-full" style={{ maxWidth: 900, padding: "clamp(90px,13vh,160px) clamp(20px,4vw,40px) clamp(80px,10vh,140px)" }}>
      <div className="site-eyebrow">Resume</div>

      <div className="flex flex-wrap items-baseline justify-between gap-4" style={{ marginTop: 16 }}>
        <h2 className="font-semibold" style={{ fontSize: "clamp(28px,3.4vw,44px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
          Anirudh Undrakonda
        </h2>
      </div>

      <p style={{ marginTop: 14, fontSize: 15.5, color: "var(--muted)" }}>
        Associate Software Engineer · Data Pipelines &amp; ETL · Cloud · Python · SQL
      </p>

      <div className="flex flex-wrap items-center" style={{ marginTop: 10, gap: "8px 22px", fontSize: 14 }}>
        <a href="https://linkedin.com/in/aniundrakonda" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center" style={{ color: "var(--accent)" }}>
          linkedin.com/in/aniundrakonda
        </a>
        <span className="inline-flex min-h-11 items-center" style={{ color: "var(--muted)" }}>Hartford, CT</span>
      </div>

      <p style={{ marginTop: 26, maxWidth: "70ch", fontSize: 16, lineHeight: 1.6, color: "var(--muted)" }}>
        Associate Software Engineer at Travelers, building scalable data pipelines
        and automating ETL/ELT workflows across enterprise MDM systems. Combines
        strong Python and SQL fundamentals with hands-on cloud experience (AWS,
        Azure) and AI-assisted development using Claude to accelerate delivery,
        plus a GIS background and a track record of leading technical teams to
        first-place results.
      </p>

      <Eyebrow>Experience</Eyebrow>
      {experience.map((job) => (
        <Block key={job.role} {...job} />
      ))}

      <Eyebrow>Technical Skills</Eyebrow>
      <div className="grid" style={{ marginTop: 26, gap: 22, gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
        {skillGroups.map((g) => (
          <div key={g.label}>
            <div style={{ fontSize: 15, fontWeight: 500 }}>{g.label}</div>
            <p style={{ marginTop: 6, fontSize: 14.5, lineHeight: 1.55, color: "var(--muted)" }}>{g.items}</p>
          </div>
        ))}
      </div>

      <Eyebrow>Education</Eyebrow>
      <div style={{ padding: "26px 0" }}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 style={{ fontSize: 17, fontWeight: 500 }}>University of Connecticut</h3>
          <span className="site-eyebrow">MAY 2024</span>
        </div>
        <p style={{ marginTop: 5, fontSize: 14.5, color: "var(--muted)" }}>
          B.S. in Geographical Information Science (GIS) · Storrs, CT
        </p>
        <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.55, color: "var(--muted)" }}>
          Dean&rsquo;s List (Fall &rsquo;22, Spring &rsquo;23, Fall &rsquo;24); New England Scholar (2024).
        </p>
      </div>

      <Eyebrow>Key Achievements</Eyebrow>
      <div className="grid" style={{ marginTop: 26, gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" }}>
        {achievements.map((a) => (
          <div key={a.title} className="rounded-[20px] border" style={{ padding: 24, background: "var(--surface-soft)", borderColor: "var(--surface-border)" }}>
            <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.015em" }}>{a.title}</div>
            <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.55, color: "var(--muted)" }}>{a.detail}</p>
          </div>
        ))}
      </div>

      <Eyebrow>Leadership</Eyebrow>
      {leadership.map((l) => (
        <Block key={l.role} {...l} />
      ))}
    </div>
  );
}
