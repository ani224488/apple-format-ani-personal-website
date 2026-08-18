"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useReducedMotion } from "motion/react";
import { basePath } from "@/lib/site";
import { useIsCompact } from "@/lib/use-capability";

/**
 * The hero portrait as a point cloud with real volume: the photo is projected
 * onto a head-shaped surface, then scrolling turns it up and to the right
 * before the particles let go in the same direction.
 *
 * Deliberately dependency-free — this needs points, normals and a depth test
 * and nothing else, so a hand-rolled canvas beats pulling in a 3D engine, and
 * with nothing to lazy-load the head is part of the first paint.
 *
 * The first version of this derived depth from luminance and it read as a flat
 * photo cut into dots, because that is what it was: brightness has no relation
 * to the shape of a face, so a bright forehead sat forward of a dark eye socket
 * for no reason. Depth now comes from geometry instead — an ellipsoid for the
 * head, a shallow cylinder for the shoulders — which means every particle also
 * has a surface normal, and that unlocks the three things that actually sell
 * solidity: back-face culling, a depth test, and shading.
 */

/** Sampling stride in source pixels. 1 keeps every pixel (~34k particles). */
const STRIDE = 1;
/** How far back the perspective camera sits, in source-pixel units. */
const FOCAL = 900;
/** Cap the backing buffer: clearing it is the per-frame cost, not the points. */
const MAX_BUFFER = 760;

/* Where the head sits in the photo, in normalised image coordinates, and how
   deep it is. A head is about as deep as it is wide, so the half-depth tracks
   the horizontal radius. Measured off the source image by eye. */
const HEAD = { cx: 0.5, cy: 0.3, rx: 0.23, ry: 0.26 };
/** Shoulders and shirt curve far less than the head does. */
const TORSO_DEPTH = 0.11;

/** Light from the upper left, matching where the page's glows sit. */
const LIGHT = (() => {
  const v = [-0.42, -0.5, 0.76];
  const m = Math.hypot(v[0], v[1], v[2]);
  return [v[0] / m, v[1] / m, v[2] / m] as const;
})();

type Particle = {
  x: number;
  y: number;
  z: number;
  /** Unit surface normal — drives culling and shading. */
  nx: number;
  ny: number;
  nz: number;
  r: number;
  g: number;
  b: number;
  /** Baseline opacity after background keying and edge feathering. */
  a: number;
  /** Dispersal direction, biased up and to the right. */
  dx: number;
  dy: number;
  dz: number;
  spread: number;
  /** Per-particle delay into the dissolve, 0–0.35 of the scroll range. */
  lag: number;
};

