"use client";

/**
 * Shared "identity" blocks — the content a card shows on the outside, rendered
 * by the exact same component at the top of the matching detail view. Because
 * both sides render identical markup at the same layout, the container-transform
 * morph lands the carried card straight onto the detail's identity with nothing
 * to crossfade: it simply "remains". Everything a detail view adds below the
 * identity is genuinely new and fades in.
 */

import { Hero } from "@/components/Morph";
import type { Job, Project } from "@/data/content";
import type { View } from "@/components/view-types";
import { PopIn, TechChip, labelClass, linkPillClass } from "@/components/view-parts";

/** Card surfaces — reused verbatim by each detail view's hero so the morph aligns. */
export const projectSurface =
  "rounded-[18px] border border-[#e2e8f0] bg-white p-[16px_18px] shadow-[0_3px_12px_rgba(20,40,90,.06)] dark:border-[rgba(255,255,255,.09)] dark:bg-[rgba(255,255,255,.04)] dark:shadow-none dark:backdrop-blur-[8px]";
export const companySurface =
  "rounded-[18px] border border-[#e2e8f0] bg-white p-[16px_20px] shadow-[0_3px_12px_rgba(20,40,90,.06)] dark:border-[rgba(255,255,255,.09)] dark:bg-[rgba(255,255,255,.04)] dark:shadow-none dark:backdrop-blur-[8px]";
export const personalSurface =
  "rounded-[18px] border border-[#e2e8f0] bg-[#f8fafc] p-[14px_20px] shadow-[0_3px_12px_rgba(20,40,90,.06)] dark:border-[rgba(255,255,255,.09)] dark:bg-[rgba(255,255,255,.04)] dark:shadow-none dark:backdrop-blur-[8px]";

/** Project card identity: name + tag, description, tech icons + site link. */
export function ProjectIdentity({ p }: { p: Project }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <div className="font-sora text-[14.5px] font-bold text-[#0f172a] dark:text-[#f1f5fb]">{p.name}</div>
        <span className="whitespace-nowrap rounded-full border border-transparent bg-[linear-gradient(135deg,#eff6ff,#f5f3ff)] px-2 py-[3px] text-[10px] font-bold text-[#4f46e5] dark:border-[rgba(34,211,238,.25)] dark:bg-none dark:bg-[rgba(34,211,238,.1)] dark:text-[#22d3ee]">
          {p.tag}
        </span>
      </div>
      <div className="text-[11.5px] leading-[1.5] text-[#475569] dark:text-[#8da2c0]">{p.desc}</div>
      <div className="flex items-center gap-2 pt-1">
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
    </>
  );
}

/** A project card — its content is the ProjectIdentity, so it morphs cleanly into ProjectView. */
export function ProjectCard({
  p,
  onClick,
  delay = 0,
  morph = true,
}: {
  p: Project;
  onClick: () => void;
  delay?: number;
  /** false renders a plain card (no morph id) — for lists (e.g. TechView) where the morph looks wrong */
  morph?: boolean;
}) {
  const cardClass = `flex h-full cursor-pointer flex-col gap-[7px] ${projectSurface} transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-[#7c3aed] dark:hover:border-[rgba(34,211,238,.5)] dark:hover:shadow-[0_0_30px_rgba(34,211,238,.12)]`;
  return (
    <PopIn delay={delay}>
      {morph ? (
        <Hero id={`proj-card-${p.name}`} style={{ borderRadius: 18 }} onClick={onClick} className={cardClass}>
          <ProjectIdentity p={p} />
        </Hero>
      ) : (
        <div onClick={onClick} className={cardClass}>
          <ProjectIdentity p={p} />
        </div>
      )}
    </PopIn>
  );
}

/** Company (experience) card identity: company · role, period, blurb, bullets, tech + link. */
export function CompanyIdentity({
  job,
  push,
  morphId,
}: {
  job: Job;
  push: (v: View, morphId?: string) => void;
  /** Hero id of the card wrapping this identity, so the company-name button
      morphs exactly like a click on the card body. Omitted in detail views. */
  morphId?: string;
}) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-2.5">
        <div className="flex items-baseline gap-1.5">
          <button
            type="button"
            onClick={() => push({ kind: "company", name: job.company }, morphId)}
            className="font-sora bg-transparent p-0 text-[14.5px] font-bold text-[#0f172a] transition-colors duration-150 hover:text-[#4f46e5] hover:underline dark:text-[#f1f5fb]"
          >
            {job.company}
          </button>
          <span className="font-sora text-[14.5px] font-bold text-[#4f46e5] dark:text-[#22d3ee]">· {job.role}</span>
        </div>
        <div className="font-mono whitespace-nowrap text-[10.5px] font-medium text-[#94a3b8] dark:text-[#5a6b8c]">
          {job.period}
        </div>
      </div>
      <div className="text-[11px] italic text-[#64748b] dark:text-[#5a6b8c]">{job.blurb}</div>
      <ul className="m-0 flex list-disc flex-col gap-[3px] pl-4 text-[12px] leading-[1.55] text-[#475569] dark:text-[#8da2c0]">
        {job.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-1.5 border-t border-[#f1f5f9] pt-2 dark:border-[rgba(255,255,255,.07)]">
        {job.tech.map((t) => (
          <TechChip key={t.l} t={t} onClick={() => push({ kind: "tech", tech: t.l })} />
        ))}
        <a
          href={job.url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`ml-auto ${linkPillClass}`}
        >
          {job.link} ↗
        </a>
      </div>
    </>
  );
}

/** Personal-projects row identity: label, one-liner, and the "View all" cue. */
export function PersonalIdentity() {
  return (
    <div className="flex items-center justify-between gap-4">
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
  );
}
