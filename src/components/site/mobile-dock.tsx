"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { CONTACT, waLink } from "@/lib/data";

/** Floating action dock — glass, mobile-first; appears after scrolling past the hero. */
export function MobileDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[60] lg:hidden"
          aria-label="Quick actions"
        >
          <div className="glass grid grid-cols-3 gap-1 rounded-3xl p-1.5 shadow-lift pb-[calc(6px+env(safe-area-inset-bottom))]">
            <a
              href={`tel:${CONTACT.emergencyPhone}`}
              className="flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-2xl bg-ember/95 py-2 font-bold text-white transition-transform active:scale-95"
            >
              <Phone className="h-5 w-5" aria-hidden />
              <span className="text-[11px]">Call now</span>
            </a>
            <a
              href={waLink("Hello Afyamax, I would like to ask something.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-2xl py-2 font-bold text-forest transition-transform active:scale-95 hover:bg-white/60"
            >
              <MessageCircle className="h-5 w-5 text-leaf" aria-hidden />
              <span className="text-[11px]">WhatsApp</span>
            </a>
            <a
              href="#book"
              className="flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-2xl bg-forest py-2 font-bold text-cream transition-transform active:scale-95"
            >
              <CalendarCheck className="h-5 w-5 text-gold" aria-hidden />
              <span className="text-[11px]">Book</span>
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
