"use client";

import { motion } from "motion/react";
import ProjectsGrid from "@/components/ProjectsGrid";
import { Reveal, SlideIn, TechChip, Toolbelt, labelClass, layoutSnap } from "@/components/view-parts";
import type { View } from "@/components/view-types";
import { jobs } from "@/data/content";

export default function HomeView({ push }: { push: (v: View) => void }) {
  return (
    <>
      <div className="col-span-4 max-[1024px]:col-span-2 max-[640px]:col-span-1">
        <Toolbelt onSelect={(tech) => push({ kind: "tech", tech })} waveDelay={0.04} />
      </div>

      <div className="col-span-4 max-[1024px]:col-span-2 max-[640px]:col-span-1">
        <ProjectsGrid onSelect={(name) => push({ kind: "project", name })} baseDelay={0.16} />
      </div>

      <Reveal
        delay={0.42}
        className="col-span-4 max-[1024px]:col-span-2 max-[640px]:col-span-1"
      >
        <div
          onClick={() => push({ kind: "personal" })}
          className="group flex cursor-pointer items-center justify-between gap-4 rounded-[18px] border border-[#e2e8f0] bg-[#f8fafc] p-[14px_20px] shadow-[0_3px_12px_rgba(20,40,90,.06)] transition-all duration-200 hover:-translate-y-[2px] hover:border-[#7c3aed] dark:border-[rgba(255,255,255,.09)] dark:bg-[rgba(255,255,255,.04)] dark:shadow-none dark:backdrop-blur-[8px] dark:hover:border-[rgba(34,211,238,.5)]"
        >
          <div className="flex flex-col gap-1">
            <span className={labelClass}>PERSONAL PROJECTS</span>
            <span className="text-[12px] text-[#475569] dark:text-[#8da2c0]">
              Side builds &amp; experiments — see what I hack on after hours
            </span>
          </div>
          <span className="font-sora whitespace-nowrap text-[12.5px] font-semibold text-[#4f46e5] transition-transform duration-200 group-hover:translate-x-1 dark:text-[#22d3ee]">
            View all →
          </span>
        </div>
      </Reveal>

      {jobs.map((j, i) => (
        <SlideIn
          key={j.company}
          from={i % 2 === 0 ? "left" : "right"}
          delay={0.46 + Math.floor(i / 2) * 0.1}
          className="col-span-2 max-[640px]:col-span-1"
        >
        <div
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("button")) return;
            push({ kind: "company", name: j.company });
          }}
          className="flex h-full cursor-pointer flex-col gap-[7px] rounded-[18px] border border-[#e2e8f0] bg-white p-[16px_20px] shadow-[0_3px_12px_rgba(20,40,90,.06)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-[#7c3aed] dark:border-[rgba(255,255,255,.09)] dark:bg-[rgba(255,255,255,.04)] dark:shadow-none dark:backdrop-blur-[8px] dark:hover:border-[rgba(34,211,238,.5)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,.12)]"
        >
          <div className="flex items-baseline justify-between gap-2.5">
            <div className="flex items-baseline gap-1.5">
              <motion.button
                type="button"
                layoutId={`company-${j.company}`}
                transition={layoutSnap}
                onClick={() => push({ kind: "company", name: j.company })}
                className="font-sora bg-transparent p-0 text-[14.5px] font-bold text-[#0f172a] transition-colors duration-150 hover:text-[#4f46e5] hover:underline dark:text-[#f1f5fb]"
              >
                {j.company}
              </motion.button>
              <span className="font-sora text-[14.5px] font-bold text-[#4f46e5] dark:text-[#22d3ee]">
                · {j.role}
              </span>
            </div>
            <div className="font-mono whitespace-nowrap text-[10.5px] font-medium text-[#94a3b8] dark:text-[#5a6b8c]">
              {j.period}
            </div>
          </div>
          <div className="text-[11px] italic text-[#64748b] dark:text-[#5a6b8c]">{j.blurb}</div>
          <ul className="m-0 flex list-disc flex-col gap-[3px] pl-4 text-[12px] leading-[1.55] text-[#475569] dark:text-[#8da2c0]">
            {j.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-1.5 border-t border-[#f1f5f9] pt-2 dark:border-[rgba(255,255,255,.07)]">
            {j.tech.map((t) => (
              <TechChip key={t.l} t={t} onClick={() => push({ kind: "tech", tech: t.l })} />
            ))}
          </div>
        </div>
        </SlideIn>
      ))}
    </>
  );
}
