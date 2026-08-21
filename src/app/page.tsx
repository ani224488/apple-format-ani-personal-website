import Link from "next/link";
import { XrayPortrait } from "@/components/xray-portrait";
import { PipelineDag } from "@/components/pipeline-dag";

/**
 * Home — full-bleed hero, then the reading sections beneath it.
 *
 * Measurements come from LAYOUT.md rather than being eyeballed from the
 * prototype screenshot. Two that matter and are easy to get wrong:
 *
 * The wide content measure is 1180px, which is also the breakpoint where the
 * hero goes single-column — the layout is fluid, so the breakpoint falls out of
 * the measure rather than being chosen separately.
 *
 * The hero grid carries a very large bottom padding (96–220px). That is not
 * decoration: it is the space the wordmark occupies. Without it the wordmark
 * sits behind the rails instead of below them.
 */

const stats = [
  { value: "18mo", label: "Engineering at Travelers" },
  { value: "3", label: "Summers interned" },
  { value: "1st", label: "Hackathon finish" },
];

/* Email, GitHub, LinkedIn, location, degree. No phone number — the corrected
   prototype removed it and it must not reappear. */
const contact = [
  { label: "GitHub", href: "https://github.com/ani224488" },
  { label: "LinkedIn", href: "https://linkedin.com/in/aniundrakonda" },
];

const tools = [
  "Python", "SQL", "Databricks", "Snowflake", "AWS S3", "Azure DevOps",
  "Git", "ArcGIS Pro", "QGIS", "Figma", "Claude",
];

const services = [
  { title: "Data Pipelines", body: "Databricks ETL/ELT across enterprise master data systems — the layer everyone else reports off of." },
  { title: "SQL & Modeling", body: "Oracle, MS SQL Server, and Snowflake, tuned for scale and for the analysts querying behind me." },
  { title: "Automation", body: "Reusable Python that removes the manual step instead of documenting it." },
  { title: "AI-Assisted Dev", body: "Claude in the loop every day, held to the same bar as anything I write by hand." },
  { title: "Geospatial", body: "ArcGIS and QGIS — where the GIS degree still earns its keep." },
];

const process = [
  { n: "01", title: "Understand", body: "Find out what the data actually means before touching a line of it." },
  { n: "02", title: "Model", body: "Shape it so the numbers reconcile rather than being asserted." },
  { n: "03", title: "Automate", body: "Replace the manual step with something reusable and boring." },
  { n: "04", title: "Validate", body: "Catch bad loads before they reach reporting, not after someone acts on them." },
  { n: "05", title: "Document", body: "Write it down for the people who don’t read SQL." },
];

/* Quotes Ani keeps, shown under his own line. Attributed in full — these are
   other people's words and must not read as his. */
const borrowed = [
  {
    text: "If you don’t fail, you’re not even trying. To get something you’ve never had, you must do something you’ve never done.",
    by: "Denzel Washington",
  },
  {
    text: "The humiliation of failing leaves a scar. The decade-long erosion of never trying leaves nothing you can point to.",
    by: "Chris Williamson",
  },
];

const traits = [
  "Curious by default",
  "Builds things to understand them",
  "Honest about tradeoffs",
  "Still learning",
];

const SECTION_PAD = "clamp(90px,13vh,160px) clamp(20px,4vw,40px) 0";

