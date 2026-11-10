"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/logic";
import { getLineItemState } from "@/logic/cart-view";
import { useCartPage } from "@/logic/use-cart-view";
import { Minus, Plus, X, ShoppingBag, ArrowLeft, Package } from "lucide-react";

export default function CartPage() {
  const {
    cart,
    isLoading,
    items,
    currencyCode,
    totals,
    itemCount,
    updateQuantity,
    removeItem,
  } = useCartPage();

  if (isLoading && !cart) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-aura-gray font-medium tracking-wider uppercase">
          Loading your bag...
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <main className="max-w-[1240px] mx-auto px-6 py-16 sm:py-24 text-center">
        <div className="max-w-md mx-auto py-16 px-6 border border-dashed border-line rounded-xl space-y-4 bg-card/30">
          <ShoppingBag size={48} className="mx-auto text-aura-gray stroke-[1.4]" />
          <h1 className="font-serif text-2xl font-medium text-ink">
            Your cart is empty
          </h1>
          <p className="text-xs text-aura-gray max-w-xs mx-auto">
            You have no items in your shopping bag. Explore our collection and start your ritual.
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase px-6 py-3.5 bg-ink text-white hover:bg-[#3a352e] transition-colors"
            >
              <span>EXPLORE SHOP</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-[1240px] mx-auto px-6 py-8 sm:py-12 min-h-screen">
      {/* ── Breadcrumb ── */}
      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-aura-gray mb-6">
        <Link href="/" className="hover:text-ink transition-colors">
          HOME
        </Link>{" "}
        / CART
      </p>

      <h1 className="text-lg sm:text-xl font-bold tracking-[0.14em] uppercase text-ink mb-8">
        YOUR CART{" "}
        <span className="text-aura-gray font-semibold">
          ({itemCount} {itemCount === 1 ? "ITEM" : "ITEMS"})
        </span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* ── Cart Items Table ── */}
        <section className="lg:col-span-8">
          {/* Table Headers */}
          <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b-2 border-ink text-[9.5px] font-bold tracking-[0.14em] uppercase text-aura-gray">
            <span className="col-span-6">PRODUCT</span>
            <span className="col-span-2">PRICE</span>
            <span className="col-span-2 text-center">QTY</span>
            <span className="col-span-1 text-right">TOTAL</span>
            <span className="col-span-1" />
          </div>

          {/* Items List */}
          <div className="divide-y divide-line">
            {items.map((item) => {
              const lineState = getLineItemState(item);

              return (
                <div
                  key={item.id}
                  className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                >
                  {/* Product Info */}
                  <div className="sm:col-span-6 flex items-center gap-4">
                    <div className="relative w-20 h-24 bg-cream rounded overflow-hidden shrink-0 border border-line flex items-center justify-center">
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <Package size={24} className="text-aura-gray" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold uppercase text-ink">
                        {item.title}
                      </h3>
                      {lineState.showVariant && (
                        <p className="text-[10.5px] font-bold tracking-[0.1em] uppercase text-aura-gray mt-0.5">
                          {item.variant_title}
                        </p>
                      )}
                      <p className="text-[10.5px] font-medium text-emerald-700 mt-1">
                        In stock — Ready to ship
                      </p>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="sm:col-span-2 text-xs font-semibold text-ink font-mono hidden sm:block">
                    {formatPrice(item.unit_price, currencyCode)}
                  </div>

                  {/* Stepper */}
                  <div className="sm:col-span-2 flex items-center justify-start sm:justify-center">
                    <div className="flex items-center border border-line rounded bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-ink hover:opacity-60 transition-opacity cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-semibold select-none text-ink">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-ink hover:opacity-60 transition-opacity cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Line Total */}
                  <div className="sm:col-span-1 text-xs font-bold text-ink font-mono sm:text-right">
                    {formatPrice(lineState.lineTotal, currencyCode)}
                  </div>

                  {/* Remove */}
                  <div className="sm:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-aura-gray hover:text-ink p-1.5 transition-colors cursor-pointer"
                      aria-label={`Remove ${item.title}`}
                    >
                      <X className="w-4 h-4 stroke-[1.8]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-ink hover:opacity-60 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>CONTINUE SHOPPING</span>
            </Link>
          </div>
        </section>

        {/* ── Order Summary Card ── */}
        <aside className="lg:col-span-4 bg-soft border border-line rounded-md p-6 lg:sticky lg:top-24 space-y-4">
          <h2 className="text-[12.5px] font-bold tracking-[0.14em] uppercase text-ink">
            ORDER SUMMARY
          </h2>

          <div className="space-y-3 pt-2 text-xs">
            <div className="flex justify-between text-aura-gray">
              <span>Subtotal</span>
              <span className="text-ink font-semibold font-mono">
                {formatPrice(totals.itemsSubtotal, currencyCode)}
              </span>
            </div>

            <div className="flex justify-between text-aura-gray">
              <span>Shipping</span>
              <span className="text-ink font-semibold font-mono">
                {totals.hasShippingSubtotal ? (
                  formatPrice(totals.shippingSubtotal!, currencyCode)
                ) : (
                  <span className="text-aura-gray italic font-sans font-normal">
                    Calculated at checkout
                  </span>
                )}
              </span>
            </div>

            {totals.hasTaxTotal && (
              <div className="flex justify-between text-aura-gray">
                <span>VAT</span>
                <span className="text-ink font-semibold font-mono">
                  {formatPrice(totals.taxTotal!, currencyCode)}
                </span>
              </div>
            )}

            <div className="pt-4 border-t-2 border-ink flex justify-between items-baseline text-ink">
              <span className="text-xs font-bold tracking-[0.12em] uppercase">TOTAL</span>
              <span className="text-xl font-bold font-mono">
                {formatPrice(totals.total, currencyCode)}
              </span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="w-full inline-flex items-center justify-center bg-ink text-white text-[11px] font-semibold tracking-[0.18em] uppercase py-4 px-6 hover:bg-[#3a352e] transition-colors shadow-xs text-center"
          >
            PROCEED TO CHECKOUT
          </Link>

          <div className="flex items-center justify-center gap-2 pt-2 text-[9px] font-bold tracking-wider uppercase text-aura-gray">
            <span className="border border-line bg-white px-2.5 py-1 rounded">
              CASH ON DELIVERY
            </span>
          </div>
        </aside>
      </div>
    </main>
  );
}
