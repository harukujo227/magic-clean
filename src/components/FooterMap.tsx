"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, MapPinned } from "lucide-react";

const MAP_QUERY = encodeURIComponent(
  "30 Pheasant Way, Yaxley, Peterborough, Cambridgeshire, United Kingdom",
);
/** Official-style embed — native Ctrl+scroll zoom, free drag to pan */
const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&hl=en&z=16&output=embed`;
const MAP_OPEN = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

/**
 * Map pattern inspired by Famous Cleaning contact page:
 * loads when scrolled into view; fully interactive drag/pan.
 * Zoom uses Google’s cooperative Ctrl + scroll.
 */
export function FooterMap() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-aqua-soft">
          Find us
        </p>
        <a
          href={MAP_OPEN}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-aqua-soft hover:text-white"
        >
          Open in Maps
          <ExternalLink className="size-3" aria-hidden />
        </a>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/15 bg-ink/40 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        {shouldLoad ? (
          <iframe
            title="Magic Cleaning — 30 Pheasant Way, Yaxley, Peterborough"
            src={MAP_EMBED}
            className="h-48 w-full border-0 sm:h-52"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="flex h-48 flex-col items-center justify-center gap-2 px-4 text-center text-white/65 sm:h-52">
            <MapPinned className="size-7 text-aqua-soft" aria-hidden />
            <p className="text-sm font-medium">
              Map loads when this section comes into view
            </p>
            <p className="text-xs text-white/45">
              30 Pheasant Way, Yaxley, Peterborough
            </p>
          </div>
        )}
      </div>

      <p className="mt-2 text-xs text-white/45">
        Drag to move · Ctrl + scroll to zoom
      </p>
    </div>
  );
}
