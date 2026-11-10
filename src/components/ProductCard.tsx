"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/logic";
import { formatPrice, getCardState } from "@/logic";
import { useCart } from "@/context/CartContext";
import { Package, Plus, ArrowRight, Loader2 } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const {
    singleVariant,
    canQuickAdd,
    price,
    range,
    hasRange,
    stockBadge,
    imageUrl,
    badge,
    subtitle,
  } = getCardState(product);

  const isSoldOut = stockBadge?.type === "out_of_stock";

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!canQuickAdd || !singleVariant || isAdding) return;
    try {
      setIsAdding(true);
      await addToCart(singleVariant.id, 1);
    } catch (err) {
      console.error("Failed to quick add to cart:", err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <article className="group bg-white rounded overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(60,50,35,0.08)] flex flex-col h-full border border-line">
      {/* Media Link */}
      <Link
        href={`/p/${product.handle}`}
        className="relative block aspect-square bg-card overflow-hidden"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-aura-gray gap-2 p-4 text-center h-full">
            <Package className="w-9 h-9 stroke-[1.4]" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">
              {product.title}
            </span>
          </div>
        )}

        {/* Badge from metadata */}
        {badge && (
          <span className="absolute top-3 left-3 bg-white text-ink text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-full border border-line shadow-sm z-10 uppercase">
            {badge}
          </span>
        )}

        {/* Sold out overlay */}
        {isSoldOut && (
          <>
            <span className="absolute top-3 right-3 bg-white text-ink text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-full border border-line shadow-sm z-10 uppercase">
              Sold Out
            </span>
            <div className="absolute inset-0 bg-soft/55 backdrop-blur-[0.5px]" />
          </>
        )}
      </Link>

      {/* Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="text-xs sm:text-[13px] font-bold tracking-[0.06em] uppercase text-ink mb-1.5 group-hover:text-aura-gray transition-colors">
          <Link href={`/p/${product.handle}`}>{product.title}</Link>
        </h3>

        {/* Subtitle only */}
        {subtitle && (
          <p className="text-[11px] sm:text-xs leading-relaxed text-aura-gray line-clamp-2 mb-4 flex-1">
            {subtitle}
          </p>
        )}

        {/* Price & Action Row */}
        <div className="flex items-center justify-between pt-2 border-t border-line/60 mt-auto">
          <div className="text-[13.5px] font-bold text-ink">
            {hasRange && range ? (
              <>
                <span className="mr-1 text-xs font-medium text-aura-gray">From</span>
                {formatPrice(range.low, range.currency)}
              </>
            ) : price ? (
              formatPrice(price.calculated_amount, price.currency_code)
            ) : (
              <span className="text-aura-gray text-xs">Price on request</span>
            )}
          </div>

          <div>
            {canQuickAdd && singleVariant ? (
              <button
                type="button"
                onClick={handleQuickAdd}
                disabled={isAdding || isSoldOut}
                aria-label={`Add ${product.title} to cart`}
                className="w-8 h-8 rounded-full bg-ink text-white hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-sm disabled:opacity-50"
              >
                {isAdding ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Plus className="w-3.5 h-3.5 stroke-[2.2]" />
                )}
              </button>
            ) : (
              <Link
                href={`/p/${product.handle}`}
                className="text-[10px] font-semibold tracking-wider uppercase text-aura-gray hover:text-ink transition-colors flex items-center gap-1"
              >
                <span>Options</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
