"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarCheck, MessageCircle, Phone, ShieldCheck, Clock } from "lucide-react";
import { CONTACT, waLink } from "@/lib/data";
import { getDeptStatus } from "@/lib/hours";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const gp = getDeptStatus("gp");

  return (
    <section id="top" className="relative overflow-hidden">
      {/* backdrop texture */}
      <div className="dot-grid absolute inset-0 opacity-40" aria-hidden />
      <div className="absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-mint blur-3xl" aria-hidden />
      <div className="absolute bottom-[-30%] left-[-8%] h-[420px] w-[420px] rounded-full bg-gold-soft/70 blur-3xl" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-8 lg:pb-24 lg:pt-16">
        {/* Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-bold text-forest shadow-soft"
          >
            <ShieldCheck className="h-4 w-4 text-leaf" aria-hidden />
            KMPDC-registered clinic · Zimmerman, Nairobi
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight text-forest text-balance sm:text-6xl lg:text-[4.2rem]"
          >
            Health is wealth.
            <br />
            We keep{" "}
            <span className="relative inline-block text-leaf italic">
              both
              <svg viewBox="0 0 120 12" className="absolute -bottom-1 left-0 w-full text-gold" aria-hidden>
                <path d="M3 9 C 30 3, 60 3, 117 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>{" "}
            within reach.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            General medicine, dentistry, minor surgery, physiotherapy and organic
            phytotherapy — delivered with compassion on Kamiti Road, and explained
            in the language you speak at home.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#book"
              className="flex h-13 items-center gap-2 rounded-full bg-forest px-7 py-3.5 font-bold text-cream shadow-soft transition-all hover:-translate-y-0.5 hover:bg-pine hover:shadow-lift"
            >
              <CalendarCheck className="h-5 w-5 text-gold" aria-hidden />
              Book an appointment
            </a>
            <a
              href={`tel:${CONTACT.emergencyPhone}`}
              className="flex items-center gap-2 rounded-full border-2 border-ember/70 bg-white/70 px-6 py-3 font-bold text-ember transition-all hover:-translate-y-0.5 hover:bg-blush"
            >
              <Phone className="h-5 w-5" aria-hidden />
              Emergency — tap to call
            </a>
            <a
              href={waLink("Hello Afyamax, I would like to ask about your services.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-2 py-3 font-semibold text-forest underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-leaf"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              Chat on WhatsApp
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-semibold text-ink-soft"
          >
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-leaf" aria-hidden /> SHA / NHIF accepted
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-gold" aria-hidden /> M-Pesa & cash
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {gp.isOpen ? "Open now — GP until 6:00 PM" : "Emergency line open 24/7"}
            </span>
          </motion.div>
        </div>

        {/* Imagery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="relative mx-auto w-full max-w-[440px] lg:max-w-none"
        >
          <div className="absolute -inset-3 rounded-[2.2rem] border-2 border-gold/50" aria-hidden />
          <div className="relative overflow-hidden rounded-[2rem] shadow-lift">
            <Image
              src="/images/hero-doctor.png"
              alt="A smiling Afyamax clinician in teal scrubs inside the clinic"
              width={864}
              height={1152}
              priority
              className="h-auto w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-forest-deep/50 to-transparent" aria-hidden />
          </div>

          {/* floating cards — glass, where it counts */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease }}
            className="glass absolute -left-3 top-8 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lift sm:-left-8"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest text-gold">
              <ShieldCheck className="h-5 w-5" aria-hidden />
            </span>
            <span>
              <span className="block text-sm font-bold text-forest">KMPDC Registered</span>
              <span className="block text-xs font-medium text-ink-soft">Licensed practice</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            className="glass absolute -bottom-5 right-4 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lift sm:right-8"
          >
            <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-ember text-white">
              <Phone className="h-5 w-5" aria-hidden />
              <span className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-pulse rounded-full border-2 border-white bg-gold" aria-hidden />
            </span>
            <span>
              <span className="block text-sm font-bold text-forest">Nurse-led triage</span>
              <span className="block text-xs font-medium text-ink-soft">On call 24/7</span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
