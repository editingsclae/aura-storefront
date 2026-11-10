"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { STORE_NAME } from "@/logic";
import { CODE_LENGTH } from "@/lib/email-verification";
import { useForgotPassword } from "@/logic/use-forgot-password";

const FIELD =
  "w-full border border-line rounded px-3.5 py-2.5 text-xs outline-none bg-white text-ink focus:border-ink transition-colors";
const LABEL =
  "block text-[9.5px] font-bold tracking-[0.14em] uppercase text-ink mb-1.5";

export default function ForgotPasswordPage() {
  const {
    customer,
    step,
    email,
    setEmail,
    code,
    setCleanCode,
    password,
    setPassword,
    repeat,
    setRepeat,
    busy,
    error,
    wait,
    changed,
    codeRef,
    sendCode,
    handleEmail,
    handleReset,
    handleUseDifferentEmail,
    resendLabelText,
  } = useForgotPassword();

  if (customer) {
    return null;
  }

  if (changed) {
    return (
      <main className="min-h-[calc(100vh-140px)] bg-soft flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-md bg-white border border-line rounded-lg shadow-xs p-8 sm:p-10 space-y-4 text-center">
          <CheckCircle2 size={32} className="mx-auto text-emerald-700" />
          <h1 className="font-serif text-2xl font-medium text-ink">Password Updated</h1>
          <p className="text-xs text-aura-gray">
            Your password has been changed. Sign in with your new credentials.
          </p>
          <div className="pt-2">
            <Link
              href="/account/login"
              className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase px-6 py-3 bg-ink text-white hover:bg-[#3a352e] transition-colors"
            >
              <span>SIGN IN</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-140px)] bg-soft flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white border border-line rounded-lg shadow-xs p-8 sm:p-10 space-y-6">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-aura-gray mb-2">
            ACCOUNT RECOVERY
          </p>
          <h1 className="font-serif text-3xl font-medium text-ink mb-2">
            Reset Password
          </h1>
          <p className="text-xs text-aura-gray">
            {step === "email"
              ? `Enter the email of your ${STORE_NAME} account and we will send you a verification code.`
              : `We sent a ${CODE_LENGTH} digit verification code to ${email.trim()}.`}
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="p-3.5 rounded border border-rose-200 bg-rose-50 text-rose-800 text-xs flex items-center gap-2.5"
          >
            <AlertCircle size={15} className="shrink-0 text-rose-600" />
            <span>{error}</span>
          </div>
        )}

        {step === "email" ? (
          <form onSubmit={handleEmail} className="space-y-4" noValidate>
            <div>
              <label className={LABEL}>EMAIL ADDRESS</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className={FIELD}
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={busy !== null}
                className="w-full py-3.5 px-6 bg-ink text-white rounded text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#3a352e] disabled:bg-zinc-300 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{busy === "send" ? "SENDING CODE..." : "SEND CODE"}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleReset} className="space-y-4" noValidate>
            <div>
              <label className={LABEL}>VERIFICATION CODE</label>
              <input
                ref={codeRef}
                value={code}
                onChange={(e) => setCleanCode(e.target.value)}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={CODE_LENGTH + 4}
                placeholder="123456"
                aria-label={`${CODE_LENGTH} digit code`}
                className={`${FIELD} text-center font-mono text-base tracking-[0.35em]`}
              />
            </div>
            <div>
              <label className={LABEL}>NEW PASSWORD (MIN 8 CHARS)</label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className={FIELD}
              />
            </div>
            <div>
              <label className={LABEL}>REPEAT NEW PASSWORD</label>
              <input
                type="password"
                required
                autoComplete="new-password"
                value={repeat}
                onChange={(e) => setRepeat(e.target.value)}
                placeholder="Repeat password"
                className={FIELD}
              />
            </div>
            <div className="flex items-center justify-between text-xs pt-1">
              <button
                type="button"
                onClick={handleUseDifferentEmail}
                className="text-[10px] uppercase font-bold tracking-wider text-aura-gray hover:text-ink underline underline-offset-4 cursor-pointer"
              >
                Different email
              </button>
              <button
                type="button"
                onClick={sendCode}
                disabled={busy !== null || wait > 0}
                className="text-[10px] uppercase font-bold tracking-wider text-aura-gray hover:text-ink underline underline-offset-4 disabled:opacity-40 cursor-pointer"
              >
                {resendLabelText}
              </button>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={busy !== null}
                className="w-full py-3.5 px-6 bg-ink text-white rounded text-[11px] font-semibold tracking-[0.18em] uppercase hover:bg-[#3a352e] disabled:bg-zinc-300 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{busy === "reset" ? "CHANGING..." : "UPDATE PASSWORD"}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}

        <div className="pt-4 border-t border-line text-center text-xs text-aura-gray">
          Remember your password?{" "}
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
