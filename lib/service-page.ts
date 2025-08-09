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

import fs from "fs";
import path from "path";
import type {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import type { ServiceSlugProps } from "@/components";

const TEMPLATES_DIR = path.join(process.cwd(), "data/services/slug-templates");

export const CONSUMER_SERVICES_JSON = path.join(
  process.cwd(),
  "data/services/services.json"
);

// Read template JSON and apply city placeholders
export function readServiceJson(
  filePath: string,
  cityLower: string,
  cityUpper: string
) {
  const fileContents = fs
    .readFileSync(filePath, "utf-8")
    .replace(/{{city_lower}}/g, cityLower)
    .replace(/{{city_upper}}/g, cityUpper);
  return JSON.parse(fileContents);
}

// Shared getStaticPaths for all city pages
export const getStaticPathsForServices: GetStaticPaths = async () => {
  const files = fs.readdirSync(TEMPLATES_DIR);
  const paths = files
    .filter((f) => f.endsWith(".json"))
    .map((file) => ({ params: { slug: file.replace(".json", "") } }));
  return { paths, fallback: false };
};

type MakePropsOptions = {
  cityLower: string;
  cityUpper: string;
};

// Factory to create a city-specific getStaticProps
export function makeGetStaticSlugProps({
  cityLower,
  cityUpper,
}: MakePropsOptions): GetStaticProps {
  return async ({ params }: GetStaticPropsContext) => {
    const slug = String(params?.slug || "");
    const filePath = path.join(TEMPLATES_DIR, `${slug}.json`);
    if (!fs.existsSync(filePath)) return { notFound: true };

    const service = readServiceJson(filePath, cityLower, cityUpper);

    let related = service.related || [];
    if (related.length > 3) {
      // If more than 3, truncate to 3
      related = related.slice(0, 3);
    } else {
      // If less than 3, fill with other services
      const files = fs
        .readdirSync(TEMPLATES_DIR)
        .filter((f) => f.endsWith(".json") && f !== `${slug}.json`);

      const additional = files
        .map((f) => f.replace(".json", ""))
        .slice(0, 3 - related.length)
        .map((s) => {
          const p = path.join(TEMPLATES_DIR, `${s}.json`);
          const svc = readServiceJson(p, cityLower, cityUpper);
          return { label: svc.title as string, slug: s };
        });

      related = [...related, ...additional];
    }

    return { props: { service, related } };
  };
}

// Factory to create a getStaticProps for City Service pages (not the slug pages)
export function makeGetStaticConsumerProps({
  cityLower,
  cityUpper,
}: MakePropsOptions): GetStaticProps {
  return async () => {
    const filePath = CONSUMER_SERVICES_JSON;
    if (!fs.existsSync(filePath)) return { notFound: true };

    const service = readServiceJson(filePath, cityLower, cityUpper);

    return {
      props: {
        service,
        cityLower,
        cityUpper,
      },
    };
  };
}

export type RelatedLink = { label: string; slug: string };
export type CityPageProps = ServiceSlugProps & { related?: RelatedLink[] };
