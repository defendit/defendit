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

import companyInfo from "@/data/company-info.json";
import { ogImageUrl } from "@/lib/og";

const { name, contact, service_areas } = companyInfo;
const { phone, email, address } = contact;
const { street, city, state, zip } = address;

export const localBusinessLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.wedefendit.com/#organization",
  name,
  image: ogImageUrl("Cybersecurity & Tech Support"),
  logo: "https://www.wedefendit.com/img/logo.svg",
  url: "https://www.wedefendit.com/",
  telephone: phone,
  ...(address.type === "mailing"
    ? {}
    : {
        address: {
          "@type": "PostalAddress",
          streetAddress: street,
          addressLocality: city,
          addressRegion: state,
          postalCode: zip,
          addressCountry: "US",
        },
      }),
  areaServed: service_areas,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    telephone: phone,
    email: email,
    areaServed: service_areas,
    availableLanguage: "English",
  },
};

// Same NAP/organization as localBusinessLd, but with areaServed narrowed to a
// single service-area landing page's city plus its nearby towns. Used by the
// /service-areas/<city> pages so the LocalBusiness node reflects the local
// focus of the page while keeping one source of truth for name, telephone,
// and contact details (company-info.json).
export function generateLocalBusinessLd(
  areaServed: string[],
  image?: string,
): object {
  return {
    ...localBusinessLd,
    ...(image ? { image } : {}),
    areaServed,
    contactPoint: {
      ...localBusinessLd.contactPoint,
      areaServed,
    },
  };
}

export type Crumb = {
  name: string;
  href?: string; // omit for the current page
};

export type GenBreadCrumbsLdProps = {
  items: Crumb[]; // ordered left→right; last is current page,
  baseUrl?: string; // e.g., "https://www.wedefendit.com"
};

export function generateBreadCrumbJsonLd({
  items,
  baseUrl = "https://www.wedefendit.com",
}: GenBreadCrumbsLdProps): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  };
}

export type ServiceLdProps = {
  name: string;
  description: string;
  url: string;
  image: string;
  keywords?: string[];
  city?: string;
  areaServed?: string[];
  provider?: {
    "@type": string; // e.g., "Organization"
    name: string;
  };
  offers?: {
    "@type": string; // e.g., "Offer"
    itemOffered?: {
      "@type": string; // e.g., "Service"
      name: string;
      description: string;
    };
  }[];
};

export function generateServiceLd({
  name,
  url,
  image,
  city = "",
  areaServed = city ? [`${city} FL`, "Central Florida"] : ["Central Florida"],
  offers = [],
  description,
  keywords = [],
  provider = { "@type": "Organization", name: "Defend I.T. Solutions" },
}: ServiceLdProps): object {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    url,
    image,
    provider,
    description,
    keywords: keywords.join(", "),
    areaServed,
    offers: offers.map((offer) => ({
      "@type": "Offer",

      itemOffered: {
        "@type": "Service",
        name: offer.itemOffered?.name || name,
        description: offer.itemOffered?.description || description,
      },
    })),
  };
}
export function generateRelatedServiceLd(
  services: { label: string; slug: string }[],
  isRemote: boolean = false,
): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: r.label,
      url: isRemote
        ? `https://www.wedefendit.com/services/remote/${r.slug}`
        : `https://www.wedefendit.com/services/${r.slug}`,
    })),
  };
}

export function generateFAQPageLd(
  questions: { name: string; acceptedAnswer: string }[],
): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.name,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.acceptedAnswer,
      },
    })),
  };
}

export const sigintProductLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "SIGINT Dashboard",
  alternateName: "SIGINT Dashboard™",
  applicationCategory: "SecurityApplication",
  applicationSubCategory: "OSINT Intelligence Platform",
  operatingSystem: "Web, Windows, macOS, Linux",
  url: "https://www.wedefendit.com/sigint",
  image: "https://www.wedefendit.com/img/sigint/sigint-hijack-dossier.png",
  screenshot: "https://www.wedefendit.com/img/sigint/sigint-hero.png",
  description:
    "Real-time OSINT dashboard with live aircraft, vessel, seismic, fire, weather, and conflict event tracking on an interactive globe. Correlation engine, anomaly detection, and multi-source intelligence analysis.",
  featureList: [
    "Live aircraft tracking (OpenSky Network)",
    "AIS vessel tracking",
    "USGS seismic monitoring",
    "NASA FIRMS fire detection",
    "NOAA severe weather alerts",
    "NOAA National Hurricane Center tropical cyclone tracking",
    "GDELT conflict and crisis events",
    "World news aggregation (RSS)",
    "Cross-source correlation engine",
    "Anomaly detection with regional baselines",
    "Interactive globe and flat map projections",
    "Multi-pane resizable layout",
    "Live HLS video monitoring",
    "Entity dossier with photos and intel links",
    "Composite alert scoring (1-10)",
    "Watch mode (automated globe tour)",
    "Global search with live filtering",
    "Dark and light themes",
    "PWA installable",
    "JSON data export",
  ],
  author: {
    "@type": "Organization",
    name: "Defend I.T. Solutions LLC",
    url: "https://www.wedefendit.com",
  },
  provider: {
    "@type": "Organization",
    name: "Defend I.T. Solutions LLC",
    url: "https://www.wedefendit.com",
  },
  softwareVersion: "1.0",
  isAccessibleForFree: true,
};

// O-Tether is a custom-built hardware appliance presented as a case study under
// the Custom Solutions service, not an off-the-shelf product. schema.org/Product
// with NO `offers` (it is not for sale), related to the parent Service.
export const oTetherProductLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "o-tether",
  category: "Network Security Appliance",
  url: "https://www.wedefendit.com/services/custom-solutions/o-tether",
  image: "https://www.wedefendit.com/img/services/o-tether-hero-dark.webp",
  description:
    "A custom-built network security appliance that bridges an iPhone's connection into a hardened travel Wi-Fi network. Default-deny firewall, DNS and IP threat-intelligence filtering, deep-packet flow detection, and an inline intrusion-prevention system, with signed-release integrity and a fail-closed posture throughout.",
  brand: { "@type": "Brand", name: "Defend I.T. Solutions" },
  manufacturer: {
    "@type": "Organization",
    name: "Defend I.T. Solutions LLC",
    url: "https://www.wedefendit.com",
  },
  isRelatedTo: {
    "@type": "Service",
    name: "Custom Technology Project Planning",
    url: "https://www.wedefendit.com/services/custom-solutions",
  },
};
