import { contact } from "@/data/content";

export default function FloatingCTA() {
  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 flex-wrap items-center justify-between gap-3 rounded-[18px] border border-transparent bg-[rgba(15,23,42,.9)] p-[14px_24px] text-[#e2e8f0] shadow-[0_12px_40px_rgba(15,23,42,.35)] backdrop-blur-[12px] dark:border-[rgba(255,255,255,.09)] dark:bg-[rgba(10,16,30,.85)]"
      style={{ width: "min(1180px, calc(100vw - 32px))" }}
    >
      <div className="flex items-center gap-2.5">
        <span
          className="h-[9px] w-[9px] rounded-full bg-[#4ade80]"
          style={{ boxShadow: "0 0 10px #4ade80" }}
        />
        <span className="font-sora text-[13px] font-semibold dark:text-[#e2e8f3]">
          Open to Senior Frontend / Fullstack Roles
        </span>
      </div>
      <div className="text-[12px] text-[#94a3b8] max-[640px]:hidden dark:text-[#5a6b8c]">
        Coding · Travelling · Movies
      </div>
      <a
        href={`mailto:${contact.email}`}
        className="font-sora rounded-full bg-[linear-gradient(135deg,#2563eb,#7c3aed)] px-5 py-[9px] text-[12.5px] font-semibold text-white no-underline transition-[filter] duration-200 hover:brightness-[1.15] dark:bg-[linear-gradient(135deg,#06b6d4,#8b5cf6)]"
      >
        Get in touch
      </a>
    </div>
  );
}
