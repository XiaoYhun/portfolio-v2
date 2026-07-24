"use client";

import { motion } from "motion/react";
import { BackBar, Reveal, TechChip, layoutSnap, linkPillClass } from "@/components/view-parts";
import type { View } from "@/components/view-types";
import { personalProjects, projects } from "@/data/content";

export default function ProjectView({
  name,
  push,
  back,
}: {
  name: string;
  push: (v: View) => void;
  back: () => void;
}) {
  const p = [...projects, ...personalProjects].find((proj) => proj.name === name);
  const company = p?.company;

  if (!p) {
    return (
      <>
        <BackBar onBack={back}>
          <span className="font-sora text-[16px] font-bold text-[#0f172a] dark:text-[#f1f5fb]">Not found</span>
        </BackBar>
        <div className="col-span-4 text-[12px] text-[#64748b] max-[1024px]:col-span-2 max-[640px]:col-span-1 dark:text-[#5a6b8c]">
          That project could not be found.
        </div>
      </>
    );
  }

  return (
    <>
      <BackBar onBack={back}>
        <motion.span
          layoutId={`proj-tag-${p.name}`}
          transition={layoutSnap}
          style={{ borderRadius: 999 }}
          className="whitespace-nowrap rounded-full border border-transparent bg-[linear-gradient(135deg,#eff6ff,#f5f3ff)] px-2.5 py-1 text-[10.5px] font-bold text-[#4f46e5] dark:border-[rgba(34,211,238,.25)] dark:bg-none dark:bg-[rgba(34,211,238,.1)] dark:text-[#22d3ee]">
          {p.tag}
        </motion.span>
      </BackBar>

      {/* shared element — morphs out of the clicked project card */}
      <motion.div
        layoutId={`proj-card-${p.name}`}
        transition={layoutSnap}
        style={{ borderRadius: 18 }}
        className="col-span-4 overflow-hidden rounded-[18px] border border-[#e2e8f0] bg-[#1e293b] max-[1024px]:col-span-2 max-[640px]:col-span-1 dark:border-[rgba(255,255,255,.09)]"
      >
        <div style={{ aspectRatio: "1200/630" }} className="relative w-full overflow-hidden">
          <motion.img
            src={p.screenshot}
            alt={p.name}
            className="h-full w-full object-cover"
            initial={{ scale: 1.08, filter: "blur(14px)" }}
            animate={{
              scale: 1,
              filter: "blur(0px)",
              transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
            }}
            style={{ boxShadow: "0 20px 50px rgba(20,40,90,.18)" }}
          />
        </div>
      </motion.div>

      <div className="col-span-4 flex flex-col gap-3 max-[1024px]:col-span-2 max-[640px]:col-span-1">
        <Reveal delay={0.2} className="flex flex-wrap items-baseline justify-between gap-2">
          <motion.div
            layoutId={`proj-name-${p.name}`}
            transition={layoutSnap}
            className="font-sora text-[24px] font-extrabold text-[#0f172a] dark:text-[#f1f5fb]">
            {p.name}
          </motion.div>
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            className={`${linkPillClass} !text-[12px]`}
          >
            {p.link} ↗
          </a>
        </Reveal>
        <Reveal delay={0.26} className="text-[13px] leading-[1.6] text-[#475569] dark:text-[#8da2c0]">
          {p.desc}
        </Reveal>
        <Reveal delay={0.32} className="text-[13px] leading-[1.6] text-[#475569] dark:text-[#8da2c0]">
          {p.detail}
        </Reveal>
        <Reveal delay={0.38} className="flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <TechChip
              key={t.l}
              t={t}
              variant="dark"
              onClick={() => push({ kind: "tech", tech: t.l })}
            />
          ))}
        </Reveal>
        {company && (
          <Reveal delay={0.44}>
            <button
              type="button"
              onClick={() => push({ kind: "company", name: company })}
              className="w-fit bg-transparent p-0 text-[12px] font-semibold text-[#4f46e5] hover:underline dark:text-[#22d3ee]"
            >
              Built at {company} →
            </button>
          </Reveal>
        )}
      </div>
    </>
  );
}
