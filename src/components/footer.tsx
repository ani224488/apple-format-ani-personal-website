export function Footer() {
  return (
    <footer className="mx-auto mt-auto w-full max-w-6xl px-5 py-10 text-center text-sm text-muted sm:px-8 lg:px-12">
      <div className="flex items-center justify-center gap-4">
        <a
          href="https://github.com/ani224488"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-150 hover:text-foreground"
        >
          GitHub
        </a>
        <span className="text-surface-border">·</span>
        <a
          href="https://linkedin.com/in/aniundrakonda"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-150 hover:text-foreground"
        >
          LinkedIn
        </a>
      </div>
      <p className="mt-3 text-xs">Built with Next.js, Tailwind, and Motion.</p>
    </footer>
  );
}
