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

// Open Graph share cards. These are hand-made static 1200x630 images under
// /public/img/og. Pages with their own card (home, the service-area cities)
// reference it by basename; everything else falls back to the brand card.

const SITE_URL = "https://www.wedefendit.com";
const OG_DIR = `${SITE_URL}/img/og`;

/** Brand/landing share card, used as the site-wide default OG image. */
export const DEFAULT_OG_IMAGE = `${OG_DIR}/og-home-preview.jpg`;

/**
 * Absolute URL of a static OG card. Pass a file basename like `og-ocala`;
 * anything that isn't a known `og-*` card name falls back to the brand default.
 */
export function ogImageUrl(name?: string): string {
  return name?.startsWith("og-")
    ? `${OG_DIR}/${name}.jpg`
    : DEFAULT_OG_IMAGE;
}
