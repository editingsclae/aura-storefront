import React from "react";

export default function Loading() {
  return (
    <div className="max-w-[1240px] mx-auto px-6 py-12 space-y-10 animate-pulse">
      {/* Header Skeleton */}
      <div className="border border-line rounded-md p-8 bg-soft h-36 flex flex-col justify-center space-y-3">
        <div className="h-3 bg-cream rounded-full w-24" />
        <div className="h-8 bg-cream rounded w-64" />
        <div className="h-3 bg-cream rounded w-96 max-w-full" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="border border-line rounded-md p-4 space-y-3 bg-white"
          >
            <div className="aspect-[4/4.5] bg-cream rounded w-full" />
            <div className="space-y-2 pt-2">
              <div className="h-3 bg-cream rounded w-1/3" />
              <div className="h-4 bg-cream rounded w-3/4" />
            </div>
            <div className="pt-2 border-t border-line flex items-center justify-between">
              <div className="h-4 bg-cream rounded w-16" />
              <div className="h-8 bg-cream rounded w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
