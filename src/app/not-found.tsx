import React from "react";
import Link from "next/link";
import { STORE_NAME } from "@/lib/medusa";
import { PackageX, ArrowLeft, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <main className="max-w-[1240px] mx-auto px-6 py-24 text-center">
      <div className="max-w-md mx-auto py-16 px-6 border border-dashed border-line rounded-xl space-y-5 bg-card/30">
        <PackageX size={52} className="mx-auto text-aura-gray stroke-[1.4]" />
        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-aura-gray">
            404 NOT FOUND &bull; {STORE_NAME}
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-ink">
            Page Not Found
          </h1>
          <p className="text-xs text-aura-gray">
            The page you are looking for does not exist or may have been moved.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-5 py-3 text-[11px] font-semibold tracking-wider uppercase rounded border border-line bg-white hover:border-ink text-ink transition-colors"
          >
            <ArrowLeft size={13} />
            <span>HOME</span>
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 px-5 py-3 text-[11px] font-semibold tracking-wider uppercase rounded bg-ink hover:bg-ink-hover text-white transition-colors shadow-xs"
          >
            <ShoppingBag size={13} />
            <span>BROWSE SHOP</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
