"use client";

import React from "react";
import { Tag, X } from "lucide-react";
import { useCouponBox } from "@/logic/use-coupon";

// The box where a shopper types a coupon code, with the codes already applied below it.
// Used in the cart and at checkout.
export function CouponBox() {
  const { code, setCode, busy, error, applied, canApply, apply, remove } =
    useCouponBox();

  return (
    <div className="space-y-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void apply();
        }}
        className="flex gap-2"
      >
        <label htmlFor="coupon-code" className="sr-only">
          Coupon code
        </label>
        <input
          id="coupon-code"
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Coupon code"
          autoComplete="off"
          autoCapitalize="characters"
          className="min-w-0 flex-1 rounded-md border border-line bg-white px-3 py-2.5 text-xs uppercase tracking-[0.1em] text-ink placeholder:normal-case placeholder:tracking-normal placeholder:text-aura-gray focus:border-ink focus:outline-none"
        />
        <button
          type="submit"
          disabled={!canApply}
          className="rounded-md bg-ink px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? "..." : "Apply"}
        </button>
      </form>

      {error && (
        <p role="alert" className="text-[11px] font-medium text-red-600">
          {error}
        </p>
      )}

      {applied.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {applied.map((appliedCode) => (
            <li
              key={appliedCode}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white py-1 pl-2.5 pr-1.5 text-[11px] font-semibold text-ink"
            >
              <Tag size={12} aria-hidden="true" />
              <span className="tracking-[0.08em]">{appliedCode}</span>
              <button
                type="button"
                onClick={() => void remove(appliedCode)}
                disabled={busy}
                aria-label={`Remove coupon ${appliedCode}`}
                className="rounded-full p-0.5 text-aura-gray hover:text-ink disabled:opacity-50"
              >
                <X size={12} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
