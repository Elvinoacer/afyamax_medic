"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarCheck,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Phone,
  Siren,
} from "lucide-react";
import { toast } from "sonner";
import {
  CONTACT,
  DEPARTMENTS,
  ESTATES,
  PAYMENT_METHODS,
  TIME_WINDOWS,
  waLink,
  type DeptKey,
} from "@/lib/data";
import { DEPT_HOURS, fmtRange, DAY_NAMES } from "@/lib/data";
import { getDeptStatus } from "@/lib/hours";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { Reveal } from "./reveal";

const inputCls =
  "w-full rounded-xl border border-line bg-white px-4 py-3 text-[15px] font-medium text-ink placeholder:text-ink-soft/50 transition-colors focus:border-leaf focus:outline-none";
const labelCls = "mb-1.5 block text-[13px] font-bold text-forest";

const DEPT_LABELS: Record<string, string> = Object.fromEntries(DEPARTMENTS.map((d) => [d.key, d.name]));

function todayISO() {
  const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Nairobi" });
  return fmt.format(new Date()); // YYYY-MM-DD
}

interface Success {
  ref: string;
  fullName: string;
  department: string;
  preferredDate: string;
  timeWindow: string;
}

export function Booking() {
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    nationalId: "",
    estate: "",
    phone: "",
    email: "",
    department: "gp" as DeptKey,
    practitioner: "",
    preferredDate: "",
    timeWindow: "morning",
    paymentMethod: "sha",
    notes: "",
    consent: false,
    company: "", // honeypot
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<Success | null>(null);
  const [highlight, setHighlight] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const v = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((er) => ({ ...er, [k]: "" }));
  };

  // Preselect department when other sections dispatch "afya:book"
  useEffect(() => {
    const handler = (e: Event) => {
      const dept = (e as CustomEvent<{ department: DeptKey }>).detail?.department;
      if (dept) {
        setForm((f) => ({ ...f, department: dept }));
        setSuccess(null);
        setHighlight(true);
        const t = setTimeout(() => setHighlight(false), 1600);
        return () => clearTimeout(t);
      }
    };
    window.addEventListener("afya:book", handler);
    return () => window.removeEventListener("afya:book", handler);
  }, []);

  const minDate = useMemo(() => todayISO(), []);
  const deptHours = DEPT_HOURS[form.department];
  const todayIdx = getDeptStatus(form.department).dayIndex;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    // light client-side checks (server re-validates)
    const errs: Record<string, string> = {};
    if (form.fullName.trim().length < 3) errs.fullName = "Please enter your full name";
    if (!/^(\+?254|0)[17]\d{8}$/.test(form.phone.replace(/\s+/g, ""))) errs.phone = "e.g. 0712 345 678 or +254712345678";
    if (!form.estate) errs.estate = "Choose your area";
    if (!form.preferredDate) errs.preferredDate = "Pick a visit date";
    if (!form.consent) errs.consent = "We need your consent to proceed";
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error("A few details need attention");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setSuccess({
          ref: data.ref,
          fullName: form.fullName,
          department: DEPT_LABELS[form.department] ?? form.department,
          preferredDate: form.preferredDate,
          timeWindow: TIME_WINDOWS.find((t) => t.value === form.timeWindow)?.label ?? form.timeWindow,
        });
        toast.success("Appointment request received!");
      } else {
        if (data.fieldErrors) setErrors(data.fieldErrors);
        toast.error(data.error ?? "Booking failed — please try again");
      }
    } catch {
      toast.error("Network issue — check your connection or call us");
    } finally {
      setSubmitting(false);
    }
  }

  const waConfirm = success
    ? waLink(
        `Hello Afyamax, I have booked an appointment.\nRef: ${success.ref}\nName: ${success.fullName}\nDepartment: ${success.department}\nDate: ${success.preferredDate} (${success.timeWindow})`
      )
    : "#";

  return (
    <section id="book" className="relative scroll-mt-24 py-20 sm:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          align="center"
          eyebrow="Book an appointment"
          title={
            <>
              Reserve your slot in <em className="text-leaf italic">under two minutes</em>
            </>
          }
          lead="Fill this in and our front desk will confirm your time by SMS or WhatsApp. Prefer talking? Call or WhatsApp us — whichever feels easiest."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Side info */}
          <Reveal className="flex flex-col gap-4">
            <div className="rounded-3xl bg-forest p-7 text-cream shadow-lift">
              <h3 className="font-display text-xl font-semibold">What happens next</h3>
              <ol className="mt-4 space-y-3.5 text-sm leading-relaxed text-cream/85">
                {[
                  "We receive your request instantly.",
                  "The front desk confirms your slot by SMS or WhatsApp.",
                  "You get a reminder before the visit — with anything you should bring or fast for.",
                  "Walk in, mention your reference, and we take it from there.",
                ].map((s, i) => (
                  <li key={s} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cream/10 text-xs font-bold text-gold">
                      {i + 1}
                    </span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href={`tel:${CONTACT.mainPhone}`}
                className="flex items-center gap-4 rounded-3xl border border-line bg-white/80 p-5 transition-all hover:-translate-y-0.5 hover:border-leaf/50 hover:shadow-lift"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sage text-forest">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-bold text-forest">{CONTACT.mainPhoneDisplay}</span>
                  <span className="block text-xs font-medium text-ink-soft">Call the front desk</span>
                </span>
              </a>
              <a
                href={waLink("Hello Afyamax, I would like to book an appointment.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-3xl border border-line bg-white/80 p-5 transition-all hover:-translate-y-0.5 hover:border-leaf/50 hover:shadow-lift"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-mint text-leaf">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-bold text-forest">WhatsApp us</span>
                  <span className="block text-xs font-medium text-ink-soft">Fastest first contact</span>
                </span>
              </a>
            </div>

            <div className="flex items-start gap-3 rounded-3xl border border-ember/30 bg-blush p-5">
              <Siren className="mt-0.5 h-5 w-5 shrink-0 text-ember" aria-hidden />
              <p className="text-sm leading-relaxed text-ink">
                <strong className="font-bold text-ember">Emergency?</strong> Chest pain, heavy bleeding,
                breathing difficulty, severe fevers in a child — do not use this form.{" "}
                <a href={`tel:${CONTACT.emergencyPhone}`} className="font-bold underline decoration-ember/50 underline-offset-2">
                  Tap to call {CONTACT.emergencyPhoneDisplay}
                </a>{" "}
                — a nurse answers, 24/7.
              </p>
            </div>
          </Reveal>

          {/* Form / success */}
          <Reveal delay={0.08}>
            <div
              className={cn(
                "rounded-[2rem] border bg-white p-6 shadow-lift transition-all sm:p-9",
                highlight ? "border-gold ring-4 ring-gold/30" : "border-line"
              )}
            >
              {success ? (
                <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-mint">
                    <CheckCircle2 className="h-10 w-10 text-leaf" aria-hidden />
                  </span>
                  <h3 className="mt-6 font-display text-3xl font-semibold text-forest">Karibu, {success.fullName.split(" ")[0]}!</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
                    Your appointment request for <strong className="text-forest">{success.department}</strong> on{" "}
                    <strong className="text-forest">{success.preferredDate}</strong> ({success.timeWindow}) is in.
                    We will confirm shortly.
                  </p>
                  <div className="mt-6 rounded-2xl border-2 border-dashed border-gold bg-gold-soft/50 px-8 py-4">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">Your reference</p>
                    <p className="font-display text-3xl font-bold tracking-wide text-forest">{success.ref}</p>
                  </div>
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    <a
                      href={waConfirm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full bg-leaf px-6 py-3 font-bold text-white transition-all hover:-translate-y-0.5"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden /> Confirm on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => setSuccess(null)}
                      className="rounded-full border border-line px-6 py-3 font-bold text-forest transition-colors hover:border-leaf"
                    >
                      Book another visit
                    </button>
                  </div>
                  <p className="mt-5 text-xs text-ink-soft">
                    Save your reference — mention it at the front desk when you arrive.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="bk-name" className={labelCls}>Full name *</label>
                    <input id="bk-name" className={inputCls} value={form.fullName} onChange={set("fullName")} placeholder="e.g. Grace Wanjiru" autoComplete="name" />
                    {errors.fullName && <p className="mt-1.5 text-xs font-semibold text-ember">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label htmlFor="bk-phone" className={labelCls}>Phone number *</label>
                    <input id="bk-phone" type="tel" inputMode="tel" className={inputCls} value={form.phone} onChange={set("phone")} placeholder="0712 345 678" autoComplete="tel" />
                    {errors.phone && <p className="mt-1.5 text-xs font-semibold text-ember">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="bk-email" className={labelCls}>Email <span className="font-medium text-ink-soft/70">(optional)</span></label>
                    <input id="bk-email" type="email" className={inputCls} value={form.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email" />
                    {errors.email && <p className="mt-1.5 text-xs font-semibold text-ember">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="bk-dob" className={labelCls}>Date of birth <span className="font-medium text-ink-soft/70">(optional)</span></label>
                    <input id="bk-dob" type="date" className={inputCls} value={form.dateOfBirth} onChange={set("dateOfBirth")} max={minDate} />
                  </div>

                  <div>
                    <label htmlFor="bk-id" className={labelCls}>National ID <span className="font-medium text-ink-soft/70">(optional)</span></label>
                    <input id="bk-id" className={inputCls} value={form.nationalId} onChange={set("nationalId")} placeholder="For registration" autoComplete="off" />
                  </div>

                  <div>
                    <label htmlFor="bk-estate" className={labelCls}>Where do you live? *</label>
                    <select id="bk-estate" className={inputCls} value={form.estate} onChange={set("estate")}>
                      <option value="" disabled>Select your estate</option>
                      {ESTATES.map((e) => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
                    {errors.estate && <p className="mt-1.5 text-xs font-semibold text-ember">{errors.estate}</p>}
                  </div>

                  <div>
                    <label htmlFor="bk-dept" className={labelCls}>Department *</label>
                    <select id="bk-dept" className={inputCls} value={form.department} onChange={set("department")}>
                      {DEPARTMENTS.map((d) => (
                        <option key={d.key} value={d.key}>{d.name}</option>
                      ))}
                    </select>
                    <p className="mt-1.5 text-xs font-medium text-ink-soft">
                      Today ({DAY_NAMES[todayIdx]}) ·{" "}
                      {deptHours[todayIdx].kind === "open"
                        ? `open ${fmtRange(deptHours[todayIdx].open, deptHours[todayIdx].close)}`
                        : deptHours[todayIdx].kind === "closed"
                          ? deptHours[todayIdx].label ?? "closed"
                          : deptHours[todayIdx].kind === "emergency-only"
                            ? "emergency / appointment only"
                            : deptHours[todayIdx].kind === "house-calls"
                              ? "house calls only"
                              : "on call"}
                    </p>
                  </div>

                  <div>
                    <label htmlFor="bk-date" className={labelCls}>Preferred date *</label>
                    <input id="bk-date" type="date" min={minDate} className={inputCls} value={form.preferredDate} onChange={set("preferredDate")} />
                    {errors.preferredDate && <p className="mt-1.5 text-xs font-semibold text-ember">{errors.preferredDate}</p>}
                  </div>

                  <div>
                    <label htmlFor="bk-payment" className={labelCls}>Payment method</label>
                    <select id="bk-payment" className={inputCls} value={form.paymentMethod} onChange={set("paymentMethod")}>
                      {PAYMENT_METHODS.map((p) => (
                        <option key={p.value} value={p.value}>{p.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="bk-practitioner" className={labelCls}>
                      Preferred practitioner <span className="font-medium text-ink-soft/70">(optional)</span>
                    </label>
                    <input id="bk-practitioner" className={inputCls} value={form.practitioner} onChange={set("practitioner")} placeholder="e.g. continue with a clinician you have seen before" />
                  </div>

                  <fieldset className="sm:col-span-2">
                    <legend className={labelCls}>Preferred time window *</legend>
                    <div className="grid grid-cols-3 gap-2.5">
                      {TIME_WINDOWS.map((t) => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, timeWindow: t.value }))}
                          aria-pressed={form.timeWindow === t.value}
                          className={cn(
                            "rounded-xl border px-3 py-3 text-center transition-all",
                            form.timeWindow === t.value
                              ? "border-forest bg-forest text-cream shadow-soft"
                              : "border-line bg-white text-ink hover:border-leaf/50"
                          )}
                        >
                          <span className="block text-sm font-bold">{t.label}</span>
                          <span className={cn("mt-0.5 block text-[11px] font-semibold", form.timeWindow === t.value ? "text-cream/70" : "text-ink-soft/70")}>
                            {t.hint}
                          </span>
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div className="sm:col-span-2">
                    <label htmlFor="bk-notes" className={labelCls}>
                      Anything we should know? <span className="font-medium text-ink-soft/70">(optional)</span>
                    </label>
                    <textarea id="bk-notes" rows={3} className={cn(inputCls, "resize-none")} value={form.notes} onChange={set("notes")} placeholder={`Symptoms, in your own words — "pressure", "sukari", hata kwa Sheng ni sawa.`} />
                  </div>

                  {/* honeypot */}
                  <input type="text" name="company" value={form.company} onChange={set("company")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-linen/60 p-4">
                      <input
                        type="checkbox"
                        checked={form.consent}
                        onChange={set("consent")}
                        className="mt-0.5 h-5 w-5 shrink-0 accent-[#12805c]"
                      />
                      <span className="text-[13px] leading-relaxed text-ink-soft">
                        <strong className="text-forest">Consent (required).</strong> I give Afyamax Medical &amp;
                        Dental Centre permission to collect and process these details — including health
                        information — for the sole purpose of arranging my care, under the Kenya Data Protection
                        Act, 2019. My records are protected as sensitive personal data, and I can withdraw this
                        consent at any time.
                      </span>
                    </label>
                    {errors.consent && <p className="mt-1.5 text-xs font-semibold text-ember">{errors.consent}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex h-14 items-center justify-center gap-2.5 rounded-full bg-forest font-bold text-cream shadow-soft transition-all hover:-translate-y-0.5 hover:bg-pine hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin text-gold" aria-hidden />
                        Sending your request…
                      </>
                    ) : (
                      <>
                        <CalendarCheck className="h-5 w-5 text-gold" aria-hidden />
                        Request appointment
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-ink-soft sm:col-span-2">
                    No pre-ticked boxes, no hidden processing — your consent is explicit, exactly as the law
                    requires.
                  </p>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
