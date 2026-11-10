import React, { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryByHandle,
  getAllProducts,
  getCategories,
  STORE_NAME,
} from "@/lib/medusa";
import { ShopClient } from "@/components/ShopClient";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { handle } = await params;
  const category = await getCategoryByHandle(handle);
  if (!category) {
    return {
      title: STORE_NAME,
    };
  }
  return {
    title: `${category.name} | ${STORE_NAME}`,
    description:
      category.description ||
      `Shop ${category.name} at ${STORE_NAME}. Cash on delivery.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { handle } = await params;
  const category = await getCategoryByHandle(handle);

  if (!category) {
    notFound();
  }

  // Fetch all products for this category using getAllProducts (no 50-limit truncation)
  const [products, categories] = await Promise.all([
    getAllProducts({ category_id: category.id }),
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
            /{" "}
            <Link href="/shop" className="hover:text-ink transition-colors">
              SHOP
            </Link>{" "}
            / {category.name.toUpperCase()}
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-medium text-ink mb-2">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xs sm:text-sm text-aura-gray max-w-xl mx-auto">
              {category.description}
            </p>
          )}
        </div>
      </section>

      {/* ══ Shop Content ══ */}
      <div className="max-w-[1240px] mx-auto px-6 py-12">
        <Suspense
          fallback={
            <div className="py-20 text-center text-xs font-mono text-aura-gray">
              Loading products...
            </div>
          }
        >
          <ShopClient
            products={products}
            categories={categories}
            fixedCategory={category}
          />
        </Suspense>
      </div>
    </div>
  );
}
