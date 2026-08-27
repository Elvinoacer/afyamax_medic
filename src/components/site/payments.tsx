import { BadgePercent, Building2, Landmark, Smartphone, Wallet } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const OPTIONS = [
  {
    icon: Landmark,
    title: "SHA / NHIF",
    text: "Accredited for primary-care consultations, outpatient diagnostics and basic procedures under the national insurance framework.",
  },
  {
    icon: Wallet,
    title: "Transparent cash rates",
    text: "Clear, affordable direct-pay fees posted at the front desk — general consultations are kept within reach of the Zimmerman community.",
  },
  {
    icon: Smartphone,
    title: "M-Pesa",
    text: "Pay by mobile money at the consultation, laboratory and pharmacy points of sale — receipt in seconds.",
  },
  {
    icon: BadgePercent,
    title: "Private insurance",
    text: "We work with major private health insurers — bring your card and we handle the paperwork.",
  },
  {
    icon: Building2,
    title: "Corporate billing",
    text: "Electronic invoicing for employer wellness programmes, institutional screenings and bulk pharmacy supply.",
  },
];

export function Payments() {
  return (
    <section id="payments" className="relative bg-sage/50 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Paying for care"
          title={
            <>
              Every wallet, <em className="text-leaf italic">welcome here</em>
            </>
          }
          lead="Money worries should never decide whether you see a clinician. Between national insurance, mobile money and honest cash rates, we will find the path that works for you."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {OPTIONS.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.06} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-line bg-white/80 p-6 transition-all hover:-translate-y-1 hover:border-leaf/40 hover:shadow-lift">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage text-forest">
                  <o.icon className="h-5.5 w-5.5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-forest">{o.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{o.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
