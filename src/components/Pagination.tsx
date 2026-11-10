import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { pageItems } from "@/lib/pagination";

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

const buttonBase =
  "inline-flex items-center justify-center h-9 min-w-9 px-3 rounded border text-xs font-semibold transition focus:outline-none focus-visible:ring-1 focus-visible:ring-ink cursor-pointer";

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const items = pageItems(page, totalPages);
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 pt-10 pb-6"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={isFirst}
        aria-label="Previous page"
        className={`${buttonBase} gap-1 border-line bg-white text-ink hover:border-ink disabled:opacity-30 disabled:hover:border-line disabled:cursor-not-allowed`}
      >
        <ChevronLeft size={14} />
        <span className="hidden sm:inline">PREV</span>
      </button>

      <span className="sm:hidden px-2 text-xs font-mono text-aura-gray">
        Page {page} of {totalPages}
      </span>

      <ul className="hidden sm:flex items-center gap-2">
        {items.map((item) =>
          typeof item === "number" ? (
            <li key={item}>
              <button
                type="button"
                onClick={() => onChange(item)}
                aria-label={`Page ${item}`}
                aria-current={item === page ? "page" : undefined}
                className={`${buttonBase} ${
                  item === page
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-ink hover:border-ink"
                }`}
              >
                {item}
              </button>
            </li>
          ) : (
            <li key={item} aria-hidden="true" className="px-1 text-aura-gray">
              &hellip;
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={isLast}
        aria-label="Next page"
        className={`${buttonBase} gap-1 border-line bg-white text-ink hover:border-ink disabled:opacity-30 disabled:hover:border-line disabled:cursor-not-allowed`}
      >
        <span className="hidden sm:inline">NEXT</span>
        <ChevronRight size={14} />
      </button>
    </nav>
  );
}
