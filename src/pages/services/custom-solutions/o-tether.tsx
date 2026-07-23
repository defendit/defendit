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

/*
 * O-Tether: a case study of the Custom Solutions service, nested under
 * /services/custom-solutions. Uses the same shell as the ServiceSlug pages
 * (centered max-w-5xl column, left-aligned content, Card hero, border-t section
 * dividers) so it reads as a sibling of the other service pages. Copy lives in
 * data/services/custom-solutions/o-tether.json (sourced from docs/o-tether/);
 * feature-card icons are the original inline SVGs from the source guide.
 */

import Link from "next/link";
import { HeroBanner } from "@/components/HeroBanner";
import { Fragment } from "react";
import {
  Cable,
  BrickWall,
  Radar,
  Activity,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Cpu,
  Router,
  Wifi,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { Meta, PageContainer, BreadCrumbs } from "@/components";
import { Card } from "@/components/Card";
import { oTetherProductLd, generateBreadCrumbJsonLd } from "@/lib/json-ld";
import showcase from "@/data/services/custom-solutions/o-tether.json";

const CANONICAL =
  "https://www.wedefendit.com/services/custom-solutions/o-tether";

// lucide glyphs referenced by name in the data (architecture layers + flow).
const ICONS: Readonly<Record<string, LucideIcon>> = {
  Cable,
  BrickWall,
  Radar,
  Activity,
  ShieldAlert,
  Smartphone,
  Cpu,
  Router,
  Wifi,
};

function Glyph({
  name,
  className,
}: Readonly<{ name: string; className?: string }>) {
  const Component = ICONS[name] ?? Cpu;
  return <Component className={className} aria-hidden />;
}

/** Left-aligned section header (eyebrow + title), matching the page rhythm. */
function SectionHead({
  eyebrow,
  title,
  id,
}: Readonly<{ eyebrow: string; title: string; id: string }>) {
  return (
    <>
      <span className="inline-block text-eyebrow font-semibold uppercase tracking-eyebrow text-accent">
        {eyebrow}
      </span>
      <h2
        id={id}
        className="mt-2 text-h2 tracking-h2 font-semibold text-ink"
      >
        {title}
      </h2>
    </>
  );
}

const crumbs = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Custom Solutions", href: "/services/custom-solutions" },
  { name: "O-Tether" },
];

const SECTION = "border-t border-hairline pt-8 sm:pt-10";
const PRIMARY_BTN =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-accent-fill px-6 py-3 font-semibold text-accent-contrast shadow-card transition hover:bg-accent-fill-hover hover:shadow-card-hover";
const SECONDARY_BTN =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-hairline px-6 py-3 font-semibold text-ink transition hover:border-border-accent hover:text-accent";

