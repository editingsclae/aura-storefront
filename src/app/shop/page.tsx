import React, { Suspense } from "react";
import Link from "next/link";
import { getAllProducts, getCategories, STORE_NAME } from "@/lib/medusa";
import { ShopClient } from "@/components/ShopClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: `Shop | ${STORE_NAME}`,
  description: `Browse all products at ${STORE_NAME}. Cash on delivery.`,
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  return (
    <div className="min-h-screen">
      {/* ══ Hero ══ */}
      <section className="bg-hero py-12 text-center border-b border-line/60">
        <div className="max-w-[1240px] mx-auto px-6">
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-aura-gray mb-3">
            <Link href="/" className="hover:text-ink transition-colors">
              HOME
            </Link>{" "}
            / SHOP
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-ink mb-2">
            Shop All
          </h1>
          <p className="text-xs sm:text-sm text-aura-gray max-w-xl mx-auto">
            Browse our complete collection.
          </p>
        </div>
      </section>

      {/* ══ Shop Content ══ */}
      <div className="max-w-[1240px] mx-auto px-6 py-12">
        <Suspense
          fallback={
            <div className="py-20 text-center text-xs font-mono text-aura-gray">
              Loading catalog...
            </div>
          }
        >
          <ShopClient products={products} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
