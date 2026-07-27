"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { TechIcon } from "@/data/content";
import { toolbelt } from "@/data/content";

// Re-exported so the views keep importing their class strings from one place;
// they live in a plain module because the server-rendered page shell needs them
// too and this file is "use client".
import { labelClass, linkPillClass } from "@/components/ui/classes";
export { labelClass, linkPillClass };

/**
 * Direction of the last view-stack navigation. On "back" every entrance
 * animation is skipped so the shrinking hero lands on content that is already
 * settled instead of fading-in targets.
 */
export const NavDirection = createContext<"push" | "back">("push");

/**
 * Whether this render should skip its entrance animation — on a back
 * navigation, and whenever the reader has asked for reduced motion. Every
 * entrance in the project goes through here, so honouring the preference is a
 * single decision rather than a per-component one.
 */
export function useSkipEntrance() {
  const reduceMotion = useReducedMotion();
  return useContext(NavDirection) === "back" || !!reduceMotion;
}

export const springPop = { type: "spring", stiffness: 340, damping: 26 } as const;

/** Shared-element (layoutId) morphs — critically damped, no overshoot. */
export const layoutSnap = { type: "spring", bounce: 0, duration: 0.85 } as const;

/** Spring pop entrance — for cards and tiles. Wraps content so Tailwind hover transforms on the child keep working. */
export function PopIn({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const skip = useSkipEntrance();
  return (
    <motion.div
      className={className}
      initial={skip ? false : { opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1, transition: { ...springPop, delay } }}
    >
      {children}
    </motion.div>
  );
}

/** Horizontal slide entrance — for rows and alternating cards. */
export function SlideIn({
  delay = 0,
  from = "left",
  className,
  children,
}: {
  delay?: number;
  from?: "left" | "right";
  className?: string;
  children: ReactNode;
}) {
  const skip = useSkipEntrance();
  return (
    <motion.div
      className={className}
      initial={skip ? false : { opacity: 0, x: from === "left" ? -24 : 24 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1], delay },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * A section's name. A heading rather than a styled div: these labels are the
 * only structure the page has, so they are what a screen-reader user navigates
 * by. Level 2 throughout — every one of them sits directly under the page's h1.
 */
export function SectionLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h2 className={`${labelClass} ${className}`}>{children}</h2>;
}

/** Light stagger wrapper for entering view sections. */
export function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const skip = useSkipEntrance();
  return (
    <motion.div
      className={className}
      initial={skip ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut", delay } }}
    >
      {children}
    </motion.div>
  );
}

export function BackBar({ onBack, children }: { onBack: () => void; children: ReactNode }) {
  const skip = useSkipEntrance();
  return (
    <motion.div
      className="col-span-4 flex items-center gap-3.5 max-[1024px]:col-span-2 max-[640px]:col-span-1"
      initial={skip ? false : { opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } }}
    >
      <button
        type="button"
        onClick={onBack}
        className="font-mono shrink-0 rounded-full bg-[#f1f5f9] px-3 py-[7px] text-[10.5px] font-semibold text-[#334155] transition-colors duration-150 hover:bg-[#e2e8f0] dark:bg-[rgba(255,255,255,.06)] dark:text-[#8da2c0] dark:hover:bg-[rgba(34,211,238,.12)]"
      >
        ← Back
      </button>
      {children}
    </motion.div>
  );
}

export function TechChip({
  t,
  onClick,
  variant = "light",
}: {
  t: TechIcon;
  onClick: () => void;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        isDark
          ? "flex items-center gap-[5px] rounded-lg border border-transparent bg-[#1e293b] px-[9px] py-1 font-mono text-[10px] font-normal text-[#c7d2fe] transition-colors duration-150 hover:bg-[#334155] dark:border-[rgba(34,211,238,.18)] dark:bg-[rgba(34,211,238,.08)] dark:text-[#7dd3fc]"
          : "flex items-center gap-[5px] rounded-lg bg-[#f1f5f9] px-[9px] py-1 font-mono text-[10px] font-normal text-[#334155] transition-colors duration-150 hover:bg-[#e2e8f0] dark:bg-[rgba(255,255,255,.05)] dark:text-[#8da2c0] dark:hover:bg-[rgba(255,255,255,.09)]"
      }
    >
      {isDark ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={t.ib} alt="" className="h-3 w-3" />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={t.ia} alt="" className="h-3 w-3 dark:hidden" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={t.ib} alt="" className="hidden h-3 w-3 dark:block" />
        </>
      )}
      {t.l}
    </button>
  );
}

export function Toolbelt({
  active,
  onSelect,
  waveDelay = 0.06,
  wave = true,
}: {
  active?: string;
  onSelect: (label: string) => void;
  /** base delay for the per-icon entrance wave */
  waveDelay?: number;
  /** false renders the icons statically — no entrance wave */
  wave?: boolean;
}) {
  const skip = useSkipEntrance();
  return (
    <div className="col-span-4 flex flex-col gap-3 rounded-[18px] border border-[#e2e8f0] bg-[#f8fafc] p-[16px_18px] max-[1024px]:col-span-2 max-[640px]:col-span-1 dark:border-[rgba(255,255,255,.08)] dark:bg-[rgba(255,255,255,.03)] dark:backdrop-blur-[8px]">
      <SectionLabel>TECHSTACK</SectionLabel>
      <div className="flex justify-between gap-1 max-[1024px]:flex-wrap">
        {toolbelt.map((t, i) => {
          const isActive = t.l === active;
          return (
            <motion.div
              key={t.l}
              initial={skip || !wave ? false : { opacity: 0, y: 12, scale: 0.7 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { ...springPop, delay: waveDelay + i * 0.022 },
              }}
            >
              <button
                type="button"
                onClick={() => onSelect(t.l)}
                aria-pressed={isActive}
                className={`relative flex w-[70px] flex-col items-center gap-1.5 rounded-xl p-[8px_2px] transition-all duration-200 hover:-translate-y-[3px] hover:bg-white hover:shadow-[0_6px_16px_rgba(20,40,90,.1)] dark:hover:bg-[rgba(34,211,238,.08)] dark:hover:shadow-none ${
                  isActive ? "-translate-y-[3px]" : ""
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="toolbelt-active"
                    transition={layoutSnap}
                    style={{ borderRadius: 12 }}
                    className="absolute inset-0 bg-white shadow-[0_6px_16px_rgba(20,40,90,.1)] ring-1 ring-[#7c3aed] dark:bg-[rgba(34,211,238,.08)] dark:shadow-none dark:ring-[rgba(34,211,238,.5)]"
                  />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.ia} alt={t.l} className="relative h-[30px] w-[30px] object-contain dark:hidden" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.ib} alt={t.l} className="relative hidden h-[30px] w-[30px] object-contain dark:block" />
                <span className="font-mono relative whitespace-nowrap text-center text-[9px] font-medium text-[#475569] dark:text-[#7286ac]">
                  {t.l}
                </span>
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