export function HeroPortrait() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  const compact = useIsCompact();
  const [live, setLive] = useState(false);

  const progress = useRef(0);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progress.current = v;
  });

  useEffect(() => {
    if (reduced || compact) return;

    const host = canvas.current;
    if (!host) return;
    const ctx = host.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let buffer: ImageData | null = null;
    let pixels: Uint32Array | null = null;
    let depth: Float32Array | null = null;
    let bw = 0;
    let bh = 0;
    let cancelled = false;
    let started = 0;

    const img = new window.Image();
    img.decoding = "async";

    img.onload = () => {
      if (cancelled) return;

      const read = document.createElement("canvas");
      read.width = img.naturalWidth;
      read.height = img.naturalHeight;
      const rctx = read.getContext("2d", { willReadFrequently: true });
      if (!rctx) return;
      rctx.drawImage(img, 0, 0);

      const iw = read.width;
      const ih = read.height;
      const data = rctx.getImageData(0, 0, iw, ih).data;

      // Background key: average the corners, then fade particles by how close
      // they are to that colour. Cheap, and it needs no hand-cut alpha.
      const corner = (cx: number, cy: number) => {
        const i = (cy * iw + cx) * 4;
        return [data[i], data[i + 1], data[i + 2]];
      };
      const corners = [
        corner(1, 1),
        corner(iw - 2, 1),
        corner(1, ih - 2),
        corner(iw - 2, ih - 2),
      ];
      const bg = [0, 1, 2].map(
        (c) => corners.reduce((s, k) => s + k[c], 0) / corners.length,
      );

      // Head radii in source pixels. Depth matches the horizontal radius, so
      // the head is as deep as it is wide.
      const hrx = HEAD.rx * iw;
      const hry = HEAD.ry * ih;
      const hz = hrx;
      const tz = TORSO_DEPTH * iw;

      const next: Particle[] = [];

      for (let y = 0; y < ih; y += STRIDE) {
        for (let x = 0; x < iw; x += STRIDE) {
          const i = (y * iw + x) * 4;
          if (data[i + 3] < 16) continue;

          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const dist =
            Math.abs(r - bg[0]) + Math.abs(g - bg[1]) + Math.abs(b - bg[2]);
          const key = Math.min(1, dist / 120);

          // Elliptical feather so the rectangular crop dissolves rather than
          // ending in a hard line.
          const fx = (x / iw - 0.5) / 0.52;
          const fy = (y / ih - 0.44) / 0.58;
          const frad = Math.hypot(fx, fy);
          const feather = 1 - Math.min(1, Math.max(0, (frad - 0.62) / 0.38));

          const a = key * feather * (data[i + 3] / 255);
          if (a < 0.06) continue;

          // Position on the surface. Inside the head ellipse the point sits on
          // an ellipsoid; below it, on a shallow cylinder for the shoulders.
          const ex = (x - HEAD.cx * iw) / hrx;
          const ey = (y - HEAD.cy * ih) / hry;
          const e2 = ex * ex + ey * ey;

          let z: number;
          let nx: number;
          let ny: number;
          let nz: number;

          if (e2 < 1) {
            const k = Math.sqrt(1 - e2);
            z = k * hz;
            // Ellipsoid normal: the gradient of (x/rx)² + (y/ry)² + (z/rz)².
            nx = ex / hrx;
            ny = ey / hry;
            nz = k / hz;
          } else {
            const cxn = Math.max(-1, Math.min(1, (x - iw / 2) / (iw / 2)));
            const k = Math.sqrt(Math.max(0, 1 - cxn * cxn));
            z = k * tz - hz * 0.25; // set back from the face
            nx = cxn / (iw / 2);
            ny = 0;
            nz = k / Math.max(1, tz);
          }

          const nm = Math.hypot(nx, ny, nz) || 1;

          const jx = 0.55 + Math.random() * 0.9;
          const jy = -(0.5 + Math.random() * 1.0);
          const jz = (Math.random() - 0.35) * 1.1;

          next.push({
            x: x - iw / 2,
            y: y - ih / 2,
            z,
            nx: nx / nm,
            ny: ny / nm,
            nz: nz / nm,
            r,
            g,
            b,
            a,
            dx: jx,
            dy: jy,
            dz: jz,
            spread: 180 + Math.random() * 620,
            lag: Math.random() * 0.35,
          });
        }
      }

      particles = next;
      resize();
      started = performance.now();
      setLive(true);
      raf = requestAnimationFrame(frame);
    };

    img.src = `${basePath}/profile.png`;

    function resize() {
      const el = canvas.current;
      const box = wrap.current;
      if (!el || !box) return;

      const cssW = el.clientWidth || box.clientWidth;
      const cssH = el.clientHeight || cssW;
      if (!cssW || !cssH) return;

      const scale = Math.min(1.5, window.devicePixelRatio || 1);
      bw = Math.max(1, Math.min(MAX_BUFFER, Math.round(cssW * scale)));
      bh = Math.max(1, Math.round((bw * cssH) / cssW));

      el.width = bw;
      el.height = bh;
      buffer = ctx!.createImageData(bw, bh);
      pixels = new Uint32Array(buffer.data.buffer);
      depth = new Float32Array(bw * bh);
    }

    function frame(now: number) {
      if (cancelled) return;
      raf = requestAnimationFrame(frame);
      if (!buffer || !pixels || !depth || !particles.length) return;

      const p = Math.min(1, Math.max(0, progress.current));

      // One gesture, not three: the turn runs over the first 35% and the
      // dissolve starts at 30%, while the head is still turning.
      const turn = Math.min(1, p / 0.35);
      const eased = turn * turn * (3 - 2 * turn);

      // A few degrees of idle drift at rest. Motion parallax is the strongest
      // depth cue available — without it a static cloud reads flat no matter
      // how correct the geometry underneath is.
      const t = (now - started) / 1000;
      const idle = (1 - eased) * 0.06;
      const yaw = eased * 0.26 + Math.sin(t * 0.5) * idle;
      const pitch = eased * -0.17 + Math.sin(t * 0.37 + 1.1) * idle * 0.6;

      const dissolve = Math.min(1, Math.max(0, (p - 0.3) / 0.6));

      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const cosX = Math.cos(pitch);
      const sinX = Math.sin(pitch);

      pixels.fill(0);
      depth.fill(Infinity);

      const fit = (bw / 178) * 0.82;
      const cx = bw / 2;
      const cy = bh / 2;

      for (let i = 0; i < particles.length; i++) {
        const s = particles[i];

        const d = Math.min(1, Math.max(0, (dissolve - s.lag) / (1 - s.lag)));
        const out = d * d;

        // Rotate the normal with the surface and drop anything facing away.
        // Without this you see the back of the head through the front, which
        // is most of what made the first version look like confetti.
        const rnx = s.nx * cosY - s.nz * sinY;
        const rnz0 = s.nx * sinY + s.nz * cosY;
        const rny = s.ny * cosX - rnz0 * sinX;
        const rnz = s.ny * sinX + rnz0 * cosX;
        // Culling relaxes as the cloud disperses — loose particles have no
        // front or back any more.
        if (rnz < 0.02 && out < 0.35) continue;

        const x = s.x + s.dx * s.spread * out;
        const y = s.y + s.dy * s.spread * out;
        const z = s.z + s.dz * s.spread * out;

        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        const persp = FOCAL / (FOCAL + z2);
        if (persp <= 0) continue;

        const sx = (cx + x1 * fit * persp) | 0;
        const sy = (cy + y1 * fit * persp) | 0;
        if (sx < 0 || sy < 0 || sx >= bw - 1 || sy >= bh - 1) continue;

        // Depth test: nearer points win the pixel.
        const base = sy * bw + sx;
        if (z2 >= depth[base]) continue;
        depth[base] = z2;

        // Lambert term, floored so nothing goes fully black, plus a rim lift
        // toward the silhouette to keep the edge of the form readable.
        const lam = rnx * LIGHT[0] + rny * LIGHT[1] + rnz * LIGHT[2];
        const shade = 0.62 + 0.38 * Math.max(0, lam) + 0.14 * (1 - rnz);

        const alpha = s.a * (1 - out) * Math.min(1, persp * 1.15);
        if (alpha <= 0.02) continue;

        const A = (alpha * 255) | 0;
        const R = Math.min(255, s.r * shade) | 0;
        const G = Math.min(255, s.g * shade) | 0;
        const B = Math.min(255, s.b * shade) | 0;

        const v = (A << 24) | (B << 16) | (G << 8) | R;
        pixels[base] = v;
        pixels[base + 1] = v;
        pixels[base + bw] = v;
      }

      ctx!.putImageData(buffer, 0, 0);
    }

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      img.onload = null;
    };
  }, [reduced, compact]);

  const showPhoto = reduced || compact || !live;

  return (
    <div ref={wrap} className="flex w-full justify-center">
      <div className="relative aspect-[178/192] w-[min(78vw,320px)] sm:w-[min(52vw,420px)] lg:w-[440px]">
        {/* The photo is the first paint and the standing fallback, carrying the
            same soft mask the particle feather applies. */}
        <Image
          src={`${basePath}/profile.png`}
          alt="Portrait of Ani"
          width={178}
          height={192}
          priority
          className={`h-full w-full object-cover transition-opacity duration-500 ${
            showPhoto ? "opacity-100" : "opacity-0"
          }`}
          style={{
            maskImage:
              "radial-gradient(ellipse 52% 58% at 50% 44%, #000 62%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 52% 58% at 50% 44%, #000 62%, transparent 100%)",
          }}
        />
        <canvas
          ref={canvas}
          aria-hidden
          className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${
            showPhoto ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>
    </div>
  );
}
