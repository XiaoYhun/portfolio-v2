"use client";

import { motion } from "motion/react";
import { BackBar, Reveal, SectionLabel, SlideIn, TechChip, labelClass, layoutSnap, linkPillClass } from "@/components/view-parts";
import type { View } from "@/components/view-types";
import { companyProducts, jobs } from "@/data/content";

export default function CompanyView({
  name,
  push,
  back,
}: {
  name: string;
  push: (v: View) => void;
  back: () => void;
}) {
  const job = jobs.find((j) => j.company === name);
  const products = companyProducts[name] ?? [];

  if (!job) {
    return (
      <>
        <BackBar onBack={back}>
          <span className="font-sora text-[16px] font-bold text-[#0f172a] dark:text-[#f1f5fb]">Not found</span>
        </BackBar>
        <div className="col-span-4 text-[12px] text-[#64748b] max-[1024px]:col-span-2 max-[640px]:col-span-1 dark:text-[#5a6b8c]">
          That company could not be found.
        </div>
      </>
    );
  }

  return (
    <>
      <BackBar onBack={back}>
        <div className="flex flex-col gap-0.5">
          <span className={labelClass}>COMPANY</span>
          <motion.span
            layoutId={`company-${job.company}`}
            transition={layoutSnap}
            className="font-sora text-[20px] font-extrabold text-[#0f172a] dark:text-[#f1f5fb]">
            {job.company}
          </motion.span>
        </div>
      </BackBar>

      <Reveal
        delay={0.05}
        className="col-span-4 flex flex-col gap-1.5 max-[1024px]:col-span-2 max-[640px]:col-span-1"
      >
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-[13px] font-semibold text-[#4f46e5] dark:text-[#22d3ee]">{job.role}</span>
          <span className="font-mono whitespace-nowrap text-[11px] font-medium text-[#94a3b8] dark:text-[#5a6b8c]">
            {job.period}
          </span>
        </div>
        <div className="text-[12px] italic text-[#64748b] dark:text-[#5a6b8c]">{job.blurb}</div>
      </Reveal>

      <div className="col-span-4 flex flex-col gap-2 max-[1024px]:col-span-2 max-[640px]:col-span-1">
        <Reveal delay={0.12}>
          <SectionLabel>IMPACT</SectionLabel>
        </Reveal>
        <SlideIn from="left" delay={0.14}>
          <ul className="m-0 flex list-disc flex-col gap-1.5 rounded-[18px] border border-[#e2e8f0] bg-white p-[16px_20px_16px_36px] text-[12.5px] leading-[1.6] text-[#475569] shadow-[0_3px_12px_rgba(20,40,90,.06)] dark:border-[rgba(255,255,255,.09)] dark:bg-[rgba(255,255,255,.04)] dark:text-[#8da2c0] dark:shadow-none dark:backdrop-blur-[8px]">
            {job.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </SlideIn>
      </div>

      {products.length > 0 && (
        <div className="col-span-4 flex flex-col gap-2 max-[1024px]:col-span-2 max-[640px]:col-span-1">
          <Reveal delay={0.22}>
            <SectionLabel>PROJECTS &amp; PRODUCTS</SectionLabel>
          </Reveal>
          <div className="flex flex-col overflow-hidden rounded-[18px] border border-[#e2e8f0] bg-white shadow-[0_3px_12px_rgba(20,40,90,.06)] dark:border-[rgba(255,255,255,.09)] dark:bg-[rgba(255,255,255,.04)] dark:shadow-none dark:backdrop-blur-[8px]">
            {products.map((prod, i) => (
              <SlideIn
                key={prod.name}
                from="left"
                delay={0.26 + i * 0.08}
                className={`flex items-start gap-3 p-[14px_18px] transition-colors duration-150 hover:bg-[#f8fafc] dark:hover:bg-[rgba(34,211,238,.05)] ${
                  i > 0 ? "border-t border-[#f1f5f9] dark:border-[rgba(255,255,255,.07)]" : ""
                }`}
              >
                <span className="font-mono w-5 shrink-0 pt-0.5 text-[11px] font-semibold text-[#94a3b8] dark:text-[#5a6b8c]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-sora text-[14px] font-bold text-[#0f172a] dark:text-[#f1f5fb]">
                      {prod.name}
                    </span>
                    {prod.link && prod.url && (
                      <a
                        href={prod.url}
                        target="_blank"
                        rel="noreferrer"
                        className={linkPillClass}
                      >
                        {prod.link} ↗
                      </a>
                    )}
                  </div>
                  <div className="text-[11.5px] leading-[1.5] text-[#475569] dark:text-[#8da2c0]">{prod.desc}</div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {prod.tech.map((t) => (
                      <TechChip
                        key={t.l}
                        t={t}
                        onClick={() => push({ kind: "tech", tech: t.l })}
                      />
                    ))}
                    {prod.projectName && (
                      <button
                        type="button"
                        onClick={() =>
                          push({ kind: "project", name: prod.projectName as string })
                        }
                        className="ml-auto bg-transparent p-0 text-[11px] font-semibold text-[#4f46e5] hover:underline dark:text-[#22d3ee]"
                      >
                        details →
                      </button>
                    )}
                  </div>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
