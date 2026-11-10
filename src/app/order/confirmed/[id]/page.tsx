import React from "react";
import Link from "next/link";
import { showVariantTitle, getOrderTotals } from "@/logic";
import {
  getOrder,
  formatPrice,
  STORE_NAME,
  getDerivedOrderStatus,
  getDerivedPaymentStatus,
} from "@/lib/medusa";
import { CheckCircle2, PackageCheck, ArrowRight } from "lucide-react";
import { ClearCartOnMount } from "./ClearCartOnMount";

export const dynamic = "force-dynamic";

interface OrderConfirmedPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderConfirmedPage({
  params,
}: OrderConfirmedPageProps) {
  const { id } = await params;
  const order = await getOrder(id);

  if (!order) {
    return (
      <main className="max-w-[1240px] mx-auto px-6 py-20 text-center">
        <div className="max-w-md mx-auto py-16 px-6 border border-dashed border-line rounded-xl space-y-4 bg-card/30">
          <h1 className="font-serif text-2xl font-medium text-ink">Order Not Found</h1>
          <p className="text-xs text-aura-gray">
            The requested order could not be retrieved.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase px-6 py-3 bg-ink text-white hover:bg-[#3a352e] transition-colors"
            >
              <span>RETURN TO STORE</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const items = order.items || [];
  const totals = getOrderTotals(order);
  const currencyCode = totals.currency;

  return (
    <main className="max-w-[760px] mx-auto px-6 py-12 sm:py-20 min-h-screen space-y-8">
      <ClearCartOnMount orderId={order.id} />

      {/* ── Success Card ── */}
      <div className="bg-white border border-line rounded-md p-8 sm:p-12 text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-ink text-white flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8 stroke-[2]" />
        </div>

        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-aura-gray mb-2">
            ORDER CONFIRMED
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-ink">
            Thank you for your order!
          </h1>
          <p className="text-xs sm:text-sm text-aura-gray mt-2 max-w-md mx-auto">
            Your order has been received and confirmed by <strong className="text-ink">{STORE_NAME}</strong>. Pay the courier in cash upon arrival.
          </p>
        </div>

        <div className="inline-block border border-line bg-soft rounded px-4 py-2 text-xs font-mono font-semibold text-ink">
          Order #{order.display_id ?? order.id}
        </div>
      </div>

      {/* ── Order Details Card ── */}
      <div className="border border-line rounded-md overflow-hidden bg-white">
        <div className="bg-soft p-5 border-b border-line flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-aura-gray">Placed on: </span>
            <span className="font-bold text-ink">
              {new Date(order.created_at).toLocaleDateString(undefined, {
                dateStyle: "medium",
              })}
            </span>
          </div>
          <div>
            <span className="text-aura-gray">Confirmation to: </span>
            <span className="font-bold text-ink">{order.email}</span>
          </div>
          <div>
            <span className="inline-flex items-center px-2.5 py-1 rounded bg-white border border-line text-ink font-semibold uppercase text-[10px] tracking-wider">
              {getDerivedOrderStatus(order)}
            </span>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Ordered Items */}
          <div>
            <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-ink mb-4 flex items-center gap-2">
              <PackageCheck size={16} />
              <span>ORDERED ITEMS ({items.length})</span>
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
                      <p className="text-[10px] text-aura-gray font-medium uppercase mt-0.5">
                        {item.variant_title}
                      </p>
                    )}
                    <p className="text-aura-gray font-mono mt-0.5">
                      Qty: {item.quantity} &times; {formatPrice(item.unit_price, currencyCode)}
                    </p>
                  </div>
                  <div className="font-mono font-bold text-ink">
                    {formatPrice(item.total || item.unit_price * item.quantity, currencyCode)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 text-xs">
            <div>
              <h3 className="font-bold uppercase tracking-[0.14em] text-ink mb-2">
                SHIPPING DESTINATION
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

            <div>
              <h3 className="font-bold uppercase tracking-[0.14em] text-ink mb-2">
                PAYMENT DETAILS
              </h3>
              <div className="text-aura-gray space-y-1">
                <p className="font-bold text-ink">Cash on delivery</p>
                <p>Status: {getDerivedPaymentStatus(order)}</p>
                <p>Payment on package delivery across Tunisia.</p>
              </div>
            </div>
          </div>

          {/* Totals Summary */}
          <div className="pt-4 border-t border-line space-y-2 text-xs">
            <div className="flex justify-between text-aura-gray">
              <span>Items Subtotal</span>
              <span className="font-mono font-semibold text-ink">
                {totals.itemsSubtotal !== undefined
                  ? formatPrice(totals.itemsSubtotal, currencyCode)
                  : "-"}
              </span>
            </div>

            <div className="flex justify-between text-aura-gray">
              <span>Shipping</span>
              <span className="font-mono font-semibold text-ink">
                {totals.shippingSubtotal !== undefined
                  ? formatPrice(totals.shippingSubtotal, currencyCode)
                  : "-"}
              </span>
            </div>

            {totals.hasTaxTotal && totals.taxTotal !== undefined && (
              <div className="flex justify-between text-aura-gray">
                <span>VAT</span>
                <span className="font-mono font-semibold text-ink">
                  {formatPrice(totals.taxTotal, currencyCode)}
                </span>
              </div>
            )}

            <div className="pt-3 border-t-2 border-ink flex justify-between items-baseline text-ink">
              <span className="text-xs font-bold tracking-[0.12em] uppercase">
                TOTAL
              </span>
              <span className="text-xl font-bold font-mono">
                {totals.total !== undefined
                  ? formatPrice(totals.total, currencyCode)
                  : "-"}
              </span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 bg-ink text-white text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#3a352e] transition-colors"
            >
              <span>CONTINUE SHOPPING</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              href="/account"
              className="inline-flex items-center justify-center gap-2 py-3 px-6 border border-line bg-white text-ink text-[11px] font-semibold tracking-[0.18em] uppercase hover:border-ink transition-colors"
            >
              <span>VIEW ACCOUNT</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
