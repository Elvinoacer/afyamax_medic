import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name").max(120),
  contact: z.string().trim().min(5, "How do we reach you? (phone or email)").max(120),
  topic: z.enum(["general", "phyto", "corporate", "feedback"]).optional().default("general"),
  message: z.string().trim().min(5, "Tell us briefly how we can help").max(2000),
  consent: z.literal(true, { message: "Consent is required before we can reply" }),
  // honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields", fieldErrors }, { status: 422 });
  }

  try {
    await db.inquiry.create({
      data: {
        name: parsed.data.name,
        contact: parsed.data.contact,
        topic: parsed.data.topic ?? "general",
        message: parsed.data.message,
        consent: true,
      },
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("inquiry create failed", err);
    return NextResponse.json({ ok: false, error: "Message could not be sent. Please try WhatsApp or a call." }, { status: 500 });
  }
}
