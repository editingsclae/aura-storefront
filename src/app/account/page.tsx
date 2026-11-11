"use client";

import React, { useState } from "react";
import Link from "next/link";
import EmailVerificationCard from "@/components/EmailVerificationCard";
import {
  formatPrice,
  STORE_NAME,
  getDerivedOrderStatus,
} from "@/logic";
import {
  Package,
  LogOut,
  ChevronRight,
  ShoppingBag,
  BadgeCheck,
  User,
} from "lucide-react";
import { useAccountOrders } from "@/logic/use-account-orders";

export default function AccountPage() {
  const {
    customer,
    emailVerified,
    authLoading,
    orders,
    ordersLoading,
    reloadOrders,
    handleLogout,
  } = useAccountOrders();

  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");

  if (authLoading || (!customer && authLoading)) {
    return (
      <div className="py-24 text-center space-y-4">
        <div className="w-8 h-8 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-aura-gray font-medium tracking-wider uppercase">
          Loading your account...
        </p>
      </div>
    );
  }

  if (!customer) {
    return null;
  }

  const initials = (
    customer.first_name
      ? `${customer.first_name[0]}${customer.last_name ? customer.last_name[0] : ""}`
      : customer.email.slice(0, 2)
  ).toUpperCase();

  const fullName = customer.first_name
    ? `${customer.first_name} ${customer.last_name || ""}`.trim()
    : "Customer";

  return (
    <main className="max-w-[1240px] mx-auto px-6 py-8 sm:py-12 min-h-screen">
      {/* ── Breadcrumb ── */}
      <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-aura-gray mb-6">
        <Link href="/" className="hover:text-ink transition-colors">
          HOME
        </Link>{" "}
        / MY ACCOUNT
      </p>

      <h1 className="text-lg sm:text-xl font-bold tracking-[0.14em] uppercase text-ink mb-8">
        MY ACCOUNT
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── Sidebar ── */}
        <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
          {/* Identity Card */}
          <div className="bg-white border border-line rounded-md p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-ink text-white text-xs font-bold flex items-center justify-center shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <b className="block text-sm font-bold text-ink uppercase truncate">
                {fullName}
              </b>
              <span className="text-xs text-aura-gray truncate block font-mono">
                {customer.email}
              </span>
              {emailVerified === true && (
                <span className="inline-flex items-center gap-1 text-[10.5px] font-semibold text-emerald-800 mt-1">
                  <BadgeCheck size={13} />
                  Confirmed
                </span>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="bg-white border border-line rounded-md p-2 flex flex-col space-y-1">
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-[11px] font-bold tracking-[0.12em] uppercase transition-colors text-left cursor-pointer ${
                activeTab === "orders"
                  ? "bg-ink text-white"
                  : "text-ink hover:bg-card"
              }`}
            >
              <Package className="w-4 h-4 stroke-[1.6]" />
              <span className="flex-1">MY ORDERS</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeTab === "orders"
                    ? "bg-white/20 text-white"
                    : "bg-card text-aura-gray"
                }`}
              >
                {orders.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded text-[11px] font-bold tracking-[0.12em] uppercase transition-colors text-left cursor-pointer ${
                activeTab === "profile"
                  ? "bg-ink text-white"
                  : "text-ink hover:bg-card"
              }`}
            >
              <User className="w-4 h-4 stroke-[1.6]" />
              <span>PROFILE DETAILS</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded text-[11px] font-bold tracking-[0.12em] uppercase text-aura-gray hover:text-rose-600 hover:bg-rose-50 transition-colors text-left cursor-pointer"
            >
              <LogOut className="w-4 h-4 stroke-[1.6]" />
              <span>SIGN OUT</span>
            </button>
          </nav>
        </aside>

        {/* ── Main Panel Content ── */}
        <section className="lg:col-span-8 space-y-6">
          {/* Email verification card if unverified */}
          {emailVerified === false && (
            <EmailVerificationCard
              email={customer.email}
              onVerified={reloadOrders}
            />
          )}

          {activeTab === "orders" && (
            <div className="bg-white border border-line rounded-md p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-line">
                <h2 className="text-[12.5px] font-bold tracking-[0.14em] uppercase text-ink">
                  ORDER HISTORY
                </h2>
                <span className="text-xs font-mono text-aura-gray">
                  {orders.length} {orders.length === 1 ? "order" : "orders"}
                </span>
              </div>

              {ordersLoading && (
                <div className="py-16 text-center text-xs text-aura-gray space-y-3">
                  <div className="w-6 h-6 border-2 border-ink border-t-transparent rounded-full animate-spin mx-auto" />
                  <p>Fetching your orders from {STORE_NAME}...</p>
                </div>
              )}

              {!ordersLoading && orders.length === 0 && (
                <div className="text-center py-16 border border-dashed border-line rounded-lg space-y-3 bg-card/30">
                  <ShoppingBag size={40} className="mx-auto text-aura-gray stroke-[1.4]" />
                  <h3 className="font-serif text-lg font-medium text-ink">
                    No orders placed yet
                  </h3>
                  <p className="text-xs text-aura-gray max-w-sm mx-auto">
                    You haven&apos;t placed any orders with {STORE_NAME} yet.
                  </p>
                  <div className="pt-2">
                    <Link
                      href="/shop"
                      className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase px-5 py-2.5 bg-ink text-white hover:bg-ink-hover transition-colors"
                    >
                      <span>BROWSE CATALOG</span>
                    </Link>
                  </div>
                </div>
              )}

              {!ordersLoading && orders.length > 0 && (
                <div className="divide-y divide-line">
                  {orders.map((order) => {
                    const currency = order.currency_code || "TND";
                    return (
                      <div
                        key={order.id}
                        className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs uppercase text-ink">
                              Order #{order.display_id ?? order.id}
                            </span>
                            <span className="inline-flex items-center px-2 py-0.5 rounded bg-card border border-line text-[10px] font-semibold uppercase text-ink">
                              {getDerivedOrderStatus(order)}
                            </span>
                          </div>
                          <p className="text-xs text-aura-gray">
                            Placed on{" "}
                            {new Date(order.created_at).toLocaleDateString(
                              undefined,
                              { dateStyle: "medium" }
                            )}{" "}
                            &bull; {order.items?.length || 0}{" "}
                            {order.items?.length === 1 ? "item" : "items"}
                          </p>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4">
                          <span className="font-mono font-bold text-sm text-ink">
                            {formatPrice(order.total, currency)}
                          </span>
                          <Link
                            href={`/account/orders/${order.id}`}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase text-aura-gray hover:text-ink transition-colors border border-line rounded px-3 py-1.5"
                          >
                            <span>DETAILS</span>
                            <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white border border-line rounded-md p-6 sm:p-8 space-y-6">
              <h2 className="text-[12.5px] font-bold tracking-[0.14em] uppercase text-ink pb-4 border-b border-line">
                PROFILE DETAILS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <span className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-aura-gray mb-1">
                    FULL NAME
                  </span>
                  <p className="font-semibold text-ink text-sm uppercase">
                    {fullName}
                  </p>
                </div>
                <div>
                  <span className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-aura-gray mb-1">
                    EMAIL ADDRESS
                  </span>
                  <p className="font-mono text-ink text-sm">
                    {customer.email}
                  </p>
                </div>
                <div>
                  <span className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-aura-gray mb-1">
                    PHONE
                  </span>
                  <p className="font-mono text-ink text-sm">
                    {customer.phone || "Not provided"}
                  </p>
                </div>
                <div>
                  <span className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-aura-gray mb-1">
                    STATUS
                  </span>
                  <p className="font-semibold text-ink text-sm">
                    {emailVerified ? "Verified Account" : "Unverified Email"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
