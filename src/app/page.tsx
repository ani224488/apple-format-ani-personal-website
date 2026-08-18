import Link from "next/link";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";
import { GeoMap } from "@/components/geo-map";
import { HeroGlows } from "@/components/hero-glows";
import { HeroPortrait } from "@/components/hero-portrait";
import { HeroScrub } from "@/components/hero-scrub";
import { PinnedToolkit } from "@/components/pinned-toolkit";
import { Reveal } from "@/components/reveal";
import { ScrollStatement } from "@/components/scroll-statement";
import { TextLines } from "@/components/text-lines";
import { projects } from "@/lib/projects";

const links = [
  { label: "Email", href: "mailto:aniundrakonda@gmail.com", icon: EmailIcon },
  { label: "GitHub", href: "https://github.com/ani224488", icon: GitHubIcon },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/aniundrakonda",
    icon: LinkedInIcon,
  },
];

const focusAreas = ["Data Engineering", "Cloud", "AI-Assisted Development", "GIS"];

export default function Home() {
  const featured = projects[0];

  return (
    // overflow-x-clip rather than overflow-hidden: clip contains the glows
    // without creating a scroll container, which would break sticky below.
    <div className="relative isolate overflow-x-clip">
      <HeroGlows />

      {/* The portrait leads — it's the first thing on the page, centred, with
          no circular crop. It runs its own scroll choreography (turn, then
          dissolve), so HeroScrub is applied to the text beneath it rather than
          the whole hero; two scroll effects fighting over the same subtree read
          as one broken effect. */}
      <div className="relative z-10 flex min-h-[calc(100svh-9rem)] flex-col items-center justify-center gap-7 text-center">
        <HeroPortrait />

        <HeroScrub>
          <div className="flex flex-col items-center">
            <p
              className="fade-up text-sm font-medium text-accent"
              style={{ animationDelay: "60ms" }}
            >
              Hey, I&rsquo;m
            </p>
            <h1
              className="fade-up mt-1 text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
              style={{ animationDelay: "120ms" }}
            >
              Ani.
            </h1>
            <div
              className="fade-up mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2"
              style={{ animationDelay: "180ms" }}
            >
              {links.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-150 hover:text-accent"
                >
                  <Icon />
                  <span>{label}</span>
                </a>
              ))}
            </div>

            <p
              className="fade-up mt-7 max-w-xl text-lg leading-8 text-muted sm:text-xl sm:leading-9"
              style={{ animationDelay: "240ms" }}
            >
              I write code, and apparently now I write websites about writing
              code. This one&rsquo;s my first project — a small corner of the
              internet for my resume, the things I&rsquo;ve built, and the
              things I&rsquo;m about to.
            </p>

            <div
              className="fade-up mt-8 flex flex-wrap items-center justify-center gap-3"
              style={{ animationDelay: "300ms" }}
            >
              <Link
                href="/resume"
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform duration-150 ease-out active:scale-[0.97]"
              >
                View Resume
              </Link>
              <Link
                href="/projects"
                className="rounded-full border border-surface-border bg-surface px-5 py-2.5 text-sm font-medium transition-transform duration-150 ease-out active:scale-[0.97]"
              >
                See Projects
              </Link>
            </div>
          </div>
        </HeroScrub>
      </div>

      <section className="relative z-10 py-28 sm:py-44">
        <ScrollStatement text="I didn't take a straight line to get here. Technology is only ever as good as the people behind it, and the best people I've met were the ones willing to learn something new." />

        <Reveal delay={0.15}>
          <div className="mx-auto mt-10 max-w-xl px-6 text-center">
            <p className="text-[1.05rem] leading-7 text-muted">
              Your path doesn&rsquo;t have to be laid out in front of you. Work
              with what you have, stay curious, and keep going until you land
              somewhere you&rsquo;re glad to be. That&rsquo;s most of what I
              believe about this work — and about people.
            </p>
            <p className="mt-5 text-sm font-medium text-accent">— Ani</p>
          </div>
        </Reveal>
      </section>

      <section className="relative z-10 grid gap-10 sm:grid-cols-[1.1fr_1fr] sm:items-center">
        {/* The paragraphs sit outside Reveal on purpose: TextLines runs its own
            per-line reveal, and nesting that inside a block-level fade would
            animate the same content twice. */}
        <div>
          <Reveal>
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">
              About
            </h2>
          </Reveal>

          <TextLines
            className="mt-4 text-[1.05rem] leading-7 text-muted"
            text="I’m an Associate Software Engineer at Travelers, where I build data pipelines and automate ETL/ELT workflows across enterprise systems — increasingly with Claude doing the heavy lifting on the Python and SQL grunt work so I can focus on the parts that actually need a human."
          />

          <TextLines
            className="mt-4 text-[1.05rem] leading-7 text-muted"
            text="Before that, I studied Geographical Information Science at UConn, which is a fancy way of saying I like maps a little too much. I revived the university’s Geography Club, led a hackathon team to first place, and somehow also ended up coaching club basketball. The through-line is probably just: find the thing, go build/lead/fix it."
          />

          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap gap-2">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-surface-border bg-surface px-3 py-1 text-xs text-muted"
                >
                  {area}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <GeoMap />
        </Reveal>
      </section>

      <section className="relative z-10 mt-32 sm:mt-44">
        <PinnedToolkit />
      </section>

      <section className="relative z-10 mt-32 sm:mt-44">
        <Reveal>
          <Link
            href={`/projects/${featured.slug}`}
            className="group relative block overflow-hidden rounded-3xl border border-surface-border bg-surface p-8 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 sm:p-12"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-[70px] transition-opacity duration-500 group-hover:opacity-70"
              style={{
                background:
                  "radial-gradient(closest-side, var(--accent), transparent 70%)",
              }}
            />
            <div className="relative">
              <p className="text-sm font-medium text-accent">Latest project</p>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-xl text-[1.05rem] leading-7 text-muted">
                {featured.tagline}
              </p>
              <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
                There&rsquo;s a small interactive demo built into the page — you
                can click through the whole flow yourself, right in the browser.
              </p>
              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Try the walkthrough
                <span
                  aria-hidden
                  className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </span>
            </div>
          </Link>
        </Reveal>
      </section>
    </div>
  );
}
