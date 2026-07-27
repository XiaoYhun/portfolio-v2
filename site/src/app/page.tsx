import ViewArea from "@/components/ViewArea";
import FloatingCTA from "@/components/FloatingCTA";
import ThemeToggle from "@/components/ThemeToggle";
import { labelClass, linkPillClass } from "@/components/ui/classes";
import { profile, contact, education, stats } from "@/data/content";

export default function Home() {
  return (
    <>
      <ThemeToggle />
      {/* pb: clears the fixed CTA, which wraps to two rows on a phone and is
          taller there than on a wide screen. */}
      <main className="mx-auto max-w-[1180px] px-4 pt-10 pb-[110px] max-[640px]:px-3 max-[640px]:pt-6 max-[640px]:pb-[132px]">
      <div className="relative">
        {/* Decorative aurora orbs — dark theme only */}
        <div className="pointer-events-none absolute -top-[120px] -left-[80px] hidden h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,.16),transparent_65%)] dark:block" />
        <div className="pointer-events-none absolute -top-[60px] -right-[100px] hidden h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(167,139,250,.15),transparent_65%)] dark:block" />

        <div className="relative grid grid-cols-4 gap-3 max-[1024px]:grid-cols-2 max-[640px]:grid-cols-1">
        {/* Hero */}
        <div
          className="col-span-2 flex flex-col gap-[9px] rounded-[18px] p-[24px_26px] text-white max-[640px]:col-span-1 max-[640px]:p-5 bg-[linear-gradient(135deg,#1d4ed8_0%,#4f46e5_55%,#7c3aed_100%)] shadow-[0_12px_32px_rgba(79,70,229,.35)] dark:border dark:border-[rgba(255,255,255,.09)] dark:bg-none dark:bg-[rgba(255,255,255,.04)] dark:shadow-none dark:backdrop-blur-[8px]"
        >
          <div className="hidden font-mono text-[11px] font-medium tracking-[0.12em] text-[#22d3ee] dark:block">
            ~/diep-pham
          </div>
          <div className="flex items-center gap-3.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/avatar.png"
              alt={profile.name}
              className="h-[88px] w-[88px] shrink-0 rounded-[20px] border border-[rgba(255,255,255,.35)] bg-[rgba(255,255,255,.15)] object-cover shadow-[0_8px_20px_rgba(0,0,0,.18)] dark:border-[rgba(34,211,238,.3)] dark:bg-[rgba(34,211,238,.08)]"
            />
            <div>
              <h1 className="font-sora text-[28px] font-extrabold leading-[1.1] dark:bg-[linear-gradient(100deg,#e0f2fe,#22d3ee_45%,#a78bfa)] dark:bg-clip-text dark:text-transparent dark:[-webkit-background-clip:text]">
                {profile.name}
              </h1>
              <p className="font-sora mt-0.5 text-[13px] font-semibold text-[#c7d7fe] dark:text-[#cbd5e1]">
                {profile.subtitle}
              </p>
            </div>
          </div>
          <div className="text-[12.5px] leading-[1.6] text-[#e0e7ff] dark:text-[#8da2c0]">{profile.bio}</div>
          <div className="mt-auto flex flex-wrap gap-1.5">
            {profile.pills.map((pill) => (
              <span
                key={pill}
                className="rounded-full bg-[rgba(255,255,255,.16)] px-2.5 py-1 text-[11px] font-semibold dark:bg-[rgba(34,211,238,.08)] dark:text-[#a5f3fc]"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Contact + Education */}
        <div className="flex flex-col gap-[7px] rounded-[18px] border border-[#e2e8f0] bg-white p-[18px_20px] text-[12px] text-[#334155] shadow-[0_3px_12px_rgba(20,40,90,.06)] dark:border-[rgba(255,255,255,.09)] dark:bg-[rgba(255,255,255,.04)] dark:text-[#8da2c0] dark:shadow-none dark:backdrop-blur-[8px]">
          <h2 className={labelClass}>CONTACT</h2>
          <span className="dark:text-[#e2e8f3]">{contact.email}</span>
          <span>{contact.phone}</span>
          <span>{contact.location}</span>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className={`self-start ${linkPillClass}`}
          >
            {contact.githubLabel} ↗
          </a>
          <h2 className={`${labelClass} mt-1.5`}>EDUCATION</h2>
          <span className="font-semibold text-[#0f172a] dark:text-[#e2e8f3]">{education.degree}</span>
          <span className="text-[#64748b] dark:text-[#8da2c0]">{education.school}</span>
        </div>

        {/* Numbers */}
        <div className="flex flex-col gap-2 rounded-[18px] border border-[#e2e8f0] bg-white p-[18px_20px] shadow-[0_3px_12px_rgba(20,40,90,.06)] dark:border-[rgba(255,255,255,.09)] dark:bg-[rgba(255,255,255,.04)] dark:shadow-none dark:backdrop-blur-[8px]">
          <h2 className={labelClass}>NUMBERS</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {stats.items.map((s) => (
              <div key={s.caption}>
                <div className="font-sora text-gradient text-2xl font-extrabold">
                  {s.value}
                </div>
                <div className="text-[10.5px] text-[#64748b] dark:text-[#7286ac]">{s.caption}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-[#e2e8f0] pt-2 text-[11px] text-[#64748b] dark:border-[rgba(255,255,255,.07)] dark:text-[#7286ac]">
            {stats.also}
          </div>
        </div>

        {/* Switchable view area */}
        <ViewArea />
        </div>
      </div>
    </main>
    <FloatingCTA />
    </>
  );
}
