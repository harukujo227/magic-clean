"use client";

import { useEffect, useRef, useState } from "react";
import { Music, Music2 } from "lucide-react";
import { cn } from "@/lib/cn";

const STORAGE_KEY = "magic-cleaning-sound";
const TARGET_VOLUME = 0.34;

export function AmbientMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio/mood-feelgood.mp3");
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "on") {
      audio
        .play()
        .then(() => {
          fadeTo(audio, TARGET_VOLUME);
          setEnabled(true);
        })
        .catch(() => setEnabled(false));
    }

    setReady(true);

    return () => {
      if (fadeRef.current) window.clearInterval(fadeRef.current);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, []);

  function fadeTo(audio: HTMLAudioElement, target: number) {
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    fadeRef.current = window.setInterval(() => {
      const step = target > audio.volume ? 0.03 : -0.04;
      const next = audio.volume + step;
      if (
        (step > 0 && next >= target) ||
        (step < 0 && next <= target)
      ) {
        audio.volume = Math.max(0, target);
        if (fadeRef.current) window.clearInterval(fadeRef.current);
        fadeRef.current = null;
        if (target === 0) audio.pause();
        return;
      }
      audio.volume = next;
    }, 40);
  }

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (enabled) {
      fadeTo(audio, 0);
      setEnabled(false);
      localStorage.setItem(STORAGE_KEY, "off");
      return;
    }

    try {
      audio.volume = 0;
      await audio.play();
      fadeTo(audio, TARGET_VOLUME);
      setEnabled(true);
      localStorage.setItem(STORAGE_KEY, "on");
    } catch {
      setEnabled(false);
    }
  }

  if (!ready) return null;

  return (
    <div className="fixed bottom-5 left-5 z-[60]">
      <button
        type="button"
        onClick={toggle}
        aria-pressed={enabled}
        aria-label={enabled ? "Mute music" : "Play feel-good music"}
        title={enabled ? "Mute music" : "Play music"}
        className={cn(
          "inline-flex size-12 items-center justify-center rounded-full border border-line bg-white/95 text-teal shadow-[0_12px_30px_rgba(6,38,44,0.14)] backdrop-blur-md transition hover:-translate-y-0.5",
          enabled && "border-teal/30 bg-teal text-white",
        )}
      >
        {enabled ? (
          <Music2 className="size-5" aria-hidden />
        ) : (
          <Music className="size-5" aria-hidden />
        )}
      </button>
    </div>
  );
}
