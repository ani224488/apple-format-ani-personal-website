import Image from "next/image";
import Link from "next/link";
import { basePath } from "@/lib/site";
import { EmailIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";

const links = [
  { label: "Email", href: "mailto:aniundrakonda@gmail.com", icon: EmailIcon },
  { label: "GitHub", href: "https://github.com/ani224488", icon: GitHubIcon },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/aniundrakonda",
    icon: LinkedInIcon,
  },
];

export default function Home() {
  return (
    <div className="relative isolate flex min-h-[70vh] flex-col justify-center overflow-hidden">
      <div className="hero-glow hero-glow-1" aria-hidden />
      <div className="hero-glow hero-glow-2" aria-hidden />

      <div className="relative z-10">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
          <div
            className="fade-up h-32 w-32 shrink-0 overflow-hidden rounded-full border border-surface-border bg-surface shadow-[0_8px_30px_rgba(0,0,0,0.35)] sm:h-40 sm:w-40"
            style={{ animationDelay: "0ms" }}
          >
            <Image
              src={`${basePath}/profile.png`}
              alt="Portrait of Ani"
              width={160}
              height={160}
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
              className="fade-up text-[clamp(2.5rem,7vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
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
          className="fade-up mt-8 max-w-lg text-lg leading-8 text-muted"
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
    </div>
  );
}
