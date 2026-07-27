"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Hero, setMorphSource } from "@/components/Morph";
import { ProjectIdentity, projectSurface } from "@/components/identities";
import { useSkipEntrance } from "@/components/view-parts";
import { projects, type Project } from "@/data/content";

/**
 * The projects, on one endlessly travelling row.
 *
 * The list is rendered twice and the viewport's scrollLeft is advanced by rAF,
 * wrapping by exactly one copy's width — so the seam never shows. Scroll rather
 * than a transform on purpose: a transformed ancestor would become the
 * containing block for the position:fixed element a card morph flies, trapping
 * (and clipping) the flight inside the strip.
 */

const spring = { type: "spring", stiffness: 380, damping: 28 } as const;

/** px/second — slow enough to read a card as it passes. */
const SPEED = 44;
/**
 * Held still this long when a card is flying back into the row, so it lands on
 * a stationary target. Only then — a first load has nothing to land, and
 * freezing the row while the page settles just reads as broken.
 */
const MORPH_SETTLE = 900;
/**
 * Time constant of the glide to a halt — a hover should read as catching the
 * row rather than hitting a wall. Only the slowing down is eased: letting go
 * hands the row straight back at full speed, because a ramp there is felt as
 * lag, not as easing.
 */
const EASE_OUT_TAU = 170;
/** Below this the row is not perceptibly moving, so treat it as stopped. */
const CREEP = 0.5;
/** Past this much travel a press is a drag, not a click on the card underneath. */
const DRAG_SLOP = 6;

/**
 * How far the row has travelled, kept outside the component because opening a
 * project unmounts the whole home view. The clock keeps ticking while you are
 * away: coming back finds the row where it would have got to, rather than
 * snapped to the first card.
 */
const travel = { pos: 0, at: 0 };

