"use client";

import React, { useState } from "react";
import Link from "next/link";
import { STORE_NAME } from "@/logic";
import { ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useRegisterForm } from "@/logic/use-register-form";

export default function RegisterPage() {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    isSubmitting,
    error,
    isExistingAccount,
    handleSubmit,
    customer,
  } = useRegisterForm();

  const [showPassword, setShowPassword] = useState(false);

  if (customer) {
    return null;
  }

  return (
    <main className="min-h-[calc(100vh-140px)] bg-soft flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white border border-line rounded-lg overflow-hidden shadow-xs p-8 sm:p-10 space-y-6">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-aura-gray mb-2">
            JOIN US
          </p>
          <h1 className="font-serif text-3xl font-medium text-ink mb-2">
            Create an Account
          </h1>
          <p className="text-xs text-aura-gray">
            Join {STORE_NAME} to track orders and save your delivery details.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded border border-rose-200 bg-rose-50 text-rose-800 text-xs flex items-center gap-2.5">
            <AlertCircle size={15} className="shrink-0 text-rose-600" />
            <div>
              {isExistingAccount ? (
                <span>
                  You already have an account with this email.{" "}
                  <Link
                    href="/account/login"
                    className="font-bold underline text-ink hover:opacity-70 ml-1"
                  >
                    Log in instead.
                  </Link>
                </span>
              ) : (
                <span>{error}</span>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink mb-1.5">
                FIRST NAME
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Jane"
                className="w-full border border-line rounded px-3.5 py-2.5 text-xs outline-none bg-white text-ink focus:border-ink transition-colors"
              />
            </div>
            <div>
              <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink mb-1.5">
                LAST NAME
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
                className="w-full border border-line rounded px-3.5 py-2.5 text-xs outline-none bg-white text-ink focus:border-ink transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink mb-1.5">
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full border border-line rounded px-3.5 py-2.5 text-xs outline-none bg-white text-ink focus:border-ink transition-colors"
            />
          </div>

          <div>
            <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink mb-1.5">
              PASSWORD (MIN 6 CHARACTERS)
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-line rounded px-3.5 py-2.5 pr-10 text-xs outline-none bg-white text-ink focus:border-ink transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-aura-gray hover:text-ink p-1 cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 bg-ink text-white rounded text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#3a352e] disabled:bg-zinc-300 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{isSubmitting ? "CREATING ACCOUNT..." : "REGISTER"}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-line text-center text-xs text-aura-gray">
          Already have an account?{" "}
          <Link
            href="/account/login"
            className="font-bold text-ink underline underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </div>
    </main>
  );
}
