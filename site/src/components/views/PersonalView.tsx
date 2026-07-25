"use client";

import { Hero, NewInfo } from "@/components/Morph";
import { PersonalIdentity, ProjectCard, personalSurface } from "@/components/identities";
import { BackBar, SectionLabel } from "@/components/view-parts";
import type { View } from "@/components/view-types";
import { personalProjects, projects } from "@/data/content";

/** The CV files the three showcase projects under "Personal project" — show them here too. */
const allPersonal = [...projects, ...personalProjects];

export default function PersonalView({
  push,
  back,
}: {
  push: (v: View, morphId?: string) => void;
  back: () => void;
}) {
  return (
    <>
      <BackBar onBack={back}>
        <SectionLabel>PERSONAL</SectionLabel>
      </BackBar>

      {/* The personal-projects row, grown. The row identity remains; the grid
          of builds below is new and fades in. */}
      <Hero
        id="personal-row"
        style={{ borderRadius: 18 }}
        className={`col-span-4 flex flex-col gap-[7px] max-[1024px]:col-span-2 max-[640px]:col-span-1 ${personalSurface}`}
      >
        <PersonalIdentity />

        <NewInfo delay={0.15} className="mt-2 grid grid-cols-3 gap-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
          {allPersonal.map((p, i) => (
            <ProjectCard
              key={p.name}
              p={p}
              delay={0.2 + i * 0.07}
              onClick={() => push({ kind: "project", name: p.name }, `proj-card-${p.name}`)}
            />
          ))}
          <div className="flex h-full flex-col justify-center gap-2 rounded-[18px] bg-[#0f172a] p-[16px_18px] text-white dark:border dark:border-[rgba(255,255,255,.09)] dark:bg-[rgba(255,255,255,.04)] dark:backdrop-blur-[8px]">
            <span className="font-sora text-[14px] font-bold">More experiments on GitHub</span>
            <a
              href="https://github.com/XiaoYhun"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 self-start whitespace-nowrap rounded-full border border-[rgba(165,180,252,.4)] bg-[rgba(255,255,255,.08)] px-2.5 py-[3px] text-[12px] font-bold text-[#a5b4fc] no-underline transition-all duration-200 hover:-translate-y-[1px] hover:border-transparent hover:bg-[linear-gradient(135deg,#2563eb,#7c3aed)] hover:text-white hover:no-underline hover:shadow-[0_6px_16px_rgba(124,58,237,.35)] dark:border-[rgba(34,211,238,.35)] dark:bg-[rgba(34,211,238,.08)] dark:text-[#22d3ee] dark:hover:bg-none dark:hover:bg-[#22d3ee] dark:hover:text-[#04070f]"
            >
              github.com/XiaoYhun ↗
            </a>
          </div>
        </NewInfo>
      </Hero>
    </>
  );
}
