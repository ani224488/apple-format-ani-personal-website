"use client";

/**
 * The hero's right rail: a pipeline DAG.
 *
 * Geometry is transcribed from the prototype rather than re-derived — the node
 * positions are hand-placed to make the fan-in and fan-out read at a glance,
 * and re-deriving them from a layout algorithm loses that.
 *
 * Sources fan into an ingest stage, through a Databricks hub, out to MDM
 * tenants. The dashed accent path travelling the spine is the only motion, and
 * it holds still under reduced motion via the `.site-dag-flow` rule.
 */

const EDGES = [
  "M40 40 L140 105",
  "M40 105 L140 105",
  "M40 170 L140 105",
  "M140 105 L250 105",
  "M250 105 L356 46",
  "M250 105 L356 105",
  "M250 105 L356 164",
];

const NODES = [
  { cx: 40, cy: 40 },
  { cx: 40, cy: 105 },
  { cx: 40, cy: 170 },
  { cx: 356, cy: 46 },
  { cx: 356, cy: 105 },
  { cx: 356, cy: 164 },
];

const STAGES = ["BRONZE", "SILVER", "GOLD", "SERVING"];

export function PipelineDag({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full max-w-[400px] ${className}`}>
      <div className="site-eyebrow flex justify-between" style={{ letterSpacing: "0.14em" }}>
        <span>Pipeline</span>
        <span>DAG · 04 Stages</span>
      </div>

      <svg
        viewBox="0 0 400 210"
        fill="none"
        className="mt-3 block h-auto w-full"
        role="img"
        aria-label="Pipeline diagram: Oracle, MSSQL and S3 sources fan into an ingest stage, through Databricks, out to MDM tenants."
      >
        <g stroke="var(--border-strong)" strokeWidth="1">
          {EDGES.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>

        <g
          stroke="var(--accent)"
          strokeWidth="1.2"
          opacity="0.9"
          className="site-dag-flow"
        >
          <path d="M40 105 L140 105 L250 105 L356 105" />
        </g>

        <g fill="var(--background)" stroke="var(--border-strong)" strokeWidth="1">
          {NODES.map((n) => (
            <circle key={`${n.cx}-${n.cy}`} cx={n.cx} cy={n.cy} r="6" />
          ))}
        </g>

        {/* Ingest, then the Databricks hub — the hub is tinted accent because it
            is the stage everything else is arranged around. */}
        <rect
          x="116"
          y="87"
          width="48"
          height="36"
          rx="9"
          fill="var(--surface)"
          stroke="var(--border-strong)"
        />
        <rect
          x="222"
          y="81"
          width="56"
          height="48"
          rx="11"
          fill="rgba(10,132,255,0.14)"
          stroke="rgba(10,132,255,0.5)"
        />

        <g fill="#9fd4ff">
          <circle cx="140" cy="105" r="3" />
          <circle cx="250" cy="105" r="3.6" />
        </g>

        <g
          fill="var(--muted)"
          fontFamily="ui-monospace, SF Mono, Menlo, monospace"
          fontSize="8"
          letterSpacing="1.2"
        >
          <text x="8" y="26">ORACLE · MSSQL · S3</text>
          <text x="114" y="140">INGEST</text>
          <text x="214" y="148">DATABRICKS</text>
          <text x="306" y="28">MDM TENANTS</text>
        </g>
      </svg>

      <div
        className="site-eyebrow mt-4 flex justify-between border-t pt-3"
        style={{ letterSpacing: "0.14em", borderColor: "var(--hairline)" }}
      >
        {STAGES.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
    </div>
  );
}
