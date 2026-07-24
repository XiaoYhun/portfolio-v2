"use client";

import { useState } from "react";
import { motion } from "motion/react";
import type { View } from "@/components/view-types";
import { viewKey } from "@/components/view-types";
import HomeView from "@/components/views/HomeView";
import TechView from "@/components/views/TechView";
import ProjectView from "@/components/views/ProjectView";
import CompanyView from "@/components/views/CompanyView";
import PersonalView from "@/components/views/PersonalView";

export default function ViewArea() {
  const [stack, setStack] = useState<View[]>([{ kind: "home" }]);
  const current = stack[stack.length - 1];

  const push = (v: View) =>
    setStack((s) => (viewKey(s[s.length - 1]) === viewKey(v) ? s : [...s, v]));
  const replace = (v: View) => setStack((s) => [...s.slice(0, -1), v]);
  const back = () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s));

  return (
    <motion.div
      key={viewKey(current)}
      className="col-span-4 grid grid-cols-4 gap-3 max-[1024px]:col-span-2 max-[1024px]:grid-cols-2 max-[640px]:col-span-1 max-[640px]:grid-cols-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.22, ease: "easeOut" } }}
    >
        {current.kind === "home" && <HomeView push={push} />}
        {current.kind === "tech" && (
          <TechView tech={current.tech} push={push} replace={replace} back={back} />
        )}
        {current.kind === "project" && (
          <ProjectView name={current.name} push={push} back={back} />
        )}
        {current.kind === "company" && (
          <CompanyView name={current.name} push={push} back={back} />
        )}
        {current.kind === "personal" && <PersonalView push={push} back={back} />}
    </motion.div>
  );
}
