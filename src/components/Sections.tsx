"use client";

import Image from "next/image";
import {
  Building2,
  Clock3,
  Home,
  Leaf,
  ShieldCheck,
  Star,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const highlightServices: { title: string; body: string; icon: string }[] = [
  {
    title: "Standard cleaning",
    body: "Regular upkeep that keeps homes and offices consistently fresh.",
    icon: "/images/service-icons/standard.png",
  },
  {
    title: "Deep cleaning",
    body: "One-off refreshes that reach the details everyday cleaning misses.",
    icon: "/images/service-icons/deep.png",
  },
  {
    title: "Window washing",
    body: "Clear glass inside and out for brighter rooms and reception areas.",
    icon: "/images/service-icons/window.png",
  },
  {
    title: "Floor care",
    body: "Vacuuming, mopping and careful floor finishes that look sharp.",
    icon: "/images/service-icons/floor.png",
  },
  {
    title: "Ironing",
    body: "Optional ironing support so laundry doesn’t eat your evening.",
    icon: "/images/service-icons/ironing.png",
  },
  {
    title: "Porch & patio",
    body: "Entrance and outdoor tidy-ups that make a strong first impression.",
    icon: "/images/service-icons/patio.png",
  },
];

const reasons: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: "Ready to start immediately",
    body: "Need a clean today or this week? Same-day and urgent bookings are welcome across the area.",
    icon: Zap,
  },
  {
    title: "High-quality results",
    body: "Thorough, consistent cleaning finished to a professional standard — every visit.",
    icon: Star,
  },
  {
    title: "On time, every time",
    body: "We value your schedule and complete work within the agreed window.",
    icon: Clock3,
  },
  {
    title: "Trusted & DBS checked",
    body: "References available and DBS-checked professionals for real peace of mind.",
    icon: ShieldCheck,
  },
];

const residential = [
  "Regular / standard cleaning",
  "Deep & one-off cleans",
  "Window cleaning",
  "Ironing",
  "Floor cleaning",
  "Porch & patio tidy-up",
];

const commercial = [
  "Offices",
  "Pubs & restaurants",
  "Reception & shared spaces",
  "Flexible scheduling",
  "Dusting & vacuuming",
  "Presentable finish for guests",
];

