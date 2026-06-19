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

// Menu projection of the service-area landing pages, shared by the nav and the
// footer so both stay in sync. The pages and sitemap are driven from
// data/locations/*.json; the display name here is sourced from that same JSON.
// To surface a new location in navigation, add its data/locations/<slug>.json
// file and one entry to this list.

import ocala from "@/data/locations/ocala.json";
import belleview from "@/data/locations/belleview.json";
import theVillages from "@/data/locations/the-villages.json";

export type ServiceArea = Readonly<{ name: string; slug: string }>;

export const SERVICE_AREAS: ReadonlyArray<ServiceArea> = [
  { name: ocala.city, slug: ocala.slug },
  { name: belleview.city, slug: belleview.slug },
  { name: theVillages.city, slug: theVillages.slug },
];
