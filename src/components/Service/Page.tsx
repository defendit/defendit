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
  Meta,
  BookOnline,
  PageContainer,
  RemoteServicesCTA,
  BreadCrumbs,
} from "@/components";
import { ServiceCard } from "@/components/Service/Card";
import { localBusinessLd } from "@/lib/json-ld";

export type Service = {
  id: string; // used as slug if present
  title: string;
  headline: string;
  icons: string[];
  summary: string;
  cta: string;
  slug?: string; // optional: preferred slug if you have it
};

export type ServicesPageProps = {
  h1: string;
  city: string; // "", "ocala", "the-villages", "belleview", "remote"
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: any;
  services: Service[];
};

function toSlug(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ServicePage(props: ServicesPageProps) {
  const { meta, h1, services, city } = props;
  const isRemote = city === "remote";

  // Display name for the city
  const cityName =
    city === "the-villages"
      ? "The Villages"
      : city
      ? city.charAt(0).toUpperCase() + city.slice(1)
      : "";

  // Canonical for this page
  const canonical = city
    ? `https://www.wedefendit.com/services/${city}`
    : `https://www.wedefendit.com/services`;

  // ── JSON-LD ────────────────────────────────────────────────────────────────
  // Breadcrumbs
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://www.wedefendit.com/services",
      },
      ...(city
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: isRemote ? "Remote" : cityName,
              item: canonical,
            },
          ]
        : []),
    ],
  };

  // Collection of Service items for this city (or base services if no city)
  const servicesCollectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: city
      ? `${cityName} Services | Defend I.T. Solutions`
      : "Services | Defend I.T. Solutions",
    url: canonical,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((s, i) => {
        const slug = s.slug || s.id || toSlug(s.title);
        const url = city
          ? `https://www.wedefendit.com/services/${city}/${slug}`
          : `https://www.wedefendit.com/services/${slug}`;
        return {
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: s.title,
            description: s.summary || undefined,
            url,
            areaServed: cityName || "Central Florida",
            provider: { "@id": "https://www.wedefendit.com/#organization" },
          },
        };
      }),
    },
  };

  // Merge into Meta props without touching your existing fields
  const metaWithStructured = {
    ...meta,
    url: canonical,
    canonical,
    structuredData: {
      "@graph": [breadcrumbLd, servicesCollectionLd, localBusinessLd],
    },
  };

  return (
    <>
      <Meta {...metaWithStructured} />

      <PageContainer>
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-10 bg-gray-50/10 dark:bg-slate-950/20 z-0 shadow-md">
          <BreadCrumbs
            includeJsonLd={false}
            items={[
              { name: "Home", href: "/" },
              { name: "Services", href: "/services" },
              ...(city
                ? [
                    {
                      name: isRemote ? "Remote" : cityName,
                      href: `/services/${city}`,
                    },
                  ]
                : []),
            ]}
          />
          {/* Header */}
          <header className="text-center">
            <h1 className="text-4xl font-bold">{h1}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {isRemote ? (
                "Remote cybersecurity and I.T. support for homeowners, retirees, and small businesses in Central Florida."
              ) : (
                <>
                  Learn More About Our Local, In-Person Cybersecurity and I.T.
                  Support
                  {cityName.trim() !== "" ? ` for ${cityName}, FL.` : "."}
                </>
              )}
            </p>
          </header>

          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {services.map((service: Service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>

          <RemoteServicesCTA isRemote={isRemote} />
          <BookOnline />

          <section className="text-sm text-gray-600 dark:text-gray-400 italic text-center max-w-3xl mx-auto">
            <p>
              Not seeing the service you need? We offer a wide range of I.T.
              solutions beyond what&apos;s listed here.{" "}
              <Link
                href="/contact"
                className="text-blue-600 dark:text-sky-400 hover:underline"
              >
                Contact us
              </Link>{" "}
              to discuss your specific needs and how we can assist you.
            </p>
          </section>
        </div>
      </PageContainer>
    </>
  );
}

export { ServicePage };
