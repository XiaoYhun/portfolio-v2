"use client";

import { Hero, NewInfo } from "@/components/Morph";
import { ProjectIdentity, projectSurface } from "@/components/identities";
import { BackBar, SectionLabel, TechChip } from "@/components/view-parts";
import type { View } from "@/components/view-types";
import { personalProjects, projects } from "@/data/content";

export default function ProjectView({
  name,
  push,
  back,
}: {
  name: string;
  push: (v: View, morphId?: string) => void;
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
        <div className="col-span-4 text-[12px] text-[#64748b] max-[1024px]:col-span-2 max-[640px]:col-span-1 dark:text-[#7286ac]">
          That project could not be found.
        </div>
      </>
    );
  }

  return (
    <>
      <BackBar onBack={back}>
        <SectionLabel>PROJECT</SectionLabel>
      </BackBar>

      {/* The card, grown. The identity block up top is exactly what the card
          showed and simply remains; everything below is new and fades in. */}
      <Hero
        id={`proj-card-${p.name}`}
        style={{ borderRadius: 18 }}
        className={`col-span-4 flex flex-col gap-[7px] max-[1024px]:col-span-2 max-[640px]:col-span-1 ${projectSurface}`}
      >
        {/* The screenshot is part of the identity now, so it arrives by growing
            with the card rather than fading in underneath it. */}
        <ProjectIdentity p={p} priority />

        <NewInfo delay={0.22} className="text-[13px] leading-[1.6] text-[#475569] dark:text-[#8da2c0]">
          {p.detail}
        </NewInfo>

        <NewInfo delay={0.3} className="flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <TechChip key={t.l} t={t} onClick={() => push({ kind: "tech", tech: t.l })} />
          ))}
        </NewInfo>

        {company && (
          <NewInfo delay={0.38}>
            <button
              type="button"
              onClick={() => push({ kind: "company", name: company })}
              className="w-fit bg-transparent p-0 text-[12px] font-semibold text-[#4f46e5] hover:underline dark:text-[#22d3ee]"
            >
              Built at {company} →
            </button>
          </NewInfo>
        )}
      </Hero>
    </>
  );
}
