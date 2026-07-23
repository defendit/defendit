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
import {
  Send,
  Check,
  Loader2,
  Mail,
  User,
  MessageSquare,
  Tag,
} from "lucide-react";
import { useRecaptcha } from "@/hooks/useRecaptcha";

const TOPICS = [
  { value: "general", label: "General Question" },
  { value: "computer_repair", label: "Computer Repair" },
  { value: "virus_removal", label: "Virus and Malware Removal" },
  { value: "network_security", label: "Home Network and Wi-Fi Security" },
  { value: "scam_protection", label: "Scam and Fraud Protection" },
  { value: "data_recovery", label: "Data Recovery and Backup Help" },
  { value: "onsite_support", label: "On-Site Tech Support" },
  { value: "remote_support", label: "Remote Support" },
  { value: "smart_home", label: "Smart Home Setup and Security" },
  { value: "sigint_pro", label: "SIGINT Pro" },
  { value: "sigint_enterprise", label: "SIGINT Enterprise" },
  { value: "sigint_community", label: "SIGINT Community Edition" },
  { value: "other", label: "Other" },
];

// text-base at the base viewport prevents iOS Safari auto-zoom on focus.
const FIELD_BASE =
  "w-full pl-10 pr-4 py-3 rounded-lg bg-surface-inset text-ink placeholder-ink-dim text-base focus:outline-none focus:ring-1 transition-colors";
const FIELD_OK = "border border-hairline focus:border-accent focus:ring-accent";
const FIELD_ERROR =
  "border border-danger focus:border-danger focus:ring-danger";
const LABEL = "block text-sm font-medium text-ink-muted mb-1";
const FIELD_ICON =
  "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-dim pointer-events-none";

type ContactFormProps = Readonly<{
  defaultTopic?: string;
  className?: string;
}>;

export function ContactForm({
  defaultTopic = "general",
  className = "",
}: ContactFormProps) {
  const [topic, setTopic] = useState(defaultTopic);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { execute } = useRecaptcha();

  const validate = (): boolean => {
    const errors: Record<string, string> = {};

    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Enter a valid email address.";
    }

    if (!message.trim()) {
      errors.message = "Message is required.";
    } else if (message.trim().length < 10) {
      errors.message = "Enter at least 10 characters.";
    } else if (message.length > 5000) {
      errors.message = "Message cannot exceed 5,000 characters.";
    }

    if (name.trim().length > 100) {
      errors.name = "Name cannot exceed 100 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const captchaToken = await execute("contact");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          topic,
          message: message.trim(),
          captchaToken,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setName("");
        setMessage("");
        setFieldErrors({});
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "We could not send your message. Please try again.");
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
        role="status"
        className={`flex flex-col items-center justify-center gap-3 py-10 px-6 rounded-lg bg-success/10 border border-success/40 ${className}`}
      >
        <Check className="w-8 h-8 text-success" />
        <p className="text-success font-semibold">Message sent.</p>
        <p className="text-sm text-ink-muted">
          We will reply as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm text-accent hover:text-accent-hover hover:underline transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Topic */}
        <div>
          <label htmlFor="contact-topic" className={LABEL}>
            Topic
          </label>
          <div className="relative">
            <Tag className={FIELD_ICON} />
            <select
              id="contact-topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className={`${FIELD_BASE} ${FIELD_OK} appearance-none`}
            >
              {TOPICS.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Name */}
        <div>
          <label htmlFor="contact-name" className={LABEL}>
            Name <span className="text-ink-dim font-normal">(optional)</span>
          </label>
          <div className="relative">
            <User className={FIELD_ICON} />
            <input
              id="contact-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (fieldErrors.name)
                  setFieldErrors((p) => ({ ...p, name: "" }));
              }}
              placeholder="Your name"
              maxLength={100}
              aria-invalid={fieldErrors.name ? true : undefined}
              aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
              className={`${FIELD_BASE} ${FIELD_OK}`}
            />
          </div>
          {fieldErrors.name && (
            <p id="contact-name-error" role="alert" className="mt-1 text-xs text-danger">
              {fieldErrors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className={LABEL}>
            Email
          </label>
          <div className="relative">
            <Mail className={FIELD_ICON} />
            <input
              id="contact-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email)
                  setFieldErrors((p) => ({ ...p, email: "" }));
                if (status === "error") setStatus("idle");
              }}
              placeholder="your@email.com"
              aria-invalid={fieldErrors.email ? true : undefined}
              aria-describedby={
                fieldErrors.email ? "contact-email-error" : undefined
              }
              className={`${FIELD_BASE} ${
                fieldErrors.email ? FIELD_ERROR : FIELD_OK
              }`}
            />
          </div>
          {fieldErrors.email && (
            <p id="contact-email-error" role="alert" className="mt-1 text-xs text-danger">
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label htmlFor="contact-message" className={LABEL}>
            Message
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-ink-dim pointer-events-none" />
            <textarea
              id="contact-message"
              required
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (fieldErrors.message)
                  setFieldErrors((p) => ({ ...p, message: "" }));
                if (status === "error") setStatus("idle");
              }}
              placeholder="Describe the problem and the help you need."
              rows={5}
              maxLength={5000}
              aria-invalid={fieldErrors.message ? true : undefined}
              aria-describedby={
                fieldErrors.message ? "contact-message-error" : undefined
              }
              className={`${FIELD_BASE} resize-y ${
                fieldErrors.message ? FIELD_ERROR : FIELD_OK
              }`}
            />
          </div>
          <div className="flex justify-between mt-1">
            {fieldErrors.message ? (
              <p id="contact-message-error" role="alert" className="text-xs text-danger">
                {fieldErrors.message}
              </p>
            ) : (
              <span />
            )}
            <p className="text-xs text-ink-dim">{message.length}/5000</p>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          style={{ touchAction: "manipulation" }}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-accent-fill text-accent-contrast font-semibold shadow-lg hover:bg-accent-fill-hover hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
        >
          {status === "loading" ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          Send Message
        </button>

        {status === "error" && (
          <p role="alert" className="text-xs text-danger text-center">
            {errorMsg}
          </p>
        )}
      </form>
      <p className="mt-3 text-xs text-ink-dim text-center">
        Protected by reCAPTCHA. Never send passwords or security codes.
      </p>
    </div>
  );
}
