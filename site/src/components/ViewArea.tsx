"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { AnimatePresence, motion, useIsPresent } from "motion/react";
import type { View } from "@/components/view-types";
import { viewKey } from "@/components/view-types";
import { NavDirection } from "@/components/view-parts";
import { CarriedHero, armMorph } from "@/components/Morph";
import HomeView from "@/components/views/HomeView";
import TechView from "@/components/views/TechView";
import ProjectView from "@/components/views/ProjectView";
import CompanyView from "@/components/views/CompanyView";
import PersonalView from "@/components/views/PersonalView";

const GRID = "grid grid-cols-4 gap-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1";

/** Long enough to read as a hand-off, short enough not to muddy the arriving view. */
const FADE_OUT = 0.45;

/**
 * One navigation layer. While it is the live view it sits in flow and gives the
 * container its height; once AnimatePresence marks it exiting it pops out of
 * flow — so the arriving view isn't pushed down — and fades out where it stands.
 *
 * Deliberately no `initial`/`animate`: the arriving layer must be fully opaque
 * from its first frame, because the morphing hero is a position:fixed child of
 * it and any opacity on this element would fade the flight itself.
 */
function ViewLayer({ children }: { children: ReactNode }) {
  const isPresent = useIsPresent();
  return (
    <motion.div
      className={GRID}
      style={
        isPresent
          ? undefined
          : { position: "absolute", top: 0, left: 0, right: 0, pointerEvents: "none" }
      }
      exit={{ opacity: 0, transition: { duration: FADE_OUT, ease: [0.4, 0, 1, 1] } }}
    >
      {children}
    </motion.div>
  );
}

/** The hero container id a view morphs from/to, or null if it has none. */
function heroIdFor(v: View): string | null {
  switch (v.kind) {
    case "project":
      return `proj-card-${v.name}`;
    case "company":
      return `company-card-${v.name}`;
    case "personal":
      return "personal-row";
    default:
      return null;
  }
}

export default function ViewArea() {
  const [nav, setNav] = useState<{ stack: View[]; dir: "push" | "back" }>({
    stack: [{ kind: "home" }],
    dir: "push",
  });
  const current = nav.stack[nav.stack.length - 1];
  const curKey = viewKey(current);

  // Which hero (if any) this navigation is carrying, so the outgoing layer can
  // hide its copy of it while fading everything else. Always reassigned — a
  // navigation with no morph must clear it, or the outgoing layer would hide a
  // hero that nothing is actually flying.
  const [carried, setCarried] = useState<string | null>(null);

  // Snapshot the source hero (while still mounted) so its counterpart flies from it.
  const arm = (id: string | null | undefined) => {
    setCarried(id && armMorph(id) ? id : null);
  };

  const push = (v: View, morphId?: string) => {
    if (viewKey(v) === curKey) return;
    arm(morphId);
    setNav((s) => ({ stack: [...s.stack, v], dir: "push" }));
  };
  const replace = (v: View) => {
    arm(null);
    setNav((s) => ({ stack: [...s.stack.slice(0, -1), v], dir: "push" }));
  };
  const back = () => {
    if (nav.stack.length <= 1) return;
    arm(heroIdFor(current));
    setNav((s) => ({ stack: s.stack.slice(0, -1), dir: "back" }));
  };

  const api = { push, replace, back };

  const render = (v: View) => {
    switch (v.kind) {
      case "home":
        return <HomeView push={api.push} />;
      case "tech":
        return <TechView tech={v.tech} push={api.push} replace={api.replace} back={api.back} />;
      case "project":
        return <ProjectView name={v.name} push={api.push} back={api.back} />;
      case "company":
        return <CompanyView name={v.name} push={api.push} back={api.back} />;
      case "personal":
        return <PersonalView push={api.push} back={api.back} />;
    }
  };

  return (
    <NavDirection.Provider value={nav.dir}>
      <CarriedHero.Provider value={carried}>
        <div className="relative col-span-4 max-[1024px]:col-span-2 max-[640px]:col-span-1">
          <AnimatePresence initial={false}>
            <ViewLayer key={curKey}>{render(current)}</ViewLayer>
          </AnimatePresence>
        </div>
      </CarriedHero.Provider>
    </NavDirection.Provider>
  );
}