export function Intro() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-aqua/10 blur-3xl" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-14 lg:px-8 lg:py-24">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-aqua">
            Welcome
          </p>
          <h2 className="mb-5 font-display text-[clamp(1.9rem,3.8vw,2.8rem)] leading-[1.1] tracking-[-0.03em] text-ink">
            Cleaning that feels worth coming home to
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-ink-soft">
            Looking for a reliable, experienced cleaner in {site.area}? Magic
            Cleaning delivers high-quality house and office cleaning with a
            professional, friendly approach.
          </p>
          <p className="mb-6 text-lg leading-relaxed text-ink-soft">
            From regular weekly visits to one-off deep cleans, we help you
            reclaim your time — and if you need us sooner, we&apos;re ready to
            work immediately.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-teal/20 bg-mist px-4 py-2 text-sm font-semibold text-teal">
            <span className="size-2 rounded-full bg-teal" />
            {site.availability}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[0_28px_70px_rgba(6,38,44,0.16)] sm:aspect-[4/3] lg:aspect-[5/4]">
            <Image
              src="/images/service-kitchen.jpg"
              alt="Bright professionally cleaned kitchen ready for everyday living"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute -bottom-4 left-4 right-4 grid grid-cols-2 gap-3 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[70%]">
            {[
              { label: "Vetted team", value: "DBS checked" },
              { label: "Start when?", value: "Immediately" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/60 bg-white/95 p-4 shadow-[0_12px_30px_rgba(6,38,44,0.12)] backdrop-blur-sm"
              >
                <p className="text-xs font-medium text-ink-soft">{item.label}</p>
                <p className="mt-1 font-display text-lg tracking-tight text-ink">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceHighlights() {
  return (
    <section id="services" className="relative overflow-hidden bg-mist/70">
      <div className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-aqua/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-aqua">
            What we offer
          </p>
          <h2 className="mb-4 font-display text-[clamp(1.9rem,3.8vw,2.8rem)] tracking-[-0.03em] text-ink">
            Services for every space
          </h2>
          <p className="text-lg text-ink-soft">
            Residential and commercial cleaning tailored to how you live and
            work.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {highlightServices.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05}>
              <article className="service-card group h-full">
                <div className="service-card-shine" aria-hidden />
                <div className="relative z-10 flex h-full flex-col rounded-[1.15rem] bg-white p-6">
                  <div className="mb-5 inline-flex size-16 items-center justify-center rounded-2xl bg-mist/80 ring-1 ring-teal/10 transition duration-300 group-hover:bg-teal/8 group-hover:ring-teal/25">
                    <Image
                      src={service.icon}
                      alt=""
                      width={56}
                      height={56}
                      unoptimized
                      className="size-12 object-contain transition duration-500 group-hover:scale-110 group-hover:-rotate-3"
                    />
                  </div>
                  <h3 className="mb-2 font-display text-xl tracking-tight text-ink">
                    {service.title}
                  </h3>
                  <p className="leading-relaxed text-ink-soft">{service.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl">
              <Image
                src="/images/service-kitchen.jpg"
                alt="Professionally cleaned kitchen"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur-sm">
                  <Home className="size-4" />
                  Residential
                </div>
                <ul className="grid gap-1.5 text-white/90 sm:grid-cols-2">
                  {residential.map((item) => (
                    <li key={item} className="text-sm font-medium">
                      · {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative min-h-[320px] overflow-hidden rounded-3xl">
              <Image
                src="/images/clean-restaurant.jpg"
                alt="Professionally cleaned restaurant dining room"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/85 via-ink/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur-sm">
                  <Building2 className="size-4" />
                  Commercial
                </div>
                <ul className="grid gap-1.5 text-white/90 sm:grid-cols-2">
                  {commercial.map((item) => (
                    <li key={item} className="text-sm font-medium">
                      · {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Transformation() {
  const comparisons = [
    {
      title: "Stove cleaning",
      caption: "Kitchen appliance deep cleaning",
      before: "/images/ba-stove-before.jpg",
      after: "/images/ba-stove-after.jpg",
    },
    {
      title: "Shower deep clean",
      caption: "Tile & grout restoration",
      before: "/images/ba-shower-before.jpg",
      after: "/images/ba-shower-after.jpg",
    },
    {
      title: "Kitchen sink cleaning",
      caption: "Drain and basin refresh",
      before: "/images/ba-sink-before.jpg",
      after: "/images/ba-sink-after.jpg",
    },
    {
      title: "Office desk reset",
      caption: "Messy workspace → polished & organised",
      before: "/images/ba-office-before.jpg",
      after: "/images/ba-office-after.jpg",
    },
  ] as const;

  return (
    <section id="results" className="bg-mist/50">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-aqua">
            Cleaning transformation
          </p>
          <h2 className="mb-4 font-display text-[clamp(1.9rem,3.8vw,2.8rem)] tracking-[-0.03em] text-ink">
            Drag to compare before &amp; after
          </h2>
          <p className="text-lg text-ink-soft">
            Move the centre line on each card to see the full transformation.
          </p>
        </header>

        <div className="grid gap-5 sm:grid-cols-2">
          {comparisons.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <article className="overflow-hidden rounded-2xl border border-line bg-white p-4 shadow-[0_14px_40px_rgba(6,38,44,0.06)] sm:p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <a
                    href="#contact"
                    className="shrink-0 text-sm font-semibold text-teal hover:text-teal-deep"
                  >
                    Book this
                  </a>
                </div>
                <BeforeAfterSlider
                  beforeSrc={item.before}
                  afterSrc={item.after}
                  alt={`${item.title} before and after`}
                />
                <p className="mt-3 text-sm text-ink-soft">{item.caption}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.08}>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem]">
              <Image
                src="/images/clean-restaurant.jpg"
                alt="Spotless restaurant dining room ready for guests"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div className="rounded-[1.5rem] border border-line bg-white p-7 sm:p-9">
              <h3 className="mb-3 font-display text-2xl tracking-tight text-ink">
                Friendly professionals, serious results
              </h3>
              <p className="mb-5 text-lg leading-relaxed text-ink-soft">
                Our team arrives with a smile and leaves your space looking
                transformed — homes, offices and restaurants across the region.
              </p>
              <ul className="grid gap-3 text-ink">
                <li className="flex items-start gap-3">
                  <Zap className="mt-0.5 size-5 shrink-0 text-teal" />
                  <span>
                    <strong className="font-semibold">Immediate starts</strong>
                    {" — "}same-day and ASAP bookings welcome.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Leaf className="mt-0.5 size-5 shrink-0 text-teal" />
                  <span>
                    <strong className="font-semibold">Careful methods</strong>
                    {" — "}family-friendly approach for homes and workplaces.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-5 shrink-0 text-teal" />
                  <span>
                    <strong className="font-semibold">Trusted locally</strong>
                    {" — "}DBS checked with references available.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function WhyUs() {
  return (
    <section id="why" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-aqua">
              Why choose us
            </p>
            <h2 className="mb-5 font-display text-[clamp(1.9rem,3.8vw,2.8rem)] tracking-[-0.03em] text-ink">
              Excellence, punctuality and care
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-ink-soft">
              When you hire a cleaner, you want quality you can see and service
              you can rely on. That’s the standard we work to — in homes,
              offices, pubs and restaurants across the region.
            </p>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 rounded-full bg-teal px-5 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(11,107,114,0.25)] transition hover:bg-teal-deep"
            >
              Call {site.phoneDisplay}
            </a>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <article className="why-card group h-full rounded-2xl border border-line bg-foam p-6 transition duration-300 hover:-translate-y-1 hover:border-teal/30 hover:bg-white hover:shadow-[0_18px_40px_rgba(6,38,44,0.08)]">
                  <div className="mb-4 inline-flex size-11 items-center justify-center rounded-full bg-teal text-white transition duration-300 group-hover:scale-110 group-hover:shadow-[0_0_0_6px_rgba(42,160,176,0.18)]">
                    <item.icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="mb-2 font-display text-lg tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="leading-relaxed text-ink-soft">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsBand() {
  const stats = [
    { value: "Now", label: "Ready to start immediately" },
    { value: "DBS", label: "Checked professionals" },
    { value: "Local", label: "Cambs & Huntingdonshire" },
    { value: "Refs", label: "References available" },
  ];

  return (
    <section className="border-y border-line bg-teal text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center lg:text-left">
            <p className="font-display text-3xl tracking-tight">{stat.value}</p>
            <p className="mt-1 text-sm text-white/75">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Areas() {
  return (
    <section id="areas" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/clean-restaurant.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/78" />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 py-20 text-white lg:px-8 lg:py-24">
        <Reveal>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-aqua-soft">
            Coverage
          </p>
          <h2 className="mb-4 max-w-xl font-display text-[clamp(1.9rem,3.8vw,2.8rem)] tracking-[-0.03em]">
            Serving Cambridgeshire &amp; Huntingdonshire
          </h2>
          <p className="mb-8 max-w-xl text-lg text-white/80">
            Local cleaning for houses and workplaces across the region —
            including surrounding villages.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {site.towns.map((town) => (
              <span
                key={town}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm"
              >
                {town}
              </span>
            ))}
            <span className="rounded-full border border-gold/40 bg-gold/15 px-4 py-2 text-sm font-medium text-gold">
              + surrounding villages
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-14 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-linear-to-br from-teal-deep to-teal px-7 py-9 text-white shadow-[0_24px_60px_rgba(8,79,84,0.28)] sm:flex-row sm:items-center sm:px-10">
            <div>
              <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                <Zap className="size-3.5" />
                Available immediately
              </p>
              <h2 className="font-display text-2xl tracking-tight sm:text-3xl">
                Need a clean today? We can help
              </h2>
              <p className="mt-2 text-white/80">
                Tell us your address and preferred work style — we&apos;ll
                confirm a start time as soon as possible.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex rounded-full bg-gold px-5 py-3 font-semibold text-ink transition hover:brightness-105"
              >
                Book immediate clean
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex rounded-full border border-white/35 bg-white/10 px-5 py-3 font-semibold backdrop-blur-sm transition hover:bg-white/18"
              >
                {site.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
