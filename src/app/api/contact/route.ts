import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(120),
  address: z.string().trim().min(3).max(300),
  workStyle: z.string().trim().min(1).max(120),
  service: z.string().trim().min(1).max(120),
  message: z.string().trim().max(2000).optional().default(""),
  company: z.string().optional(), // honeypot
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = schema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form and try again." },
        { status: 400 },
      );
    }

    // Silent success for bots that fill honeypot
    if (parsed.data.company) {
      return NextResponse.json({ ok: true });
    }

    const { name, phone, email, address, workStyle, service, message } =
      parsed.data;
    const to = process.env.CONTACT_TO_EMAIL || "monika.mirga@yahoo.co.uk";
    const subject = `Magic Cleaning quote — ${workStyle} / ${service}`;
    const text = [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Home address: ${address}`,
      `Work style: ${workStyle}`,
      `Service: ${service}`,
      "",
      "Details:",
      message || "(none)",
    ].join("\n");

    // Optional: Resend (set RESEND_API_KEY in .env.local)
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from:
            process.env.CONTACT_FROM_EMAIL ||
            "Magic Cleaning <onboarding@resend.dev>",
          to: [to],
          reply_to: email,
          subject,
          text,
        }),
      });

      if (!res.ok) {
        const detail = await res.text();
        console.error("Resend error:", detail);
        return NextResponse.json(
          { error: "Could not send your enquiry. Please call us." },
          { status: 502 },
        );
      }

      return NextResponse.json({ ok: true });
    }

    // Default: FormSubmit — delivers to inbox (activate once via confirmation email)
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(to)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          workStyle,
          service,
          message: message || "(none)",
          _subject: subject,
          _template: "table",
          _captcha: "false",
          _replyto: email,
        }),
      },
    );

    if (!res.ok) {
      const detail = await res.text();
      console.error("FormSubmit error:", detail);
      return NextResponse.json(
        { error: "Could not send your enquiry. Please call us." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
