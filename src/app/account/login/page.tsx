"use client";

import React, { useState } from "react";
import Link from "next/link";
import { STORE_NAME } from "@/logic";
import { ArrowRight, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useLoginForm } from "@/logic/use-login-form";

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isSubmitting,
    error,
    handleSubmit,
    customer,
  } = useLoginForm();

  const [showPassword, setShowPassword] = useState(false);

  if (customer) {
    return null;
  }

  return (
    <main className="min-h-[calc(100vh-140px)] bg-soft flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white border border-line rounded-lg overflow-hidden shadow-xs p-8 sm:p-10 space-y-6">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-aura-gray mb-2">
            ACCOUNT ACCESS
          </p>
          <h1 className="font-serif text-3xl font-medium text-ink mb-2">
            Welcome Back
          </h1>
          <p className="text-xs text-aura-gray">
            Sign in to your {STORE_NAME} account to continue.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded border border-rose-200 bg-rose-50 text-rose-800 text-xs flex items-center gap-2.5">
            <AlertCircle size={15} className="shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
              className="w-full border border-line rounded px-3.5 py-3 text-xs outline-none bg-white text-ink focus:border-ink transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink">
                PASSWORD
              </label>
              <Link
                href="/account/forgot-password"
                className="text-[10px] font-bold uppercase tracking-wider text-aura-gray hover:text-ink underline underline-offset-4"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-line rounded px-3.5 py-3 pr-10 text-xs outline-none bg-white text-ink focus:border-ink transition-colors"
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
              className="w-full py-3.5 px-6 bg-ink text-white rounded text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-ink-soft disabled:bg-zinc-300 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>{isSubmitting ? "SIGNING IN..." : "SIGN IN"}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </form>

        <div className="pt-4 border-t border-line text-center text-xs text-aura-gray">
          Don&apos;t have an account?{" "}
          <Link
            href="/account/register"
            className="font-bold text-ink underline underline-offset-4"
          >
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}
