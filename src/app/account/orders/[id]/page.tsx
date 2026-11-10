"use client";

import React, { use } from "react";
import Link from "next/link";
import {
  formatPrice,
  getDerivedOrderStatus,
  getDerivedPaymentStatus,
} from "@/logic";
import { showVariantTitle } from "@/logic/variant-select";
import { useOrderDetails } from "@/logic/use-order-details";
import {
  ArrowLeft,
  Package,
  Calendar,
  Truck,
  Banknote,
  AlertCircle,
} from "lucide-react";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = use(params);
  const { order, items, totals, loading, error } = useOrderDetails(id);

  if (loading) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-aura-gray font-medium tracking-wider uppercase">
          Loading order details...
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <main className="max-w-[1240px] mx-auto px-6 py-20 text-center">
        <div className="max-w-md mx-auto py-16 px-6 border border-dashed border-line rounded-xl space-y-4 bg-card/30">
          <AlertCircle size={40} className="mx-auto text-rose-500" />
          <h1 className="font-serif text-2xl font-medium text-ink">Unable to load order</h1>
          <p className="text-xs text-aura-gray">
            {error || "The order could not be found."}
          </p>
          <div className="pt-2">
            <Link
              href="/account"
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase px-6 py-3 bg-ink text-white hover:bg-[#3a352e] transition-colors"
            >
              <span>BACK TO ORDERS</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const currency = totals.currency;

  return (
    <main className="max-w-[960px] mx-auto px-6 py-8 sm:py-12 min-h-screen space-y-8">
      {/* ── Header ── */}
      <div>
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs text-aura-gray hover:text-ink mb-4 transition-colors"
        >
          <ArrowLeft size={14} /> Back to My Orders
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-lg sm:text-xl font-bold tracking-[0.14em] uppercase text-ink font-mono">
                Order #{order.display_id ?? order.id}
              </h1>
              <span className="px-2.5 py-0.5 rounded border border-line bg-card text-[10px] font-bold uppercase text-ink">
                {getDerivedOrderStatus(order)}
              </span>
            </div>
            <p className="text-xs text-aura-gray flex items-center gap-1.5 mt-1">
              <Calendar size={13} /> Placed on{" "}
              {new Date(order.created_at).toLocaleDateString(undefined, {
                dateStyle: "long",
              })}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-aura-gray font-bold block">
              TOTAL AMOUNT
            </span>
            <span className="text-xl font-bold font-mono text-ink">
              {formatPrice(totals.total, currency)}
            </span>
          </div>
        </div>
      </div>

      {/* ── Order Details Card ── */}
      <div className="border border-line rounded-md overflow-hidden bg-white">
        <div className="p-6 sm:p-8 space-y-6">
          {/* Items */}
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink mb-4 flex items-center gap-2">
              <Package size={16} />
              <span>ITEMS ({items.length})</span>
            </h2>
            <div className="divide-y divide-line border-y border-line">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="py-3.5 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-bold uppercase text-ink">{item.title}</p>
                    {showVariantTitle(item.variant_title) && (
                      <p className="text-[10px] text-aura-gray uppercase mt-0.5 font-medium">
                        {item.variant_title}
                      </p>
                    )}
                    <p className="text-aura-gray font-mono mt-0.5">
                      Qty: {item.quantity} &bull; Unit: {formatPrice(item.unit_price, currency)}
                    </p>
                  </div>
                  <div className="font-mono font-bold text-ink">
                    {formatPrice(item.total || item.unit_price * item.quantity, currency)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-xs">
            <div className="space-y-1">
              <h3 className="font-bold uppercase tracking-[0.14em] text-ink flex items-center gap-1.5 mb-2">
                <Truck size={14} /> SHIPPING DESTINATION
              </h3>
              {order.shipping_address ? (
                <div className="text-aura-gray space-y-1">
                  <p className="font-bold text-ink">
                    {order.shipping_address.first_name} {order.shipping_address.last_name}
                  </p>
                  <p>{order.shipping_address.address_1}</p>
                  <p>
                    {order.shipping_address.city}, {order.shipping_address.postal_code}
                  </p>
                  <p className="text-ink font-medium">{order.shipping_address.phone}</p>
                </div>
              ) : (
                <p className="text-aura-gray">Standard delivery</p>
              )}
            </div>

            <div className="space-y-1">
              <h3 className="font-bold uppercase tracking-[0.14em] text-ink flex items-center gap-1.5 mb-2">
                <Banknote size={14} /> PAYMENT DETAILS
              </h3>
              <div className="text-aura-gray space-y-1">
                <p className="font-bold text-ink">Cash on delivery</p>
                <p>Status: {getDerivedPaymentStatus(order)}</p>
                <p>Payment upon receipt across Tunisia.</p>
              </div>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="pt-4 border-t border-line space-y-2 text-xs">
            <div className="flex justify-between text-aura-gray">
              <span>Items Subtotal</span>
              <span className="font-mono font-semibold text-ink">
                {totals.itemsSubtotal !== undefined
                  ? formatPrice(totals.itemsSubtotal, currency)
                  : "-"}
              </span>
            </div>

            <div className="flex justify-between text-aura-gray">
              <span>Shipping</span>
              <span className="font-mono font-semibold text-ink">
                {totals.shippingSubtotal !== undefined
                  ? formatPrice(totals.shippingSubtotal, currency)
                  : "-"}
              </span>
            </div>

            {totals.hasTaxTotal && totals.taxTotal !== undefined && (
              <div className="flex justify-between text-aura-gray">
                <span>VAT</span>
                <span className="font-mono font-semibold text-ink">
                  {formatPrice(totals.taxTotal, currency)}
                </span>
              </div>
            )}

            <div className="pt-3 border-t-2 border-ink flex justify-between items-baseline text-ink">
              <span className="text-xs font-bold tracking-[0.12em] uppercase">TOTAL</span>
              <span className="text-xl font-bold font-mono text-ink">
                {totals.total !== undefined
                  ? formatPrice(totals.total, currency)
                  : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
