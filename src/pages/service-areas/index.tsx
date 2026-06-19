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

// Service-areas hub. Lists the available location landing pages and provides the
// internal link into each /service-areas/<city>. The list is read from
// data/locations/*.json at build time via lib/location-page.

import type { GetStaticProps } from "next";
import Link from "next/link";
import { Meta, PageContainer, BreadCrumbs } from "@/components";
import { HeroBanner } from "@/components/HeroBanner";
import {
  getStaticLocationsIndexProps,
  type LocationSummary,
} from "@/lib/location-page";

const BASE_URL = "https://www.wedefendit.com";
const CANONICAL = `${BASE_URL}/service-areas`;
const TOUCH = { touchAction: "manipulation" } as const;
const AREA_LINK =
  "flex h-full flex-col gap-1 rounded-feature border border-hairline bg-surface bg-[image:var(--wash)] p-5 transition hover:border-border-accent touch-manipulation";

export const getStaticProps: GetStaticProps = getStaticLocationsIndexProps;

type ServiceAreasIndexProps = Readonly<{ locations: LocationSummary[] }>;

export default function ServiceAreasIndex({ locations }: ServiceAreasIndexProps) {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Service Areas" }];

  return (
    <>
      <Meta
        title="Service Areas | Defend I.T. Solutions"
        description="Local cybersecurity and tech support across Central Florida, including The Villages and the surrounding communities."
        url={CANONICAL}
        canonical={CANONICAL}
      />

      <PageContainer>
        {/* Breadcrumbs: contained, above the full-bleed hero */}
        <div className="mx-auto w-full max-w-6xl px-4 pt-1 sm:px-6">
          <BreadCrumbs items={crumbs} baseUrl={BASE_URL} />
        </div>

        {/* Hero: full-bleed, like the other pages (about illustration) */}
        <HeroBanner
          dark="/img/about/about-hero-dark.jpg"
          light="/img/about/about-hero-light.jpg"
          alt="Central Florida homes served by Defend I.T. Solutions"
        >
          <p className="text-eyebrow font-semibold uppercase tracking-eyebrow text-accent">
            Service Areas
          </p>
          <h1 className="mt-4 text-balance text-display tracking-display font-semibold text-ink">
            Local help across Central Florida
          </h1>
          <p className="mt-5 max-w-lg text-lead text-ink-muted">
            On-site and remote cybersecurity and tech support for homes and small
            businesses across our Central Florida service areas.
          </p>
        </HeroBanner>

        <div className="mx-auto w-full max-w-5xl px-3 pb-10 sm:px-6">
          <ul className="grid list-none gap-3 p-0 sm:grid-cols-2">
            {locations.map((location) => (
              <li key={location.slug}>
                <Link
                  href={`/service-areas/${location.slug}`}
                  className={AREA_LINK}
                  style={TOUCH}
                >
                  <span className="font-semibold text-ink">
                    {location.city}, {location.state}
                  </span>
                  <span className="text-sm leading-relaxed text-ink-muted">
                    {location.headline}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </PageContainer>
    </>
  );
}
