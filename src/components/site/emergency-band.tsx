import { Phone, Siren } from "lucide-react";
import { CONTACT } from "@/lib/data";
import { Reveal } from "./reveal";

export function EmergencyBand() {
  return (
    <section aria-labelledby="emergency-heading" className="relative overflow-hidden bg-ember py-14 sm:py-16">
      <div className="dot-grid absolute inset-0 opacity-20" aria-hidden />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:text-left">
        <Reveal className="max-w-2xl">
          <p className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-[0.22em] text-white/85 lg:justify-start">
            <Siren className="h-4 w-4" aria-hidden /> Emergency & acute triage
          </p>
          <h2 id="emergency-heading" className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            Having an emergency right now? Skip the forms.
          </h2>
          <p className="mt-3 leading-relaxed text-white/85">
            Chest pain, uncontrolled bleeding, breathing difficulty, sudden weakness, a burning fever in a
            child — tap the button and a triage nurse answers. We prep the treatment bay before you arrive.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="shrink-0">
          <a
            href={`tel:${CONTACT.emergencyPhone}`}
            className="group flex h-40 w-40 flex-col items-center justify-center gap-1.5 rounded-full border-4 border-white/90 bg-white/15 text-white shadow-lift backdrop-blur transition-all hover:scale-[1.04] hover:bg-white/25 sm:h-44 sm:w-44"
            aria-label={`Call emergency line ${CONTACT.emergencyPhoneDisplay}`}
          >
            <Phone className="h-8 w-8 animate-pulse" aria-hidden />
            <span className="font-display text-xl font-bold leading-none">Tap to call</span>
            <span className="text-[13px] font-bold text-white/90">{CONTACT.emergencyPhoneDisplay}</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
