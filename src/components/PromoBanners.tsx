import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Banner, bannerHref } from "@/logic";
import { visiblePromoBanners } from "@/lib/declare-layout";

interface PromoBannersProps {
  banners: Banner[];
}

export function PromoBanners({ banners: all }: PromoBannersProps) {
  const banners = visiblePromoBanners(all);
  if (banners.length === 0) return null;

  return (
    <section aria-label="Promotions" className="py-16 sm:py-20 bg-white border-t border-line">
      <div className="max-w-[1240px] mx-auto px-6">
        <div
          className={`grid gap-6 ${
            banners.length > 1 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
          }`}
        >
          {banners.map((banner, index) => {
            const href = bannerHref(banner.link);
            const isFirst = index === 0;

            if (isFirst) {
              // Layout 1: "The Ritual" style
              return (
                <div
                  key={banner.id}
                  className="relative rounded-[6px] overflow-hidden min-h-[360px] sm:min-h-[380px] bg-card group flex flex-col justify-center shadow-xs border border-line/50"
                >
                  {banner.image_url && (
                    <Image
                      src={banner.image_url}
                      alt={banner.title || ""}
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-cover object-[75%_50%]"
                    />
                  )}
                  {/* Left gradient scrim for text legibility */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(244,240,232,0.92) 0%, rgba(244,240,232,0.55) 30%, rgba(244,240,232,0) 50%)",
                    }}
                  />

                  <div className="relative z-10 p-8 sm:p-10 max-w-[380px]">
                    {banner.label && (
                      <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-ink/80 mb-4">
                        {banner.label}
                      </p>
                    )}
                    {banner.title && (
                      <h2 className="font-serif text-[30px] sm:text-[36px] font-medium leading-[1.18] text-ink mb-4">
                        {banner.title}
                      </h2>
                    )}
                    {banner.text && (
                      <p className="text-[12.5px] leading-[1.75] text-aura-gray mb-7 whitespace-pre-line">
                        {banner.text}
                      </p>
                    )}
                    {href && (
                      <Link
                        href={href}
                        className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-ink hover:opacity-60 transition-opacity group"
                      >
                        <span>{banner.button_label || "EXPLORE COLLECTION"}</span>
                        <ArrowRight className="w-[15px] h-[15px] group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            }

            // Layout 2: "Our Promise" style
            return (
              <div
                key={banner.id}
                className="relative rounded-[6px] overflow-hidden min-h-[360px] sm:min-h-[380px] bg-card flex flex-col justify-center shadow-xs border border-line/50"
              >
                {banner.image_url && (
                  <div className="absolute right-0 bottom-0 top-0 w-[48%] sm:w-[50%] pointer-events-none overflow-hidden">
                    <Image
                      src={banner.image_url}
                      alt={banner.title || ""}
                      fill
                      sizes="(max-width: 1024px) 50vw, 300px"
                      className="object-cover object-[90%_25%]"
                      style={{
                        maskImage:
                          "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 14%, black 32%, black 100%)",
                        WebkitMaskImage:
                          "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.5) 14%, black 32%, black 100%)",
                      }}
                    />
                  </div>
                )}

                <div className="relative z-10 p-8 sm:p-10 max-w-[320px] sm:max-w-[340px]">
                  {banner.label && (
                    <p className="text-[11px] font-semibold tracking-[0.28em] uppercase text-ink mb-6">
                      {banner.label}
                    </p>
                  )}
                  {banner.title && (
                    <h2 className="font-serif text-[30px] sm:text-[36px] font-medium leading-[1.18] text-ink mb-4">
                      {banner.title}
                    </h2>
                  )}
                  {banner.text && (
                    <p className="text-[12.5px] leading-[1.75] text-aura-gray mb-7 whitespace-pre-line">
                      {banner.text}
                    </p>
                  )}
                  {href && (
                    <Link
                      href={href}
                      className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-ink hover:opacity-60 transition-opacity group"
                    >
                      <span>{banner.button_label || "LEARN MORE"}</span>
                      <ArrowRight className="w-[15px] h-[15px] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
