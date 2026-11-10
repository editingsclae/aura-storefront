"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Storefront Application Error:", error);
  }, [error]);

  return (
    <main className="max-w-[1240px] mx-auto px-6 py-24 text-center">
      <div className="max-w-md mx-auto py-16 px-6 border border-dashed border-line rounded-xl space-y-5 bg-card/30">
        <div className="w-14 h-14 mx-auto rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
          <AlertCircle size={26} />
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-aura-gray">
            APPLICATION ERROR
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-ink">
            Something Went Wrong
          </h1>
          <p className="text-xs text-aura-gray">
            An unexpected error occurred while loading this page. Please try again.
          </p>
          {error.digest && (
            <p className="text-[10px] font-mono text-aura-gray">
              Digest: {error.digest}
            </p>
          )}
        </div>

        <div className="flex items-center justify-center gap-3 pt-3">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-1.5 px-5 py-3 text-[11px] font-semibold tracking-wider uppercase rounded bg-ink hover:bg-[#3a352e] text-white transition-colors shadow-xs cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>TRY AGAIN</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 px-5 py-3 text-[11px] font-semibold tracking-wider uppercase rounded border border-line bg-white hover:border-ink text-ink transition-colors"
          >
            <Home size={13} />
            <span>HOME</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
