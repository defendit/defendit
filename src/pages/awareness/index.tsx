/*
Copyright © 2025 Defend I.T. Solutions LLC. All Rights Reserved.

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
  JsonLdScript,
} from "@/components";
import { generateFAQPageLd } from "@/lib/json-ld";

export default function AwarenessPage() {
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
        url="https://www.wedefendit.com/awareness"
        image="https://www.wedefendit.com/og-image.png"
        keywords="cybersecurity for seniors, scam prevention, phishing, Ocala, The Villages, free training"
      />

      <JsonLdScript jsonLd={faqLd} />

      <PageContainer>
        <div className="max-w-5xl mx-auto py-8 sm:py-10 space-y-6 sm:space-y-7 px-4 sm:px-6 text-center sm:text-left bg-gray-50/10 dark:bg-slate-950/20 z-0 rounded-lg shadow-lg">
          {/* Breadcrumbs (match ServiceSlug) */}
          <nav
            aria-label="Breadcrumb"
            className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 overflow-x-auto whitespace-nowrap"
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
              <li className="text-gray-400 dark:text-gray-500 truncate">
                <span aria-current="page">Awareness</span>
              </li>
            </ol>
          </nav>

          {/* Hero */}
          <header className="space-y-1 text-center">
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
              Cybersecurity Awareness for Seniors
            </h1>
            <p className="text-base sm:text-lg w-full text-blue-600 dark:text-sky-400">
              Simple, private guidance to help you stay safe online.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No tracking. No data collection. Just useful information from
              local experts.
            </p>
          </header>

          {/* Best Practices */}
          <section
            className="pt-6 sm:pt-8 first:pt-0 border-t border-gray-200/60 dark:border-gray-700/60 first:border-t-0 text-center"
            aria-labelledby="best-practices"
          >
            <SafetyTipsList />
          </section>

          {/* Scam Education */}
          <section
            className=" dark:border-gray-700/60"
            aria-labelledby="top-scams"
          >
            <ElderlyScamsList />
          </section>

          {/* CTA */}
          <section
            className="pt-6 sm:pt-8 border-t border-gray-200/60 dark:border-gray-700/60 text-center"
            aria-labelledby="cta"
          >
            <h2 id="cta" className="sr-only">
              Request a Free Training
            </h2>
            <p className="text-md text-gray-700 dark:text-gray-300">
              Want a group session for your community, club, or church?
            </p>
            <Link
              href="/contact"
              className="inline-block mt-3 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
            >
              Request a Free Training
            </Link>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Free for senior centers and groups of 25+. Individual sessions may
              include a small fee.
            </p>
          </section>
        </div>
      </PageContainer>
    </>
  );
}
