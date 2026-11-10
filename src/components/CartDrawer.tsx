"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/logic";
import { getLineItemState } from "@/logic/cart-view";
import { useCartDrawer } from "@/logic/use-cart-view";
import { X, Minus, Plus, ShoppingBag, Package } from "lucide-react";

export function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    closeButtonRef,
    items,
    currencyCode,
    subtotal,
    itemCount,
    busyLineId,
    lineErrors,
    handleUpdateQuantity,
    handleRemoveItem,
  } = useCartDrawer();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-ink/45 transition-opacity z-50 duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-[100dvh] w-[min(420px,94vw)] bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart Drawer"
        aria-hidden={!isCartOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-line bg-white">
          <h2 className="text-[12.5px] font-bold tracking-[0.14em] text-ink uppercase">
            YOUR CART ({itemCount})
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeCart}
            className="text-ink hover:opacity-60 transition-opacity p-1 cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-2 divide-y divide-line/60">
          {items.length > 0 ? (
            items.map((item) => {
              const lineState = getLineItemState(item, busyLineId, lineErrors);

              return (
                <div key={item.id} className="py-4 flex gap-4 items-center">
                  <div className="relative w-18 h-20 bg-card rounded overflow-hidden shrink-0 group flex items-center justify-center">
                    {item.thumbnail ? (
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        sizes="72px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <Package className="w-6 h-6 text-aura-gray" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold tracking-wide text-ink uppercase truncate">
                      {item.title}
                    </h4>

                    {lineState.showVariant && (
                      <p className="text-[9.5px] font-bold tracking-[0.1em] uppercase text-aura-gray mt-0.5 truncate">
                        {item.variant_title}
                      </p>
                    )}

                    <p className="text-xs font-medium text-aura-gray mt-0.5">
                      {formatPrice(item.unit_price, currencyCode)}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      {/* Stepper */}
                      <div className="flex items-center border border-line rounded bg-white">
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={!lineState.canDecrease}
                          className="w-7 h-7 flex items-center justify-center text-ink hover:opacity-60 disabled:opacity-30 transition-opacity cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3 stroke-[2]" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold text-ink select-none">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          disabled={!lineState.canIncrease}
                          className="w-7 h-7 flex items-center justify-center text-ink hover:opacity-60 disabled:opacity-30 transition-opacity cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3 stroke-[2]" />
                        </button>
                      </div>

                      <span className="text-xs font-bold text-ink">
                        {formatPrice(lineState.lineTotal, currencyCode)}
                      </span>
                    </div>

                    {lineState.error && (
                      <p className="text-[11px] text-rose-600 mt-1.5 font-medium">
                        {lineState.error}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={lineState.isBusy}
                    className="self-start text-aura-gray hover:text-ink p-1 transition-colors disabled:opacity-30 cursor-pointer"
                    aria-label={`Remove ${item.title}`}
                  >
                    <X className="w-4 h-4 stroke-[1.8]" />
                  </button>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 flex flex-col items-center gap-3 text-aura-gray">
              <ShoppingBag className="w-12 h-12 stroke-[1.2] text-cream" />
              <p className="text-sm">Your cart is empty.</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-2 inline-flex items-center justify-center bg-ink text-white text-[10.5px] font-semibold tracking-[0.18em] uppercase px-6 py-3 hover:bg-ink/80 transition-colors"
              >
                CONTINUE SHOPPING
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-line p-6 bg-soft space-y-3">
            <div className="flex items-center justify-between text-xs tracking-wider uppercase font-bold text-ink">
              <span>SUBTOTAL</span>
              <span className="text-base">{formatPrice(subtotal, currencyCode)}</span>
            </div>
            <p className="text-[10.5px] text-aura-gray">
              Delivery calculated at checkout. Cash on delivery.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full inline-flex items-center justify-center border border-ink text-ink bg-transparent text-[11px] font-semibold tracking-[0.18em] uppercase py-3.5 hover:bg-ink hover:text-white transition-colors"
              >
                VIEW CART
              </Link>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full inline-flex items-center justify-center bg-ink text-white text-[11px] font-semibold tracking-[0.18em] uppercase py-3.5 hover:bg-ink/85 transition-colors shadow-sm"
              >
                CHECKOUT
              </Link>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
