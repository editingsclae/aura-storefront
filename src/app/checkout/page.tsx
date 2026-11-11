"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle,
  Truck,
  Banknote,
  AlertCircle,
  Lock,
  ArrowLeft,
  Package,
} from "lucide-react";
import { formatPrice } from "@/logic";
import { useCheckout } from "@/logic/use-checkout";

export default function CheckoutPage() {
  const {
    cart,
    cartLoading,
    items,
    totals,
    currencyCode,
    customer,
    email,
    updateEmail,
    address,
    updateAddressField,
    step,
    setStep,
    shippingOptions,
    selectedShippingOptionId,
    setSelectedShippingOptionId,
    shippingLoading,
    submittingOrder,
    orderPlaced,
    errorMessage,
    fieldErrors,
    handleSaveAddress,
    handleConfirmShipping,
    handlePlaceOrder,
  } = useCheckout();

  if (cartLoading && !cart) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-aura-gray font-medium tracking-wider uppercase">
          Preparing checkout...
        </p>
      </div>
    );
  }

  if (!submittingOrder && !orderPlaced && (!cart || items.length === 0)) {
    return (
      <main className="max-w-[1240px] mx-auto px-6 py-16 sm:py-24 text-center">
        <div className="max-w-md mx-auto py-16 px-6 border border-dashed border-line rounded-xl space-y-4 bg-card/30">
          <AlertCircle size={44} className="mx-auto text-aura-gray stroke-[1.4]" />
          <h1 className="font-serif text-2xl font-medium text-ink">
            Your cart is empty
          </h1>
          <p className="text-xs text-aura-gray max-w-xs mx-auto">
            You cannot checkout without items in your bag.
          </p>
          <div className="pt-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase px-6 py-3.5 bg-ink text-white hover:bg-ink-soft transition-colors"
            >
              <span>RETURN TO SHOP</span>
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
        /{" "}
        <Link href="/cart" className="hover:text-ink transition-colors">
          CART
        </Link>{" "}
        / CHECKOUT
      </p>

      {/* ── Top Header ── */}
      <div className="flex items-center justify-between border-b border-line pb-4 mb-10">
        <div>
          <Link
            href="/cart"
            className="inline-flex items-center gap-1.5 text-xs text-aura-gray hover:text-ink mb-1 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Bag
          </Link>
          <h1 className="text-lg sm:text-xl font-bold tracking-[0.14em] uppercase text-ink">
            CHECKOUT
          </h1>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <Lock size={13} />
          <span>SSL ENCRYPTED</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* ── Left Column: Checkout Steps ── */}
        <div className="lg:col-span-7 space-y-8">
          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 rounded border border-rose-200 bg-rose-50 text-rose-800 text-xs flex items-start gap-2.5">
              <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
              <div>
                <p className="font-bold uppercase tracking-wider">CHECKOUT ERROR</p>
                <p className="mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* ══ STEP 1: Address & Contact ══ */}
          <section className="border border-line rounded-md overflow-hidden bg-white">
            <div className="bg-soft p-4 border-b border-line flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                <h2 className="text-[12.5px] font-bold tracking-[0.14em] uppercase text-ink">
                  CONTACT &amp; SHIPPING ADDRESS
                </h2>
              </div>
              {step !== "address" && (
                <button
                  type="button"
                  onClick={() => setStep("address")}
                  className="text-xs text-aura-gray hover:text-ink font-semibold underline underline-offset-4 cursor-pointer uppercase tracking-wider"
                >
                  Edit
                </button>
              )}
            </div>

            {step === "address" ? (
              <form onSubmit={handleSaveAddress} className="p-6 space-y-4">
                <div>
                  <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink mb-1.5">
                    EMAIL ADDRESS <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => updateEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={`w-full border rounded px-3.5 py-2.5 text-xs outline-none bg-white text-ink transition-colors ${
                      fieldErrors.email
                        ? "border-rose-500"
                        : "border-line focus:border-ink"
                    }`}
                  />
                  {fieldErrors.email && (
                    <p className="text-[10.5px] text-rose-600 mt-1 font-medium">
                      {fieldErrors.email}
                    </p>
                  )}
                  {!customer && (
                    <p className="text-[11px] text-aura-gray mt-1.5">
                      Already have an account?{" "}
                      <Link
                        href="/account/login"
                        className="underline font-semibold text-ink"
                      >
                        Sign in for faster checkout
                      </Link>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink mb-1.5">
                      FIRST NAME <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={address.first_name}
                      onChange={(e) =>
                        updateAddressField("first_name", e.target.value)
                      }
                      className={`w-full border rounded px-3.5 py-2.5 text-xs outline-none bg-white text-ink transition-colors ${
                        fieldErrors.first_name
                          ? "border-rose-500"
                          : "border-line focus:border-ink"
                      }`}
                    />
                    {fieldErrors.first_name && (
                      <p className="text-[10.5px] text-rose-600 mt-1 font-medium">
                        {fieldErrors.first_name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink mb-1.5">
                      LAST NAME <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={address.last_name}
                      onChange={(e) =>
                        updateAddressField("last_name", e.target.value)
                      }
                      className={`w-full border rounded px-3.5 py-2.5 text-xs outline-none bg-white text-ink transition-colors ${
                        fieldErrors.last_name
                          ? "border-rose-500"
                          : "border-line focus:border-ink"
                      }`}
                    />
                    {fieldErrors.last_name && (
                      <p className="text-[10.5px] text-rose-600 mt-1 font-medium">
                        {fieldErrors.last_name}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink mb-1.5">
                    ADDRESS <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address.address_1}
                    onChange={(e) =>
                      updateAddressField("address_1", e.target.value)
                    }
                    placeholder="Street, building, apartment"
                    className={`w-full border rounded px-3.5 py-2.5 text-xs outline-none bg-white text-ink transition-colors ${
                      fieldErrors.address_1
                        ? "border-rose-500"
                        : "border-line focus:border-ink"
                    }`}
                  />
                  {fieldErrors.address_1 && (
                    <p className="text-[10.5px] text-rose-600 mt-1 font-medium">
                      {fieldErrors.address_1}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink mb-1.5">
                      CITY <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) =>
                        updateAddressField("city", e.target.value)
                      }
                      placeholder="e.g. Tunis"
                      className={`w-full border rounded px-3.5 py-2.5 text-xs outline-none bg-white text-ink transition-colors ${
                        fieldErrors.city
                          ? "border-rose-500"
                          : "border-line focus:border-ink"
                      }`}
                    />
                    {fieldErrors.city && (
                      <p className="text-[10.5px] text-rose-600 mt-1 font-medium">
                        {fieldErrors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink mb-1.5">
                      POSTAL CODE
                    </label>
                    <input
                      type="text"
                      value={address.postal_code}
                      onChange={(e) =>
                        updateAddressField("postal_code", e.target.value)
                      }
                      className="w-full border border-line rounded px-3.5 py-2.5 text-xs outline-none bg-white text-ink focus:border-ink"
                    />
                  </div>
                  <div>
                    <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink mb-1.5">
                      COUNTRY
                    </label>
                    <input
                      type="text"
                      disabled
                      value="Tunisia (TN)"
                      className="w-full border border-line rounded px-3.5 py-2.5 text-xs bg-soft text-aura-gray cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink mb-1.5">
                    PHONE NUMBER <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={address.phone}
                    onChange={(e) =>
                      updateAddressField("phone", e.target.value)
                    }
                    placeholder="+216 12 345 678"
                    className={`w-full border rounded px-3.5 py-2.5 text-xs outline-none bg-white text-ink transition-colors ${
                      fieldErrors.phone
                        ? "border-rose-500"
                        : "border-line focus:border-ink"
                    }`}
                  />
                  {fieldErrors.phone && (
                    <p className="text-[10.5px] text-rose-600 mt-1 font-medium">
                      {fieldErrors.phone}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={shippingLoading}
                    className="w-full py-3.5 px-6 bg-ink text-white rounded text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-ink-soft disabled:bg-zinc-300 transition cursor-pointer"
                  >
                    {shippingLoading
                      ? "SAVING ADDRESS..."
                      : "CONTINUE TO DELIVERY"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-5 text-xs text-aura-gray flex justify-between items-center">
                <div>
                  <p className="font-bold text-ink">
                    {address.first_name} {address.last_name} ({email})
                  </p>
                  <p className="mt-0.5">
                    {address.address_1}, {address.city} {address.postal_code}
                  </p>
                  <p className="mt-0.5">Tunisia &bull; {address.phone}</p>
                </div>
                <CheckCircle size={18} className="text-emerald-700" />
              </div>
            )}
          </section>

          {/* ══ STEP 2: Shipping Option ══ */}
          <section className="border border-line rounded-md overflow-hidden bg-white">
            <div className="bg-soft p-4 border-b border-line flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                <h2 className="text-[12.5px] font-bold tracking-[0.14em] uppercase text-ink">
                  SHIPPING OPTION
                </h2>
              </div>
              {step === "payment" && (
                <button
                  type="button"
                  onClick={() => setStep("shipping")}
                  className="text-xs text-aura-gray hover:text-ink font-semibold underline underline-offset-4 cursor-pointer uppercase tracking-wider"
                >
                  Edit
                </button>
              )}
            </div>

            {step === "shipping" && (
              <div className="p-6 space-y-4">
                {shippingOptions.length === 0 ? (
                  <div className="p-4 rounded border border-amber-200 bg-amber-50 text-amber-800 text-xs space-y-1">
                    <p className="font-bold">Shipping is not set up yet</p>
                    <p>
                      No delivery options were found for this merchant cart. Please check fulfillment configuration.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {shippingOptions.map((opt) => {
                      const isSelected = opt.id === selectedShippingOptionId;
                      const optPrice =
                        opt.calculated_price?.calculated_amount ?? opt.amount;

                      return (
                        <label
                          key={opt.id}
                          className={`flex items-center justify-between p-4 rounded border cursor-pointer transition ${
                            isSelected
                              ? "border-ink bg-card ring-1 ring-ink"
                              : "border-line hover:border-ink"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shipping_option"
                              checked={isSelected}
                              onChange={() =>
                                setSelectedShippingOptionId(opt.id)
                              }
                              className="text-ink focus:ring-ink accent-ink"
                            />
                            <div>
                              <p className="font-bold text-xs uppercase tracking-wider text-ink">
                                {opt.name}
                              </p>
                              <p className="text-[11px] text-aura-gray mt-0.5">
                                Standard Tunisia Delivery
                              </p>
                            </div>
                          </div>
                          <div className="font-bold text-xs font-mono text-ink">
                            {formatPrice(optPrice, currencyCode)}
                          </div>
                        </label>
                      );
                    })}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleConfirmShipping}
                    disabled={shippingLoading || shippingOptions.length === 0}
                    className="w-full py-3.5 px-6 bg-ink text-white rounded text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-ink-soft disabled:bg-zinc-300 transition cursor-pointer"
                  >
                    {shippingLoading
                      ? "UPDATING SHIPPING..."
                      : "CONTINUE TO PAYMENT"}
                  </button>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="p-5 text-xs text-aura-gray flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <Truck size={16} className="text-ink" />
                  <span>
                    Selected:{" "}
                    <strong className="text-ink">
                      {shippingOptions.find(
                        (o) => o.id === selectedShippingOptionId
                      )?.name || "Standard Shipping"}
                    </strong>
                  </span>
                </div>
                <CheckCircle size={18} className="text-emerald-700" />
              </div>
            )}
          </section>

          {/* ══ STEP 3: Payment & Place Order ══ */}
          <section className="border border-line rounded-md overflow-hidden bg-white">
            <div className="bg-soft p-4 border-b border-line flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <h2 className="text-[12.5px] font-bold tracking-[0.14em] uppercase text-ink">
                PAYMENT (CASH ON DELIVERY)
              </h2>
            </div>

            {step === "payment" ? (
              <div className="p-6 space-y-6">
                <div className="border border-line rounded p-4 bg-card/60 flex items-start gap-3.5">
                  <Banknote size={22} className="text-ink mt-0.5 shrink-0 stroke-[1.5]" />
                  <div className="space-y-1">
                    <p className="font-bold text-xs uppercase tracking-wider text-ink">
                      Cash on delivery
                    </p>
                    <p className="text-xs text-aura-gray">
                      Pay the courier in cash when you receive your order at your doorstep across Tunisia.
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={submittingOrder}
                    className="w-full py-4 px-6 bg-ink text-white rounded font-bold text-xs tracking-[0.18em] uppercase hover:bg-ink-soft disabled:bg-zinc-300 transition shadow-xs cursor-pointer"
                  >
                    {submittingOrder ? "PLACING ORDER..." : "PLACE ORDER NOW"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-5 text-xs text-aura-gray italic">
                Complete shipping selection to proceed to payment.
              </div>
            )}
          </section>
        </div>

        {/* ── Right Column: Order Summary Sidebar ── */}
        <aside className="lg:col-span-5 bg-soft border border-line rounded-md p-6 lg:sticky lg:top-24 space-y-5">
          <h2 className="text-[12.5px] font-bold tracking-[0.14em] uppercase text-ink">
            BAG SUMMARY ({items.length})
          </h2>

          {/* Items Mini List */}
          <div className="divide-y divide-line max-h-72 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="py-3 flex gap-3 items-center">
                <div className="relative w-14 h-16 bg-cream rounded overflow-hidden shrink-0 border border-line flex items-center justify-center">
                  {item.thumbnail ? (
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <Package size={18} className="text-aura-gray" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase text-ink truncate">
                    {item.title}
                  </p>
                  {item.variant_title && (
                    <p className="text-[10px] text-aura-gray font-medium uppercase tracking-wider">
                      {item.variant_title}
                    </p>
                  )}
                  <p className="text-xs text-aura-gray font-mono mt-0.5">
                    Qty: {item.quantity} &times;{" "}
                    {formatPrice(item.unit_price, currencyCode)}
                  </p>
                </div>
                <div className="text-xs font-bold font-mono text-ink text-right">
                  {formatPrice(item.unit_price * item.quantity, currencyCode)}
                </div>
              </div>
            ))}
          </div>

          {/* Totals Breakdown */}
          <div className="space-y-2.5 pt-4 border-t border-line text-xs">
            <div className="flex justify-between text-aura-gray">
              <span>Items Subtotal</span>
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
                    Calculated at delivery step
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

            <div className="pt-3 border-t-2 border-ink flex justify-between items-baseline text-ink">
              <span className="text-xs font-bold tracking-[0.12em] uppercase">
                TOTAL
              </span>
              <span className="text-xl font-bold font-mono">
                {formatPrice(totals.total, currencyCode)}
              </span>
            </div>
          </div>

          <div className="pt-2 text-center">
            <span className="inline-block border border-line bg-white text-aura-gray text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
              CASH ON DELIVERY
            </span>
          </div>
        </aside>
      </div>
    </main>
  );
}
