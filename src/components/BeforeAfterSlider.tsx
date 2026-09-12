"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type BeforeAfterSliderProps = {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
  className?: string;
};

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  alt,
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(52);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, next)));
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!dragging.current) return;
      updateFromClientX(event.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [updateFromClientX]);

  function onPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    event.preventDefault();
    dragging.current = true;
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    updateFromClientX(event.clientX);
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[4/3] w-full touch-none select-none overflow-hidden rounded-xl bg-mist",
        className,
      )}
      onPointerDown={onPointerDown}
      role="img"
      aria-label={`${alt}. Drag the centre line to compare before and after.`}
    >
      {/* Before = right side base */}
      <Image
        src={beforeSrc}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover"
        draggable={false}
      />

      {/* After revealed on the left via clip */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={afterSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
          draggable={false}
        />
      </div>

      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white/95 shadow-[0_0_14px_rgba(0,0,0,0.35)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-teal text-white shadow-lg">
          <span className="flex gap-0.5" aria-hidden>
            <span className="h-3.5 w-0.5 rounded-full bg-white" />
            <span className="h-3.5 w-0.5 rounded-full bg-white" />
          </span>
        </div>
      </div>

      <span className="pointer-events-none absolute bottom-3 left-3 z-20 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
        After
      </span>
      <span className="pointer-events-none absolute right-3 bottom-3 z-20 rounded-full bg-ink/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
        Before
      </span>
    </div>
  );
}
