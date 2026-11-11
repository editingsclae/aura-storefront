"use client";

import React from "react";
import type { Product, ProductVariant } from "@/logic";
import { formatPrice, useVariantSelect } from "@/logic";
import { ShoppingBag, Minus, Plus } from "lucide-react";

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const {
    groups,
    selection,
    variants,
    selectedVariantId,
    price,
    inventory,
    isOutOfStock,
    quantity,
    incrementQuantity,
    decrementQuantity,
    canIncrement,
    canDecrement,
    getValueState,
    isValueDisabled,
    chooseOption,
    selectVariant,
    handleAddToCart,
    isAdding,
    cartLoading,
    errorMessage,
  } = useVariantSelect(product);

  return (
    <div className="space-y-6">
      {/* Price Display */}
      <div>
        <div className="flex items-baseline gap-3 mb-1">
          <span className="text-2xl sm:text-3xl font-bold text-ink font-mono">
            {price
              ? formatPrice(price.calculated_amount, price.currency_code)
              : "Price unavailable"}
          </span>
          {price?.original_amount &&
            price.original_amount > price.calculated_amount && (
              <span className="text-sm text-aura-gray line-through font-mono">
                {formatPrice(price.original_amount, price.currency_code)}
              </span>
            )}
        </div>
        <p className="text-xs text-aura-gray">
          Cash on delivery across Tunisia
        </p>
      </div>

      {/* Stock Status Badge */}
      <div className="flex items-center gap-2 text-[10.5px] font-bold tracking-[0.1em] text-aura-gray uppercase">
        <span
          className={`w-2 h-2 rounded-full inline-block ${
            isOutOfStock ? "bg-rose-500" : "bg-emerald-600"
          }`}
        />
        <span>
          {isOutOfStock
            ? "SOLD OUT"
            : inventory !== undefined
            ? `IN STOCK (${inventory} AVAILABLE)`
            : "IN STOCK"}
        </span>
      </div>

      {/* Options Selection (e.g. Size, Volume) */}
      {groups.map((group) => (
        <div
          key={group.id}
          className="pb-4 border-b border-line/60"
          data-testid={`option-${group.title}`}
        >
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-ink">
              SELECT {group.title.toUpperCase()}
            </span>
            {selection[group.id] && (
              <span className="text-xs text-aura-gray font-medium">
                {selection[group.id]}
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {group.values.map((value) => {
              const state = getValueState(group.id, value);
              const isSelected = selection[group.id] === value;
              const disabled = isValueDisabled(group.id, value);

              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={isSelected}
                  disabled={disabled}
                  title={
                    state === "available"
                      ? undefined
                      : "Not available with your other choices"
                  }
                  onClick={() => chooseOption(group.id, value)}
                  className={`py-2 px-3 text-xs font-bold uppercase rounded transition-colors cursor-pointer text-center ${
                    isSelected
                      ? "bg-ink text-white border border-ink"
                      : disabled
                      ? "bg-zinc-100 border border-line text-zinc-300 line-through cursor-not-allowed"
                      : "bg-white border border-line text-ink hover:border-ink"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {/* Plain list of variants for items without configurable options */}
      {groups.length === 0 && variants.length > 1 && (
        <div className="pb-4 border-b border-line/60">
          <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-ink mb-2.5">
            SELECT VARIANT
          </div>
          <div className="grid grid-cols-2 gap-2">
            {variants.map((v: ProductVariant) => {
              const isSelected = v.id === selectedVariantId;
              const vStock = v.inventory_quantity;
              const vOutOfStock = vStock !== undefined && vStock <= 0;

              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => selectVariant(v.id)}
                  disabled={vOutOfStock}
                  className={`p-3 text-left border rounded transition text-xs flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? "bg-ink text-white border-ink font-bold"
                      : vOutOfStock
                      ? "bg-zinc-100 border-line text-zinc-300 line-through cursor-not-allowed"
                      : "bg-white border-line hover:border-ink text-ink"
                  }`}
                >
                  <span className="font-bold uppercase tracking-wider">{v.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity Stepper & Add to Bag */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-line rounded bg-white">
            <button
              type="button"
              onClick={decrementQuantity}
              disabled={!canDecrement}
              className="w-10 h-11 flex items-center justify-center text-ink hover:bg-card disabled:opacity-30 transition cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-10 text-center font-mono text-sm font-semibold text-ink">
              {quantity}
            </span>
            <button
              type="button"
              onClick={incrementQuantity}
              disabled={!canIncrement}
              className="w-10 h-11 flex items-center justify-center text-ink hover:bg-card disabled:opacity-30 transition cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding || cartLoading || isOutOfStock}
            className="flex-1 inline-flex items-center justify-center gap-2.5 bg-ink text-white text-[11px] font-semibold tracking-[0.18em] uppercase py-3.5 px-6 rounded hover:bg-ink-hover disabled:bg-zinc-300 disabled:cursor-not-allowed transition cursor-pointer"
          >
            <ShoppingBag size={16} />
            <span>
              {isAdding
                ? "ADDING..."
                : isOutOfStock
                ? "OUT OF STOCK"
                : "ADD TO BAG"}
            </span>
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded bg-rose-50 border border-rose-200 text-rose-700 text-xs">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
