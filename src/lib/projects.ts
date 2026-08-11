export type ProjectLink = {
  label: string;
  href?: string;
  /** Private repos render as a muted label instead of a link that would 404. */
  isPrivate?: boolean;
};

export type CaseStudyPoint = {
  n: string;
  label: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  /** One-liner used on the index card. */
  tagline: string;
  /** Amber pill next to the title. Omit for shipped projects. */
  status?: string;
  tags: string[];
  links: ProjectLink[];
  /** Longer intro paragraphs on the detail page. */
  overview: string[];
  caseStudy?: CaseStudyPoint[];
  /** Renders the interactive Ambient Coach demo on the detail page. */
  walkthrough?: "whoop";
  decisions?: { heading: string; body: string }[];
  next?: string[];
  disclaimer?: string;
};

export const projects: Project[] = [
  {
    slug: "whoop-ambient-coach",
    title: "Whoop Ambient Coach",
    year: "2026",
    tagline:
      "A concept redesign of WHOOP's AI coach — coaching folded into the rings you already check, instead of behind a separate chat.",
    status: "In progress — not live yet",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Motion", "Product Design"],
    links: [
      { label: "Source", isPrivate: true },
    ],
    overview: [
      "WHOOP's AI coach is a destination — a chat screen you have to go find. Most people check their Recovery number in the morning and never open it, which means the interpretation of the number lives one tap away from the number itself.",
      "Ambient Coach is my argument for collapsing that gap: the insight types itself out the instant each metric's ring finishes drawing. Same data, same screen — what changes is whether the coaching has to be requested.",
      "I built this as a business case study rather than an engineering demo, since the role I'm aiming at is on the business side. The question it answers isn't \"can this be built\" — it's \"what does moving the coaching earn you.\"",
    ],
    caseStudy: [
      {
        n: "01",
        label: "Problem",
        body: "Most users check their ring and never open Coach — the insight is one extra tap away, and that tap is where engagement dies.",
      },
      {
        n: "02",
        label: "Insight",
        body: "The value of AI coaching isn't the chat interface. It's removing the translation step between a number and a decision.",
      },
      {
        n: "03",
        label: "Impact",
        body: "Insight visible in the first two seconds → more daily opens, and a stronger wedge to upsell deeper coaching tiers.",
      },
    ],
    walkthrough: "whoop",
    decisions: [
      {
        heading: "Goal-aware before it's data-aware",
        body: "The coach asks what you're training for before it shows you a single number. The same 78% recovery reads differently if you're chasing a squat PR versus trying to fix your sleep — so the copy changes with the goal, not just the value.",
      },
      {
        heading: "Color carries exactly one meaning",
        body: "WHOOP's real interface is near-monochrome, and color is reserved for recovery zone status. I held that line: pure black and white everywhere, with green/yellow/red appearing only on the recovery ring, computed from the value itself.",
      },
      {
        heading: "Nutrition as the upstream lever",
        body: "I added a nutrition tab — hydration, protein, meal timing, caffeine cutoff — because food quality sits underneath recovery, sleep, and strain. It's the input most often missing from the loop.",
      },
      {
        heading: "Rule-based, and honest about it",
        body: "The coach logic is a deterministic rule set, not a live language model. That's deliberate: the concept is about where AI coaching appears, not which model generates it, and a scripted version keeps the demo free to run and predictable to show.",
      },
    ],
    next: [
      "Deploy a public build — with rate limiting in place first if the coach ever gets a real model behind it.",
      "Record a short screen capture walking through the goal → biomarker → insight flow.",
      "Pressure-test the copy with people who actually wear the band daily.",
    ],
    disclaimer:
      "Concept project. Biomarker and nutrition data shown here is illustrative sample data, not real WHOOP output. Not affiliated with, endorsed by, or built using any proprietary WHOOP materials.",
  },
  {
    slug: "personal-website",
    title: "Personal Website",
    year: "2026",
    tagline:
      "This site. My first project — a resume, a project log, and a running list of what's next, styled after Apple's fluid interface principles.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    links: [
      {
        label: "Source",
        href: "https://github.com/ani224488/apple-format-ani-personal-website",
      },
    ],
    overview: [
      "I wanted a place to put things that wasn't a PDF attachment, so I built one. It's a static Next.js site — no database, no CMS, no backend — deployed straight from the repo to GitHub Pages on every push to main.",
      "The design follows Apple's interface principles fairly literally: critically damped springs with no bounce unless a gesture preceded the motion, translucent layered surfaces, restrained type, and a full reduced-motion path for anyone who'd rather it hold still.",
    ],
    decisions: [
      {
        heading: "Static export, hosted from the repo",
        body: "Originally scaffolded for Vercel, then moved to GitHub Pages — free, and the deploy lives in the same place as the code. The tradeoff is a basePath quirk: every asset served from a repo subpath has to account for it.",
      },
      {
        heading: "Motion that's felt, not watched",
        body: "Every transition is under 400ms and springs are critically damped, so the interface feels responsive rather than animated. The nav pill is a shared layout animation — it slides between tabs instead of redrawing.",
      },
    ],
    next: [
      "Fill in the Now page.",
      "Add the restaurant-finder project once it's in a shareable state.",
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
