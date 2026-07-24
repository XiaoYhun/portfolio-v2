"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { layoutSnap, linkPillClass } from "@/components/view-parts";
import { projects } from "@/data/content";

const spring = { type: "spring", stiffness: 380, damping: 28 } as const;
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const, delay } },
});

export default function ProjectsGrid({
  onSelect,
  baseDelay = 0,
}: {
  onSelect: (name: string) => void;
  baseDelay?: number;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="col-span-4 grid grid-cols-3 gap-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
      {projects.map((p, i) => {
        const isOpen = hovered === p.name;
        return (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { ...spring, delay: baseDelay + i * 0.08 },
            }}
          >
          <motion.div
            layoutId={`proj-card-${p.name}`}
            transition={layoutSnap}
            style={{ borderRadius: 18 }}
            onMouseEnter={() => setHovered(p.name)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect(p.name)}
            className="group relative flex h-full cursor-pointer flex-col gap-[7px] rounded-[18px] border border-[#e2e8f0] bg-white p-[16px_18px] shadow-[0_3px_12px_rgba(20,40,90,.06)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-[#7c3aed] hover:shadow-[0_14px_32px_rgba(124,58,237,.16)] dark:border-[rgba(255,255,255,.09)] dark:bg-[rgba(255,255,255,.04)] dark:shadow-none dark:backdrop-blur-[8px] dark:hover:border-[rgba(34,211,238,.5)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,.12)]"
          >
            {/* warm the screenshot cache so the popover never opens blank */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.screenshot} alt="" aria-hidden className="hidden" />

            <div className="flex items-baseline justify-between gap-2">
              <motion.div
                layoutId={`proj-name-${p.name}`}
                transition={layoutSnap}
                className="font-sora text-[14.5px] font-bold text-[#0f172a] dark:text-[#f1f5fb]"
              >
                {p.name}
              </motion.div>
              <motion.span
                layoutId={`proj-tag-${p.name}`}
                transition={layoutSnap}
                style={{ borderRadius: 999 }}
                className="whitespace-nowrap rounded-full border border-transparent bg-[linear-gradient(135deg,#eff6ff,#f5f3ff)] px-2 py-[3px] text-[10px] font-bold text-[#4f46e5] dark:border-[rgba(34,211,238,.25)] dark:bg-none dark:bg-[rgba(34,211,238,.1)] dark:text-[#22d3ee]">
                {p.tag}
              </motion.span>
            </div>
            <div className="text-[11.5px] leading-[1.5] text-[#475569] dark:text-[#8da2c0]">{p.desc}</div>
            <div className="mt-auto flex items-center gap-2 pt-1">
              {p.tech.map((t) => (
                <span key={t.l}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.ia}
                    alt={t.l}
                    title={t.l}
                    className="h-4 w-4 object-contain dark:hidden"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.ib}
                    alt={t.l}
                    title={t.l}
                    className="hidden h-4 w-4 object-contain opacity-80 dark:block"
                  />
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

            {/* Hover popover */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  className="pointer-events-none absolute bottom-[calc(100%+14px)] left-1/2 z-40 w-[420px] max-w-[90vw] max-[640px]:hidden"
                  style={{ x: "-50%", transformOrigin: "50% 100%" }}
                  initial={{ opacity: 0, y: 18, scale: 0.92, rotateX: 10, transformPerspective: 900 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0,
                    transformPerspective: 900,
                    transition: spring,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.96,
                    transition: { duration: 0.16, ease: "easeIn" },
                  }}
                >
                  <div className="rounded-[20px] bg-[linear-gradient(135deg,#2563eb,#7c3aed)] p-[2px] shadow-[0_30px_70px_rgba(50,30,150,.38),0_12px_28px_rgba(37,99,235,.28),0_2px_8px_rgba(124,58,237,.25)] dark:border dark:border-[rgba(34,211,238,.35)] dark:bg-none dark:bg-[rgba(10,16,30,.92)] dark:p-0 dark:shadow-[0_30px_70px_rgba(0,5,20,.6),0_0_40px_rgba(34,211,238,.12)] dark:backdrop-blur-[14px]">
                    <div className="rounded-[18px] bg-[#0f172a] p-3 dark:bg-transparent">
                      <div className="relative h-[214px] w-full overflow-hidden rounded-xl bg-[#1e293b]">
                        <motion.img
                          src={p.screenshot}
                          alt={p.name}
                          className="h-full w-full object-cover"
                          initial={{ scale: 1.12 }}
                          animate={{
                            scale: 1,
                            transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                          }}
                        />
                        <div
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-14"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(15,23,42,.55), transparent)",
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-[7px] p-[12px_6px_4px]">
                        <motion.div
                          className="flex items-baseline justify-between"
                          {...fadeUp(0.08)}
                        >
                          <span className="font-sora text-[14px] font-bold text-white">
                            {p.name}
                          </span>
                          <span className="font-mono text-[10px] font-medium text-[#a5b4fc] dark:text-[#22d3ee]">
                            {p.link}
                          </span>
                        </motion.div>
                        <motion.div
                          className="text-[11px] leading-[1.55] text-[#94a3b8] dark:text-[#8da2c0]"
                          {...fadeUp(0.14)}
                        >
                          {p.detail}
                        </motion.div>
                        <motion.div className="flex flex-wrap gap-1.5" {...fadeUp(0.2)}>
                          {p.tech.map((t) => (
                            <span
                              key={t.l}
                              className="flex items-center gap-[5px] rounded-lg border border-transparent bg-[#1e293b] px-[9px] py-1 font-mono text-[10px] font-normal text-[#c7d2fe] dark:border-[rgba(34,211,238,.18)] dark:bg-[rgba(34,211,238,.08)] dark:text-[#7dd3fc]"
                            >
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={t.ib} alt="" className="h-3 w-3" />
                              {t.l}
                            </span>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-1/2 top-full -translate-x-1/2 border-[9px] border-transparent border-t-[#5b34d6] dark:border-t-[rgba(34,211,238,.35)]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