export default function Home() {
  return (
    <>
      <section
        className="relative isolate overflow-hidden"
        style={
          {
            /* svh, not vh: mobile browser chrome makes vh taller than the
               visible viewport, which pushes the wordmark off-screen.
               min-height rather than a fixed height, and deliberately so — see
               the note below. The rails' natural content is ~954px tall; with
               the reserved wordmark band a fixed 100svh leaves only 582px for
               them at a 900px viewport, so pinning the height exactly would
               force the content back onto the letterforms it is meant to clear.
               Growing instead is what makes "zero intersections at every width"
               actually true. */
            minHeight: "100svh",
            /* The wordmark's drawn glyphs overflow its line box — at
               line-height 1 the letterforms extend roughly 0.21em above and
               below the em box, so the real ink height is ~1.43em. Reserving
               space from the line box under-reserves by about 30%, which is
               what let the stats sit on the letterforms. */
            "--wm-size": "clamp(38px, 9.4vw, 168px)",
            "--wordmark-band": "calc(var(--wm-size) * 1.43)",
          } as React.CSSProperties
        }
      >
        {/* Glows, z-0. Static — nothing animates them, so there is no
            reduced-motion path and no per-frame compositing cost. */}
        <div
          aria-hidden
          /* Sits above the fold line so its core is behind the nav pill rather
             than below it. The section clips at its own top edge, so the glow
             is oversized and raised: a gentler falloff means the clip lands
             where the gradient is already faint, instead of slicing through it
             and leaving a visible straight edge. */
          className="pointer-events-none absolute left-1/2 z-0 h-[900px] w-[1600px] max-w-none -translate-x-1/2 rounded-[50%]"
          style={{ top: -520, background: "radial-gradient(closest-side, var(--glow-a), transparent 78%)" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute z-0 h-[520px] w-[720px] max-w-none rounded-[50%]"
          style={{ bottom: -200, right: -120, background: "radial-gradient(closest-side, var(--glow-b), transparent 72%)" }}
        />

        {/* Wordmark, z-1, bleeding off the bottom edge. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] select-none whitespace-nowrap text-center font-semibold"
          style={{
            fontSize: "var(--wm-size)",
            lineHeight: 1,
            letterSpacing: "-0.045em",
            paddingBottom: "0.1em",
            color: "var(--wordmark)",
          }}
        >
          ANI UNDRAKONDA
        </span>

        {/* Full-bleed, full-height. No max-width container and no `relative`:
            dropping the positioning context here is deliberate, so the portrait
            below resolves its absolute placement against the section — i.e. the
            viewport — rather than against this grid. The rails carry their own
            z-index instead.

            The bottom padding is the reserved wordmark band. Nothing in the
            grid may enter it at any width. */}
        <div
          className="pointer-events-none mx-auto grid h-full w-full max-w-[1720px] grid-cols-1 gap-8 min-[1180px]:grid-cols-[minmax(360px,27vw)_1fr_minmax(360px,27vw)]"
          style={{
            padding:
              "clamp(40px,6vh,72px) clamp(20px,3.4vw,52px) calc(var(--wordmark-band) + 24px)",
          }}
        >
          {/* Left rail. Explicitly above the portrait: the spec stacks the
              portrait at z-2 and the content grid at z-3, but the rails sit
              inside that grid, so without a z of their own they default to auto
              and the figure paints over the copy where they overlap. */}
          <div className="pointer-events-auto relative z-[3] flex flex-col">
            <span
              className="inline-flex w-fit items-center gap-2 rounded-lg border"
              style={{
                padding: "8px 14px",
                background: "var(--surface)",
                borderColor: "var(--surface-border)",
                fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace",
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted)",
              }}
            >
              <span className="site-dot h-1.5 w-1.5 rounded-full" style={{ background: "var(--accent)" }} />
              Associate SWE · Travelers
            </span>

            <h1
              className="font-semibold"
              style={{
                marginTop: 34,
                fontSize: "clamp(40px, 4.6vw, 72px)",
                lineHeight: 1.06,
                letterSpacing: "-0.03em",
                maxWidth: "12ch",
              }}
            >
              Technology is only ever as good as{" "}
              <span style={{ color: "var(--accent)" }}>the people behind it.</span>
            </h1>

            <p style={{ marginTop: 22, fontSize: 16, lineHeight: 1.5, maxWidth: "44ch", color: "var(--muted)" }}>
              Databricks ETL/ELT across enterprise master data systems, and Python
              that removes the manual step instead of documenting it.
            </p>

            <div className="flex flex-wrap items-center" style={{ marginTop: 34, gap: "12px 28px" }}>
              <Link
                href="/resume"
                className="inline-flex min-h-11 items-center justify-center rounded-full font-medium transition-colors duration-300"
                style={{ padding: "0 30px", background: "var(--accent)", color: "var(--accent-foreground)", fontSize: 16, letterSpacing: "-0.01em" }}
              >
                View Resume
              </Link>
              <Link href="/projects" className="group inline-flex min-h-11 items-center gap-3 font-medium" style={{ fontSize: 16 }}>
                <span
                  className="grid h-5 w-5 place-items-center rounded-full"
                  style={{ border: "1.5px solid var(--accent)" }}
                >
                  <span
                    className="rounded-full transition-transform duration-200 group-hover:scale-125"
                    style={{ height: 7, width: 7, background: "var(--accent)" }}
                  />
                </span>
                See Projects
              </Link>
            </div>

            <div className="flex flex-wrap items-center" style={{ marginTop: 26, gap: "10px 22px", fontSize: 14, color: "var(--muted)" }}>
              {contact.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex min-h-11 items-center transition-colors"
                >
                  {c.label}
                </a>
              ))}
              <span className="inline-flex min-h-11 items-center">Hartford, CT</span>
              <span className="inline-flex min-h-11 items-center">B.S. GIS · UConn</span>
            </div>

            {/* Pinned to the bottom of the rail so both rails' feet align. */}
            <div style={{ marginTop: "auto", paddingTop: 56 }}>
              <div className="site-eyebrow" style={{ marginBottom: 14 }}>Tools</div>
              <div className="flex flex-wrap" style={{ gap: 8, maxWidth: 420 }}>
                {tools.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border"
                    style={{ padding: "7px 13px", fontSize: 13, background: "var(--surface-soft)", borderColor: "var(--surface-border)", color: "var(--muted)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Middle cell — the portrait's lane.
              Below 1180 the portrait sits in this cell, in the flow between the
              rails. At and above it the inner element goes absolute and, because
              this cell is not a positioning context, resolves against the
              section — so the figure is centred on the *viewport*, not on this
              column. That keeps it centred even when the two rails end up at
              different content heights. */}
          <div className="pointer-events-auto" style={{ minHeight: "34vh" }}>
            <div
              className="mx-auto h-[60vh] min-h-[360px] w-[min(100%,460px)] min-[1180px]:absolute min-[1180px]:bottom-0 min-[1180px]:left-1/2 min-[1180px]:z-[2] min-[1180px]:mt-0 min-[1180px]:h-[min(90vh,960px)] min-[1180px]:w-[clamp(380px,52vw,820px)] min-[1180px]:-translate-x-1/2"
              style={{ marginTop: 8 }}
            >
              <XrayPortrait className="absolute inset-0" />
            </div>
          </div>

          {/* Right rail */}
          <div className="pointer-events-auto relative z-[3] flex flex-col items-start min-[1180px]:items-end">
            <PipelineDag />

            {/* Three fixed columns, never wrapping. A wrapped stats row grows
                upward into space the layout never reserved, which is the second
                way this block used to end up on the wordmark. When it cannot fit,
                the value type shrinks toward 24px instead of breaking to a new
                row. */}
            <div
              className="grid w-full"
              style={{
                marginTop: "auto",
                paddingTop: 56,
                gridTemplateColumns: "repeat(3, max-content)",
                justifyContent: "end",
                columnGap: "clamp(18px,2.6vw,44px)",
              }}
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div
                    className="font-semibold"
                    style={{ fontSize: "clamp(24px,2.2vw,32px)", letterSpacing: "-0.03em", whiteSpace: "nowrap" }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{ marginTop: 6, fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: 9.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)", maxWidth: "10rem", lineHeight: 1.5 }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex w-full max-w-[400px] flex-wrap items-center justify-between gap-3" style={{ marginTop: 22 }}>
              <Link
                href="/projects/whoop-ambient-coach"
                className="inline-flex min-h-11 items-center transition-colors"
                style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--muted)" }}
              >
                Latest — Whoop Ambient Coach
              </Link>
              <span
                className="site-amber-pill rounded-full"
                style={{ padding: "5px 10px", fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase" }}
              >
                In progress
              </span>
            </div>
          </div>
        </div>

        {/* Affordance for the reveal. Hidden below 1180 where the copy would
            be wrong anyway — there it is a tap, not a hover. */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 z-[5] hidden -translate-x-1/2 rounded-full min-[1180px]:block"
          style={{ bottom: 14, padding: "7px 14px", background: "var(--scrim)", fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)" }}
        >
          Move over the portrait to X-ray
        </div>
      </section>

      {/* Pull quote.
          Ani's own line stays at full display size; the two borrowed ones sit
          below it a step down in scale and behind a hairline, so the hierarchy
          reads as "this is mine, these are ones I keep" rather than three
          quotations of equal weight. */}
      <section className="mx-auto w-full text-center" style={{ maxWidth: 820, padding: SECTION_PAD }}>
        <p style={{ fontSize: "clamp(23px,3vw,36px)", lineHeight: 1.32, letterSpacing: "-0.025em", fontWeight: 500 }}>
          Your path doesn&rsquo;t have to be laid out in front of you. Work with
          what you have, stay curious, and keep going until you land somewhere
          you&rsquo;re glad to be.
        </p>
        <p style={{ marginTop: 22, fontSize: 14, color: "var(--accent)" }}>— Ani</p>

        <div
          className="border-t"
          style={{ marginTop: 56, paddingTop: 48, display: "flex", flexDirection: "column", gap: 40, borderColor: "var(--hairline)" }}
        >
          {borrowed.map((q) => (
            <figure key={q.by} style={{ margin: 0 }}>
              <blockquote
                style={{ margin: 0, fontSize: "clamp(17px,1.9vw,22px)", lineHeight: 1.45, letterSpacing: "-0.015em", fontWeight: 400, color: "var(--muted)" }}
              >
                &ldquo;{q.text}&rdquo;
              </blockquote>
              <figcaption style={{ marginTop: 14, fontSize: 14, color: "var(--accent)" }}>
                — {q.by}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* What I do */}
      <section className="mx-auto w-full" style={{ maxWidth: 1180, padding: SECTION_PAD }}>
        <div className="site-eyebrow">What I do</div>
        <h2 className="font-semibold" style={{ marginTop: 16, fontSize: "clamp(28px,3.4vw,44px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
          Five things, done properly.
        </h2>
        <div className="grid gap-4" style={{ marginTop: 38, gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))" }}>
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-[20px] border transition-all duration-[400ms] hover:-translate-y-1"
              style={{ padding: 26, background: "var(--surface-soft)", borderColor: "var(--surface-border)", transitionTimingFunction: "cubic-bezier(.2,.8,.2,1)" }}
            >
              <div style={{ fontSize: 17, fontWeight: 500, letterSpacing: "-0.015em" }}>{s.title}</div>
              <p style={{ marginTop: 10, fontSize: 15, lineHeight: 1.5, color: "var(--muted)" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How I work */}
      <section className="mx-auto w-full" style={{ maxWidth: 1180, padding: `${SECTION_PAD.split(" ")[0]} clamp(20px,4vw,40px) clamp(80px,10vh,140px)` }}>
        <div className="site-eyebrow">How I work</div>
        <h2 className="font-semibold" style={{ marginTop: 16, fontSize: "clamp(28px,3.4vw,44px)", lineHeight: 1.08, letterSpacing: "-0.03em" }}>
          Five steps, in order.
        </h2>
        <div
          className="grid border-t"
          style={{ marginTop: 38, paddingTop: 32, gap: "28px 24px", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", borderColor: "var(--hairline)" }}
        >
          {process.map((p) => (
            <div key={p.n}>
              <div style={{ fontFamily: "ui-monospace, 'SF Mono', Menlo, monospace", fontSize: 11, color: "var(--accent)", letterSpacing: "0.14em" }}>{p.n}</div>
              <div style={{ marginTop: 12, fontSize: 16, fontWeight: 500 }}>{p.title}</div>
              <p style={{ marginTop: 8, fontSize: 14.5, lineHeight: 1.5, color: "var(--muted)" }}>{p.body}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2" style={{ marginTop: 44 }}>
          {traits.map((t) => (
            <span
              key={t}
              className="rounded-full border"
              style={{ padding: "8px 14px", fontSize: 13, background: "var(--surface-soft)", borderColor: "var(--surface-border)", color: "var(--muted)" }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto w-full" style={{ maxWidth: 1180, padding: "0 clamp(20px,4vw,40px) clamp(80px,10vh,140px)" }}>
        <div className="rounded-[28px] border" style={{ padding: "clamp(32px,4vw,56px)", background: "var(--surface)", borderColor: "var(--surface-border)" }}>
          <h2 className="font-semibold" style={{ fontSize: "clamp(26px,3.2vw,40px)", letterSpacing: "-0.03em" }}>Get in touch.</h2>
          <div className="flex flex-wrap items-center" style={{ marginTop: 24, gap: "12px 28px", fontSize: 16 }}>
            <a href="https://github.com/ani224488" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center" style={{ color: "var(--accent)" }}>
              github.com/ani224488
            </a>
            <a href="https://linkedin.com/in/aniundrakonda" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center" style={{ color: "var(--accent)" }}>
              linkedin.com/in/aniundrakonda
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
