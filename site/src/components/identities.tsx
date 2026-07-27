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

/** Shared by the card's title button and the detail view's plain title, so the morph has nothing to reflow. */
const projectTitleClass = "font-sora text-left text-[14.5px] font-bold text-[#0f172a] dark:text-[#f1f5fb]";

/**
 * Project card identity: name + tag, description, tech icons + site link.
 *
 * `onOpen` makes the project's name a real button. The card around it is a
 * plain div — it has a link inside it, so it cannot itself be a control — which
 * left the whole project list unreachable by keyboard. The title carries the
 * action instead, exactly as the company name does in CompanyIdentity.
 */
export function ProjectIdentity({
  p,
  onOpen,
  priority = false,
}: {
  p: Project;
  onOpen?: () => void;
  /** true where the shot is the hero of the view rather than one thumbnail in a list */
  priority?: boolean;
}) {
  return (
    <>
      {p.screenshot && (
        // Full-bleed: the negative margins cancel the surface's own padding, so
        // the shot meets the card's edges and the rounding is picked up here
        // rather than by clipping the whole card (which the morph also does,
        // mid-flight, and would fight over).
        //
        // This lives in the identity, not in the detail view, on purpose. The
        // identity is the part both states render, so the shot is one element
        // that grows from thumbnail to hero as the card opens — the same
        // container transform the text gets. A second image in the detail view
        // would have to cross-fade against this one.
        <div className="-mx-[18px] -mt-[16px] mb-1.5 overflow-hidden rounded-t-[17px] border-b border-[#e2e8f0] dark:border-[rgba(255,255,255,.09)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.screenshot}
            alt={`${p.name} interface`}
            width={1200}
            height={630}
            // Never lazy. The projects row travels on its own, so a card can
            // arrive on screen without the reader having scrolled anything —
            // and it would arrive holding an empty grey box. The whole set is
            // ~340KB of WebP, so it is fetched up front at low priority instead,
            // out of the way of the type and the avatar.
            loading="eager"
            fetchPriority={priority ? "high" : "low"}
            decoding="async"
            // object-top: these are page screenshots, and the header and hero
            // are what make one recognisable at card size.
            //
            // max-h caps the letterbox once the card has grown to full width.
            // At the card's own width the shot keeps its 1200/630 proportion; at
            // the detail's it would otherwise stand 600px tall and push the
            // project's name, blurb and stack off the bottom of the screen. The
            // cap crops from the top, which is the part worth showing.
            className="aspect-[1200/630] max-h-[360px] w-full bg-[#f1f5f9] object-cover object-top dark:bg-[rgba(255,255,255,.04)]"
          />
        </div>
      )}
      <div className="flex items-baseline justify-between gap-2">
        <h3 className={projectTitleClass}>
          {onOpen ? (
            <button
              type="button"
              // The card around this is clickable too; without stopping here the
              // same navigation would be pushed twice and Back would need two
              // presses. Same reason the site links below stop propagation.
              onClick={(e) => {
                e.stopPropagation();
                onOpen();
              }}
              className={`${projectTitleClass} bg-transparent p-0 transition-colors duration-150 hover:text-[#4f46e5] hover:underline dark:hover:text-[#22d3ee]`}
            >
              {p.name}
            </button>
          ) : (
            p.name
          )}
        </h3>
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
          <ProjectIdentity p={p} onOpen={onClick} />
        </Hero>
      ) : (
        <div onClick={onClick} className={cardClass}>
          <ProjectIdentity p={p} onOpen={onClick} />
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
      {/* One line on a wide card. On a phone the company, the role and the dates
          cannot share a line without the company name breaking mid-word, so the
          dates drop underneath instead of squeezing the title. */}
      <div className="flex items-baseline justify-between gap-2.5 max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-1">
        <h3 className="flex items-baseline gap-1.5">
          <button
            type="button"
            onClick={() => push({ kind: "company", name: job.company }, morphId)}
            className="font-sora bg-transparent p-0 text-left text-[14.5px] font-bold text-[#0f172a] transition-colors duration-150 hover:text-[#4f46e5] hover:underline dark:text-[#f1f5fb]"
          >
            {job.company}
          </button>
          <span className="font-sora text-[14.5px] font-bold text-[#4f46e5] dark:text-[#22d3ee]">· {job.role}</span>
        </h3>
        <div className="font-mono whitespace-nowrap text-[10.5px] font-medium text-[#64748b] dark:text-[#7286ac]">
          {job.period}
        </div>
      </div>
      <div className="text-[11px] italic text-[#64748b] dark:text-[#7286ac]">{job.blurb}</div>
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

/**
 * Personal-projects row identity: label, one-liner, and the "View all" cue.
 *
 * `onOpen` makes the cue a real button — it was a span, so the row could only
 * be opened with a pointer. Omitted in the detail view, where the cue would be
 * pointing at the page it is already on.
 */
export function PersonalIdentity({ onOpen }: { onOpen?: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h2 className={labelClass}>PERSONAL PROJECTS</h2>
        <span className="text-[12px] text-[#475569] dark:text-[#8da2c0]">
          Side builds &amp; experiments — see what I hack on after hours
        </span>
      </div>
      {onOpen && (
        <button
          type="button"
          // The row itself is clickable; stop here so one press is one navigation.
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          className="font-sora shrink-0 bg-transparent p-0 text-[12.5px] font-semibold whitespace-nowrap text-[#4f46e5] transition-transform duration-200 group-hover:translate-x-1 dark:text-[#22d3ee]"
        >
          View all →
        </button>
      )}
    </div>
  );
}
