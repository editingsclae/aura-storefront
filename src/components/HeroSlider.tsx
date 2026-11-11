"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Banner, bannerHref } from "@/logic";

const AUTOPLAY_MS = 6000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(callback: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

interface HeroSliderProps {
  slides: Banner[];
}

export function HeroSlider({ slides }: HeroSliderProps) {
  const count = slides.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );

  const current = count > 0 ? Math.min(index, count - 1) : 0;

  useEffect(() => {
    if (count < 2 || paused || reducedMotion) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [count, paused, reducedMotion, current]);

  if (count === 0) return null;

  const go = (next: number) => setIndex((next + count) % count);

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured banners"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="bg-hero pb-14 overflow-hidden relative w-full"
    >
      <div className="max-w-[1240px] mx-auto px-6 relative">
        {slides.map((slide, i) => {
          const href = bannerHref(slide.link);
          const isCurrent = i === current;

          return (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!isCurrent}
              inert={!isCurrent}
              className={`transition-opacity duration-500 ${
                isCurrent ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[44%_56%] items-center gap-8 lg:gap-10 pt-10 sm:pt-16">
                {/* Left Column Content */}
                <div className="z-10 py-4">
                  {slide.label && (
                    <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-ink mb-[18px]">
                      {slide.label}
                    </p>
                  )}

                  {slide.title && (
                    <h2 className="font-serif text-[44px] sm:text-[54px] lg:text-[60px] font-medium leading-[1.12] tracking-[0.01em] text-ink mb-[26px]">
                      {slide.title}
                    </h2>
                  )}

                  {slide.text && (
                    <p className="text-[14.5px] leading-[1.75] text-aura-gray mb-[34px] max-w-md">
                      {slide.text}
                    </p>
                  )}

                  {href && (
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2.5 bg-ink text-white text-[11px] font-semibold tracking-[0.18em] uppercase px-[30px] py-[16px] hover:bg-ink-hover transition-colors group"
                    >
                      <span>{slide.button_label || "SHOP NOW"}</span>
                      <ArrowRight className="w-[15px] h-[15px] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>

                {/* Right Column Media */}
                <div
                  className="relative w-full h-[380px] sm:h-[480px] lg:h-[560px] overflow-hidden"
                  style={{
                    marginRight: "min(0px, calc(596px - 50vw))",
                  }}
                >
                  <Image
                    src={slide.image_url}
                    alt={slide.title || ""}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 1024px) 100vw, 56vw"
                    className="object-cover object-[72%_50%] rounded-[2px]"
                    style={{
                      maskImage:
                        "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 48px, black 120px, black 100%)",
                      WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 48px, black 120px, black 100%)",
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}

        {count > 1 && (
          <>
            {/* Dot indicators — centered */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === current ? "w-6 bg-ink" : "w-2 bg-ink/30 hover:bg-ink/50"
                  }`}
                />
              ))}
            </div>

            {/* Prev / Next buttons — bottom-right */}
            <div className="absolute bottom-5 right-6 z-20 flex items-center gap-2">
              <button
                type="button"
                onClick={() => go(current - 1)}
                aria-label="Previous slide"
                className="w-9 h-9 rounded-full border border-line bg-white/80 hover:bg-white text-ink flex items-center justify-center transition shadow-xs cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => go(current + 1)}
                aria-label="Next slide"
                className="w-9 h-9 rounded-full border border-line bg-white/80 hover:bg-white text-ink flex items-center justify-center transition shadow-xs cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