export default function OTetherCaseStudy() {
  const { hero, overview, flow, features, architecture, cta } = showcase;

  const breadcrumbLd = generateBreadCrumbJsonLd({ items: crumbs });

  return (
    <>
      <Meta
        title="O-Tether Travel Network Security Case Study | Defend I.T."
        description="See how Defend I.T. built O-Tether, a custom travel network appliance that shares an iPhone connection through familiar Wi-Fi with layered security."
        url={CANONICAL}
        canonical={CANONICAL}
        keywords="custom travel network, iPhone tether router, travel Wi-Fi security appliance, custom cybersecurity solution, network security case study, Defend I.T. Solutions"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbLd, oTetherProductLd],
        }}
      />

      <PageContainer>
        {/* Breadcrumbs: contained, above the full-bleed hero */}
        <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6">
          <BreadCrumbs items={crumbs} baseUrl="https://www.wedefendit.com" />
        </div>

        {/* Hero: full-bleed, like the other heroes */}
        <HeroBanner
          dark={hero.image.src}
          light="/img/services/o-tether-hero-light.jpg"
          alt={hero.image.alt}
        >
          <p className="text-eyebrow font-semibold uppercase tracking-eyebrow text-accent">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 text-balance text-display tracking-display font-semibold text-ink">
            {hero.title}
          </h1>
          <p className="mt-5 max-w-lg text-lead text-ink-muted">
            {hero.subtitle}
          </p>
          <p className="mt-6 border-t border-hairline pt-5 text-base font-medium text-ink">
            {hero.kicker.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:justify-end">
            <Link href={cta.primary.href} className={PRIMARY_BTN}>
              {cta.primary.label}
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link href={cta.secondary.href} className={SECONDARY_BTN}>
              {cta.secondary.label}
            </Link>
          </div>
        </HeroBanner>

        <div className="max-w-5xl mx-auto w-full py-8 sm:py-10 space-y-8 sm:space-y-10 px-3 sm:px-6 text-left">

          {/* ── The problem ───────────────────────────────────────── */}
          <section className={SECTION} aria-labelledby="ot-overview">
            <SectionHead
              id="ot-overview"
              eyebrow={overview.eyebrow}
              title={overview.title}
            />
            <div className="mt-5 space-y-4">
              {overview.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-ink-muted text-sm sm:text-base leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* ── What we built (architecture) ──────────────────────── */}
          <section className={SECTION} aria-labelledby="ot-architecture">
            <SectionHead
              id="ot-architecture"
              eyebrow={architecture.eyebrow}
              title={architecture.title}
            />
            <p className="mt-5 text-ink-muted text-sm sm:text-base leading-relaxed">
              {architecture.intro}
            </p>
            <ol className="mt-6 grid list-none gap-3 p-0">
              {architecture.layers.map((layer) => (
                <li
                  key={layer.tag}
                  className="rounded-feature border border-hairline bg-surface bg-[image:var(--wash)] p-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border-accent bg-surface text-accent">
                      <Glyph name={layer.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="text-eyebrow font-semibold tracking-eyebrow text-accent">
                          {layer.tag}
                        </span>
                        <h3 className="text-lg font-semibold text-ink">
                          {layer.name}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                        {layer.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <ul className="mt-3 grid list-none gap-3 p-0 sm:grid-cols-2">
              {architecture.integrity.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm leading-relaxed text-ink-muted"
                >
                  <ShieldCheck
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent"
                    aria-hidden
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* ── How it connects (data flow) ───────────────────────── */}
          <section className={SECTION} aria-labelledby="ot-flow">
            <SectionHead id="ot-flow" eyebrow={flow.eyebrow} title={flow.title} />
            <ol className="mt-6 flex list-none flex-col gap-3 p-0 sm:flex-row sm:items-stretch">
              {flow.nodes.map((node, index) => (
                <Fragment key={node.label}>
                  <li className="flex flex-1 items-center gap-3 rounded-feature border border-hairline bg-surface bg-[image:var(--wash)] p-4 sm:flex-col sm:items-start">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-border-accent bg-surface text-accent">
                      <Glyph name={node.icon} className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-ink">{node.label}</div>
                      <div className="text-sm text-ink-muted">{node.sub}</div>
                    </div>
                  </li>
                  {index < flow.nodes.length - 1 && (
                    <li
                      aria-hidden
                      className="flex flex-shrink-0 items-center justify-center text-ink-dim"
                    >
                      <ArrowRight className="hidden h-5 w-5 sm:block" />
                      <ArrowRight className="h-5 w-5 rotate-90 sm:hidden" />
                    </li>
                  )}
                </Fragment>
              ))}
            </ol>
            <p className="mt-4 text-sm text-ink-muted">{flow.caption}</p>
          </section>

          {/* ── What's protecting you (doc feature cards) ─────────── */}
          <section className={SECTION} aria-labelledby="ot-features">
            <SectionHead
              id="ot-features"
              eyebrow={features.eyebrow}
              title={features.title}
            />
            <ul className="mt-6 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {features.items.map((feature) => (
                <li
                  key={feature.name}
                  className="flex flex-col items-start gap-4 rounded-feature border border-hairline bg-surface bg-[image:var(--wash)] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-border-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.25}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-9 w-9 text-accent"
                    aria-hidden
                  >
                    <path d={feature.iconPath} />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-ink">{feature.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ── CTA ───────────────────────────────────────────────── */}
          <Card as="section" wash className="relative overflow-hidden p-6 text-center sm:p-10">
            <h2 className="text-h2 tracking-h2 font-semibold text-ink text-balance">
              {cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-readable text-ink-muted">
              {cta.body}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={cta.primary.href} className={PRIMARY_BTN}>
                {cta.primary.label}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link href={cta.secondary.href} className={SECONDARY_BTN}>
                {cta.secondary.label}
              </Link>
            </div>
          </Card>
        </div>
      </PageContainer>
    </>
  );
}
