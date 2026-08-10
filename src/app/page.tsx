import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-[60vh] flex-col justify-center">
      <p
        className="fade-up text-sm font-medium text-accent"
        style={{ animationDelay: "0ms" }}
      >
        Hey, I&rsquo;m
      </p>

      <h1
        className="fade-up mt-2 text-[clamp(2.5rem,8vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]"
        style={{ animationDelay: "60ms" }}
      >
        Ani.
      </h1>

      <p
        className="fade-up mt-6 max-w-lg text-lg leading-8 text-muted"
        style={{ animationDelay: "120ms" }}
      >
        I write code, and apparently now I write websites about writing
        code. This one&rsquo;s my first project — a small corner of the
        internet for my resume, the things I&rsquo;ve built, and the things
        I&rsquo;m about to.
      </p>

      <div
        className="fade-up mt-10 flex flex-wrap items-center gap-3"
        style={{ animationDelay: "180ms" }}
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
  );
}
