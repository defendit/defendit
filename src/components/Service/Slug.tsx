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

import {
  generateServiceLd,
  generateBreadCrumbJsonLd,
  generateRelatedServiceLd,
  localBusinessLd,
} from "@/lib/json-ld";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import JsonLdScript from "../JsonLdScript";
import { PageContainer, Meta, BookOnline, BreadCrumbs } from "@/components";

/** Map hard-coded city folders to labels and paths */
const CITY_MAP = {
  ocala: { name: "Ocala", slug: "ocala" },
  "the-villages": { name: "The Villages", slug: "the-villages" },
  belleview: { name: "Belleview", slug: "belleview" },
  remote: { name: "Remote", slug: "remote" },
} as const;

export type ServiceContent = {
  id: string;
  title: string;
  headline: string;
  description: string;
  keywords: string[];
  url: string;
  image: string;
  requiresPlan?: boolean;
  sections: {
    heading: string;
    paragraph?: string | string[];
    items?: string[];
  }[];
  cta: { label: string; link: string };
};

export type ServiceSlugProps = {
  service: ServiceContent;
  citySlug?: keyof typeof CITY_MAP;
  isRemote?: boolean;
  related?: { label: string; slug: string }[];
};

export default function ServiceSlug({
  service,
  citySlug,
  isRemote,
  related,
}: ServiceSlugProps) {
  const city = citySlug ? CITY_MAP[citySlug] : undefined;
  const [first, ...rest] = service.sections;
  isRemote = isRemote || citySlug === "remote" || false;

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    ...(city ? [{ name: city.name, href: `/services/${city.slug}` }] : []),
    { name: service.title },
  ];

  const breadcrumbLd = generateBreadCrumbJsonLd({
    items: crumbs,
    baseUrl: "https://www.wedefendit.com",
  });

  const serviceLd = generateServiceLd({
    name: service.title,
    image: service.image,
    keywords: service.keywords,
    city: city ? city.name : "",
    description: service.description,
    url: `https://www.wedefendit.com${service.url}`,
    provider: { "@type": "Organization", name: "Defend I.T. Solutions" },
    offers: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      },
    ],
  });

  /** Determine which sections to render after the Did You Know block */
  const hasDYK =
    typeof first?.heading === "string" &&
    first.heading.toLowerCase().includes("did you know");
  const sections = hasDYK ? rest : service.sections;
  const canonical = `https://www.wedefendit.com${service.url}`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbLd, localBusinessLd, serviceLd],
  };
  return (
    <>
      <Meta
        title={
          city
            ? `${service.title} in ${city.name} | Defend I.T. Solutions`
            : `${service.title} | Defend I.T. Solutions`
        }
        description={service.description}
        image={service.image}
        imageAlt={`${service.title} — Defend I.T. Solutions`}
        url={canonical}
        canonical={canonical}
        keywords={service.keywords.join(", ")}
        structuredData={{ "@graph": graph }}
      />
      <PageContainer>
        {/* mobile-left by default; larger screens keep same look */}
        <div className="max-w-4xl mx-auto py-8 sm:py-10 space-y-6 sm:space-y-7 px-4 sm:px-6 text-left rounded-lg shadow-lg bg-gray-50/10 dark:bg-slate-950/20 z-0">
          <BreadCrumbs items={crumbs} baseUrl="https://www.wedefendit.com" />

          {/* Title + headline + city line */}
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight mt-4">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg w-full text-blue-600 dark:text-sky-400">
              {service.headline}
            </p>
            {city && !isRemote && (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Serving {city.name} and nearby communities
              </p>
            )}
          </div>

          {/* Did You Know highlight */}
          {hasDYK && (
            <div className="mt-4 rounded-lg border border-yellow-600/30 bg-yellow-500/10 dark:bg-yellow-700/20 p-4 sm:p-5">
              <h2 className="text-lg sm:text-xl font-semibold text-yellow-900 dark:text-yellow-100 inline-flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                {first!.heading}
              </h2>
              {Array.isArray(first!.paragraph) ? (
                <div className="mt-2 space-y-2">
                  {first!.paragraph.map((t, i) => (
                    <p
                      key={i}
                      className="text-sm sm:text-base text-yellow-900/90 dark:text-yellow-50"
                    >
                      {t}
                    </p>
                  ))}
                </div>
              ) : (
                first!.paragraph && (
                  <p className="mt-2 text-sm sm:text-base text-yellow-900/90 dark:text-yellow-50">
                    {first!.paragraph}
                  </p>
                )
              )}
            </div>
          )}

          {/* Sections */}
          {sections.map((section, idx) => (
            <section
              key={idx}
              className="pt-6 sm:pt-8 first:pt-0 border-t border-gray-200/60 dark:border-gray-700/60 first:border-t-0"
            >
              <h2 className="text-2xl font-semibold">{section.heading}</h2>

              {section.paragraph &&
                (Array.isArray(section.paragraph) ? (
                  <div className="mt-2 space-y-2">
                    {section.paragraph.map((text, i) => (
                      <p
                        key={i}
                        className="text-gray-700 dark:text-gray-300 text-sm sm:text-base"
                      >
                        {text}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                    {section.paragraph}
                  </p>
                ))}

              {section.items && (
                <ul className="mt-3 list-disc pl-5 sm:pl-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base space-y-2 marker:text-sky-500 dark:marker:text-sky-400">
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Plan gate notice */}
          {service.requiresPlan && <RequiresPlanNotice />}

          {/* CTA + internal links */}
          <div className="mt-10 w-full flex flex-col items-stretch sm:items-center justify-center gap-6 sm:gap-8 text-left sm:text-center">
            <div className="w-full">
              <BookOnline />
            </div>

            <FooterLinks city={city} isRemote={!!isRemote} related={related} />
          </div>
        </div>
      </PageContainer>
    </>
  );
}

export { ServiceSlug };

function RequiresPlanNotice() {
  return (
    <div className="mt-6 rounded-lg border border-sky-400/30 bg-sky-100/40 dark:bg-sky-900/20 p-4 sm:p-5 text-sky-900 dark:text-sky-100 text-sm flex flex-col items-center">
      <span>
        This service is available exclusively to Remote Service Plan members.
      </span>
      <Link
        href="/services/remote/remote-support-plan"
        className="inline-block mt-2 px-3 py-1.5 rounded border border-sky-300 dark:border-sky-700 bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-medium hover:underline transition"
      >
        Learn more
      </Link>
    </div>
  );
}

type FooterLinksProps = {
  city?: { name: string; slug: string };
  isRemote: boolean;
  related?: { label: string; slug: string }[];
};

function FooterLinks({ city, isRemote, related }: FooterLinksProps) {
  if (!city) return null;

  const allServicesLabel = isRemote
    ? "All remote services"
    : `All services in ${city.name}`;
  const relatedHeading = isRemote
    ? "Related remote services:"
    : `Related services in ${city.name}:`;

  // JSON-LD for related links as an ItemList
  const itemListLd =
    related && related.length > 0
      ? generateRelatedServiceLd(related, city)
      : null;

  return (
    <>
      {itemListLd && <JsonLdScript jsonLd={itemListLd as object} />}{" "}
      <div className="flex flex-wrap items-stretch sm:items-center justify-start sm:justify-center gap-3 text-sm">
        <Link
          href={`/services/${city.slug}`}
          className="w-full sm:w-auto inline-block rounded-lg border border-sky-300 dark:border-sky-700 px-4 py-2 bg-gray-50 dark:bg-slate-900 text-sky-700 dark:text-sky-300 font-medium hover:bg-sky-100 dark:hover:bg-sky-900/40 transition whitespace-normal text-center"
        >
          {allServicesLabel}
        </Link>
      </div>
      {related && related.length > 0 && (
        <nav
          aria-label="Related services"
          className="text-sm text-gray-700 dark:text-gray-300 max-w-full overflow-x-auto px-0 sm:px-1 mt-2"
        >
          <p className="mb-2 font-semibold text-blue-700 dark:text-sky-300">
            {relatedHeading}
          </p>
          <ul className="flex flex-wrap items-stretch sm:items-center justify-start sm:justify-center gap-2 max-w-full">
            {related.map((r) => (
              <li key={r.slug} className="w-full sm:w-auto">
                <Link
                  href={`/services/${city.slug}/${r.slug}`}
                  className="w-full sm:w-auto inline-block rounded-lg border border-sky-300 dark:border-sky-700 px-4 py-2 bg-gray-50 dark:bg-slate-900 text-sky-700 dark:text-sky-300 font-medium hover:bg-sky-50 dark:hover:bg-sky-800/30 transition whitespace-normal text-center"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
