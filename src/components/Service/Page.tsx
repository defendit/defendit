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

import Link from "next/link";
import {
  Meta,
  BookOnline,
  PageContainer,
  RemoteServicesCTA,
} from "@/components";
import { ServiceCard } from "@/components/Service/Card";

export type Service = {
  id: string;
  title: string;
  headline: string;
  icons: string[];
  summary: string;
  cta: string;
};

type MetaProps = {
  url: string;
  image: string;
  title: string;
  keywords: string;
  description: string;
};

export type ServicesPageProps = {
  h1: string;
  city: string; // "", "ocala", "the-villages", "belleview", "remote"
  meta: MetaProps;
  services: Service[];
};

export default function ServicePage(props: ServicesPageProps) {
  const { meta, h1, services, city } = props;
  const isRemote = city === "remote";

  // Display name for the city
  const cityName =
    city === "the-villages"
      ? "The Villages"
      : city
      ? city.charAt(0).toUpperCase() + city.slice(1)
      : "";

  // Build breadcrumb JSON-LD
  const breadcrumbList = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.wedefendit.com/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Services",
      item: "https://www.wedefendit.com/services",
    },
  ];

  if (city && !isRemote) {
    breadcrumbList.push({
      "@type": "ListItem",
      position: 3,
      name: cityName,
      item: `https://www.wedefendit.com/services/${city}`,
    });
  } else if (isRemote) {
    breadcrumbList.push({
      "@type": "ListItem",
      position: 3,
      name: "Remote",
      item: "https://www.wedefendit.com/services/remote",
    });
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbList,
  };

  return (
    <>
      <Meta
        url={meta.url}
        image={meta.image}
        title={meta.title}
        keywords={meta.keywords}
        description={meta.description}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageContainer>
        <div className="max-w-7xl mx-auto px-4 py-10 space-y-10 bg-gray-50/10 dark:bg-slate-950/20 z-0 shadow-md">
          {/* Breadcrumbs */}
          <nav
            aria-label="Breadcrumb"
            className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2 overflow-x-auto whitespace-nowrap"
          >
            <ol className="flex items-center gap-1 sm:gap-2">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="px-1 sm:px-2">
                ›
              </li>
              <li>
                <Link href="/services" className="hover:underline">
                  Services
                </Link>
              </li>
              {city && (
                <>
                  <li aria-hidden="true" className="px-1 sm:px-2">
                    ›
                  </li>
                  <li className="text-gray-400 dark:text-gray-500 truncate">
                    <span aria-current="page">
                      {isRemote ? "Remote" : cityName}
                    </span>
                  </li>
                </>
              )}
            </ol>
          </nav>

          {/* Header */}
          <header className="text-center">
            <h1 className="text-4xl font-bold">{h1}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {isRemote ? (
                "Remote cybersecurity and I.T. support for homeowners, retirees, and small businesses in Central Florida."
              ) : (
                <>
                  Learn more about our local, in person cybersecurity and I.T.
                  support
                  {cityName.trim() !== "" ? ` for ${cityName}, FL.` : "."}
                </>
              )}
            </p>
          </header>

          {/* Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {services.map((service: Service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>

          <RemoteServicesCTA isRemote={isRemote} />
          <BookOnline />

          <section className="text-sm text-gray-600 dark:text-gray-400 italic text-center max-w-3xl mx-auto">
            <p>
              Not seeing the service you need? We offer a wide range of I.T.
              solutions beyond what&apos;s listed here.{" "}
              <Link
                href="/contact"
                className="text-blue-600 dark:text-sky-400 hover:underline"
              >
                Contact us
              </Link>{" "}
              to discuss your specific needs and how we can assist you.
            </p>
          </section>
        </div>
      </PageContainer>
    </>
  );
}

export { ServicePage };
