"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Clock } from "lucide-react";
import { DEPARTMENTS, fmtRange, DEPT_HOURS, DAY_NAMES, type DeptKey } from "@/lib/data";
import { getDeptStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

export function bookDepartment(dept: DeptKey) {
  window.dispatchEvent(new CustomEvent("afya:book", { detail: { department: dept } }));
  document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
}

function StatusBadge({ dept }: { dept: DeptKey }) {
  const st = getDeptStatus(dept);
  const s = st.status;
  if (s.kind === "open") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold",
          st.isOpen ? "bg-mint text-pine" : "bg-linen text-ink-soft"
        )}
      >
        <span className={cn("h-2 w-2 rounded-full", st.isOpen ? "bg-leaf" : "bg-gold")} aria-hidden />
        {st.isOpen ? "Open now" : `Opens ${DAY_NAMES[st.dayIndex]} ${fmtRange(s.open, s.close).split(" – ")[0]}`}
      </span>
    );
  }
  if (s.kind === "emergency-only")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blush px-3 py-1 text-xs font-bold text-ember">
        <span className="h-2 w-2 rounded-full bg-ember" aria-hidden /> Emergency / appointment only
      </span>
    );
  if (s.kind === "house-calls")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1 text-xs font-bold text-gold-deep">
        <span className="h-2 w-2 rounded-full bg-gold" aria-hidden /> House calls on Sunday
      </span>
    );
  if (s.kind === "on-call")
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1 text-xs font-bold text-gold-deep">
        <span className="h-2 w-2 rounded-full bg-gold" aria-hidden /> On call
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-linen px-3 py-1 text-xs font-bold text-ink-soft">
      <span className="h-2 w-2 rounded-full bg-ink-soft/50" aria-hidden /> {s.label ?? "Closed"}
    </span>
  );
}

export function Departments() {
  const [active, setActive] = useState<DeptKey>("gp");
  const dept = DEPARTMENTS.find((d) => d.key === active)!;
  const hoursToday = DEPT_HOURS[active][getDeptStatus(active).dayIndex];

  return (
    <section id="departments" className="relative bg-sage/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our departments"
          title={
            <>
              Five specialties, <em className="text-leaf italic">one front door</em>
            </>
          }
          lead="Whether it is a fever that started last night, a tooth that will not let you sleep, or a stroke recovery journey — start here, and we will route you to the right room."
        />

        {/* Tabs */}
        <Reveal className="mt-10">
          <div role="tablist" aria-label="Clinical departments" className="flex gap-2 overflow-x-auto pb-2 lg:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {DEPARTMENTS.map((d) => (
              <button
                key={d.key}
                role="tab"
                aria-selected={active === d.key}
                aria-controls={`dept-panel-${d.key}`}
                id={`dept-tab-${d.key}`}
                onClick={() => setActive(d.key)}
                className={cn(
                  "shrink-0 rounded-full border px-5 py-2.5 text-sm font-bold transition-all",
                  active === d.key
                    ? "border-forest bg-forest text-cream shadow-soft"
                    : "border-line bg-white/80 text-ink hover:border-leaf/50 hover:text-forest"
                )}
              >
                {d.short}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            id={`dept-panel-${active}`}
            role="tabpanel"
            aria-labelledby={`dept-tab-${active}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift"
          >
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative min-h-[260px] lg:min-h-[460px]">
                <Image
                  src={dept.image}
                  alt={`${dept.name} at Afyamax`}
                  width={1152}
                  height={864}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/35 via-transparent to-transparent lg:bg-gradient-to-r" aria-hidden />
              </div>

              <div className="flex flex-col p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusBadge dept={active} />
                  {hoursToday.kind === "open" && (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft">
                      <Clock className="h-3.5 w-3.5" aria-hidden />
                      Today {fmtRange(hoursToday.open, hoursToday.close)}
                      {hoursToday.note ? ` · ${hoursToday.note}` : ""}
                    </span>
                  )}
                </div>

                <h3 className="mt-4 font-display text-2xl font-semibold text-forest sm:text-3xl">{dept.name}</h3>
                <p className="mt-1 text-sm font-bold uppercase tracking-[0.14em] text-gold-deep">{dept.tagline}</p>
                <p className="mt-4 leading-relaxed text-ink-soft">{dept.description}</p>

                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {dept.services.map((s) => (
                    <li key={s} className="flex items-start gap-2.5 text-sm font-medium text-ink">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint text-pine">
                        <Check className="h-3 w-3" aria-hidden strokeWidth={3} />
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => bookDepartment(active)}
                    className="flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-forest-deep shadow-soft transition-all hover:-translate-y-0.5 hover:bg-gold-deep hover:text-white"
                  >
                    Book {dept.short}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </button>
                  <a
                    href="#visit"
                    className="rounded-full border border-line px-6 py-3 font-bold text-forest transition-colors hover:border-leaf hover:text-leaf"
                  >
                    Before you visit
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
