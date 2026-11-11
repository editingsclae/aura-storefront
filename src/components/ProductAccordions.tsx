"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";

interface ProductAccordionsProps {
  description?: string | null;
}

export function ProductAccordions({ description }: ProductAccordionsProps) {
  const [openSection, setOpenSection] = useState<string | null>("desc");

  return (
    <div className="pt-4 border-t border-line divide-y divide-line">
      {/* Description Accordion */}
      {description && (
        <div>
          <button
            type="button"
            onClick={() => setOpenSection(openSection === "desc" ? null : "desc")}
            className="w-full py-5 flex items-center justify-between text-left text-[11px] font-bold tracking-[0.16em] uppercase text-ink cursor-pointer"
          >
            <span>DESCRIPTION</span>
            <Plus
              className={`w-4 h-4 text-ink transition-transform duration-200 ${
                openSection === "desc" ? "rotate-45" : "rotate-0"
              }`}
            />
          </button>
          {openSection === "desc" && (
            <div className="pb-6 text-xs sm:text-sm leading-relaxed text-aura-gray whitespace-pre-line space-y-3">
              <p>{description}</p>
            </div>
          )}
        </div>
      )}

      {/* Shipping & Cash on Delivery Accordion */}
      <div>
        <button
          type="button"
          onClick={() =>
            setOpenSection(openSection === "shipping" ? null : "shipping")
          }
          className="w-full py-5 flex items-center justify-between text-left text-[11px] font-bold tracking-[0.16em] uppercase text-ink cursor-pointer"
        >
          <span>SHIPPING &amp; CASH ON DELIVERY</span>
          <Plus
            className={`w-4 h-4 text-ink transition-transform duration-200 ${
              openSection === "shipping" ? "rotate-45" : "rotate-0"
            }`}
          />
        </button>
        {openSection === "shipping" && (
          <div className="pb-6 text-xs sm:text-sm leading-relaxed text-aura-gray">
            <ul className="space-y-2 list-disc list-inside">
              <li>
                <b className="text-ink">Cash on delivery</b> — pay the courier in cash on arrival.
              </li>
              <li>Delivery options and rates are calculated at checkout.</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

