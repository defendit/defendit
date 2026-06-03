/*
Copyright © 2026 Defend I.T. Solutions LLC. All Rights Reserved.

This software and its source code are the proprietary property of
Defend I.T. Solutions LLC and are protected by United States and
international copyright laws. Unauthorized reproduction, distribution,
modification, display, or use of this software, in whole or in part, without the
prior written permission of Defend I.T. Solutions LLC, is strictly prohibited.

This software is provided for use only by authorized employees, contractors, or
licensees of Defend I.T. Solutions LLC and may not be disclosed to any third
party without express written consent.
*/

import { useState } from "react";
import { Zap, Loader2, Mail } from "lucide-react";
import { useRecaptcha } from "@/hooks/useRecaptcha";

type WaitlistFormProps = Readonly<{
  tier?: "individual" | "team" | "enterprise";
  className?: string;
  stacked?: boolean;
}>;

export function WaitlistForm({
  tier = "individual",
  className = "",
  stacked = false,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { execute } = useRecaptcha();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const captchaToken = await execute("waitlist");

      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), tier, captchaToken }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Something went wrong");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-1.5 py-3 px-4 rounded-lg bg-success/10 border border-success/40 text-center ${className}`}
      >
        <div className="flex items-center gap-2 text-success text-sm font-medium">
          <Mail className="w-4 h-4" />
          Check your email to confirm your spot.
        </div>
        <p className="text-xs text-ink-muted">
          Don&apos;t see it? Check your junk or spam folder.
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className={`flex gap-2 ${stacked ? "flex-col" : "flex-col sm:flex-row"}`}
      >
        <div className="relative flex-1 min-w-0">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-dim pointer-events-none" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Enter your email"
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface-inset border border-hairline text-ink placeholder-ink-dim text-base focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          style={{ touchAction: "manipulation" }}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-contrast text-sm font-semibold shadow-lg hover:bg-accent-hover hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap touch-manipulation"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Zap className="w-4 h-4" />
          )}
          Join Waiting List
        </button>
      </form>
      {status === "error" && (
        <p className="mt-2 text-xs text-danger">{errorMsg}</p>
      )}
      <p className="mt-2 text-xs text-ink-dim">Protected by reCAPTCHA.</p>
    </div>
  );
}
