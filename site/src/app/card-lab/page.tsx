"use client";

/**
 * Comparison page for project-card designs — one candidate per row, rendered
 * against the real data, fonts and theme. Not linked from anywhere; delete once
 * a direction is chosen.
 */

import ThemeToggle from "@/components/ThemeToggle";
import {
  CardIndex,
  CardPreview,
  CardSplit,
  CardSpotlight,
  CardTerminal,
} from "@/components/project-cards";
import { projects } from "@/data/content";

const ROWS: { key: string; name: string; note: string; render: (i: number) => React.ReactNode }[] = [
  {
    key: "preview",
    name: "A · Preview",
    note: "Thumbnail first. Strongest for the three projects with a screenshot; the other five fall back to a tinted monogram.",
    render: (i) => <CardPreview key={i} p={projects[i]} />,
  },
  {
    key: "split",
    name: "B · Split",
    note: "Visual rail left, content right. Wider card, fewer per screen, but scans quickly in a moving row.",
    render: (i) => <CardSplit key={i} p={projects[i]} />,
  },
  {
    key: "index",
    name: "C · Index",
    note: "Editorial, no imagery — so all eight projects carry equal weight. Nothing to fall back from.",
    render: (i) => <CardIndex key={i} p={projects[i]} i={i} />,
  },
  {
    key: "spotlight",
    name: "D · Spotlight",
    note: "Tag-coloured aura and an overlapping tech stack. The loudest option; best in dark mode.",
    render: (i) => <CardSpotlight key={i} p={projects[i]} />,
  },
  {
    key: "terminal",
    name: "E · Terminal",
    note: "Mono, framed as a shell. Leans on the engineer identity and needs no image at all.",
    render: (i) => <CardTerminal key={i} p={projects[i]} />,
  },
];

export default function CardLab() {
  return (
    <main className="mx-auto max-w-[1180px] px-6 py-10">
      <header className="mb-8 flex items-start gap-4">
        <div>
          <h1 className="font-sora text-[22px] font-extrabold text-[#0f172a] dark:text-[#f1f5fb]">
            Project card — five directions
          </h1>
          <p className="mt-1 max-w-[70ch] text-[12.5px] leading-[1.6] text-[#475569] dark:text-[#8da2c0]">
            One candidate per row, same eight projects, real data. Rows scroll sideways. Only{" "}
            <strong>Fintech Stock Platform</strong>, <strong>KyberSwap Landing Page</strong> and{" "}
            <strong>E-commerce Website</strong> have screenshots — watch how each design handles the other five.
          </p>
        </div>
        <div className="ml-auto shrink-0">
          <ThemeToggle />
        </div>
      </header>

      <div className="flex flex-col gap-9">
        {ROWS.map((row) => (
          <section key={row.key}>
            <div className="mb-2.5 flex items-baseline gap-3">
              <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[#0f172a] dark:text-[#22d3ee]">
                {row.name}
              </h2>
              <p className="text-[11.5px] text-[#64748b] dark:text-[#5a6b8c]">{row.note}</p>
            </div>
            <div className="-my-2 overflow-x-auto py-2 [scrollbar-width:thin]">
              <div className="flex items-stretch gap-3">
                {projects.map((_, i) => row.render(i))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
