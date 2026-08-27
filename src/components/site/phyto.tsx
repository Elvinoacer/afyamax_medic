"use client";

import Image from "next/image";
import { Leaf, ShieldCheck, FlaskConical, CalendarCheck } from "lucide-react";
import { PRODUCTS } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { bookDepartment } from "./departments";

export function Phyto() {
  return (
    <section id="phyto" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Image + intro */}
          <div>
            <SectionHeading
              eyebrow="Afya Uhai division"
              title={
                <>
                  Organic care, <em className="text-leaf italic">researched in-house</em>
                </>
              }
              lead="Our phytotherapy division formulates, tests and dispenses organic botanical treatments for chronic lifestyle conditions — each one developed under the Afya Uhai Health Care Center research programme."
            />
            <Reveal delay={0.1} className="mt-8">
              <div className="relative">
                <div className="absolute -inset-2.5 rounded-[2rem] border-2 border-leaf/25" aria-hidden />
                <div className="relative overflow-hidden rounded-[1.8rem] shadow-lift">
                  <Image
                    src="/images/dept-phyto.png"
                    alt="Amber herbal bottles and fresh botanicals from the Afya Uhai range"
                    width={1152}
                    height={864}
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.15} className="mt-6">
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-sage px-4 py-2 text-xs font-bold text-forest">
                  <FlaskConical className="h-4 w-4" aria-hidden /> Formulated & tested in-house
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-gold-soft px-4 py-2 text-xs font-bold text-gold-deep">
                  <ShieldCheck className="h-4 w-4" aria-hidden /> Dispensed with clinical oversight
                </span>
              </div>
            </Reveal>
          </div>

          {/* Product list */}
          <div className="flex flex-col gap-4">
            {PRODUCTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.05}>
                <article className="group flex gap-5 rounded-3xl border border-line bg-white/80 p-5 transition-all hover:-translate-y-1 hover:border-leaf/40 hover:shadow-lift sm:p-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-forest text-gold transition-colors group-hover:bg-leaf group-hover:text-white">
                    <Leaf className="h-5.5 w-5.5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-forest sm:text-xl">{p.name}</h3>
                    <p className="mt-0.5 text-xs font-bold uppercase tracking-[0.14em] text-gold-deep">{p.focus}</p>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-forest p-6 text-cream sm:flex-row sm:items-center">
                <p className="text-sm leading-relaxed text-cream/85">
                  Every phytotherapy journey starts with a full medical history intake — so we can check
                  interactions with any medicine you already take.
                </p>
                <button
                  type="button"
                  onClick={() => bookDepartment("phyto")}
                  className="flex shrink-0 items-center gap-2 rounded-full bg-gold px-6 py-3 font-bold text-forest-deep transition-all hover:-translate-y-0.5 hover:bg-gold-deep hover:text-white"
                >
                  <CalendarCheck className="h-4 w-4" aria-hidden /> Book a consult
                </button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
