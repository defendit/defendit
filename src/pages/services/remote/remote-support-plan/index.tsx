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

import {
  PageContainer,
  Meta,
  BreadCrumbs,
  JsonLdScript,
  FaqSection,
} from "@/components";
import { generateFAQPageLd, localBusinessLd } from "@/lib/json-ld";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RemoteSupportPlanPage() {
  const faq = [
    {
      question: "Do you require a VPN?",
      answer:
        "No. DISecureLink routes only support traffic with split tunneling. Regular browsing stays on your normal connection.",
    },
    {
      question: "Can you access my devices at any time?",
      answer:
        "Access is consent-based. You choose unattended or on-demand. Permissions are scoped per device.",
    },
    {
      question: "Is my data visible to third parties?",
      answer:
        "Sessions are encrypted. We do not sell or share client data. Access is limited to verified technicians.",
    },
    {
      question: "Can non-local clients enroll?",
      answer:
        "No. Enrollment requires on-site verification in our service area.",
    },
  ];

  const faqLd = generateFAQPageLd(
    faq.map(({ question, answer }) => ({
      name: question,
      acceptedAnswer: answer,
    })),
  );

  return (
    <>
      <Meta
        title="Remote Support Service Plan | Defend I.T. Solutions"
        description="Details about our secure, client-only Remote Support Plan. Learn how DIS Connect™, DISNet™, and DISecureLink™ provide professional remote tech support."
        url="https://www.wedefendit.com/remote-support-plan"
        image="https://www.wedefendit.com/og-image.png"
        keywords="Remote support, secure remote access, local IT support, DISConnect, DISNet, DISecureLink, Defend I.T. Solutions"
      />

      <JsonLdScript jsonLd={localBusinessLd} />
      <JsonLdScript jsonLd={faqLd} />
      <PageContainer>
        {/* Left by default on mobile; larger screens inherit existing look */}
        <main className="max-w-4xl mx-auto py-8 sm:py-10 space-y-6 sm:space-y-7 px-4 sm:px-6 text-left">
          <BreadCrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              { name: "Remote", href: "/services/remote" },
              {
                name: "Remote Support Plan",
                href: "/services/remote/remote-support-plan",
              },
            ]}
            includeJsonLd={true}
          />

          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-feature border border-hairline bg-surface bg-[image:var(--wash)] px-6 py-8 shadow-card space-y-4">
            <div className="relative inline-flex items-center gap-2 rounded-full border border-border-accent bg-surface px-4 py-2 text-eyebrow font-semibold uppercase tracking-eyebrow text-accent">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.25}
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Local Clients Only
            </div>

            <h1 className="relative text-display tracking-display font-semibold text-ink">
              Remote Support Service Plan
            </h1>

            <p className="relative max-w-readable text-lead text-ink-muted">
              Private remote support for verified local clients who want faster
              follow-up help without giving up control.
            </p>

            {/* Feature Highlights - Now Visual Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="relative flex items-center gap-3 overflow-hidden rounded-card border border-hairline bg-surface p-3 shadow-card">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-border-accent bg-surface">
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-ink">
                  Encrypted Sessions
                </span>
              </div>

              <div className="relative flex items-center gap-3 overflow-hidden rounded-card border border-hairline bg-surface p-3 shadow-card">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-border-accent bg-surface">
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-ink">
                  Consent-Based Access
                </span>
              </div>

              <div className="relative flex items-center gap-3 overflow-hidden rounded-card border border-hairline bg-surface p-3 shadow-card">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-border-accent bg-surface">
                  <svg
                    className="w-5 h-5 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-ink">
                  Local Enrollment
                </span>
              </div>
            </div>
          </div>

          {/* Why a plan */}
          <section
            className="pt-6 sm:pt-8 first:pt-0 border-t border-hairline first:border-t-0"
            aria-labelledby="why-plan"
          >
            <h2 id="why-plan" className="text-h2 tracking-h2 font-semibold text-ink">
              Why a Support Plan
            </h2>
            <p className="mt-2 text-ink-muted">
              We use a private remote support environment for enrolled local
              clients and approved devices. The point is simple: make follow-up
              help faster and easier without turning remote access into a
              free-for-all.
            </p>
            <p className="mt-2 text-ink-muted">
              The plan covers the secure setup behind that access, including
              enrollment, provisioning, upkeep, and support capacity reserved
              for plan clients.
            </p>
          </section>

          {/* Technical Approach */}
          <section
            className="pt-6 sm:pt-8 border-t border-hairline"
            aria-labelledby="tech-approach"
          >
            <h2 id="tech-approach" className="text-h2 tracking-h2 font-semibold text-ink">
              Technical Approach
            </h2>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div className="relative overflow-hidden rounded-card border border-hairline bg-surface bg-[image:var(--wash)] p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-card-hover">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface border border-border-accent flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">
                      Private Infrastructure
                    </h3>
                    <p className="text-sm text-ink-muted">
                      Remote access services live on our private network and are
                      not exposed to the public internet.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-card border border-hairline bg-surface bg-[image:var(--wash)] p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-card-hover">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface border border-border-accent flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">
                      Scoped Access
                    </h3>
                    <p className="text-sm text-ink-muted">
                      The support tunnel is limited to approved service routes;
                      normal browsing stays on your regular connection.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-card border border-hairline bg-surface bg-[image:var(--wash)] p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-card-hover">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface border border-border-accent flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">
                      Layered Protection
                    </h3>
                    <p className="text-sm text-ink-muted">
                      Session encryption runs inside the private tunnel for
                      defense in depth.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-card border border-hairline bg-surface bg-[image:var(--wash)] p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-card-hover">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface border border-border-accent flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">
                      Least-Privilege Control
                    </h3>
                    <p className="text-sm text-ink-muted">
                      Access is consent-based and limited to enrolled devices;
                      enrollment and revocation are handled per device.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-card border border-hairline bg-surface bg-[image:var(--wash)] p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-card-hover">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface border border-border-accent flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">
                      Network Isolation
                    </h3>
                    <p className="text-sm text-ink-muted">
                      Segmented zones with default-deny rules; only explicit
                      service paths are allowed.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-card border border-hairline bg-surface bg-[image:var(--wash)] p-4 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-card-hover">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface border border-border-accent flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink mb-1">
                      Operational Hardening
                    </h3>
                    <p className="text-sm text-ink-muted">
                      Ongoing monitoring, maintenance, and updates performed by
                      our team.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Included */}
          <section
            className="pt-6 sm:pt-8 border-t border-hairline"
            aria-labelledby="included"
          >
            <h2 id="included" className="text-h2 tracking-h2 font-semibold text-ink">
              What Is Included
            </h2>
            <ul className="mt-2 list-disc pl-5 sm:pl-6 text-ink-muted text-sm sm:text-base space-y-2 marker:text-accent">
              <li>Priority scheduling for common remote issues</li>
              <li>Secure remote sessions with consent-based access</li>
              <li>
                On-demand or unattended support options, depending on the plan
              </li>
              <li>Enrollment for approved devices</li>
              <li>Lower remote labor rates for subscription members</li>
              <li>After-hours help for urgent issues, where available</li>
            </ul>
          </section>

          {/* Eligibility */}
          <section
            className="pt-6 sm:pt-8 border-t border-hairline"
            aria-labelledby="eligibility"
          >
            <h2 id="eligibility" className="text-h2 tracking-h2 font-semibold text-ink">
              Who Is Eligible
            </h2>
            <p className="mt-2 text-ink-muted">
              This plan is for local clients in Ocala, Belleview, The Villages,
              and nearby areas. Devices must be enrolled locally before remote
              support is available.
            </p>
          </section>

          {/* Tiered Support */}
          <section
            className="pt-6 sm:pt-8 border-t border-hairline"
            aria-labelledby="tiered-support"
          >
            <h2 id="tiered-support" className="text-h2 tracking-h2 font-semibold text-ink mb-4">
              Tiered Support Options
            </h2>
            <p className="mt-2 text-ink-muted mb-6">
              Our Remote Support Plan is flexible, with tiers based on how you
              prefer to connect:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Tier 1 */}
              <div className="relative overflow-hidden rounded-card border border-hairline bg-surface bg-[image:var(--wash)] p-6 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border-accent bg-surface text-xl font-bold text-accent">
                    1
                  </div>
                  <h3 className="text-h3 tracking-h3 font-semibold text-ink">
                    Tier 1
                  </h3>
                </div>
                <p className="text-ink-muted mb-4">
                  <strong>Fully Asynchronous Remote Support</strong>
                </p>
                <p className="text-sm text-ink-muted leading-relaxed">
                  We can connect without you being present once devices are
                  enrolled and permissions are set. Perfect for updates,
                  maintenance, and non-urgent fixes.
                </p>
                <div className="mt-6 pt-4 border-t border-hairline">
                  <p className="text-sm text-ink-muted">
                    ✓ Unattended access
                    <br />
                    ✓ After-hours support
                    <br />✓ Automated maintenance
                  </p>
                </div>
              </div>

              {/* Tier 2 */}
              <div className="relative overflow-hidden rounded-card border border-hairline bg-surface bg-[image:var(--wash)] p-6 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-card-hover">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border-accent bg-surface text-xl font-bold text-accent">
                    2
                  </div>
                  <h3 className="text-h3 tracking-h3 font-semibold text-ink">
                    Tier 2
                  </h3>
                </div>
                <p className="text-ink-muted mb-4">
                  <strong>Client-Initiated Support</strong>
                </p>
                <p className="text-sm text-ink-muted leading-relaxed">
                  You will be present to start sessions and enter any necessary
                  credentials. Great for hands-on support and training sessions.
                </p>
                <div className="mt-6 pt-4 border-t border-hairline">
                  <p className="text-sm text-ink-muted">
                    ✓ On-demand sessions
                    <br />
                    ✓ Full control
                    <br />✓ Live interaction
                  </p>
                </div>
              </div>
            </div>

            <div className="relative mt-6 overflow-hidden rounded-card border border-hairline bg-surface bg-[image:var(--wash)] p-4 shadow-card">
              <p className="text-ink-muted text-sm">
                <strong>Both tiers available as:</strong> Subscription (includes
                member benefits, discounts, and after-hours priority) or
                Pay-As-You-Go (standard rates, one device limit, no member
                discounts).
              </p>
            </div>
          </section>

          {/* View Remote Services */}
          <section
            className="pt-6 sm:pt-8 border-t border-hairline"
            aria-labelledby="view-remote-services"
          >
            <h2
              id="view-remote-services"
              className="text-h2 tracking-h2 font-semibold text-ink mb-4"
            >
              View Remote Services
            </h2>
            <div className="relative mt-3 overflow-hidden rounded-feature border border-hairline bg-surface bg-[image:var(--wash)] p-6 text-center shadow-card">
              <div className="relative">
                <p className="text-ink mb-4">
                  Once enrolled, you can use remote sessions for
                  troubleshooting, malware cleanup, guided training, and
                  selected security or privacy work.
                </p>
                <Link
                  href="/services/remote"
                  style={{ touchAction: "manipulation" }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-contrast font-semibold transition-all shadow-md hover:bg-accent-hover hover:shadow-lg touch-manipulation"
                >
                  View Remote Services
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section
            className="pt-6 sm:pt-8 border-t border-hairline"
            aria-labelledby="enroll"
          >
            <h2 id="enroll" className="text-h2 tracking-h2 font-semibold text-ink mb-4">
              Ready to Enroll
            </h2>
            <div className="relative mt-3 overflow-hidden rounded-feature border border-hairline bg-surface bg-[image:var(--wash)] p-8 text-center shadow-card">
              <div className="relative">
                <p className="text-lg mb-2 font-semibold text-ink">
                  Get Started with Remote Support
                </p>
                <p className="text-sm mb-6 max-w-2xl mx-auto text-ink-muted">
                  Initial on-site setup and device enrollment are handled
                  locally as part of getting the plan in place.
                </p>
                <Link
                  href="/contact"
                  style={{ touchAction: "manipulation" }}
                  className="inline-flex items-center gap-2 rounded-lg border border-hairline bg-surface px-6 py-3 text-accent font-semibold shadow-card transition hover:-translate-y-0.5 hover:border-accent touch-manipulation"
                >
                  Request Remote Setup
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <p className="mt-4 text-xs text-ink-muted">
                  * Within our local service area (Ocala, Belleview, The
                  Villages).
                </p>
              </div>
            </div>
          </section>

          {/* More devices */}
          <section
            className="pt-6 sm:pt-8 border-t border-hairline"
            aria-labelledby="more-devices"
            id="more-devices"
          >
            <h2 className="text-h2 tracking-h2 font-semibold text-ink">
              Need Coverage for More Devices?
            </h2>
            <p className="mt-2 text-ink-muted">
              Our Remote Support Plan includes up to 14 enrolled devices. This
              is plenty for most homes and small offices. If you have a larger
              setup, we can extend coverage with custom device limits and access
              tiers.
            </p>
            <p className="mt-2 text-ink-muted">
              Expanded plans are tailored to your needs, with any additional
              setup or service costs discussed up front, no surprises.
            </p>
            <p className="mt-2 text-ink-muted">
              <Link
                href="/contact"
                className="text-accent hover:underline"
              >
                Let&apos;s talk about your requirements
              </Link>{" "}
              and design a plan that fits.
            </p>
          </section>

          {/* FAQ */}
          <FaqSection items={faq} />
        </main>
      </PageContainer>
    </>
  );
}
