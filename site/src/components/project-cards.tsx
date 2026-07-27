"use client";

/**
 * Candidate designs for the project card, for comparison in /card-lab.
 *
 * The hard constraint behind all of them: only three of the eight projects have
 * a screenshot. Anything image-led has to look deliberate — not broken — for the
 * other five, so every visual here falls back to a tag-tinted monogram plate
 * rather than a grey box. Two variants lean on imagery, three do not.
 */

import type { Project } from "@/data/content";

/** Tag-keyed accent. Gives the row some variety without inventing a new palette. */
const ACCENT: Record<string, string> = {
  Fintech: "#10b981",
  Web3: "#8b5cf6",
  Retail: "#f59e0b",
  Personal: "#f43f5e",
};
const accentOf = (tag: string) => ACCENT[tag] ?? "#6366f1";

/** "Fintech Stock Platform" → "FS", "unibot.app" → "UA". */
function monogram(name: string) {
  return name
    .split(/[^A-Za-z0-9]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/** Screenshot when there is one, tinted monogram plate when there is not. */
function Thumb({ p, imgClass = "" }: { p: Project; imgClass?: string }) {
  const a = accentOf(p.tag);
  if (p.screenshot) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={p.screenshot} alt="" className={`h-full w-full object-cover object-top ${imgClass}`} />;
  }
  return (
    <div
      className={`flex h-full w-full items-center justify-center ${imgClass}`}
      style={{ background: `linear-gradient(135deg, ${a}2e, ${a}08 60%, transparent)` }}
    >
      <span className="font-sora text-[30px] font-extrabold tracking-tight" style={{ color: `${a}70` }}>
        {monogram(p.name)}
      </span>
    </div>
  );
}

function TechIcons({ p, size = "h-4 w-4" }: { p: Project; size?: string }) {
  return (
    <>
      {p.tech.map((t) => (
        <span key={t.l} title={t.l}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={t.ia} alt={t.l} className={`${size} object-contain dark:hidden`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={t.ib} alt={t.l} className={`hidden ${size} object-contain opacity-80 dark:block`} />
        </span>
      ))}
    </>
  );
}

const surface =
  "border border-[#e2e8f0] bg-white shadow-[0_3px_12px_rgba(20,40,90,.06)] dark:border-[rgba(255,255,255,.09)] dark:bg-[rgba(255,255,255,.04)] dark:shadow-none dark:backdrop-blur-[8px]";
const title = "font-sora font-bold text-[#0f172a] dark:text-[#f1f5fb]";
const muted = "text-[#475569] dark:text-[#8da2c0]";
const linkPill =
  "inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-[rgba(79,70,229,.3)] bg-[linear-gradient(135deg,#eff6ff,#f5f3ff)] px-2.5 py-[3px] text-[11px] font-bold text-[#4f46e5] dark:border-[rgba(34,211,238,.35)] dark:bg-none dark:bg-[rgba(34,211,238,.08)] dark:text-[#22d3ee]";

/* ------------------------------------------------------------------ A. Preview */
/** Thumbnail on top. The most conventional case-study card — shows the work first. */
export function CardPreview({ p }: { p: Project }) {
  const a = accentOf(p.tag);
  return (
    <article
      className={`group flex h-full w-[320px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-[18px] ${surface} transition-all duration-300 hover:-translate-y-[3px] hover:border-[#7c3aed] hover:shadow-[0_18px_40px_rgba(20,40,90,.14)] dark:hover:border-[rgba(34,211,238,.5)]`}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-[#eef2f7] dark:border-[rgba(255,255,255,.07)]">
        <Thumb p={p} imgClass="transition-transform duration-500 group-hover:scale-[1.06]" />
        <span
          className="absolute right-2.5 top-2.5 rounded-full px-2 py-[3px] text-[10px] font-bold backdrop-blur-md"
          style={{ background: `${a}24`, color: a }}
        >
          {p.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-[13px_15px_15px]">
        <div className={`${title} text-[15px]`}>{p.name}</div>
        <p className={`line-clamp-2 text-[11.5px] leading-[1.5] ${muted}`}>{p.desc}</p>
        <div className="mt-auto flex items-center gap-2 pt-2">
          <TechIcons p={p} />
          <span className={`ml-auto ${linkPill}`}>{p.link} ↗</span>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------- B. Split */
/** Visual rail on the left, content on the right. Reads fast in a horizontal row. */
export function CardSplit({ p }: { p: Project }) {
  const a = accentOf(p.tag);
  return (
    <article
      className={`group flex h-full w-[396px] shrink-0 cursor-pointer overflow-hidden rounded-[16px] ${surface} transition-all duration-300 hover:-translate-y-[3px] hover:border-[#7c3aed] hover:shadow-[0_16px_36px_rgba(20,40,90,.13)] dark:hover:border-[rgba(34,211,238,.5)]`}
    >
      <div className="relative w-[118px] shrink-0 overflow-hidden border-r border-[#eef2f7] dark:border-[rgba(255,255,255,.07)]">
        <Thumb p={p} imgClass="transition-transform duration-500 group-hover:scale-[1.08]" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-1 p-[13px_15px]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[9.5px] font-medium uppercase tracking-[0.12em]" style={{ color: a }}>
            {p.tag}
          </span>
          <span
            className="ml-auto text-[13px] transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: a }}
          >
            ↗
          </span>
        </div>
        <div className={`${title} truncate text-[15px]`}>{p.name}</div>
        <p className={`line-clamp-2 text-[11.5px] leading-[1.5] ${muted}`}>{p.desc}</p>
        <div className="mt-auto flex items-center gap-2 pt-1.5">
          <TechIcons p={p} size="h-[15px] w-[15px]" />
          <span className={`font-mono ml-auto truncate text-[10px] ${muted}`}>{p.link}</span>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------- C. Index */
/** Editorial, no imagery at all — so every project gets the same weight. */
export function CardIndex({ p, i }: { p: Project; i: number }) {
  const a = accentOf(p.tag);
  return (
    <article
      className={`group relative flex h-full w-[300px] shrink-0 cursor-pointer flex-col gap-2 overflow-hidden rounded-[16px] p-[18px_18px_15px] ${surface} transition-all duration-300 hover:-translate-y-[3px] hover:border-[#7c3aed] dark:hover:border-[rgba(34,211,238,.5)]`}
    >
      <span
        className="font-sora pointer-events-none absolute -right-1 -top-3 text-[62px] font-extrabold leading-none transition-colors duration-300"
        style={{ color: `${a}14` }}
      >
        {String(i + 1).padStart(2, "0")}
      </span>
      <span className="font-mono text-[9.5px] font-medium uppercase tracking-[0.14em]" style={{ color: a }}>
        {p.tag}
      </span>
      <div className={`${title} relative text-[19px] leading-[1.15]`}>{p.name}</div>
      <span className="h-px w-8 rounded" style={{ background: a }} />
      <p className={`line-clamp-3 text-[11.5px] leading-[1.55] ${muted}`}>{p.desc}</p>
      <div className="mt-auto flex items-baseline gap-1.5 pt-2">
        <span className={`font-mono truncate text-[10px] ${muted}`}>{p.tech.map((t) => t.l).join(" · ")}</span>
        <span
          className="font-sora ml-auto shrink-0 text-[11.5px] font-semibold transition-transform duration-200 group-hover:translate-x-1"
          style={{ color: a }}
        >
          View →
        </span>
      </div>
    </article>
  );
}

/* ----------------------------------------------------------------- D. Spotlight */
/** Tag-coloured aura and an overlapping icon stack. The loudest of the five. */
export function CardSpotlight({ p }: { p: Project }) {
  const a = accentOf(p.tag);
  return (
    <article
      className={`group relative flex h-full w-[318px] shrink-0 cursor-pointer flex-col gap-2 overflow-hidden rounded-[18px] p-[16px_17px] ${surface} transition-all duration-300 hover:-translate-y-[3px] dark:hover:border-[rgba(255,255,255,.16)]`}
      style={{ borderColor: undefined }}
    >
      <div
        className="pointer-events-none absolute -left-10 -top-14 h-40 w-40 rounded-full opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: a }}
      />
      <div className="relative flex items-center gap-2">
        <div className="flex -space-x-2">
          {p.tech.slice(0, 4).map((t) => (
            <span
              key={t.l}
              title={t.l}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e2e8f0] bg-white dark:border-[rgba(255,255,255,.12)] dark:bg-[#0b1020]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.ia} alt={t.l} className="h-[15px] w-[15px] object-contain dark:hidden" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={t.ib} alt={t.l} className="hidden h-[15px] w-[15px] object-contain dark:block" />
            </span>
          ))}
        </div>
        <span
          className="ml-auto rounded-full px-2 py-[3px] text-[10px] font-bold"
          style={{ background: `${a}1f`, color: a }}
        >
          {p.tag}
        </span>
      </div>
      <div className={`${title} relative mt-1 text-[16px]`}>{p.name}</div>
      <p className={`relative line-clamp-2 text-[11.5px] leading-[1.5] ${muted}`}>{p.desc}</p>
      <div className="relative mt-auto flex items-center pt-2">
        <span className={`${linkPill}`}>{p.link} ↗</span>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ E. Terminal */
/** Mono-first, framed like a shell. Plays to the engineer identity; needs no image. */
export function CardTerminal({ p }: { p: Project }) {
  const a = accentOf(p.tag);
  return (
    <article
      className={`group flex h-full w-[340px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-[14px] ${surface} transition-all duration-300 hover:-translate-y-[3px] hover:border-[#7c3aed] dark:hover:border-[rgba(34,211,238,.5)]`}
    >
      <div className="flex items-center gap-1.5 border-b border-[#eef2f7] bg-[#f8fafc] px-3 py-[7px] dark:border-[rgba(255,255,255,.07)] dark:bg-[rgba(255,255,255,.03)]">
        <span className="h-[9px] w-[9px] rounded-full bg-[#f87171]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#fbbf24]" />
        <span className="h-[9px] w-[9px] rounded-full bg-[#34d399]" />
        <span className={`font-mono ml-1.5 truncate text-[10px] ${muted}`}>~/work/{p.link}</span>
        <span className="font-mono ml-auto shrink-0 text-[9px] font-medium uppercase tracking-[0.1em]" style={{ color: a }}>
          {p.tag}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-[12px_14px_14px]">
        <div className="font-mono flex items-baseline gap-1.5 text-[12px]">
          <span style={{ color: a }}>$</span>
          <span className={`${title} font-sora text-[14.5px]`}>{p.name}</span>
        </div>
        <p className={`font-mono line-clamp-2 text-[10.5px] leading-[1.6] ${muted}`}>
          <span style={{ color: a }}># </span>
          {p.desc}
        </p>
        <div className="font-mono mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-[10px]">
          {p.tech.map((t) => (
            <span key={t.l} className={muted}>
              --{t.l.toLowerCase().replace(/[^a-z0-9]/g, "")}
            </span>
          ))}
          <span
            className="ml-auto inline-flex items-center gap-1 font-semibold transition-transform duration-200 group-hover:translate-x-1"
            style={{ color: a }}
          >
            open ↗
          </span>
        </div>
      </div>
    </article>
  );
}
