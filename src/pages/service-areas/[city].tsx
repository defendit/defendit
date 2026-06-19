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

// Dynamic route for the service-area landing pages. Static paths and props come
// from data/locations/*.json via lib/location-page, mirroring services/[slug].tsx.

import type { GetStaticPaths, GetStaticProps } from "next";
import {
  getStaticPathsForLocations,
  makeGetStaticLocationProps,
  type LocationContent,
} from "@/lib/location-page";
import { LocationPage } from "@/components/Location/Page";

export const getStaticPaths: GetStaticPaths = getStaticPathsForLocations;
export const getStaticProps: GetStaticProps = makeGetStaticLocationProps();

type ServiceAreaPageProps = Readonly<{ location: LocationContent }>;

export default function ServiceAreaPage({ location }: ServiceAreaPageProps) {
  return <LocationPage location={location} />;
}
