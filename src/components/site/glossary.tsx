"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Languages, Stethoscope, TriangleAlert } from "lucide-react";
import { GLOSSARY, DEPARTMENTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";
import { bookDepartment } from "./departments";

export function Glossary() {
  const [active, setActive] = useState(0);
  const entry = GLOSSARY[active];
  const dept = DEPARTMENTS.find((d) => d.key === entry.dept)!;

  return (
    <section id="say-it" className="relative overflow-hidden bg-forest-deep py-20 text-cream sm:py-28">
      <div className="dot-grid absolute inset-0 opacity-[0.15]" aria-hidden />
      <div className="absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-leaf/20 blur-3xl" aria-hidden />
      <div className="absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-gold/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Tuongee lugha ya nyumbani"
          title={
            <>
              Say it the way <em className="text-gold italic">you say it at home</em>
            </>
          }
          lead="You do not need medical vocabulary to get the right care. Tap a word you use — we will tell you what clinicians call it, what it actually means, and exactly where to go."
        />

        {/* Chips */}
        <Reveal className="mt-10">
          <div className="flex flex-wrap gap-2.5" role="tablist" aria-label="Local health terms">
            {GLOSSARY.map((g, i) => (
              <button
                key={g.local}
                role="tab"
                aria-selected={active === i}
                onClick={() => setActive(i)}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-sm font-bold transition-all",
                  active === i
                    ? "border-gold bg-gold text-forest-deep shadow-lift"
                    : "border-cream/20 bg-cream/5 text-cream/85 hover:border-gold/50 hover:bg-cream/10"
                )}
              >
                “{g.local}”
              </button>
            ))}
          </div>
        </Reveal>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="glass-dark mt-8 grid gap-8 rounded-[2rem] p-7 shadow-lift sm:p-10 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div>
              <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-gold">
                <Languages className="h-4 w-4" aria-hidden />
                You said
              </p>
              <p className="mt-2 font-display text-3xl italic text-cream sm:text-4xl">“{entry.local}”</p>

              <p className="mt-6 flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-gold">
                <Stethoscope className="h-4 w-4" aria-hidden />
                Clinicians call it
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-leaf-bright sm:text-3xl">{entry.clinical}</p>

              <p className="mt-5 max-w-xl border-l-2 border-gold/60 pl-4 leading-relaxed text-cream/80">
                In plain terms: {entry.plain}
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-3xl bg-cream p-7 text-ink shadow-lift">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-gold-deep">Where to go</p>
              <p className="mt-2 font-display text-2xl font-semibold text-forest">{dept.short}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{dept.tagline} — {dept.name}.</p>
              <button
                type="button"
                onClick={() => bookDepartment(entry.dept)}
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 font-bold text-cream transition-all hover:-translate-y-0.5 hover:bg-pine"
              >
                Book this department <ArrowRight className="h-4 w-4 text-gold" aria-hidden />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        <Reveal className="mt-6">
          <p className="flex items-start gap-2 text-xs leading-relaxed text-cream/55">
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" aria-hidden />
            This guide helps you start the conversation — it is not a diagnosis. A proper assessment at the clinic
            confirms what is really going on.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
