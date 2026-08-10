import { MapPinIcon } from "./icons";

function Corner({ className }: { className: string }) {
  return (
    <span
      className={`absolute h-4 w-4 border-muted/40 ${className}`}
      aria-hidden
    />
  );
}

export function GeoMap() {
  return (
    <div className="geo-grid relative aspect-square w-full overflow-hidden rounded-3xl border border-surface-border bg-surface sm:aspect-[4/3]">
      <Corner className="left-3 top-3 border-l-2 border-t-2 rounded-tl-sm" />
      <Corner className="right-3 top-3 border-r-2 border-t-2 rounded-tr-sm" />
      <Corner className="left-3 bottom-3 border-l-2 border-b-2 rounded-bl-sm" />
      <Corner className="right-3 bottom-3 border-r-2 border-b-2 rounded-br-sm" />

      <span className="absolute left-0 top-1/2 h-px w-full border-t border-dashed border-muted/25" />
      <span className="absolute left-1/2 top-0 h-full w-px border-l border-dashed border-muted/25" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="radar-ring" style={{ animationDelay: "0s" }} />
        <span className="radar-ring" style={{ animationDelay: "1s" }} />
        <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_4px_16px_rgba(10,132,255,0.5)]">
          <MapPinIcon />
        </div>
      </div>

      <div className="absolute bottom-4 left-4 leading-tight">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground">
          Hartford, CT
        </p>
        <p className="font-mono text-[0.7rem] text-muted">
          41.7637&deg; N, 72.6851&deg; W
        </p>
      </div>
    </div>
  );
}
