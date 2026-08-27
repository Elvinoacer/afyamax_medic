import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const phoneRe = /^(\+?254|0)[17]\d{8}$/; // Kenyan mobile: 07XXXXXXXX / +2547XXXXXXXX

const appointmentSchema = z.object({
  fullName: z.string().trim().min(3, "Please enter your full name").max(120),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date")
    .optional()
    .or(z.literal("")),
  nationalId: z.string().trim().max(40).optional().or(z.literal("")),
  estate: z.string().trim().min(2, "Where do you live?").max(80),
  phone: z
    .string()
    .trim()
    .transform((v) => v.replace(/\s+/g, ""))
    .refine((v) => phoneRe.test(v), "Use a Kenyan number e.g. 0712 345 678 or +254712345678"),
  email: z.string().trim().email("Invalid email").optional().or(z.literal("")),
  department: z.enum(["gp", "dental", "surgery", "physio", "phyto"]),
  practitioner: z.string().trim().max(80).optional().or(z.literal("")),
  preferredDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a visit date"),
  timeWindow: z.enum(["morning", "midday", "afternoon"]),
  paymentMethod: z.enum(["sha", "insurance", "cash", "mpesa", "corporate"]),
  notes: z.string().trim().max(1200).optional().or(z.literal("")),
  consent: z.literal(true, { message: "Consent is required to process your booking" }),
  // honeypot — must stay empty
  company: z.string().max(0).optional().or(z.literal("")),
});

function makeRef() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `AFY-${out}`;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields", fieldErrors }, { status: 422 });
  }

  const d = parsed.data;
  try {
    const appointment = await db.appointment.create({
      data: {
        ref: makeRef(),
        fullName: d.fullName,
        dateOfBirth: d.dateOfBirth || null,
        nationalId: d.nationalId || null,
        estate: d.estate,
        phone: d.phone,
        email: d.email || null,
        department: d.department,
        practitioner: d.practitioner || null,
        preferredDate: d.preferredDate,
        timeWindow: d.timeWindow,
        paymentMethod: d.paymentMethod,
        notes: d.notes || null,
        consent: true,
      },
    });

    return NextResponse.json({ ok: true, ref: appointment.ref }, { status: 201 });
  } catch (err) {
    console.error("appointment create failed", err);
    return NextResponse.json(
      { ok: false, error: "We could not save your booking. Please try again or call us." },
      { status: 500 }
    );
  }
}
