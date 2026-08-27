"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "framer-motion";
import { HeartHandshake, Leaf, Stethoscope, Users } from "lucide-react";
import { STATS } from "@/lib/data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

function CountUp({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const start = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="font-display text-4xl font-semibold text-forest sm:text-5xl">
      {n}
      <span className="text-gold-deep">{suffix}</span>
    </span>
  );
}

const VALUES = [
  {
    icon: Stethoscope,
    title: "Conventional medicine",
    text: "Evidence-based diagnostics, treatment and follow-up led by licensed clinicians.",
  },
  {
    icon: Leaf,
    title: "Responsible phytotherapy",
    text: "In-house botanical research that complements — never replaces — your medical care.",
  },
  {
    icon: HeartHandshake,
    title: "Compassionate presence",
    text: "Time to listen, plain-language explanations, and dignity for every patient.",
  },
  {
    icon: Users,
    title: "Community first",
    text: "Free screening camps and wellness education across churches, ministries and services.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Imagery collage */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="grid grid-cols-[1.25fr_1fr] gap-4">
              <div className="overflow-hidden rounded-[1.8rem] shadow-lift">
                <Image
                  src="/images/about-care.png"
                  alt="An Afyamax nurse gently holding an elderly patient's hands"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-4 pt-8">
                <div className="overflow-hidden rounded-[1.8rem] shadow-soft">
                  <Image
                    src="/images/clinic-exterior.png"
                    alt="Exterior of the Afyamax clinic building on Kamiti Road"
                    width={768}
                    height={1152}
                    className="aspect-[3/4] w-full object-cover"
                  />
                </div>
                <div className="rounded-[1.4rem] bg-forest p-5 text-cream shadow-lift">
                  <p className="font-display text-lg italic leading-snug">“Afya Uhai — Health is Wealth”</p>
                  <p className="mt-2 text-xs font-medium text-cream/70">Our motto, and our promise to Zimmerman.</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow="Who we are"
              title={
                <>
                  A neighbourhood clinic where <em className="text-leaf italic">convention meets nature</em>
                </>
              }
              lead="Afyamax Medical & Dental Centre is a private primary healthcare facility in Zimmerman ward, Roysambu — registered by the Kenya Medical Practitioners and Dentists Council. Alongside standard general practice and dentistry, we host the Afya Uhai division, our in-house phytotherapeutic research unit."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={i * 0.06}>
                  <div className="group h-full rounded-2xl border border-line bg-white/70 p-5 transition-all hover:-translate-y-1 hover:border-leaf/40 hover:shadow-lift">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage text-forest transition-colors group-hover:bg-forest group-hover:text-gold">
                      <v.icon className="h-5.5 w-5.5" aria-hidden />
                    </span>
                    <h3 className="mt-3.5 font-display text-lg font-semibold text-forest">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{v.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Stats band */}
        <Reveal className="mt-16 sm:mt-20">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.8rem] border border-line bg-line shadow-soft lg:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2 bg-white/80 px-6 py-8 text-center">
                <dt className="order-2 mt-1 max-w-[220px] text-[13px] font-semibold leading-snug text-ink-soft">{s.label}</dt>
                <dd className="order-1">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
