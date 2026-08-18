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
  /** Renders the playable slice of the portal concept below it. */
  portalDemo?: boolean;
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
      "A concept redesign of WHOOP's web portal — coaching folded into the rings you already check, plus the two things the product doesn't track: what you eat, and where you are in your cycle.",
    status: "In progress — not live yet",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Motion",
      "Recharts",
      "Product Design",
      "User Research",
    ],
    links: [{ label: "Source", isPrivate: true }],
    overview: [
      "I wear a WHOOP, and most mornings I check my recovery score and close the app without opening the coach. The interpretation of the number lives one tap away from the number itself, and that tap is enough to stop me.",
      "I wanted to know whether that was just me, so I surveyed WHOOP wearers alongside people on Garmin, Oura, and Apple Watch about what they actually do with their data. The pattern held across all of them.",
      "The result is two surfaces. A case study arguing the point — the coaching types itself out the instant each ring finishes drawing — and a full seven-screen portal that takes the idea seriously: dashboard, activity, sleep, nutrition, cycle, coach, profile. Same data, same screen; what changes is whether the coaching has to be requested.",
      "I built it as a business case rather than an engineering demo, since the role I'm aiming at is on the business side. The question isn't \"can this be built\" — it's what moving the coaching earns you, and which gaps in the product are worth money to close.",
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
        body: "Insight visible in the first two seconds → more daily opens, and a stronger wedge to upsell deeper coaching tiers. Nutrition opens a data category the platform doesn't hold at all.",
      },
    ],
    walkthrough: "whoop",
    portalDemo: true,
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
        heading: "Nutrition is added, not redesigned",
        body: "There is no food data anywhere in WHOOP's product or its public API — it measures the outputs of what you eat in exhaustive detail and collects none of the inputs. So the nutrition tab is net-new: food logging, macro targets, hydration, and a panel tying yesterday's protein and sodium to this morning's recovery. The strategic read is that this isn't a UI gap, it's a data-acquisition one, and you close it with partnerships rather than a feature sprint.",
      },
      {
        heading: "Cycle tracking that explains instead of flags",
        body: "Hormones move HRV, resting heart rate, temperature, and sleep on their own schedule, so a luteal-phase dip is normal rather than a recovery failure. Every metric on that screen is read against the user's current phase. This is the one area I have no personal read on, so I leaned on a friend who lives with it monthly — her input reshaped the whole tab.",
      },
      {
        heading: "One context object, rebuilt every render",
        body: "The coaching reads from a single object assembled from live state rather than a frozen snapshot. An earlier version computed it once at module load, which meant logging a meal moved the rings while the coach carried on quoting the old totals. Now the two cannot disagree: log food and the coaching accounts for it immediately.",
      },
      {
        heading: "Fixtures shaped like the real API",
        body: "The sample data uses WHOOP's actual v2 field names — recovery_score, hrv_rmssd_milli, sleep_needed broken into baseline, debt, and strain. And the numbers reconcile: sleep performance is genuinely time-asleep over need, and every macro is summed from the food table rather than written down.",
      },
      {
        heading: "Rule-based, and honest about it",
        body: "The coach logic is a deterministic rule set, not a live language model. That's deliberate: the concept is about where AI coaching appears, not which model generates it, and a scripted version keeps the demo free to run, predictable to show, and free of an API key that a public page would expose.",
      },
    ],
    next: [
      "Record a screen capture walking through the ring → coach → nutrition → cycle flow.",
      "Fix the iOS issues found in review: inputs under 16px zoom the page on focus, and the bottom nav needs a safe-area inset.",
      "Decide whether a gated public build is worth it, or whether the video does the job on its own.",
    ],
    disclaimer:
      "Concept project. Biomarker, nutrition, and cycle data shown here is illustrative sample data for a fictional account, not real WHOOP output — structured to match the field names in WHOOP's public API documentation, which is the only WHOOP source this draws on. Not affiliated with, endorsed by, or built using any proprietary WHOOP materials.",
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
