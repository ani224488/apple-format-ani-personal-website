export function Footer() {
  return (
    <footer className="mt-auto px-6 py-10 text-center text-sm text-muted">
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
          href="mailto:you@example.com"
          className="transition-colors duration-150 hover:text-foreground"
        >
          Email
        </a>
      </div>
      <p className="mt-3 text-xs">Built with Next.js, Tailwind, and Motion.</p>
    </footer>
  );
}
