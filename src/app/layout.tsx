import type { Metadata } from "next";
import "./globals.css";
import { SITE_TOKENS } from "./tokens";
import { ThemeProvider } from "@/components/theme-provider";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Ani",
  description: "Ani's personal website — resume, projects, and what's next.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="site min-h-full flex flex-col">
        {/* The design's token layer. Scoped to `.site` on the body rather than
            `:root` so the demo frame's own palette, which must stay dark in
            both themes, can sit inside it without being overridden. */}
        <style>{SITE_TOKENS}</style>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Nav />
          {/* No max-width or padding here any more: the hero runs full-bleed
              and every other page sets its own measure (900px for reading
              pages, 1180px for wide ones). Constraining here would box the
              hero back in. */}
          <main className="w-full flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
