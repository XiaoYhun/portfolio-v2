/**
 * Class strings shared by the server-rendered page shell and the client views.
 *
 * They live here rather than in view-parts.tsx because that module is
 * "use client": the page shell is a server component and would have had to
 * either pull the whole client module in or keep its own copy in sync (which is
 * what it used to do).
 */

/**
 * Small mono section label — CONTACT, EDUCATION, TECHSTACK, PROJECTS…
 *
 * A shade darker than the #64748b used for secondary text on cards: labels also
 * sit straight on the page background (the projects row, every back bar), which
 * is darker than a card and left the old value at 4.3:1 on 10px type.
 */
export const labelClass =
  "font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-[#5f6c81] dark:text-[#22d3ee]";

/** Stand-out pill for external website links — tinted pill that fills with the brand gradient on hover. */
export const linkPillClass =
  "inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-[rgba(79,70,229,.3)] bg-[linear-gradient(135deg,#eff6ff,#f5f3ff)] px-2.5 py-[3px] text-[11px] font-bold text-[#4f46e5] no-underline transition-all duration-200 hover:-translate-y-[1px] hover:border-transparent hover:bg-[linear-gradient(135deg,#2563eb,#7c3aed)] hover:text-white hover:no-underline hover:shadow-[0_6px_16px_rgba(124,58,237,.35)] dark:border-[rgba(34,211,238,.35)] dark:bg-none dark:bg-[rgba(34,211,238,.08)] dark:text-[#22d3ee] dark:hover:bg-none dark:hover:bg-[#22d3ee] dark:hover:text-[#04070f] dark:hover:shadow-[0_0_20px_rgba(34,211,238,.35)]";
