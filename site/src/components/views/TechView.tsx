"use client";

import { motion } from "motion/react";
import { BackBar, ProjectCard, Reveal, SectionLabel, SlideIn, Toolbelt, labelClass, layoutSnap } from "@/components/view-parts";
import type { View } from "@/components/view-types";
import { jobs, personalProjects, projects, techIcon } from "@/data/content";

export default function TechView({
  tech,
  push,
  replace,
  back,
}: {
  tech: string;
  push: (v: View) => void;
  replace: (v: View) => void;
  back: () => void;
}) {
  const icon = techIcon(tech);
  const matchingProjects = [...projects, ...personalProjects].filter((p) =>
    p.tech.some((t) => t.l === tech)
  );
  const matchingJobs = jobs.filter((j) => j.tech.some((t) => t.l === tech));

  return (
    <>
      <BackBar onBack={back}>
        <div className="flex items-center gap-2">
          {icon && (
            <span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon.ia} alt="" className="h-[22px] w-[22px] object-contain dark:hidden" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={icon.ib} alt="" className="hidden h-[22px] w-[22px] object-contain dark:block" />
            </span>
          )}
          <div className="flex flex-col gap-0.5">
            <span className={labelClass}>TECH</span>
            <span className="font-sora text-[16px] font-bold leading-none text-[#0f172a] dark:text-[#f1f5fb]">
              Projects using {tech}
            </span>
          </div>
        </div>
      </BackBar>

      <div className="col-span-4 max-[1024px]:col-span-2 max-[640px]:col-span-1">
        <Toolbelt active={tech} onSelect={(l) => replace({ kind: "tech", tech: l })} waveDelay={0.05} />
      </div>

      {matchingProjects.length > 0 && (
        <div className="col-span-4 flex flex-col gap-3 max-[1024px]:col-span-2 max-[640px]:col-span-1">
          <Reveal delay={0.14}>
            <SectionLabel>PROJECTS</SectionLabel>
          </Reveal>
          <div className="grid grid-cols-3 gap-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
            {matchingProjects.map((p, i) => (
              <ProjectCard
                key={p.name}
                p={p}
                delay={0.18 + i * 0.07}
                onClick={() => push({ kind: "project", name: p.name })}
              />
            ))}
          </div>
        </div>
      )}

      {matchingJobs.length > 0 ? (
        <div className="col-span-4 flex flex-col gap-3 max-[1024px]:col-span-2 max-[640px]:col-span-1">
          <Reveal delay={0.28}>
            <SectionLabel>USED AT</SectionLabel>
          </Reveal>
          <div className="flex flex-col gap-2">
            {matchingJobs.map((j, i) => (
              <SlideIn
                key={j.company}
                from="left"
                delay={0.32 + i * 0.07}
                className="flex items-center justify-between gap-3 rounded-[13px] border border-[#e2e8f0] bg-white p-[10px_14px] dark:border-[rgba(255,255,255,.09)] dark:bg-[rgba(255,255,255,.04)] dark:backdrop-blur-[8px]"
              >
                <div className="flex items-baseline gap-1.5">
                  <motion.button
                    type="button"
                    layoutId={`company-${j.company}`}
                    transition={layoutSnap}
                    onClick={() => push({ kind: "company", name: j.company })}
                    className="font-sora bg-transparent p-0 text-[13px] font-bold text-[#0f172a] transition-colors duration-150 hover:text-[#4f46e5] hover:underline dark:text-[#f1f5fb]"
                  >
                    {j.company}
                  </motion.button>
                  <span className="text-[11.5px] font-semibold text-[#4f46e5] dark:text-[#22d3ee]">
                    · {j.role}
                  </span>
                </div>
                <span className="font-mono whitespace-nowrap text-[10.5px] font-medium text-[#94a3b8] dark:text-[#5a6b8c]">
                  {j.period}
                </span>
              </SlideIn>
            ))}
          </div>
        </div>
      ) : matchingProjects.length === 0 ? (
        <div className="col-span-4 text-[12px] text-[#64748b] max-[1024px]:col-span-2 max-[640px]:col-span-1 dark:text-[#5a6b8c]">
          No projects or roles use {tech} yet.
        </div>
      ) : null}
    </>
  );
}
