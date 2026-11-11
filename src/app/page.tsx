import React from "react";
import Link from "next/link";
import {
  STORE_NAME,
  getProducts,
  getCategories,
  getStorefrontContent,
  getHomeSections,
  cleanCategoryHandle,
  Product,
  MerchantCategory,
} from "@/lib/medusa";
import { ProductCard } from "@/components/ProductCard";
import { ProductSection } from "@/components/ProductSection";
import { HeroSlider } from "@/components/HeroSlider";
import { PromoBanners } from "@/components/PromoBanners";
import { CategoryTiles } from "@/components/CategoryTiles";
import { CATEGORY_TILE_PLACES } from "@/lib/declare-layout";
import { ArrowRight, Sparkles, PackageX } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const contentPromise = getStorefrontContent();
  const sectionsPromise = getHomeSections();

  let newArrivals: Product[] = [];
  let categories: MerchantCategory[] = [];
  let error: string | null = null;

  try {
    const [fetchedProducts, fetchedCategories] = await Promise.all([
      getProducts({ limit: 8, order: "-created_at" }),
      getCategories(),
    ]);
    newArrivals = fetchedProducts;
    categories = fetchedCategories;
  } catch (err: unknown) {
    console.error("Error loading landing page data:", err);
    error =
      err instanceof Error ? err.message : "Failed to load products from store.";
  }

  const content = await contentPromise;
  const homeSections = await sectionsPromise;
  const hasHeroSlides = content.hero_slides.length > 0;

  return (
    <div className="min-h-screen">
      {/* ══ Hero ══ */}
      {hasHeroSlides ? (
        <>
          <h1 className="sr-only">{STORE_NAME}</h1>
          <HeroSlider slides={content.hero_slides} />
        </>
      ) : (
        <section className="bg-hero pb-14 overflow-hidden border-b border-line">
          <div className="max-w-[1240px] mx-auto px-6 pt-10 sm:pt-16">
            <div className="max-w-xl py-4">
              <h1 className="font-serif text-[44px] sm:text-[54px] lg:text-[60px] font-medium leading-[1.12] tracking-[0.01em] text-ink mb-[26px]">
                {STORE_NAME}
              </h1>
              <p className="text-[14.5px] leading-[1.75] text-aura-gray mb-[34px] max-w-md">
                Welcome to {STORE_NAME}.
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2.5 bg-ink text-white text-[11px] font-semibold tracking-[0.18em] uppercase px-[30px] py-[16px] hover:bg-ink-soft transition-colors group"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-[15px] h-[15px] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══ Floating Category Strip ══ */}
      <CategoryTiles tiles={content.category_tiles} />

      {/* Fallback category strip when no category tiles are configured */}
      {content.category_tiles.length === 0 && categories.length > 0 && (
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="bg-white rounded-[6px] shadow-[0_14px_40px_rgba(60,50,35,0.09)] -mt-[34px] relative z-20 py-[26px] px-2 flex flex-wrap sm:flex-nowrap items-center border border-line/40">
            {categories.slice(0, CATEGORY_TILE_PLACES).map((cat) => (
              <Link
                key={cat.id}
                href={`/c/${cleanCategoryHandle(cat.handle)}`}
                className="flex-1 basis-1/4 sm:basis-auto flex flex-col items-center gap-3 py-2 px-1 hover:opacity-55 transition-opacity group text-center"
              >
                <Sparkles className="w-[28px] h-[28px] text-ink stroke-[1.4]" />
                <span className="text-[9.5px] font-bold tracking-[0.12em] uppercase text-ink">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ══ Product Rows (Featured, Best Sellers, New Arrivals) ══ */}
      {homeSections !== null &&
        homeSections.map((section) => (
          <ProductSection
            key={section.key}
            sectionKey={section.key}
            title={section.title}
            subtitle={
              section.key === "featured"
                ? "CURATED SELECTION"
                : section.key === "new_arrivals"
                ? "JUST ARRIVED"
                : undefined
            }
            products={section.products}
          />
        ))}

      {/* Fallback when backend sections are not configured */}
      {homeSections === null && (
        <section className="py-16 bg-white border-b border-line">
          <div className="max-w-[1240px] mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-aura-gray mb-1">
                  JUST ARRIVED
                </p>
                <h2 className="text-[17px] font-bold tracking-[0.12em] uppercase text-ink">
                  NEW ARRIVALS
                </h2>
              </div>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.16em] uppercase text-aura-gray hover:text-ink transition-colors group"
              >
                <span>VIEW ALL</span>
                <ArrowRight className="w-[15px] h-[15px] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {error && (
              <div className="p-6 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-sm">
                <p className="font-semibold mb-1">Unable to load new arrivals</p>
                <p className="text-xs text-rose-600">{error}</p>
              </div>
            )}

            {!error && newArrivals.length === 0 && (
              <div className="text-center py-16 border border-dashed border-line rounded-xl space-y-3">
                <PackageX size={44} className="mx-auto text-aura-gray" />
                <h3 className="text-base font-semibold text-ink">
                  No products available
                </h3>
                <p className="text-xs text-aura-gray max-w-sm mx-auto">
                  There are currently no products listed for {STORE_NAME}.
                </p>
              </div>
            )}

            {!error && newArrivals.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {newArrivals.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ══ Promo Panels (The Ritual & Our Promise) ══ */}
      <PromoBanners banners={content.promo_banners} />
    </div>
  );
}
