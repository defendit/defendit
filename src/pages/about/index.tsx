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
import { localBusinessLd } from "@/lib/json-ld";
import { ogImageUrl } from "@/lib/og";
import { HeroBanner } from "@/components/HeroBanner";
import type { ComponentType, SVGProps } from "react";
import { ShieldCheck, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { PageContainer, Meta, BookOnline, BreadCrumbs } from "@/components";
import { Card } from "@/components/Card";

const valueData = [
  {
    title: "Security First",
    description:
      "We recommend sensible protections that fit the situation, not generic checklists or enterprise overkill.",
    icon: ShieldCheck,
  },
  {
    title: "Local and Personal",
    description:
      "No call centers. No outsourced scripts. Just real local support from a business that works in this community.",
    icon: MapPin,
  },
  {
    title: "Clear, Honest Support",
    description:
      "We explain what is wrong, what matters, and what can wait so you can make a decision without pressure.",
    icon: MessageCircle,
  },
] as const;

type ValueItemProps = Readonly<{
  title: string;
  description: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
}>;

function ValueItem({ title, description, Icon }: ValueItemProps) {
  return (
    <Card as="article" wash className="relative overflow-hidden p-6">
      <div className="flex items-center gap-4 mb-3">
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-border-accent bg-surface">
          <Icon className="w-7 h-7 text-accent" aria-hidden="true" />
        </div>
        <h3 className="text-h3 tracking-h3 font-semibold text-ink">{title}</h3>
      </div>
      <p className="text-ink-muted leading-relaxed">{description}</p>
    </Card>
  );
}

function RenderValues() {
  return (
    <div className="grid gap-6 md:grid-cols-1" role="list">
      {valueData.map((item) => (
        <div key={item.title} role="listitem">
          <ValueItem
            title={item.title}
            description={item.description}
            Icon={item.icon}
          />
        </div>
      ))}
    </div>
  );
}

export default function About() {
  const canonical = "https://www.wedefendit.com/about";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.wedefendit.com/",
      },
      { "@type": "ListItem", position: 2, name: "About", item: canonical },
    ],
  };

  const aboutPageLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Defend I.T. Solutions",
    url: canonical,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImageUrl("About Defend I.T. Solutions"),
    },
    about: {
      ...localBusinessLd,
      hasMap:
        "https://www.google.com/maps/search/?api=1&query=Defend+I.T.+Solutions+Ocala+FL",
    },
  };

  return (
    <>
      <Meta
        title="About Defend I.T. Solutions | Cybersecurity & IT Support in Ocala, Belleview & The Villages"
        description="Learn about Defend I.T. Solutions, a local cybersecurity and IT support company serving Ocala, Belleview, The Villages, and surrounding Central Florida communities with privacy-first, on-site tech support."
        url={canonical}
        canonical={canonical}
        keywords="Defend I.T. Solutions, cybersecurity Ocala FL, IT support Belleview FL, IT support The Villages FL, local tech support Central Florida, privacy-focused IT services"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbLd, aboutPageLd],
        }}
      />

      <PageContainer>
        {/* Breadcrumbs: contained, above the full-bleed hero */}
        <div className="mx-auto w-full max-w-6xl px-4 pt-1 sm:px-6">
          <BreadCrumbs
            includeJsonLd={false}
            items={[{ name: "Home", href: "/" }, { name: "About" }]}
          />
        </div>

        {/* Hero: full-bleed, exactly like the homepage */}
        <HeroBanner
          dark="/img/home/home-hero-dark.jpg"
          light="/img/home/home-hero-light.jpg"
          alt="A Central Florida home and storefront with connected, protected devices"
        >
          <p className="inline-flex items-center gap-2 text-eyebrow font-semibold uppercase tracking-eyebrow text-accent">
            <MapPin className="h-4 w-4" aria-hidden />
            Locally Owned &amp; Operated
          </p>
          <h1 className="mt-4 text-balance text-display tracking-display font-semibold text-ink">
            About Defend I.T. Solutions
          </h1>
          <p className="mt-5 max-w-lg text-lead text-ink-muted">
            Local cybersecurity and IT support serving Ocala, Belleview, The
            Villages, and surrounding Central Florida.
          </p>
        </HeroBanner>

        <div className="max-w-5xl mx-auto w-full px-3 pb-3 sm:px-4 space-y-8 sm:space-y-10">

          <Card
            as="section"
            aria-labelledby="who-we-are"
            wash
            className="relative overflow-hidden p-6"
          >
            <h2 id="who-we-are" className="sr-only">
              Who we are
            </h2>
            <p className="text-lead text-ink">
              Defend I.T. Solutions is a founder-led local business serving
              homeowners and small businesses across Ocala, Belleview, and The
              Villages. We come to you, so there&apos;s no shop to drive to.
            </p>

            <p className="text-lead mt-4 text-ink-muted">
              The focus is practical help with malware, scam prevention, Wi-Fi
              issues, device setup, safer account habits, and the day-to-day
              technology problems that waste time and create stress.
            </p>

            <p className="text-lead mt-4 text-ink-muted">
              This business exists because too many people are expected to trust
              devices and networks they were never given enough information to
              judge. The goal is to solve the problem, reduce avoidable risk,
              and leave people with technology that feels easier to use and
              easier to trust.
            </p>
          </Card>

          <section aria-labelledby="core-values">
            <h2
              id="core-values"
              className="text-h2 tracking-h2 font-semibold text-ink mb-4"
            >
              Our Core Values
            </h2>
            <RenderValues />
          </section>

          {/* Services CTA */}
          <Card wash className="relative overflow-hidden p-8 text-center">
            <h2 className="text-h2 tracking-h2 font-semibold mb-4 text-ink">
              Explore Our Services
            </h2>
            <p className="text-ink-muted mb-6 max-w-readable mx-auto">
              From computer repair and malware cleanup to scam protection and
              Wi-Fi help, explore the local services we offer across Central
              Florida.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-fill text-accent-contrast font-semibold transition-all shadow-lg hover:bg-accent-fill-hover hover:shadow-xl"
            >
              View Local Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Card>

          <BookOnline />
        </div>
      </PageContainer>
    </>
  );
}
