"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
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

  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 pt-4">
      <nav className="flex items-center gap-0.5 rounded-full border border-surface-border bg-surface px-1.5 py-1.5 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-surface">
        {TABS.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative rounded-full px-4 py-1.5 text-sm font-medium"
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
      </nav>
    </header>
  );
}