export default function ProjectsMarquee({
  onSelect,
  baseDelay = 0,
}: {
  onSelect: (name: string) => void;
  baseDelay?: number;
}) {
  const skip = useSkipEntrance();
  const reduceMotion = useReducedMotion();
  const viewport = useRef<HTMLDivElement>(null);
  const firstCopy = useRef<HTMLDivElement>(null);
  const secondCopy = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  /** The card the current press went down on — see openPressedCard. */
  const pressedCard = useRef<HTMLElement | null>(null);

  // The seam-filler copy is aria-hidden, so nothing inside it may take focus —
  // tabbing into content hidden from assistive tech strands keyboard users.
  // It stays clickable: once the strip has travelled, these are the cards on
  // screen. Keyboard users reach every project through the first copy.
  useEffect(() => {
    secondCopy.current?.querySelectorAll("a, button").forEach((el) => {
      (el as HTMLElement).tabIndex = -1;
    });
  }, []);

  /**
   * Puts the row back where it left off — as the ref of the scroller's first
   * child, so it runs before the cards do.
   *
   * A card returning from its detail view measures its destination in a layout
   * effect, and layout effects run child-first: restoring from this component's
   * own effect would happen after every card had already measured a strip still
   * sitting at zero, and each one would fly to the wrong place and then snap.
   * Refs attach in that same child-first walk, so being the first child is what
   * buys the ordering. Hence the marker element and the reach for `parentElement`
   * — this component's own refs are not attached this early either.
   */
  const restoreTravel = useCallback(
    (marker: HTMLSpanElement | null) => {
      const vp = marker?.parentElement;
      const copy = vp?.querySelector<HTMLElement>("[data-marquee-copy]");
      if (!vp || !copy) return;
      const span = copy.offsetWidth;
      if (span <= 0) return;

      const now = performance.now();
      if (!reduceMotion) {
        if (travel.at) travel.pos += (SPEED * (now - travel.at)) / 1000;
        travel.at = now;
      }
      travel.pos = ((travel.pos % span) + span) % span;
      vp.scrollLeft = travel.pos;
    },
    [reduceMotion]
  );

  useEffect(() => {
    if (reduceMotion) return;
    const vp = viewport.current;
    const copy = firstCopy.current;
    if (!vp || !copy) return;

    let last = 0;
    let speed = 0;
    let raf = 0;
    // A morph only ever lands on a back-navigation; a first load starts moving
    // straight away, easing up from nothing as the cards arrive.
    const startAt = performance.now() + (skip ? MORPH_SETTLE : 0);

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min(now - last, 64) : 0; // clamp tab-switch gaps
      last = now;
      const span = copy.offsetWidth; // one full copy of the list
      if (span <= 0) return;
      travel.at = now;

      // A drag is direct manipulation — it takes the row instantly. Hovering
      // only asks it to slow down, so that one glides.
      if (!drag.current.active) {
        const target = paused.current || now < startAt ? 0 : SPEED;
        speed =
          target > speed
            ? target // picking back up is immediate
            : speed + (target - speed) * (1 - Math.exp(-dt / EASE_OUT_TAU));
      } else {
        speed = 0;
      }

      if (speed < CREEP) {
        speed = 0;
        travel.pos = vp.scrollLeft; // stopped: the reader's own scrolling wins
        return;
      }
      // travel.pos, not scrollLeft, is the truth: at this speed a frame is well
      // under a pixel, and reading back a rounded scrollLeft would stall the row.
      travel.pos = (travel.pos + (speed * dt) / 1000) % span;
      vp.scrollLeft = travel.pos;
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, skip]);

  // Grab-and-throw the row by hand. Touch and pen are left to the browser's own
  // panning — it has momentum and rubber-banding we would only approximate; this
  // gives the mouse the same reach. The rAF loop is paused for the duration and
  // re-reads scrollLeft when it resumes, so the strip carries on from wherever
  // the drag left it. The pointer is only captured once the press becomes a real
  // drag, so a plain press on a card is left entirely alone.
  const startDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const vp = viewport.current;
    // Any fresh press starts life as a click, whatever it turns into — and
    // whatever the last one turned into. Reset before the guard below, or a
    // touch tap that follows a mouse drag inherits its swallowed click.
    drag.current.moved = false;
    pressedCard.current = (e.target as HTMLElement).closest<HTMLElement>("[data-hero]");
    if (!vp || e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { active: true, startX: e.clientX, startScroll: vp.scrollLeft, moved: false };
    paused.current = true;
    // Deliberately no preventDefault and no pointer capture here. Both change how
    // the browser decides what was clicked — preventDefault suppresses the
    // mousedown the click target is derived from, and a capture retargets the
    // compatibility mouse events at the capturing element. Until this press has
    // passed the slop it is a click on a card, not a drag, so it gets neither.
  };

  const moveDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const vp = viewport.current;
    if (!drag.current.active || !vp) return;
    const dx = e.clientX - drag.current.startX;
    // Under the slop this is still a click, so leave the row completely alone.
    // Nudging it here is what broke opening a project: near the start of the loop
    // a single rightward pixel sends scrollLeft negative, which wraps it a whole
    // copy along. The row looks identical — that is the point of the seam — but
    // the card under the cursor is now the *other* copy of it, so press and
    // release land on two different elements and the browser fires the click on
    // their common ancestor instead of on either card.
    if (!drag.current.moved) {
      if (Math.abs(dx) <= DRAG_SLOP) return;
      drag.current.moved = true;
      // Now it really is a drag, so take the pointer: the row should keep
      // tracking the hand even once it leaves the strip. Safe to do here —
      // there is no longer a click to protect.
      vp.setPointerCapture(e.pointerId);
      document.body.style.cursor = "grabbing";
    }
    const span = firstCopy.current?.offsetWidth ?? 0;
    const next = drag.current.startScroll - dx;
    // Wrap by one copy exactly as the rAF does, so dragging past either end of
    // the list is as seamless as letting it travel there.
    vp.scrollLeft = span > 0 ? ((next % span) + span) % span : next;
  };

  /**
   * Opens the card the press started and ended on, without waiting for `click`.
   *
   * On a strip that moves and can be dragged, `click` is the least dependable
   * signal there is: the browser derives its target from the mousedown/mouseup
   * pair, and anything that perturbs either — a wrap that swaps in the duplicate
   * copy, a pointer capture, a suppressed mousedown — silently retargets it to
   * some ancestor and the card never hears about it. The strip already knows
   * exactly which card went down and whether the hand moved, so it decides.
   * Cards keep their own onClick for the keyboard and for anything that reaches
   * them normally; a double-fire is harmless, since pushing the view already
   * open is a no-op.
   */
  const openPressedCard = (e: React.PointerEvent<HTMLDivElement>) => {
    const down = pressedCard.current;
    pressedCard.current = null;
    if (!down || drag.current.moved) return;
    const up = (e.target as HTMLElement).closest<HTMLElement>("[data-hero]");
    if (up !== down) return; // released somewhere else — treat it as cancelled
    const id = down.dataset.hero;
    const name = id?.replace(/^proj-card-/, "");
    if (!id || !name) return;
    setMorphSource(id, down); // fly from the copy under the hand, not the tidiest one
    onSelect(name);
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    openPressedCard(e);
    if (!drag.current.active) return;
    drag.current.active = false;
    document.body.style.cursor = "";
    if (viewport.current?.hasPointerCapture(e.pointerId)) {
      viewport.current.releasePointerCapture(e.pointerId);
    }
  };

  const cancelDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    pressedCard.current = null;
    if (!drag.current.active) return;
    drag.current.active = false;
    document.body.style.cursor = "";
    if (viewport.current?.hasPointerCapture(e.pointerId)) {
      viewport.current.releasePointerCapture(e.pointerId);
    }
  };

  // A drag that ends over a card would otherwise open it. `moved` is cleared on
  // the next press, so a genuine click is never swallowed.
  const swallowDragClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!drag.current.moved) return;
    drag.current.moved = false;
    e.preventDefault();
    e.stopPropagation();
  };

  // A drag interrupted by unmount would leave the page stuck on the grab cursor.
  useEffect(() => () => void (document.body.style.cursor = ""), []);

  const card = (p: Project, i: number, clone: boolean) => (
    <motion.div
      key={p.name}
      className="w-[300px] shrink-0 max-[640px]:w-[82vw]"
      initial={skip || clone ? false : { opacity: 0, y: 14, scale: 0.96 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { ...spring, delay: baseDelay + i * 0.08 },
      }}
    >
      <Hero
        id={`proj-card-${p.name}`}
        style={{ borderRadius: 18 }}
        onClick={() => onSelect(p.name)}
        className={`group relative flex h-full cursor-pointer flex-col gap-[7px] ${projectSurface} transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-[#7c3aed] hover:shadow-[0_14px_32px_rgba(124,58,237,.16)] dark:hover:border-[rgba(34,211,238,.5)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,.12)]`}
      >
        <ProjectIdentity p={p} />
      </Hero>
    </motion.div>
  );

  return (
    <div
      ref={viewport}
      onPointerEnter={() => (paused.current = true)}
      onPointerLeave={() => (paused.current = false)}
      onFocusCapture={() => (paused.current = true)}
      onBlurCapture={() => (paused.current = false)}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={cancelDrag}
      onClickCapture={swallowDragClick}
      // -my-2/py-2: room to paint the cards' hover lift and shadow without the
      // scroll container clipping them, at no cost to the surrounding rhythm.
      // select-none + onDragStart replace the preventDefault that startDrag used
      // to call: they stop a drag from selecting text or peeling off an icon,
      // without touching the pointerdown the click target is derived from.
      onDragStart={(e) => e.preventDefault()}
      className="-my-2 select-none overflow-x-auto overscroll-x-contain py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {/* Not decorative: its ref is where the row's travel is restored. */}
      <span hidden ref={restoreTravel} />
      <div className="flex w-max items-stretch">
        <div ref={firstCopy} data-marquee-copy className="flex shrink-0 items-stretch gap-3 pr-3">
          {projects.map((p, i) => card(p, i, false))}
        </div>
        {/* The seam-filler: same cards, hidden from assistive tech. */}
        <div ref={secondCopy} className="flex shrink-0 items-stretch gap-3 pr-3" aria-hidden>
          {projects.map((p, i) => card(p, i, true))}
        </div>
      </div>
    </div>
  );
}
