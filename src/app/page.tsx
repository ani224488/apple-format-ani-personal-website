import Image from "next/image";
import Link from "next/link";
import { basePath } from "@/lib/site";
import {
  EmailIcon,
  GitHubIcon,
  LinkedInIcon,
  PythonIcon,
  DatabaseIcon,
  CloudIcon,
  SparkleIcon,
  MapPinIcon,
  GitBranchIcon,
  LayersIcon,
} from "@/components/icons";
import { GeoMap } from "@/components/geo-map";
import { HeroGlows } from "@/components/hero-glows";
import { Reveal } from "@/components/reveal";
import { ScrollStatement } from "@/components/scroll-statement";
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

const toolkit = [
  { label: "Python", icon: PythonIcon },
  { label: "SQL", icon: DatabaseIcon },
  { label: "Cloud (AWS · Azure)", icon: CloudIcon },
  { label: "Databricks / ETL", icon: LayersIcon },
  { label: "Claude / AI-Assisted Dev", icon: SparkleIcon },
  { label: "GIS / ArcGIS", icon: MapPinIcon },
  { label: "Git", icon: GitBranchIcon },
];

export default function Home() {
  const featured = projects[0];

  return (
    // overflow-x-clip rather than overflow-hidden: clip contains the glows
    // without creating a scroll container, which would break sticky below.
    <div className="relative isolate overflow-x-clip">
      <HeroGlows />

      <div className="relative z-10 flex min-h-[calc(100svh-9rem)] flex-col justify-center">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
          <div
            className="fade-up h-28 w-28 shrink-0 overflow-hidden rounded-full border border-surface-border bg-surface shadow-[0_8px_30px_rgba(0,0,0,0.35)] sm:h-40 sm:w-40 lg:h-48 lg:w-48"
            style={{ animationDelay: "0ms" }}
          >
            <Image
              src={`${basePath}/profile.png`}
              alt="Portrait of Ani"
              width={192}
              height={192}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <p
              className="fade-up text-sm font-medium text-accent"
              style={{ animationDelay: "60ms" }}
            >
              Hey, I&rsquo;m
            </p>
            <h1
              className="fade-up text-[clamp(2.75rem,8vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
              style={{ animationDelay: "120ms" }}
            >
              Ani.
            </h1>
            <div
              className="fade-up mt-2 flex flex-wrap gap-x-5 gap-y-2"
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
          </div>
        </div>

        <p
          className="fade-up mt-8 max-w-xl text-lg leading-8 text-muted sm:text-xl sm:leading-9"
          style={{ animationDelay: "240ms" }}
        >
          I write code, and apparently now I write websites about writing
          code. This one&rsquo;s my first project — a small corner of the
          internet for my resume, the things I&rsquo;ve built, and the
          things I&rsquo;m about to.
        </p>

        <div
          className="fade-up mt-10 flex flex-wrap items-center gap-3"
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
        <Reveal>
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">
            About
          </h2>
          <p className="mt-4 text-[1.05rem] leading-7 text-muted">
            I&rsquo;m an Associate Software Engineer at Travelers, where I
            build data pipelines and automate ETL/ELT workflows across
            enterprise systems — increasingly with Claude doing the
            heavy lifting on the Python and SQL grunt work so I can focus
            on the parts that actually need a human.
          </p>
          <p className="mt-4 text-[1.05rem] leading-7 text-muted">
            Before that, I studied Geographical Information Science at
            UConn, which is a fancy way of saying I like maps a little
            too much. I revived the university&rsquo;s Geography Club,
            led a hackathon team to first place, and somehow also ended
            up coaching club basketball. The through-line is probably
            just: find the thing, go build/lead/fix it.
          </p>
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

        <Reveal delay={0.1}>
          <GeoMap />
        </Reveal>
      </section>

      <section className="relative z-10 mt-32 sm:mt-44">
        <div className="grid gap-8 sm:grid-cols-[minmax(0,190px)_1fr] sm:gap-12">
          <div className="sm:sticky sm:top-28 sm:self-start">
            <Reveal>
              <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-muted">
                Toolkit
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                What I reach for on most days, roughly in order of how often.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {toolkit.map(({ label, icon: Icon }, i) => (
              <Reveal key={label} delay={i * 0.05}>
                <div className="flex h-full flex-col items-start gap-3 rounded-2xl border border-surface-border bg-surface p-4 transition-transform duration-200 ease-out hover:-translate-y-0.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background text-accent">
                    <Icon />
                  </span>
                  <span className="text-sm text-muted">{label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
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
