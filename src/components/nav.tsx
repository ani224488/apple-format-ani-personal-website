"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { ThemeToggle } from "./theme-toggle";
import { springs } from "@/lib/motion";

const TABS = [
  { href: "/", label: "Home" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/now", label: "Now" },
];

export function Nav() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);

  // Asymmetric thresholds: it tightens at 56px but doesn't relax until 24px, so
  // scrolling right at the boundary can't make it flutter open and shut.
  useMotionValueEvent(scrollY, "change", (v) => {
    setCondensed((prev) => (prev ? v > 24 : v > 56));
  });

  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ paddingTop: 6, paddingBottom: 6, paddingLeft: 6, paddingRight: 6 }}
        animate={{
          paddingTop: condensed ? 3 : 6,
          paddingBottom: condensed ? 3 : 6,
          paddingLeft: condensed ? 4 : 6,
          paddingRight: condensed ? 4 : 6,
        }}
        transition={reduced ? { duration: 0 } : springs.default}
        className={`flex items-center gap-0.5 rounded-full border bg-surface backdrop-blur-xl backdrop-saturate-150 transition-[border-color,box-shadow] duration-300 ease-out supports-[backdrop-filter]:bg-surface ${
          condensed
            ? "border-surface-border shadow-[0_8px_28px_rgba(0,0,0,0.28)]"
            : "border-surface-border shadow-none"
        }`}
      >
        {TABS.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`relative rounded-full px-3 text-[13px] font-medium transition-[padding] duration-300 ease-out sm:px-4 sm:text-sm ${
                condensed ? "py-1" : "py-1.5"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={springs.default}
                />
              )}
              <span
                className={`relative z-10 transition-colors duration-150 ${
                  active ? "text-accent-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
        <div className="ml-1 flex items-center border-l border-surface-border pl-1.5">
          <ThemeToggle />
        </div>
      </motion.nav>
    </header>
  );
}
