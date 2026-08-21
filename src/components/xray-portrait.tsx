"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { basePath } from "@/lib/site";

/**
 * The hero portrait and its X-ray reveal.
 *
 * The robot layer sits under the photo and is exposed through a hole punched in
 * the photo's mask — not a crossfade between two images. The distinction
 * matters: a crossfade dissolves the whole face at once and reads as a filter,
 * where a punch-out reads as looking *through* something at a fixed thing
 * behind it.
 *
 * Three layers, composited per pointer move:
 *   1. a circular clip holding the robot, sized and positioned at the pointer
 *   2. the photo, whose mask is the permanent edge feather intersected with a
 *      radial hole at the same point
 *   3. a torch glow that follows the pointer
 *
 * Everything is driven by direct style writes against refs rather than React
 * state. A pointermove handler that calls setState re-renders the subtree on
 * every mouse event; writing three style properties does not.
 *
 * The robot PNG is scaled 0.775 from `transform-origin: 50% 0` with a 0.8%
 * horizontal nudge. That is what registers the two faces — the robot render is
 * framed slightly wider than the photo, so without it the eyes and jaw land in
 * the wrong place and the reveal reads as a different person.
 */

/** Torch radius in CSS pixels. */
const RADIUS = 130;

/* The photo's permanent edge feather. The source is a cut-out on a rectangular
   canvas; without this its frame crop reads as a hard rectangle against the
   page. Two gradients intersected: a bottom fade and a pair of side fades. */
const FEATHER_B = "linear-gradient(to bottom,#000 0,#000 72%,transparent 99%)";
const FEATHER_S =
  "linear-gradient(to right,transparent 0,#000 7%,#000 93%,transparent 100%)";
const FEATHER = `${FEATHER_B}, ${FEATHER_S}`;

export function XrayPortrait({ className = "" }: { className?: string }) {
  const portrait = useRef<HTMLDivElement>(null);
  const clip = useRef<HTMLDivElement>(null);
  const robot = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLImageElement>(null);
  const torch = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /** Whether a touch tap has pinned the torch. Tap again to dismiss. */
  const pinned = useRef(false);

  const place = useCallback(
    (clientX: number, clientY: number, instant: boolean) => {
      const host = portrait.current;
      const img = photo.current;
      const glow = torch.current;
      const disc = clip.current;
      const bot = robot.current;
      if (!host || !img || !glow || !disc || !bot) return;

      const box = host.getBoundingClientRect();
      const x = clientX - box.left;
      const y = clientY - box.top;

      /* The hole runs fully transparent out to 62% of the radius and back to
         opaque by 88%, so the photo's edge around the reveal is soft rather
         than a cut circle. Intersected with the feather so the outer silhouette
         keeps fading regardless of where the torch is. */
      const hole = `radial-gradient(circle ${RADIUS}px at ${x}px ${y}px, transparent 0, transparent 62%, #000 88%, #000 100%), ${FEATHER}`;
      img.style.webkitMaskImage = hole;
      img.style.maskImage = hole;
      img.style.webkitMaskComposite = "source-in";
      img.style.maskComposite = "intersect";

      /* The robot is laid out at the portrait's full size inside a circular
         clip, then offset by the clip's own origin — so it stays locked to the
         portrait's coordinate space while the window over it moves. */
      disc.style.width = `${RADIUS * 2}px`;
      disc.style.height = `${RADIUS * 2}px`;
      disc.style.left = `${x - RADIUS}px`;
      disc.style.top = `${y - RADIUS}px`;
      disc.style.opacity = "1";
      bot.style.width = `${box.width}px`;
      bot.style.height = `${box.height}px`;
      bot.style.left = `${-(x - RADIUS)}px`;
      bot.style.top = `${-(y - RADIUS)}px`;

      glow.style.transform = `translate(${x}px, ${y}px)`;
      glow.style.transition =
        instant || reduced
          ? "opacity .35s ease"
          : "opacity .35s ease, transform .12s linear";
      glow.style.opacity = "1";
    },
    [reduced],
  );

  const clear = useCallback(() => {
    const img = photo.current;
    if (img) {
      img.style.webkitMaskImage = FEATHER;
      img.style.maskImage = FEATHER;
      img.style.webkitMaskComposite = "source-in";
      img.style.maskComposite = "intersect";
    }
    if (torch.current) torch.current.style.opacity = "0";
    if (clip.current) clip.current.style.opacity = "0";
  }, []);

  /* Re-registering the layers after a resize keeps the reveal aligned; the
     robot's size is read from the portrait box, which changes with the
     viewport. Cheapest correct answer is to drop the reveal on resize. */
  useEffect(() => {
    const onResize = () => {
      pinned.current = false;
      clear();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [clear]);

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // touch is handled on tap
    place(e.clientX, e.clientY, false);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "touch") return;
    /* Tap places the torch, tap again dismisses it. Hover-only would leave
       every phone visitor with no way to see the reveal at all. */
    if (pinned.current) {
      pinned.current = false;
      clear();
    } else {
      pinned.current = true;
      place(e.clientX, e.clientY, true);
    }
  };

  return (
    <div
      ref={portrait}
      className={`touch-manipulation ${className}`}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerLeave={() => {
        if (!pinned.current) clear();
      }}
    >
      {/* Robot, inside a circular window. Above the photo in paint order, but
          only ever visible where the photo's hole already is. */}
      <div
        ref={clip}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-[3] h-0 w-0 overflow-hidden rounded-full opacity-0 transition-opacity duration-[250ms]"
        style={{ clipPath: "circle(50% at 50% 50%)" }}
      >
        <div
          ref={robot}
          className="absolute left-0 top-0"
          style={{
            backgroundImage: `url(${basePath}/portrait-robot.png)`,
            backgroundPosition: "center bottom",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            transform: "scale(0.775) translateX(0.8%)",
            transformOrigin: "50% 0",
          }}
        />
      </div>

      <div className="absolute inset-0">
        {/* Deliberately a plain <img>: next/image would need width/height and
            gains nothing here, since `images.unoptimized` is set for the static
            export. basePath has to be prepended by hand either way. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={photo}
          src={`${basePath}/portrait.png`}
          alt="Ani Undrakonda"
          className="pointer-events-none block h-full w-full object-contain object-bottom"
          style={{
            WebkitMaskImage: FEATHER,
            maskImage: FEATHER,
            WebkitMaskComposite: "source-in",
            maskComposite: "intersect",
          }}
        />
      </div>

      <div
        ref={torch}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-[4] h-[300px] w-[300px] rounded-full opacity-0"
        style={{
          margin: "-150px 0 0 -150px",
          transition: "opacity .35s ease",
          background:
            "radial-gradient(circle, rgba(10,132,255,0.16), rgba(10,132,255,0) 62%)",
          boxShadow:
            "inset 0 0 0 1px rgba(122,196,255,0.35), 0 0 60px rgba(10,132,255,0.18)",
        }}
      />
    </div>
  );
}
