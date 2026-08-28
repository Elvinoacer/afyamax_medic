"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Menu, MessageCircle, Phone, ShieldCheck, X } from "lucide-react";
import { CONTACT, NAV_LINKS, waLink } from "@/lib/data";
import { LogoWord } from "./logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <div className="hidden bg-forest-deep text-cream/85 lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-6 text-[12.5px] font-medium">
          <p className="flex items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5 text-gold" aria-hidden />
            KMPDC registered · SHA/NHIF accredited · Zimmerman, Nairobi
          </p>
          <div className="flex items-center gap-5">
            <span>Emergency triage — answered by a nurse, 24/7</span>
            <a href={`tel:${CONTACT.emergencyPhone}`} className="flex items-center gap-1.5 font-bold text-gold transition-colors hover:text-gold-soft">
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {CONTACT.emergencyPhoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled ? "glass shadow-[0_1px_0_rgb(12_59_46/0.08),0_10px_30px_-12px_rgb(12_59_46/0.25)]" : "bg-cream/95 backdrop-blur-md"
        )}
      >
        <nav className="mx-auto flex h-[64px] w-full max-w-7xl items-center justify-between gap-2 px-3 sm:h-[72px] sm:gap-4 sm:px-6" aria-label="Main">
          <a href="#top" className="min-w-0 shrink" aria-label="Afyamax home">
            <LogoWord />
          </a>

          <ul className="hidden items-center gap-1 xl:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-full px-4 py-2 text-[14.5px] font-semibold text-ink transition-colors hover:bg-sage hover:text-forest">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <a
              href={`tel:${CONTACT.emergencyPhone}`}
              className="hidden h-11 items-center gap-2 rounded-full border border-line bg-white/70 px-4 text-sm font-bold text-ember transition-all hover:border-ember/40 hover:bg-blush sm:flex"
              aria-label={`Call emergency line ${CONTACT.emergencyPhoneDisplay}`}
            >
              <Phone className="h-4 w-4" aria-hidden />
              <span className="hidden lg:inline">{CONTACT.emergencyPhoneDisplay}</span>
              <span className="lg:hidden">Emergency</span>
            </a>

            <a
              href="#book"
              className="hidden h-11 items-center gap-2 rounded-full bg-forest px-4 text-sm font-bold text-cream shadow-soft transition-all hover:-translate-y-0.5 hover:bg-pine hover:shadow-lift sm:flex sm:px-5"
            >
              <CalendarCheck className="h-4 w-4 text-gold" aria-hidden />
              <span className="hidden md:inline">Book appointment</span>
              <span className="md:hidden">Book</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-forest shadow-sm transition-colors hover:bg-sage xl:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[70] xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <div className="absolute inset-0 bg-forest-deep/60 backdrop-blur-sm" onClick={() => setOpen(false)} aria-hidden />
            <motion.div
              className="absolute inset-x-3 top-3 bottom-3 flex max-h-[calc(100dvh-24px)] flex-col overflow-y-auto rounded-3xl bg-cream p-5 shadow-lift sm:p-6"
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 24, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
            >
              <div className="flex items-center justify-between">
                <LogoWord />
                <button type="button" onClick={() => setOpen(false)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-forest" aria-label="Close menu">
                  <X className="h-5 w-5" aria-hidden />
                </button>
              </div>

              <ul className="mt-6 space-y-1">
                {NAV_LINKS.map((l, i) => (
                  <motion.li key={l.href} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.04 }}>
                    <a href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-xl font-medium text-forest transition-colors hover:bg-sage">
                      {l.label}<span aria-hidden className="text-gold-deep">→</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto space-y-3 pt-6">
                <a href="#book" onClick={() => setOpen(false)} className="flex h-12 items-center justify-center gap-2 rounded-full bg-forest font-bold text-cream">
                  <CalendarCheck className="h-4.5 w-4.5 text-gold" aria-hidden /> Book appointment
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a href={`tel:${CONTACT.emergencyPhone}`} className="flex h-12 items-center justify-center gap-2 rounded-full bg-ember font-bold text-white">
                    <Phone className="h-4 w-4" aria-hidden /> Call now
                  </a>
                  <a href={waLink("Hello Afyamax, I have a question.")} target="_blank" rel="noopener noreferrer" className="flex h-12 items-center justify-center gap-2 rounded-full bg-leaf font-bold text-white">
                    <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
                  </a>
                </div>
                <p className="pt-1 text-center text-xs text-ink-soft">Emergency triage line — {CONTACT.emergencyPhoneDisplay} · answered 24/7</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
