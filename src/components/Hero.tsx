"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin, Phone, Sparkles } from "lucide-react";
import { site } from "@/lib/site";

/** Slides 01 & 02 removed — start from sparkling magic clean */
const slides = [
  {
    id: 1,
    image: "/images/magic-sparkle-clean.jpg",
    label: "Magic sparkling clean",
  },
  {
    id: 2,
    image: "/images/process-restaurant-clean.jpg",
    label: "Restaurant floors",
  },
  {
    id: 3,
    image: "/images/cleaner-vacuum.jpg",
    label: "Homes that shine",
  },
  {
    id: 4,
    image: "/images/clean-restaurant.jpg",
    label: "Venues & dining rooms",
  },
  {
    id: 5,
    image: "/images/service-kitchen.jpg",
    label: "Spotless kitchens",
  },
  {
    id: 6,
    image: "/images/process-steam.jpg",
    label: "Spotless kitchens",
  },
] as const;

function SparkleField() {
  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full" aria-hidden>
      <span className="sparkle sparkle-a" />
      <span className="sparkle sparkle-b" />
      <span className="sparkle sparkle-c" />
      <span className="sparkle sparkle-d" />
      <span className="sparkle sparkle-e" />
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [reduce]);

  return (
    <section
      className="relative isolate overflow-hidden text-white"
      aria-labelledby="hero-brand"
    >
      <div className="absolute inset-0 -z-10 bg-[#041e24]">
        {slides.map((item, i) => (
          <motion.div
            key={item.id}
            className="absolute inset-0"
            initial={false}
            animate={{
              opacity: i === index ? 1 : 0,
            }}
            transition={{
              opacity: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
            }}
            style={{ zIndex: i === index ? 1 : 0 }}
          >
            <Image
              src={item.image}
              alt=""
              fill
              priority={i < 2}
              sizes="100vw"
              className="object-contain object-center"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 z-[2] bg-[linear-gradient(115deg,rgba(4,30,36,0.88)_0%,rgba(4,30,36,0.55)_48%,rgba(4,30,36,0.3)_100%)]" />
        <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_75%_20%,rgba(240,184,74,0.16),transparent_40%)]" />
        {!reduce && (
          <div className="hero-stars absolute inset-0 z-[3] pointer-events-none" aria-hidden />
        )}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100svh-76px)] max-w-6xl flex-col justify-end px-5 pb-28 pt-16 lg:px-8 lg:pb-32">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
            {/* Professional availability badge with sparkle stars */}
            <div className="availability-badge relative mb-5 inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-gold/50 bg-[rgba(8,40,44,0.55)] px-5 py-2.5 shadow-[0_0_24px_rgba(240,184,74,0.22)] backdrop-blur-md">
              <SparkleField />
              <Sparkles className="relative z-[1] size-4 text-gold" aria-hidden />
              <span className="relative z-[1] text-sm font-semibold tracking-wide text-gold">
                {site.availability}
              </span>
              <span className="relative z-[1] text-gold/80" aria-hidden>
                ✦
              </span>
            </div>

            <p
              id="hero-brand"
              className="brand-glow mb-3 font-display text-[clamp(3rem,8vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.04em]"
            >
              Magic Cleaning
            </p>

            <div className="mb-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
              <span className="text-gold" aria-hidden>
                ✦
              </span>
              <span className="text-sm font-bold tracking-[0.08em] text-teal uppercase">
                Special offer · free quote
              </span>
            </div>

            <h1 className="mb-4 max-w-[18ch] font-display text-[clamp(1.4rem,3vw,2rem)] font-bold leading-[1.2] tracking-[-0.02em] text-white/95">
              Simplify life. Gain back your free time.
            </h1>

            <p className="mb-3 max-w-[40ch] text-lg leading-relaxed text-white/82">
              House, office and restaurant cleaning from Huntingdonshire 
              and Cambridgeshire Areas.<br></br>
              Friendly team — ready to start immediately.
            </p>

            {/* <p className="mb-7 text-sm font-medium tracking-wide text-gold/90">
              {slides[index].label}
            </p> */}

            <div className="mb-6 flex flex-wrap gap-2">
              {site.counties.map((county) => (
                <span
                  key={county}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm"
                >
                  <MapPin className="size-3.5 opacity-80" aria-hidden />
                  {county}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3.5 text-[1.02rem] font-semibold text-ink transition hover:brightness-105"
              >
                Get Quote ⭐
                <ArrowRight className="size-4" aria-hidden />
              </a>
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3.5 text-[1.02rem] font-semibold backdrop-blur-sm transition hover:bg-white/18"
              >
                <Phone className="size-4" aria-hidden />
                {site.phoneDisplay}
              </a>
            </div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 leading-none">
        <svg
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          className="h-[70px] w-full fill-foam sm:h-[90px]"
          aria-hidden
        >
          <path d="M0,50 C180,95 360,10 540,40 C720,70 900,100 1080,55 C1260,10 1380,35 1440,50 L1440,90 L0,90 Z" />
          <path
            d="M0,62 C220,20 420,90 640,58 C860,26 1100,10 1440,48 L1440,90 L0,90 Z"
            className="fill-white"
            opacity="0.95"
          />
        </svg>
      </div>
    </section>
  );
}
