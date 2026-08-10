export function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.36-3.87-1.36-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.93 10.93 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.1 0 4.42-2.7 5.4-5.27 5.68.42.36.78 1.06.78 2.15v3.19c0 .31.21.68.8.56C20.71 21.39 24 17.08 24 12 24 5.65 18.85.5 12.5.5Z" />
    </svg>
  );
}

export function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function PythonIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 2c-3.3 0-3.6 1.4-3.6 3.2v1.8h7.2v1H6.4C4.3 8 2.5 9 2.5 12s1.8 4 3.9 4h1.3v-2.2c0-2.3 2-4.3 4.3-4.3h4.5c1.8 0 3.2-1.4 3.2-3.2V5.2C19.7 3.4 18 2 15.6 2H12Z" />
      <path d="M12 22c3.3 0 3.6-1.4 3.6-3.2v-1.8H8.4v-1h9.2c2.1 0 3.9-1 3.9-4s-1.8-4-3.9-4h-1.3v2.2c0 2.3-2 4.3-4.3 4.3H7.5c-1.8 0-3.2 1.4-3.2 3.2v2.1C4.3 20.6 6 22 8.4 22H12Z" />
      <circle cx="9" cy="5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="15" cy="19" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function DatabaseIcon() {
  return (
    <svg {...iconProps}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </svg>
  );
}

export function CloudIcon() {
  return (
    <svg {...iconProps}>
      <path d="M7 18a4.5 4.5 0 0 1-.4-8.98A5.5 5.5 0 0 1 17.3 8 4 4 0 0 1 17 16H7Z" />
    </svg>
  );
}

export function SparkleIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4" />
      <path d="M12 8a4 4 0 0 0 4 4 4 4 0 0 0-4 4 4 4 0 0 0-4-4 4 4 0 0 0 4-4Z" />
    </svg>
  );
}

export function MapPinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.4" />
    </svg>
  );
}

export function GitBranchIcon() {
  return (
    <svg {...iconProps}>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <path d="M18 8.2V9a5 5 0 0 1-5 5H9" />
    </svg>
  );
}

export function LayersIcon() {
  return (
    <svg {...iconProps}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  );
}
