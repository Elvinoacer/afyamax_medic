"use client";

import { useState } from "react";
import { Loader2, Mail, MapPin, MessageCircle, Phone, Send, Siren, Clock } from "lucide-react";
import { toast } from "sonner";
import { CONTACT, waLink } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] font-medium text-ink placeholder:text-ink-soft/50 transition-colors focus:border-leaf focus:outline-none";
const labelCls = "mb-1.5 block text-[13px] font-bold text-forest";

const TOPICS = [
  { value: "general", label: "General question" },
  { value: "phyto", label: "Organic products / Afya Uhai" },
  { value: "corporate", label: "Corporate & institutional wellness" },
  { value: "feedback", label: "Feedback or complaint" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", contact: "", topic: "general", message: "", consent: false, website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const v = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Please tell us your name";
    if (form.contact.trim().length < 5) errs.contact = "Phone or email, so we can reply";
    if (form.message.trim().length < 5) errs.message = "Tell us briefly how we can help";
    if (!form.consent) errs.consent = "We need your consent to reply";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSending(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setDone(true);
        toast.success("Message sent — we will be in touch soon.");
      } else {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        toast.error(data.error ?? "Could not send — try WhatsApp or a call");
      }
    } catch {
      toast.error("Network issue — try WhatsApp or a call");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="First contact"
          title={
            <>
              Talk to a human, <em className="text-leaf italic">not a phone tree</em>
            </>
          }
          lead="Questions about a product, a corporate wellness day, or feedback about your visit? Send a message or use any channel below — real people answer."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Form */}
          <Reveal>
            <div className="rounded-[2rem] border border-line bg-white p-6 shadow-lift sm:p-9">
              {done ? (
                <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mint text-2xl">📬</span>
                  <h3 className="mt-5 font-display text-2xl font-semibold text-forest">Message received</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
                    Thank you, {form.name.split(" ")[0]}. We will reach you on{" "}
                    <strong className="text-forest">{form.contact}</strong> — usually within one working day.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setDone(false);
                      setForm({ name: "", contact: "", topic: "general", message: "", consent: false, website: "" });
                    }}
                    className="mt-6 rounded-full border border-line px-6 py-3 font-bold text-forest transition-colors hover:border-leaf"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ct-name" className={labelCls}>Your name *</label>
                    <input id="ct-name" className={inputCls} value={form.name} onChange={set("name")} placeholder="e.g. John Otieno" autoComplete="name" />
                    {errors.name && <p className="mt-1.5 text-xs font-semibold text-ember">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="ct-contact" className={labelCls}>How do we reach you? *</label>
                    <input id="ct-contact" className={inputCls} value={form.contact} onChange={set("contact")} placeholder="Phone number or email" autoComplete="off" />
                    {errors.contact && <p className="mt-1.5 text-xs font-semibold text-ember">{errors.contact}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="ct-topic" className={labelCls}>What is it about?</label>
                    <select id="ct-topic" className={inputCls} value={form.topic} onChange={set("topic")}>
                      {TOPICS.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="ct-msg" className={labelCls}>Your message *</label>
                    <textarea id="ct-msg" rows={4} className={cn(inputCls, "resize-none")} value={form.message} onChange={set("message")} placeholder="Write freely — English, Kiswahili ama Sheng." />
                    {errors.message && <p className="mt-1.5 text-xs font-semibold text-ember">{errors.message}</p>}
                  </div>
                  <input type="text" name="website" value={form.website} onChange={set("website")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-linen/60 p-4">
                      <input type="checkbox" checked={form.consent} onChange={set("consent")} className="mt-0.5 h-5 w-5 shrink-0 accent-[#12805c]" />
                      <span className="text-[13px] leading-relaxed text-ink-soft">
                        <strong className="text-forest">Consent (required).</strong> I agree that Afyamax may store
                        and use this message to respond to me, under the Kenya Data Protection Act, 2019.
                      </span>
                    </label>
                    {errors.consent && <p className="mt-1.5 text-xs font-semibold text-ember">{errors.consent}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="flex h-13 items-center justify-center gap-2.5 rounded-full bg-forest py-3.5 font-bold text-cream shadow-soft transition-all hover:-translate-y-0.5 hover:bg-pine hover:shadow-lift disabled:opacity-70 sm:col-span-2"
                  >
                    {sending ? <Loader2 className="h-5 w-5 animate-spin text-gold" aria-hidden /> : <Send className="h-4.5 w-4.5 text-gold" aria-hidden />}
                    {sending ? "Sending…" : "Send message"}
                  </button>
                </form>
              )}
            </div>
          </Reveal>

          {/* Channels */}
          <div className="flex flex-col gap-4">
            {[
              {
                icon: Phone,
                tint: "bg-sage text-forest",
                title: "Front desk & bookings",
                lines: [CONTACT.mainPhoneDisplay, CONTACT.receptionDisplay, CONTACT.cbdAltDisplay],
                href: `tel:${CONTACT.mainPhone}`,
                action: "Call now",
              },
              {
                icon: Siren,
                tint: "bg-blush text-ember",
                title: "Emergency triage — 24/7",
                lines: [CONTACT.emergencyPhoneDisplay],
                href: `tel:${CONTACT.emergencyPhone}`,
                action: "Tap to call",
              },
              {
                icon: MessageCircle,
                tint: "bg-mint text-leaf",
                title: "WhatsApp",
                lines: [CONTACT.emergencyPhoneDisplay],
                href: waLink("Hello Afyamax!"),
                action: "Start chat",
                external: true,
              },
              {
                icon: Mail,
                tint: "bg-gold-soft text-gold-deep",
                title: "Email",
                lines: [CONTACT.email],
                href: `mailto:${CONTACT.email}`,
                action: "Write to us",
              },
              {
                icon: MapPin,
                tint: "bg-sage text-forest",
                title: "Visit us",
                lines: ["Kamiti Road, next to Success Stage, behind Abundant Worship Center — Zimmerman, Nairobi 00609"],
                href: "https://www.google.com/maps/dir/?api=1&destination=Kamiti%20Road%2C%20Zimmerman%2C%20Nairobi",
                action: "Directions",
                external: true,
              },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 0.05}>
                <a
                  href={c.href}
                  target={c.external ? "_blank" : undefined}
                  rel={c.external ? "noopener noreferrer" : undefined}
                  className="group flex items-start gap-4 rounded-3xl border border-line bg-white/80 p-5 transition-all hover:-translate-y-0.5 hover:border-leaf/40 hover:shadow-lift"
                >
                  <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl", c.tint)}>
                    <c.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-bold text-forest">{c.title}</span>
                    {c.lines.map((l) => (
                      <span key={l} className="block truncate text-sm text-ink-soft">{l}</span>
                    ))}
                    <span className="mt-1.5 inline-block text-xs font-bold text-leaf underline decoration-gold decoration-2 underline-offset-2">
                      {c.action} →
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <p className="flex items-center justify-center gap-2 rounded-2xl bg-linen px-4 py-3.5 text-center text-xs font-semibold text-ink-soft">
                <Clock className="h-4 w-4 shrink-0" aria-hidden />
                Reception answers 8:00 AM – 6:00 PM weekdays · 8:00 AM – 5:00 PM Saturdays · emergency line never sleeps
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
