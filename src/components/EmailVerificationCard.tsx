"use client";

import React from "react";
import { MailCheck, AlertCircle, CheckCircle2 } from "lucide-react";
import { CODE_LENGTH } from "@/lib/email-verification";
import { useEmailVerificationCard } from "@/logic/use-email-verification";

interface Props {
  email: string;
  onVerified?: () => void;
}

export default function EmailVerificationCard({ email, onVerified }: Props) {
  const {
    code,
    setCleanCode,
    busy,
    error,
    notice,
    wait,
    codeSent,
    inputRef,
    send,
    confirm,
    isComplete,
    resendButtonLabel,
  } = useEmailVerificationCard({ email, onVerified });

  return (
    <div className="border border-line bg-card rounded-md p-6 space-y-4">
      <div className="flex items-start gap-3.5">
        <MailCheck size={20} className="text-ink mt-0.5 shrink-0 stroke-[1.5]" />
        <div className="space-y-1">
          <h2 className="text-[12px] font-bold tracking-[0.12em] uppercase text-ink">
            Confirm your email
          </h2>
          <p className="text-xs text-aura-gray leading-relaxed">
            {codeSent
              ? `Enter the ${CODE_LENGTH} digit code sent to ${email}.`
              : `We will email a ${CODE_LENGTH} digit code to ${email}.`}{" "}
            You can keep browsing without it. Confirming links your earlier guest orders to this account.
          </p>
        </div>
      </div>

      <form onSubmit={confirm} className="flex flex-col sm:flex-row gap-3">
        <input
          ref={inputRef}
          value={code}
          onChange={(e) => setCleanCode(e.target.value)}
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={CODE_LENGTH + 4}
          placeholder="123456"
          aria-label={`${CODE_LENGTH} digit confirmation code`}
          className="w-full sm:w-44 px-3 py-2 border border-line rounded bg-white text-center font-mono text-base tracking-[0.35em] text-ink focus:outline-none focus:border-ink"
        />
        <button
          type="submit"
          disabled={busy !== null || !isComplete}
          className="px-5 py-2.5 rounded bg-ink text-white text-[11px] font-semibold tracking-[0.16em] uppercase hover:bg-ink-hover transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {busy === "confirm" ? "CHECKING..." : "CONFIRM"}
        </button>
        <button
          type="button"
          onClick={send}
          disabled={busy !== null || wait > 0}
          className="px-4 py-2.5 rounded border border-line bg-white text-[11px] font-semibold tracking-[0.14em] uppercase text-ink hover:border-ink transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          {resendButtonLabel}
        </button>
      </form>

      {error && (
        <p role="alert" className="flex items-start gap-2 text-xs text-rose-700">
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
      {notice && !error && (
        <p role="status" className="flex items-start gap-2 text-xs text-emerald-800">
          <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
          <span>{notice}</span>
        </p>
      )}
      <p className="text-[11px] text-aura-gray">
        Nothing in your inbox? Check the spam folder, then request a new code.
      </p>
    </div>
  );
}
