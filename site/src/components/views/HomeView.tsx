"use client";

import ProjectsMarquee from "@/components/ProjectsMarquee";
import { Hero } from "@/components/Morph";
import { CompanyIdentity, PersonalIdentity, companySurface, personalSurface } from "@/components/identities";
import { Reveal, SlideIn, Toolbelt } from "@/components/view-parts";
import type { View } from "@/components/view-types";
import { jobs } from "@/data/content";

export default function HomeView({ push }: { push: (v: View, morphId?: string) => void }) {
  return (
    <>
      <div className="col-span-4 max-[1024px]:col-span-2 max-[640px]:col-span-1">
        <Toolbelt onSelect={(tech) => push({ kind: "tech", tech })} waveDelay={0.04} />
      </div>

      {jobs.map((j, i) => (
        <SlideIn
          key={j.company}
          from={i % 2 === 0 ? "left" : "right"}
          delay={0.16 + Math.floor(i / 2) * 0.1}
          className="col-span-2 max-[640px]:col-span-1"
        >
          <Hero
            id={`company-card-${j.company}`}
            style={{ borderRadius: 18 }}
            onClick={(e) => {
              if ((e.target as HTMLElement).closest("button")) return;
              push({ kind: "company", name: j.company }, `company-card-${j.company}`);
            }}
            className={`flex h-full cursor-pointer flex-col gap-[7px] ${companySurface} transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-[#7c3aed] dark:hover:border-[rgba(34,211,238,.5)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,.12)]`}
          >
            <CompanyIdentity job={j} push={push} morphId={`company-card-${j.company}`} />
          </Hero>
        </SlideIn>
      ))}

      <div className="col-span-4 max-[1024px]:col-span-2 max-[640px]:col-span-1">
        <ProjectsMarquee onSelect={(name) => push({ kind: "project", name }, `proj-card-${name}`)} baseDelay={0.4} />
      </div>

      <Reveal delay={0.62} className="col-span-4 max-[1024px]:col-span-2 max-[640px]:col-span-1">
        <Hero
          id="personal-row"
          style={{ borderRadius: 18 }}
          onClick={() => push({ kind: "personal" }, "personal-row")}
          className={`group cursor-pointer ${personalSurface} transition-all duration-200 hover:-translate-y-[2px] hover:border-[#7c3aed] dark:hover:border-[rgba(34,211,238,.5)]`}
        >
          <PersonalIdentity />
        </Hero>
      </Reveal>
    </>
  );
}
