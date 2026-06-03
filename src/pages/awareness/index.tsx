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

import Link from "next/link";
import {
  PageContainer,
  Meta,
  SafetyTipsList,
  ElderlyScamsList,
} from "@/components";
import { generateFAQPageLd, localBusinessLd } from "@/lib/json-ld";
import { InteractiveTraining } from "@/components/InteractiveTraining";
import { Card } from "@/components/Card";
export default function AwarenessPage() {
  const canonical = "https://www.wedefendit.com/awareness";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.wedefendit.com/",
      },
      { "@type": "ListItem", position: 2, name: "Awareness", item: canonical },
    ],
  };

  const awarenessPageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Cybersecurity Awareness for Seniors | Defend I.T. Solutions",
    url: canonical,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: "https://www.wedefendit.com/og-image.png",
    },
    about: localBusinessLd, // from your json-ld.ts shared definition
  };

  const faqLd = generateFAQPageLd([
    {
      name: "Who is this guide for?",
      acceptedAnswer:
        "Retirees, seniors, caregivers, and community groups in Central Florida. It is written in plain English with practical steps.",
    },
    {
      name: "Do you collect data on this page?",
      acceptedAnswer:
        "No. There is no tracking on this page. It is education only.",
    },
  ]);

  return (
    <>
      <Meta
        title="Cybersecurity Awareness for Seniors | Defend I.T. Solutions"
        description="Practical safety tips and scam prevention guidance for retirees and seniors in Ocala, The Villages, and nearby communities."
        url={canonical}
        image="https://www.wedefendit.com/og-image.png"
        canonical={canonical}
        keywords="cybersecurity for seniors, scam prevention, phishing, Ocala, The Villages, free training"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbLd, awarenessPageLd, faqLd],
        }}
      />

      <PageContainer>
        <div className="max-w-5xl mx-auto w-full py-8 sm:py-10 space-y-6 sm:space-y-7 px-3 sm:px-6 text-center sm:text-left">
          {/* Breadcrumbs (match ServiceSlug) */}
          <nav
            aria-label="Breadcrumb"
            className="text-xs sm:text-sm text-ink-dim mb-2 overflow-x-auto whitespace-nowrap"
          >
            <ol className="flex items-center gap-1 sm:gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="px-1 sm:px-2">
                ›
              </li>
              <li className="text-ink-muted truncate">
                <span aria-current="page">Awareness</span>
              </li>
            </ol>
          </nav>

          {/* Hero */}
          <Card
            as="header"
            wash
            className="relative overflow-hidden px-5 py-6 text-center sm:px-6 sm:py-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border-accent bg-surface px-3 py-2 text-eyebrow font-semibold uppercase tracking-eyebrow text-accent sm:px-4">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Free Educational Resource
            </div>

            <h1 className="mt-5 text-balance text-display tracking-display font-semibold text-ink">
              Online Safety Tips for Seniors, Families, and Community Groups
            </h1>

            <p className="mx-auto mt-4 max-w-readable text-lead text-ink-muted">
              Plain-English guidance on scams, safer browsing, stronger accounts,
              and everyday habits that reduce risk.
            </p>
          </Card>

          <InteractiveTraining />

          {/* Best Practices */}
          <section
            className="pt-6 sm:pt-8 first:pt-0 border-t border-hairline first:border-t-0 text-center"
            aria-labelledby="best-practices"
          >
            <SafetyTipsList />
          </section>

          {/* Scam Education */}
          <section
            className="pt-6 sm:pt-8 first:pt-0 border-t border-hairline first:border-t-0 text-center"
            aria-labelledby="top-scams"
          >
            <ElderlyScamsList />
          </section>

          {/* CTA */}
          <section className="pt-6 sm:pt-8 border-t border-hairline">
            <Card wash className="relative overflow-hidden p-8 text-center">
              <div className="relative">
                <h2
                  id="cta"
                  className="text-h2 tracking-h2 font-semibold mb-4 text-ink"
                >
                  Want a Free Group Training?
                </h2>
                <p className="text-md text-ink-muted mb-6 max-w-2xl mx-auto">
                  Defend I.T. Solutions offers free cybersecurity awareness
                  sessions for senior centers, churches, clubs, and community
                  groups across Central Florida.
                </p>
                <p className="text-sm text-ink-muted mb-6 max-w-2xl mx-auto">
                  These sessions are designed to be simple, practical, and easy
                  to follow, with clear explanations and time for questions.
                </p>
                <Link
                  href="/contact"
                  style={{ touchAction: "manipulation" }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-accent-contrast font-semibold transition-all shadow-lg hover:bg-accent-hover hover:shadow-xl touch-manipulation"
                >
                  Request a Free Training
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.25}
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <p className="mt-4 text-sm text-ink-muted">
                  Free for groups of 25 or more. Individual sessions are also
                  available for a small fee.
                </p>
              </div>
            </Card>
          </section>
        </div>
      </PageContainer>
    </>
  );
}
