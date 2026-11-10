import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/logic";
import { ProductCard } from "@/components/ProductCard";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  sectionKey?: string;
}

export function ProductSection({
  title,
  subtitle,
  products,
  sectionKey,
}: ProductSectionProps) {
  if (products.length === 0) return null;

  const isBestSellers =
    sectionKey === "best_sellers" ||
    title.toLowerCase().includes("best seller");
  const isFeatured =
    sectionKey === "featured" ||
    title.toLowerCase().includes("featured");

  const actionText = isFeatured ? "EXPLORE ALL" : "VIEW ALL";

  return (
    <section
      aria-label={title}
      className={`py-16 ${
        isBestSellers
          ? "bg-soft border-b border-line"
          : "bg-white border-b border-line"
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            {subtitle && (
              <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-aura-gray mb-1">
                {subtitle}
              </p>
            )}
            <h2 className="text-[17px] font-bold tracking-[0.12em] uppercase text-ink">
              {title}
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.16em] uppercase text-aura-gray hover:text-ink transition-colors group"
          >
            <span>{actionText}</span>
            <ArrowRight className="w-[15px] h-[15px] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div
          className={`grid gap-6 ${
            isBestSellers
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5"
              : "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>
    </section>
  );
}
