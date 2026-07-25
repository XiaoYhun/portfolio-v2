"use client";

import type { CSSProperties, ReactNode } from "react";
import { createContext, useCallback, useContext, useLayoutEffect, useRef } from "react";
import { motion, useIsPresent } from "motion/react";

/**
 * Outer ⇄ inner morphing, done on the real element (no clones, no crossfade).
 *
 * The same identity is rendered by a card (outer state) and by the top of its
 * detail view (inner state). On navigation we snapshot the outgoing element's
 * on-screen rect, and the incoming element FLIPs itself from that rect to its
 * natural one — animating left/top/width/height directly, so its content is the
 * genuine live DOM: shared text simply reflows and "remains", never fading. A
 * spacer holds the layout while the element is briefly detached. Anything the
 * inner state adds is wrapped in <NewInfo> and fades in.
 */

export type Rect = { left: number; top: number; width: number; height: number };

/**
 * Id of the hero the current navigation is carrying, or null. The outgoing view
 * reads this to hide its own copy of that hero: the incoming view is flying an
 * element from its exact rect, so leaving the original visible underneath would
 * read as a duplicate. Every other item in the outgoing view just fades out.
 */
export const CarriedHero = createContext<string | null>(null);

/** No overshoot, ~0.85s — the project's motion language (spring-like ease-out). */
const MORPH_MS = 850;
const MORPH_EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// Rects armed for the next morph. Heroes themselves are found in the DOM by
// their data-hero attribute rather than a registry, because a hero id is not
// unique: the projects marquee renders its list twice so it can loop, and both
// copies are real, clickable cards.
const pendingFrom = new Map<string, { rect: Rect; at: number }>();

function rectOf(el: HTMLElement): Rect {
  const r = el.getBoundingClientRect();
  return { left: r.left, top: r.top, width: r.width, height: r.height };
}

/** How much of an element is actually on screen, in px². */
function visibleArea(el: HTMLElement): number {
  const r = el.getBoundingClientRect();
  const w = Math.min(r.right, window.innerWidth) - Math.max(r.left, 0);
  const h = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
  return Math.max(0, w) * Math.max(0, h);
}

/**
 * The copy of a hero a morph should use — the one the viewer can actually see,
 * not whichever happens to come first in the DOM. Copies belonging to a view
 * that is on its way out are excluded: during a navigation both layers are
 * briefly mounted, and the outgoing one is not a valid destination.
 */
function bestCopy(id: string): HTMLElement | null {
  let best: HTMLElement | null = null;
  let bestArea = -1;
  let bestDist = Infinity;
  const sel = `[data-hero="${CSS.escape(id)}"]:not([data-hero-exit])`;
  for (const el of document.querySelectorAll<HTMLElement>(sel)) {
    const area = visibleArea(el);
    const r = el.getBoundingClientRect();
    // Distance breaks ties — and when a travelling strip has carried every copy
    // off screen there is nothing but a tie, so the nearest one wins and the
    // flight heads for the edge it actually left by.
    const dist = Math.abs((r.left + r.right) / 2 - window.innerWidth / 2);
    if (area > bestArea || (area === bestArea && dist < bestDist)) {
      bestArea = area;
      bestDist = dist;
      best = el;
    }
  }
  return best;
}

/**
 * The hero a click just landed on. Set by Hero's own click handler so that a
 * duplicated card flies from the copy the user pressed, which need not be the
 * most visible one — half of it may be hanging off the edge of the strip.
 */
let clickedSource: { id: string; rect: Rect; at: number } | null = null;

/** Snapshot a hero's current rect (while still mounted) so its counterpart can fly from it. */
export function armMorph(id: string): boolean {
  const hit = clickedSource;
  clickedSource = null;
  if (hit && hit.id === id && performance.now() - hit.at < 500) {
    pendingFrom.set(id, { rect: hit.rect, at: performance.now() });
    return true;
  }
  const el = bestCopy(id);
  if (!el) return false;
  pendingFrom.set(id, { rect: rectOf(el), at: performance.now() });
  return true;
}

