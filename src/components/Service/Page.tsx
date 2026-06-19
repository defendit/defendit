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
  Meta,
  BreadCrumbs,
  PageContainer,
  RemoteServicesCTA,
  ServiceAreaAndBooking,
} from "@/components";
import { ServiceCard } from "@/components/Service/Card";
import { HeroBanner } from "@/components/HeroBanner";
import { localBusinessLd } from "@/lib/json-ld";

export type Service = {
  id: string;
  title: string;
  headline: string;
  icons: string[];
  summary: string;
  cta: string;
  slug?: string;
};

export type ServicesPageProps = {
  h1: string;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta: any;
  services: Service[];
  remote?: boolean;
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
  const { meta, h1, services, remote } = props;
  const isRemote = remote || false;

  const canonical = isRemote
    ? "https://www.wedefendit.com/services/remote"
    : "https://www.wedefendit.com/services";

  // ── JSON-LD ────────────────────────────────────────────────────────────────
  const breadcrumbLd = isRemote
    ? {
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
          {
            "@type": "ListItem",
            position: 3,
            name: "Remote Services",
            item: canonical,
          },
        ],
      }
    : {
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
            item: canonical,
          },
        ],
      };

  const servicesCollectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: meta.title || "Services | Defend I.T. Solutions",
    description: meta.description,
    url: canonical,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((s, i) => {
        const slug = s.slug || s.id || toSlug(s.title);
        const url = `https://www.wedefendit.com/services/${
          isRemote ? `remote/${slug}` : slug
        }`;
        return {
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            name: s.title,
            description: s.summary || undefined,
            url,
            provider: { "@id": "https://www.wedefendit.com/#organization" },
          },
        };
      }),
    },
  };

  const existingStructuredData = meta?.structuredData;
  const existingGraph = existingStructuredData
    ? Array.isArray(existingStructuredData["@graph"])
      ? existingStructuredData["@graph"]
      : [existingStructuredData]
    : [];

  const metaWithStructured = {
    ...meta,
    url: canonical,
    canonical,
    structuredData: {
      "@context": "https://schema.org",
      "@graph": [
        ...existingGraph,
        breadcrumbLd,
        servicesCollectionLd,
        localBusinessLd,
      ],
    },
  };

  return (
    <>
      <Meta {...metaWithStructured} />

      <PageContainer>
        {/* Breadcrumbs: contained, above the full-bleed hero */}
        <div className="mx-auto w-full max-w-6xl px-4 pt-1 sm:px-6">
          <BreadCrumbs
            includeJsonLd={false}
            items={
              isRemote
                ? [
                    { name: "Home", href: "/" },
                    { name: "Services", href: "/services" },
                    { name: "Remote Services", href: canonical },
                  ]
                : [
                    { name: "Home", href: "/" },
                    { name: "Services", href: canonical },
                  ]
            }
            baseUrl="https://www.wedefendit.com"
          />
        </div>

        {/* Hero: full-bleed, like home (about image as a placeholder for now) */}
        <HeroBanner
          dark={
            isRemote
              ? "/img/about/about-hero-dark.jpg"
              : "/img/locations/ocala-hero-dark.jpg"
          }
          light={
            isRemote
              ? "/img/about/about-hero-light.jpg"
              : "/img/locations/ocala-hero-light.jpg"
          }
          alt={`${h1}, Defend I.T. Solutions`}
        >
          <p className="text-eyebrow font-semibold uppercase tracking-eyebrow text-accent">
            Serving Central Florida
          </p>
          <h1 className="mt-4 text-balance text-display tracking-display font-semibold text-ink">
            {h1}
          </h1>
          <p className="mt-5 max-w-lg text-lead text-ink-muted">
            {isRemote
              ? "Some problems can be handled well online. This section covers remote sessions for local clients, guided training, and plan-based follow-up support."
              : "Start with the problem you need solved. We focus on clear, practical help for homes and small businesses in Ocala, Belleview, The Villages, and nearby Central Florida communities."}
          </p>
        </HeroBanner>

        <div className="max-w-7xl mx-auto w-full px-3 pb-10 sm:px-4 lg:px-6 space-y-8 sm:space-y-10">
          {/* Grid */}
          <h2 className="sr-only">
            {isRemote ? "Remote services" : "Our services"}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service: Service) => (
              <ServiceCard
                key={service.id}
                {...service}
                remote={isRemote}
                slug={service.slug || service.id || toSlug(service.title)}
              />
            ))}
          </div>

          <RemoteServicesCTA isRemote={isRemote} />
          <ServiceAreaAndBooking />

          <section className="text-sm text-ink-muted italic text-center max-w-3xl mx-auto">
            <p>
              Not every problem fits neatly into a service card. If you&apos;re
              not sure where your issue belongs,{" "}
              <Link href="/contact" className="text-accent hover:underline">
                contact us
              </Link>{" "}
              and we&apos;ll help you choose the right starting point.
            </p>
          </section>
        </div>
      </PageContainer>
    </>
  );
}

export { ServicePage };
