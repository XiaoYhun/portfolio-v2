"use client";

import { motion } from "motion/react";
import { Hero, NewInfo } from "@/components/Morph";
import { CompanyIdentity, companySurface } from "@/components/identities";
import { BackBar, SectionLabel, TechChip, linkPillClass } from "@/components/view-parts";
import type { View } from "@/components/view-types";
import { companyProducts, jobs } from "@/data/content";

export default function CompanyView({
  name,
  push,
  back,
}: {
  name: string;
  push: (v: View, morphId?: string) => void;
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
        <SectionLabel>COMPANY</SectionLabel>
      </BackBar>

      {/* The experience card, grown. Identity (role, blurb, bullets, tech)
          remains; the products list below is new and fades in. */}
      <Hero
        id={`company-card-${job.company}`}
        style={{ borderRadius: 18 }}
        className={`col-span-4 flex flex-col gap-[7px] max-[1024px]:col-span-2 max-[640px]:col-span-1 ${companySurface}`}
      >
        <CompanyIdentity job={job} push={push} />

        {products.length > 0 && (
          <NewInfo delay={0.15} className="mt-2 flex flex-col gap-2">
            <SectionLabel>PROJECTS &amp; PRODUCTS</SectionLabel>
            <div className="flex flex-col overflow-hidden rounded-[14px] border border-[#e2e8f0] bg-[#f8fafc] dark:border-[rgba(255,255,255,.09)] dark:bg-[rgba(255,255,255,.03)]">
              {products.map((prod, i) => (
                <motion.div
                  key={prod.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.28 + i * 0.07 } }}
                  className={`flex items-start gap-3 p-[14px_18px] transition-colors duration-150 hover:bg-white dark:hover:bg-[rgba(34,211,238,.05)] ${
                    i > 0 ? "border-t border-[#e2e8f0] dark:border-[rgba(255,255,255,.07)]" : ""
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
                        <a href={prod.url} target="_blank" rel="noreferrer" className={linkPillClass}>
                          {prod.link} ↗
                        </a>
                      )}
                    </div>
                    <div className="text-[11.5px] leading-[1.5] text-[#475569] dark:text-[#8da2c0]">{prod.desc}</div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {prod.tech.map((t) => (
                        <TechChip key={t.l} t={t} onClick={() => push({ kind: "tech", tech: t.l })} />
                      ))}
                      {prod.projectName && (
                        <button
                          type="button"
                          onClick={() => push({ kind: "project", name: prod.projectName as string })}
                          className="ml-auto bg-transparent p-0 text-[11px] font-semibold text-[#4f46e5] hover:underline dark:text-[#22d3ee]"
                        >
                          details →
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </NewInfo>
        )}
      </Hero>
    </>
  );
}
