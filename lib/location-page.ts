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

// Build-time data loader for the location (service-area) landing pages under
// /service-areas/<city>. Mirrors lib/service-page.ts: each location is a JSON
// file in data/locations/, enumerated for getStaticPaths and read for
// getStaticProps. Synchronous fs mirrors the service-page loader so the two
// SSG data paths stay consistent.

import fs from "fs";
import path from "path";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";

export type LocationServiceLink = {
  label: string;
  slug: string;
  summary: string;
};

export type LocationFaq = {
  question: string;
  answer: string;
};

export type LocationImage = {
  src: string;
  alt: string;
};

export type LocationSection = {
  heading: string;
  paragraph?: string[];
  items?: string[];
  image?: LocationImage;
};

export type LocationTestimonial = {
  quote: string;
  attribution: string;
};

export type LocationCoverage = {
  townSquares: string[];
  nearbyTowns: string[];
  zips?: string[];
};

export type LocationContent = {
  id: string;
  slug: string;
  city: string;
  state: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  eyebrow: string;
  h1: string;
  headline: string;
  heroImage?: LocationImage;
  ogImage?: string;
  banner?: LocationImage;
  intro: string[];
  areaServed: string[];
  coverage: LocationCoverage;
  sections: LocationSection[];
  services: LocationServiceLink[];
  testimonials: LocationTestimonial[];
  faq: LocationFaq[];
  cta: { label: string; link: string };
};

export type LocationSummary = {
  slug: string;
  city: string;
  state: string;
  headline: string;
};

const LOCATIONS_DIR = path.join(process.cwd(), "data/locations");

function readLocation(slug: string): LocationContent {
  const filePath = path.join(LOCATIONS_DIR, `${slug}.json`);
  const fileContents = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContents) as LocationContent;
}

function publicFileExists(src: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

// Drops image fields whose files are not present in public/, so a page renders
// gracefully (no <Image>, no 404) when an asset has not been dropped in yet.
function resolveImages(location: LocationContent): LocationContent {
  const resolved: LocationContent = {
    ...location,
    sections: location.sections.map((section) => {
      if (section.image && publicFileExists(section.image.src)) {
        return section;
      }
      const copy = { ...section };
      delete copy.image;
      return copy;
    }),
  };

  if (resolved.heroImage && !publicFileExists(resolved.heroImage.src)) {
    delete resolved.heroImage;
  }
  if (resolved.banner && !publicFileExists(resolved.banner.src)) {
    delete resolved.banner;
  }
  if (resolved.ogImage && !publicFileExists(resolved.ogImage)) {
    delete resolved.ogImage;
  }

  return resolved;
}

function readLocationSlugs(): string[] {
  return fs
    .readdirSync(LOCATIONS_DIR)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""));
}

export const getStaticPathsForLocations: GetStaticPaths = async () => {
  const paths = readLocationSlugs().map((slug) => ({ params: { city: slug } }));
  return { paths, fallback: false };
};

export function makeGetStaticLocationProps(): GetStaticProps {
  return async ({ params }: GetStaticPropsContext) => {
    const slug = String(params?.city || "");
    const filePath = path.join(LOCATIONS_DIR, `${slug}.json`);

    if (!slug || !fs.existsSync(filePath)) {
      return { notFound: true };
    }

    return { props: { location: resolveImages(readLocation(slug)) } };
  };
}

export const getStaticLocationsIndexProps: GetStaticProps = async () => {
  const locations: LocationSummary[] = readLocationSlugs()
    .map((slug) => readLocation(slug))
    .map(({ slug, city, state, headline }) => ({ slug, city, state, headline }))
    .sort((a, b) => a.city.localeCompare(b.city));

  return { props: { locations } };
};
