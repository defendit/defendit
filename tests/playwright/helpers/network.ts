import type { Page } from "@playwright/test";

/**
 * Abort third-party requests that the test suite should never make: OpenStreetMap
 * map tiles, unpkg (Leaflet marker images), and Google reCAPTCHA. Keeps the e2e
 * runs offline-deterministic and avoids hammering external APIs on every
 * page load / viewport / browser / retry.
 */
export async function blockThirdParty(page: Page): Promise<void> {
  await page.route(
    /openstreetmap\.org|unpkg\.com|\/recaptcha\//,
    (route) => route.abort(),
  );
}
