"use client";

import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Home, Loader2, Mail, MapPin, Phone, Send, Zap } from "lucide-react";
import { site } from "@/lib/site";

const serviceOptions = [
  "Regular house cleaning",
  "One-off / deep clean",
  "Office cleaning",
  "Pub / restaurant",
  "Windows / floors / other",
] as const;

const fieldClass =
  "w-full rounded-xl border border-line bg-white px-4 py-3.5 text-ink outline-none transition placeholder:text-ink-soft/55 focus:border-aqua focus:shadow-[0_0_0_4px_rgba(42,160,176,0.15)]";

type StatusKind = "idle" | "loading" | "success" | "error";

const UK_DIAL_CODE = "44";

function formatUkPhone(local: string) {
  const digits = local.replace(/\D/g, "").replace(/^0+/, "");
  return digits ? `+${UK_DIAL_CODE}${digits}` : "";
}

export function Contact() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState("");
  const [kind, setKind] = useState<StatusKind>("idle");
  const [phoneLocal, setPhoneLocal] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const street = String(data.get("address") || "").trim();
    const postcode = String(data.get("postcode") || "").trim().toUpperCase();

    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: formatUkPhone(phoneLocal),
      email: String(data.get("email") || "").trim(),
      address: street,
      postcode,
      workStyle: String(data.get("workStyle") || "").trim(),
      service: String(data.get("service") || "").trim(),
      message: String(data.get("message") || "").trim(),
      company: String(data.get("company") || ""),
    };

    if (
      !payload.name ||
      !payload.phone ||
      !payload.email ||
      !payload.address ||
      !payload.postcode ||
      !payload.workStyle ||
      !payload.service
    ) {
      setKind("error");
      setStatus("Please fill in the required fields.");
      return;
    }

    setKind("loading");
    setStatus("Sending your enquiry…");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };

      if (!res.ok || !result.ok) {
        setKind("error");
        setStatus(
          result.error ||
            "Could not send. Please call us or email directly.",
        );
        return;
      }

      setKind("success");
      setStatus("Sent — thank you! We’ll get back to you as soon as possible.");
      form.reset();
      setPhoneLocal("");
    } catch {
      setKind("error");
      setStatus("Network error. Please try again or call us.");
    }
  }

  return (
    <section id="contact" className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-aqua">
            Contact
          </p>
          <h2 className="mb-4 font-display text-[clamp(1.9rem,3.8vw,2.8rem)] tracking-[-0.03em] text-ink">
            Book your free estimate
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-ink-soft">
            Share your home address and preferred work style. If you need us
            right away, choose same-day / ASAP — we&apos;re available to start
            immediately.
          </p>

          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-4 py-2 text-sm font-semibold text-gold">
            <Zap className="size-4" aria-hidden />
            {site.availability}
          </div>

          <div className="grid gap-3">
            <a
              href={site.phoneHref}
              className="group flex items-start gap-4 rounded-2xl border border-line bg-mist/50 p-5 transition hover:border-teal/30 hover:bg-mist"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                <Phone className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-semibold uppercase tracking-[0.12em] text-ink-soft">
                  Phone
                </span>
                <span className="mt-1 block text-lg font-semibold text-teal group-hover:text-teal-deep">
                  {site.phoneDisplay}
                </span>
              </span>
            </a>

            <a
              href={site.emailHref}
              className="group flex items-start gap-4 rounded-2xl border border-line bg-mist/50 p-5 transition hover:border-teal/30 hover:bg-mist"
            >
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                <Mail className="size-5" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-semibold uppercase tracking-[0.12em] text-ink-soft">
                  Email
                </span>
                <span className="mt-1 block break-all text-lg font-semibold text-teal group-hover:text-teal-deep">
                  {site.email}
                </span>
              </span>
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-line bg-mist/50 p-5">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                <MapPin className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-soft">
                  Company address
                </p>
                {/* <p className="mt-1 text-lg font-semibold text-ink">
                  {site.companyAddress.line1}
                </p> */}
                <p className="text-ink-soft">{site.companyAddress.line2}</p>
                <p className="text-ink-soft">{site.companyAddress.line3}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-line bg-mist/50 p-5">
              <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                <Home className="size-5" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ink-soft">
                  Service area
                </p>
                <p className="mt-1 text-lg font-semibold text-ink">{site.area}</p>
              </div>
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          className="rounded-3xl border border-line bg-foam p-6 shadow-[0_24px_60px_rgba(6,38,44,0.08)] sm:p-8"
          noValidate
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 flex items-center gap-2 rounded-xl border border-teal/15 bg-teal/5 px-4 py-3 text-sm font-medium text-teal">
            <Home className="size-4 shrink-0" aria-hidden />
            Include your home address so we can plan an immediate visit.
          </div>

          {/* Honeypot — hidden from users */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            aria-hidden
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" htmlFor="name">
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Your name"
                className={fieldClass}
              />
            </Field>

            <div className="grid gap-1.5">
              <span className="text-sm font-semibold text-ink-soft" id="phone-label">
                Phone
              </span>
              <div className="flex gap-2">
                <div
                  className="flex shrink-0 items-center gap-2 rounded-xl border border-line bg-mist/70 px-3 py-3.5"
                  aria-hidden
                >
                  <UkFlag className="h-4 w-[1.35rem] rounded-[2px] shadow-sm" />
                  <span className="text-sm font-semibold tabular-nums text-ink">
                    +{UK_DIAL_CODE}
                  </span>
                </div>
                <input
                  id="phone"
                  name="phoneLocal"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  required
                  value={phoneLocal}
                  onChange={(e) =>
                    setPhoneLocal(e.target.value.replace(/[^\d\s]/g, ""))
                  }
                  placeholder="7400 126 612"
                  className={fieldClass}
                  aria-labelledby="phone-label"
                  aria-describedby="phone-country"
                />
                <span id="phone-country" className="sr-only">
                  United Kingdom country code +44 is fixed and cannot be changed
                </span>
              </div>
            </div>

            <Field label="Email" htmlFor="email" className="sm:col-span-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className={fieldClass}
              />
            </Field>

            <Field
              label="Home address"
              htmlFor="address"
              className="sm:col-span-2"
            >
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
                required
                placeholder="House number, street, town"
                className={fieldClass}
              />
            </Field>

            <Field label="Postcode" htmlFor="postcode" className="sm:col-span-2 sm:max-w-xs">
              <input
                id="postcode"
                name="postcode"
                type="text"
                autoComplete="postal-code"
                required
                placeholder="e.g. PE7 3JZ"
                className={`${fieldClass} uppercase`}
              />
            </Field>

            <Field label="Work style" htmlFor="workStyle">
              <select
                id="workStyle"
                name="workStyle"
                required
                defaultValue=""
                className={fieldClass}
              >
                <option value="" disabled>
                  How should we work?
                </option>
                {site.workStyles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Service type" htmlFor="service">
              <select
                id="service"
                name="service"
                required
                defaultValue=""
                className={fieldClass}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {serviceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label="Extra details"
              htmlFor="message"
              className="sm:col-span-2"
            >
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Property size, access notes, preferred start time…"
                className={fieldClass}
              />
            </Field>
          </div>

          <button
            type="submit"
            disabled={kind === "loading"}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-teal px-6 py-4 text-[1.02rem] font-semibold text-white shadow-[0_14px_30px_rgba(11,107,114,0.28)] transition hover:bg-teal-deep disabled:cursor-not-allowed disabled:opacity-70"
          >
            {kind === "loading" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <Send className="size-4" aria-hidden />
            )}
            {kind === "loading" ? "Sending…" : "Send enquiry — start ASAP"}
          </button>
          <p
            className={`mt-3 min-h-[1.4em] text-center text-sm font-medium ${
              kind === "error"
                ? "text-red-600"
                : kind === "success"
                  ? "text-teal"
                  : "text-ink-soft"
            }`}
            role="status"
          >
            {status}
          </p>
        </motion.form>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-1.5 ${className ?? ""}`}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink-soft">
        {label}
      </label>
      {children}
    </div>
  );
}

function UkFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={className}
      role="img"
      aria-label="United Kingdom"
    >
      <title>United Kingdom</title>
      <rect width="60" height="40" fill="#012169" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" strokeWidth="8" />
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="5" />
      <path d="M30 0 V40 M0 20 H60" stroke="#fff" strokeWidth="13" />
      <path d="M30 0 V40 M0 20 H60" stroke="#C8102E" strokeWidth="7" />
    </svg>
  );
}
