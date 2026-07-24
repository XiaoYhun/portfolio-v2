"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import type { TechIcon, Project } from "@/data/content";
import { toolbelt } from "@/data/content";

export const labelClass =
  "font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[#64748b] dark:text-[#22d3ee]";

export const springPop = { type: "spring", stiffness: 340, damping: 26 } as const;

/** Stand-out pill for external website links — tinted pill that fills with the brand gradient on hover. */
export const linkPillClass =
  "inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-[rgba(79,70,229,.3)] bg-[linear-gradient(135deg,#eff6ff,#f5f3ff)] px-2.5 py-[3px] text-[11px] font-bold text-[#4f46e5] no-underline transition-all duration-200 hover:-translate-y-[1px] hover:border-transparent hover:bg-[linear-gradient(135deg,#2563eb,#7c3aed)] hover:text-white hover:no-underline hover:shadow-[0_6px_16px_rgba(124,58,237,.35)] dark:border-[rgba(34,211,238,.35)] dark:bg-none dark:bg-[rgba(34,211,238,.08)] dark:text-[#22d3ee] dark:hover:bg-none dark:hover:bg-[#22d3ee] dark:hover:text-[#04070f] dark:hover:shadow-[0_0_20px_rgba(34,211,238,.35)]";

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
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
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
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: from === "left" ? -24 : 24 }}
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

export function SectionLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`${labelClass} ${className}`}>{children}</div>;
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
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut", delay } }}
    >
      {children}
    </motion.div>
  );
}

export function BackBar({ onBack, children }: { onBack: () => void; children: ReactNode }) {
  return (
    <motion.div
      className="col-span-4 flex items-center gap-3.5 max-[1024px]:col-span-2 max-[640px]:col-span-1"
      initial={{ opacity: 0, x: -16 }}
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

export function ProjectCard({
  p,
  onClick,
  delay = 0,
}: {
  p: Project;
  onClick: () => void;
  delay?: number;
}) {
  return (
    <PopIn delay={delay}>
    <motion.div
      layoutId={`proj-card-${p.name}`}
      transition={layoutSnap}
      style={{ borderRadius: 18 }}
      onClick={onClick}
      className="flex h-full cursor-pointer flex-col gap-[7px] rounded-[18px] border border-[#e2e8f0] bg-white p-[16px_18px] shadow-[0_3px_12px_rgba(20,40,90,.06)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-[#7c3aed] dark:border-[rgba(255,255,255,.09)] dark:bg-[rgba(255,255,255,.04)] dark:shadow-none dark:backdrop-blur-[8px] dark:hover:border-[rgba(34,211,238,.5)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,.12)]"
    >
      <div className="flex items-baseline justify-between gap-2">
        <motion.div layoutId={`proj-name-${p.name}`} transition={layoutSnap} className="font-sora text-[14.5px] font-bold text-[#0f172a] dark:text-[#f1f5fb]">{p.name}</motion.div>
        <motion.span layoutId={`proj-tag-${p.name}`} transition={layoutSnap} style={{ borderRadius: 999 }} className="whitespace-nowrap rounded-full border border-transparent bg-[linear-gradient(135deg,#eff6ff,#f5f3ff)] px-2 py-[3px] text-[10px] font-bold text-[#4f46e5] dark:border-[rgba(34,211,238,.25)] dark:bg-none dark:bg-[rgba(34,211,238,.1)] dark:text-[#22d3ee]">
          {p.tag}
        </motion.span>
      </div>
      <div className="text-[11.5px] leading-[1.5] text-[#475569] dark:text-[#8da2c0]">{p.desc}</div>
      <div className="mt-auto flex items-center gap-2 pt-1">
        {p.tech.map((t) => (
          <span key={t.l}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.ia} alt={t.l} title={t.l} className="h-4 w-4 object-contain dark:hidden" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.ib} alt={t.l} title={t.l} className="hidden h-4 w-4 object-contain opacity-80 dark:block" />
          </span>
        ))}
        <a
          href={p.url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`ml-auto ${linkPillClass}`}
        >
          {p.link} ↗
        </a>
      </div>
    </motion.div>
    </PopIn>
  );
}

export function Toolbelt({
  active,
  onSelect,
  waveDelay = 0.06,
}: {
  active?: string;
  onSelect: (label: string) => void;
  /** base delay for the per-icon entrance wave */
  waveDelay?: number;
}) {
  return (
    <div className="col-span-4 flex flex-col gap-3 rounded-[18px] border border-[#e2e8f0] bg-[#f8fafc] p-[16px_18px] max-[1024px]:col-span-2 max-[640px]:col-span-1 dark:border-[rgba(255,255,255,.08)] dark:bg-[rgba(255,255,255,.03)] dark:backdrop-blur-[8px]">
      <SectionLabel>TOOLBELT</SectionLabel>
      <div className="flex justify-between gap-1 max-[1024px]:flex-wrap">
        {toolbelt.map((t, i) => {
          const isActive = t.l === active;
          return (
            <motion.div
              key={t.l}
              initial={{ opacity: 0, y: 12, scale: 0.7 }}
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
                <span className="font-mono relative whitespace-nowrap text-center text-[9px] font-medium text-[#475569] dark:text-[#5a6b8c]">
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
