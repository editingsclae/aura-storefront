"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { MerchantCategory, STORE_NAME } from "@/logic";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { SearchModal } from "./SearchModal";

const TOP_BAR_CATEGORIES = 5;

interface HeaderProps {
  categories: MerchantCategory[];
}

export function Header({ categories }: HeaderProps) {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();
  const { customer } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const topCategories = categories.slice(0, TOP_BAR_CATEGORIES);

  // Store name branding
  const nameParts = (STORE_NAME || "Store").trim().split(/\s+/);
  const primaryWord = nameParts[0] || "STORE";
  const secondaryWord = nameParts.slice(1).join(" ");

  // Minimal header for authentication pages
  const isAuthPage =
    pathname === "/account/login" ||
    pathname === "/account/register" ||
    pathname === "/account/forgot-password";

  if (isAuthPage) {
    return (
      <header className="bg-white border-b border-line sticky top-0 z-40">
        <div className="max-w-[1240px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start leading-none group">
            <span className="font-serif text-3xl font-medium tracking-[0.14em] text-ink">
              {primaryWord}
            </span>
            {secondaryWord && (
              <span className="text-[8.5px] font-bold tracking-[0.5em] text-ink mt-1">
                {secondaryWord}
              </span>
            )}
          </Link>
          <Link
            href="/"
            className="text-[11.5px] font-semibold tracking-wider text-ink hover:opacity-60 transition-opacity"
          >
            &larr; BACK TO STORE
          </Link>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="bg-white border-b border-line sticky top-0 z-40">
        <div className="max-w-[1240px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start leading-none group shrink-0">
            <span className="font-serif text-2xl sm:text-3xl font-medium tracking-[0.14em] text-ink">
              {primaryWord}
            </span>
            {secondaryWord && (
              <span className="text-[8px] sm:text-[8.5px] font-bold tracking-[0.45em] sm:tracking-[0.5em] text-ink mt-1">
                {secondaryWord}
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/shop"
              className={`text-[11.5px] font-semibold tracking-wider uppercase transition-opacity hover:opacity-60 ${
                pathname === "/shop" ? "border-b-2 border-ink pb-0.5" : ""
              }`}
            >
              SHOP
            </Link>
            {topCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/c/${cat.handle}`}
                className={`text-[11.5px] font-semibold tracking-wider uppercase transition-opacity hover:opacity-60 ${
                  pathname === `/c/${cat.handle}` ? "border-b-2 border-ink pb-0.5" : ""
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 sm:gap-5 shrink-0">
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-1 text-ink hover:opacity-60 transition-opacity cursor-pointer"
              aria-label="Search products"
            >
              <Search className="w-5 h-5 stroke-[1.6]" />
            </button>

            <Link
              href="/account"
              className={`p-1 text-ink hover:opacity-60 transition-opacity ${
                pathname.startsWith("/account") ? "border-b-2 border-ink" : ""
              }`}
              aria-label="Account"
              title={customer ? `Account (${customer.email})` : "Account"}
            >
              <User className="w-5 h-5 stroke-[1.6]" />
            </Link>

            <button
              type="button"
              id="header-cart-button"
              onClick={openCart}
              className="relative p-1 text-ink hover:opacity-60 transition-opacity cursor-pointer"
              aria-label={`View shopping cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.6]" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-ink text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1 text-ink cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.6]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.6]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-line bg-white px-6 py-6 space-y-4">
            <Link
              href="/shop"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-semibold tracking-wider uppercase text-ink"
            >
              Shop All Products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/c/${cat.handle}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-sm font-semibold tracking-wider uppercase text-aura-gray hover:text-ink transition-colors"
              >
                {cat.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-line flex items-center justify-between">
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs uppercase font-bold tracking-wider text-ink"
              >
                {customer ? "My Account" : "Sign In / Register"}
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openCart();
                }}
                className="text-xs uppercase font-bold tracking-wider text-ink cursor-pointer"
              >
                Cart ({itemCount})
              </button>
            </div>
          </div>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
