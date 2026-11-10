"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";

interface ProductGalleryProps {
  images: Array<{ id: string; url: string }>;
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const count = images?.length || 0;
  const current = count > 0 ? Math.min(selectedIndex, count - 1) : 0;
  const selectedImage = images?.[current];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev - 1 + count) % count);
      }
      if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev + 1) % count);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [count]);

  if (!images || images.length === 0 || !selectedImage) {
    return (
      <div className="relative aspect-[4/4.5] w-full bg-cream rounded-md overflow-hidden border border-line flex flex-col items-center justify-center text-aura-gray gap-3 p-8 text-center">
        <Package size={56} strokeWidth={1.5} />
        <span className="text-sm font-medium uppercase tracking-wider text-ink">
          {title}
        </span>
        <span className="text-xs text-aura-gray">No image available</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4">
      {/* Main Photo Frame */}
      <div className="relative w-full aspect-[4/4.5] sm:aspect-[4/4.6] bg-cream rounded-md overflow-hidden shadow-xs border border-line">
        <Image
          key={current}
          src={selectedImage.url}
          alt={`${title} - view ${current + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover fade-in"
        />

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => setSelectedIndex((prev) => (prev - 1 + count) % count)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-ink shadow-md flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              type="button"
              onClick={() => setSelectedIndex((prev) => (prev + 1) % count)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-ink shadow-md flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 stroke-[2]" />
            </button>
            <span className="absolute bottom-3 right-3 bg-ink/70 text-white text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full">
              {current + 1} / {count}
            </span>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {count > 1 && (
        <div
          role="region"
          aria-label="Product thumbnails"
          className="flex items-center gap-3 overflow-x-auto pb-1"
        >
          {images.map((img, idx) => {
            const isSelected = idx === current;
            return (
              <button
                key={img.id || idx}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedIndex(idx);
                  }
                }}
                aria-label={`Show photo ${idx + 1}`}
                aria-pressed={isSelected}
                className={`relative w-16 sm:w-20 aspect-square rounded overflow-hidden border-2 transition-all cursor-pointer bg-cream shrink-0 ${
                  isSelected
                    ? "border-ink"
                    : "border-transparent hover:border-line"
                }`}
              >
                <Image
                  src={img.url}
                  alt={`${title} thumbnail ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
