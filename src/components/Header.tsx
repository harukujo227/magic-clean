"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background,box-shadow,border-color] duration-300",
        scrolled
          ? "border-line bg-white/95 shadow-[0_8px_30px_rgba(6,38,44,0.06)] backdrop-blur-xl"
          : "border-transparent bg-white/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link href="#top" className="shrink-0" aria-label="Magic Clean home">
          <Image
            src="/images/magicclean-logo-transparent.png"
            alt="Magic Clean Cleaning Services"
            width={320}
            height={213}
            priority
            unoptimized
            className="h-[3.75rem] w-auto sm:h-[4.25rem]"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-teal"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-full border border-line bg-mist/70 px-3.5 py-2 text-sm font-semibold text-teal transition hover:border-teal/30 hover:bg-mist md:inline-flex"
          >
            <Phone className="size-4" aria-hidden />
            {site.phoneDisplay}
          </a>
          <a
            href="#contact"
            className="hidden rounded-full bg-teal px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(11,107,114,0.28)] transition hover:bg-teal-deep sm:inline-flex"
          >
            Free estimate
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-line bg-white px-5 py-5 lg:hidden"
        >
          <div className="grid gap-1">
            {site.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 font-semibold text-ink hover:bg-mist"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={site.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-teal px-4 py-3.5 font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              <Phone className="size-4" />
              {site.phoneDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