/**
 * A morphing container. Renders a plain div that registers itself and, when it
 * mounts with an armed "from" rect for its id, animates from that rect to its
 * natural position — reflowing its real content along the way.
 */
export function Hero({
  id,
  className,
  style,
  onClick,
  children,
}: {
  id: string;
  className?: string;
  style?: CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  children: ReactNode;
}) {
  // False once AnimatePresence has marked this subtree as exiting — i.e. this is
  // the outgoing view's copy of the hero, the one being flown away from.
  const isPresent = useIsPresent();
  const carried = useContext(CarriedHero);
  const carriedAway = !isPresent && carried === id;

  const elRef = useRef<HTMLDivElement | null>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Record which copy was pressed before the navigation arms the morph.
      clickedSource = { id, rect: rectOf(e.currentTarget), at: performance.now() };
      onClick?.(e);
    },
    [id, onClick]
  );

  useLayoutEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const entry = pendingFrom.get(id);
    // Ignore stale arms; but do NOT consume the entry here — React StrictMode
    // (and Fast Refresh) run this effect twice, discarding the first element.
    // Consuming on the first pass would leave the surviving mount with nothing
    // to animate. We delete only once the morph actually finishes.
    if (!entry || performance.now() - entry.at > 800) {
      if (entry) pendingFrom.delete(id);
      return;
    }
    // A duplicated list mounts several copies of this id in the same commit, and
    // all of them reach this point. Exactly one may fly: the visible one. (Layout
    // effects run after the whole commit is in the DOM, so every copy is here to
    // be compared against.)
    if (bestCopy(id) !== el) return;

    const from = entry.rect;

    // Natural (destination) geometry, measured before we detach the element.
    const to = rectOf(el);
    const cs = getComputedStyle(el);

    // Reserve the space the element is about to vacate so nothing below jumps.
    const spacer = document.createElement("div");
    spacer.style.gridColumn = cs.gridColumn;
    spacer.style.gridRow = cs.gridRow;
    spacer.style.height = `${to.height}px`;
    spacer.style.boxSizing = "border-box";
    el.parentElement?.insertBefore(spacer, el);

    const restore = el.style.cssText;
    // Pin the element at the source rect before the first paint (no flash),
    // taking it out of flow; the spacer above holds the space it vacates.
    Object.assign(el.style, {
      position: "fixed",
      left: `${from.left}px`,
      top: `${from.top}px`,
      width: `${from.width}px`,
      height: `${from.height}px`,
      margin: "0",
      zIndex: "50",
      overflow: "hidden",
    });

    let done = false;
    let anim: Animation | null = null;
    const release = () => {
      if (done) return;
      done = true;
      anim?.cancel();
      el.style.cssText = restore;
      spacer.remove();
    };

    const anims = el.animate(
      [
        { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px` },
        { left: `${to.left}px`, top: `${to.top}px`, width: `${to.width}px`, height: `${to.height}px` },
      ],
      { duration: MORPH_MS, easing: MORPH_EASE, fill: "both" }
    );
    anim = anims;
    anims.finished
      .then(() => {
        release();
        pendingFrom.delete(id); // consume only once the morph has actually played
      })
      .catch(() => {});

    return () => {
      // On the StrictMode/Fast-Refresh teardown the entry is intentionally left
      // in place so the surviving remount re-runs the morph.
      release();
    };
  }, [id]);

  return (
    <div
      ref={elRef}
      data-hero={id}
      // Marks the outgoing view's copies so a morph never picks one as its
      // destination while both layers are mounted.
      data-hero-exit={isPresent ? undefined : ""}
      className={className}
      // `transition: none` matters: cards carry `transition-all`, and a
      // transitioned `visibility` stays *visible* for the whole duration —
      // the copy would linger through most of the fade before vanishing.
      style={carriedAway ? { ...style, visibility: "hidden", transition: "none" } : style}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}

/** Content the inner state adds on top of the shared identity — rises + fades in on mount. */
export function NewInfo({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay } }}
    >
      {children}
    </motion.div>
  );
}
