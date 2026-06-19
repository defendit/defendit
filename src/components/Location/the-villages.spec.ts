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

// Content-contract tests for the The Villages service-area page. These assert
// the data shape the page and its structured data depend on, that every linked
// service resolves to a real service slug, and that no fabricated testimonials
// ship. They intentionally test data, not rendered classes.

import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import location from "../../../data/locations/the-villages.json";

const SLUG_TEMPLATES_DIR = path.join(process.cwd(), "data/services/slug-templates");

describe("the-villages location content", () => {
  it("declares the required identity and SEO fields", () => {
    expect(location.slug).toBe("the-villages");
    expect(location.city).toBe("The Villages");
    expect(location.state).toBe("FL");
    expect(location.metaTitle.length).toBeGreaterThan(0);
    expect(location.metaDescription.length).toBeGreaterThan(0);
    expect(location.h1.length).toBeGreaterThan(0);
    expect(location.headline.length).toBeGreaterThan(0);
    expect(location.keywords.length).toBeGreaterThan(0);
  });

  it("scopes areaServed to the city and nearby", () => {
    expect(location.areaServed).toContain("The Villages FL");
    expect(location.areaServed).toContain("Central Florida");
  });

  it("links only to service pages that exist", () => {
    expect(location.services.length).toBeGreaterThan(0);
    for (const service of location.services) {
      const slugFile = path.join(SLUG_TEMPLATES_DIR, `${service.slug}.json`);
      expect(fs.existsSync(slugFile), `missing service slug: ${service.slug}`).toBe(true);
      expect(service.summary.length).toBeGreaterThan(0);
    }
  });

  it("provides FAQ content for the FAQPage schema", () => {
    expect(location.faq.length).toBeGreaterThanOrEqual(3);
    for (const entry of location.faq) {
      expect(entry.question.length).toBeGreaterThan(0);
      expect(entry.answer.length).toBeGreaterThan(0);
    }
  });

  it("does not ship fabricated testimonials", () => {
    expect(Array.isArray(location.testimonials)).toBe(true);
    expect(location.testimonials.length).toBe(0);
  });
});
