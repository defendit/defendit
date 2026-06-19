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
import { ogImageUrl } from "@/lib/og";
import { Card } from "@/components/Card";
import { HeroBanner } from "@/components/HeroBanner";
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
      url: ogImageUrl("Cybersecurity Awareness for Seniors"),
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
        canonical={canonical}
        keywords="cybersecurity for seniors, scam prevention, phishing, Ocala, The Villages, free training"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbLd, awarenessPageLd, faqLd],
        }}
      />

      <PageContainer>
        {/* Breadcrumbs: contained, above the full-bleed hero */}
        <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6">
          <nav
            aria-label="Breadcrumb"
            className="text-xs sm:text-sm text-ink-dim overflow-x-auto whitespace-nowrap"
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
        </div>

        {/* Hero: full-bleed, The Villages image */}
        <HeroBanner
          dark="/img/locations/the-villages-hero-dark.jpg"
          light="/img/locations/the-villages-hero-light.jpg"
          alt="A Central Florida home with its devices protected under a security shield"
          position="object-[center_90%]"
        >
          <p className="text-eyebrow font-semibold uppercase tracking-eyebrow text-accent">
            Free Educational Resource
          </p>
          <h1 className="mt-4 text-balance text-display tracking-display font-semibold text-ink">
            Online Safety Tips for Seniors, Families, and Community Groups
          </h1>
          <p className="mt-5 max-w-lg text-lead text-ink-muted">
            Plain-English guidance on scams, safer browsing, stronger accounts,
            and everyday habits that reduce risk.
          </p>
        </HeroBanner>

        <div className="max-w-5xl mx-auto w-full py-8 sm:py-10 space-y-6 sm:space-y-7 px-3 sm:px-6 text-center sm:text-left">
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-fill text-accent-contrast font-semibold transition-all shadow-lg hover:bg-accent-fill-hover hover:shadow-xl touch-manipulation"
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
