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
import companyInfo from "../../data/company-info.json";
import { LocationPicker, useLocation } from "@/providers/location";
import {
  ShieldCheck,
  Network,
  Laptop2,
  UserCheck,
  LucideIcon,
} from "lucide-react";
import { getNormalizedCityName, Meta, PageContainer } from "@/components";

const { name, tagline, contact, description, services_cta } = companyInfo;

function CallToActionButtons({ location }: { location: string | null }) {
  // shared styles
  const base =
    "px-6 py-4 rounded-md font-semibold glow-hover transition-colors";
  const primary =
    "border border-black bg-blue-400 text-white dark:border-none dark:bg-gray-100 dark:text-black hover:bg-blue-500 hover:border-blue-700 hover:dark:bg-slate-700 hover:text-gray-100";
  const secondary =
    "border border-black dark:border-gray-200 text-black dark:text-white hover:bg-blue-500 hover:text-white hover:dark:bg-sky-500/60 hover:border-blue-700 hover:dark:border-sky-600";

  // compute the href for the “View Services” button
  const city = getNormalizedCityName(location);
  const viewServicesHref = city ? `/services/${city}` : `/services`;

  // small helper to choose href & classes per button
  const getButtonConfig = (text: string, fallbackLink: string) => {
    const isViewServices = text.toLowerCase() === "view services";
    return {
      href: isViewServices ? viewServicesHref : fallbackLink,
      className: `${base} ${isViewServices ? secondary : primary}`,
      ariaLabel: isViewServices ? "View services for your selected city" : text,
    };
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly gap-4 mt-6 w-auto p-3 text-sm md:text-xl break-keep">
      {services_cta.buttons.map(({ text, link }) => {
        const { href, className, ariaLabel } = getButtonConfig(text, link);
        return (
          <Link
            key={text}
            href={href}
            className={className}
            aria-label={ariaLabel}
          >
            {text}
          </Link>
        );
      })}
    </div>
  );
}

type ServiceLinkProps = {
  href: string;
  text: string;
  Icon: LucideIcon;
};
function ServiceLink({ href, text, Icon }: ServiceLinkProps) {
  return (
    <Link
      href={href}
      className="
        group flex flex-col items-center text-center
        focus:outline-none focus-visible:ring-2
        focus-visible:ring-blue-400/60 dark:focus-visible:ring-sky-400/60
      "
      aria-label={text}
    >
      <Icon
        aria-hidden="true"
        className="
          h-10 w-10 mb-2 transition-colors
          text-gray-900 dark:text-gray-300
          group-hover:text-blue-500 dark:group-hover:text-sky-400
          group-focus-visible:text-blue-500 dark:group-focus-visible:text-sky-400
        "
      />
      <strong
        className="
          transition-colors
          text-blue-500 dark:text-sky-400
          group-hover:text-gray-900 dark:group-hover:text-gray-300
          group-focus-visible:text-gray-900 dark:group-focus-visible:text-gray-300
          group-hover:underline group-focus-visible:underline
          underline-offset-4
        "
      >
        {text}
      </strong>
    </Link>
  );
}

export default function Home() {
  const { location } = useLocation();
  const _location = location !== "remote" ? location : null;
  const links = {
    cybersecurity: _location
      ? `/services/${_location}/custom-solutions`
      : "/services/the-villages/custom-solutions",
    network: _location
      ? `/services/${_location}/network-setup`
      : "/services/the-villages/network-setup",
    onsite: _location
      ? `/services/${_location}/onsite-tech-support`
      : "/services/the-villages/onsite-tech-support",
    personalized: _location
      ? `/services/${location}/custom-solutions`
      : "/services/the-villages/custom-solutions",
  };

  const serviceLinks = [
    { text: "Cybersecurity", Icon: ShieldCheck, link: links.cybersecurity },
    { text: "Network Support", Icon: Network, link: links.network },
    { text: "Tech Support", Icon: Laptop2, link: links.onsite },
    {
      text: "Personalized Service",
      Icon: UserCheck,
      link: links.personalized,
    },
  ];

  return (
    <>
      <Meta
        title="Defend I.T. Solutions | Cybersecurity & IT Support in Ocala, Belleview, & The Villages"
        description="Defend I.T. Solutions provides local, on-site tech support and cybersecurity services for retirees, homeowners, and small businesses in Ocala, Belleview, The Villages, and Central Florida."
        image="https://www.wedefendit.com/og-image.png"
        url="https://www.wedefendit.com/"
        canonical="https://www.wedefendit.com/"
        keywords="cybersecurity, IT support, Ocala, The Villages, Belleview, small business IT, home tech support, network security, computer repair, tech services, elderly scams, online safety"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Defend I.T. Solutions",
          image: "https://www.wedefendit.com/og-image.png",
          "@id": "https://www.wedefendit.com/",
          url: "https://www.wedefendit.com/",
          telephone: contact.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: contact.address.street,
            addressLocality: contact.address.city,
            addressRegion: contact.address.state,
            postalCode: contact.address.zip,
            addressCountry: "US",
          },
          areaServed: [
            "Ocala",
            "Belleview",
            "The Villages",
            "Central Florida",
            "Remote",
          ],
        }}
      />

      <PageContainer>
        {/* Intro Section */}
        <section id="home" className="w-auto space-y-8">
          <header className="text-center">
            <h1 className="text-3xl sm:text-4xl py-2 md:text-5xl font-bold">
              {name}
            </h1>
            <h2 className="text-lg md:text-xl px-2 text-blue-500 dark:text-sky-400 font-semibold">
              {tagline}
            </h2>
          </header>

          {/* Services */}
          <section
            id="common-services"
            aria-labelledby="services-heading"
            className="mt-24"
          >
            <h2
              id="services-heading"
              className="text-2xl font-bold text-center mb-4"
            >
              Our Core Services
            </h2>
            <div className="grid grid-cols-2  md:grid-cols-4 gap-8 justify-items-center mt-8">
              {serviceLinks.map((service) => (
                <ServiceLink
                  key={service.text.trim()}
                  href={service.link}
                  text={service.text}
                  Icon={service.Icon}
                />
              ))}
            </div>
          </section>

          <p
            className=" 
            text-base md:text-lg
            text-gray-800 dark:text-gray-300
            leading-relaxed
            w-full max-w-2xl mx-auto
            px-6 md:px-4
            text-center
            mt-8 mb-12
    "
          >
            {description}
          </p>
        </section>

        {/* CTA */}
        <section
          className="relative flex flex-col items-center justify-center w-full space-y-8 mt-16"
          aria-labelledby="cta-heading"
        >
          <h2
            id="cta-heading"
            className="text-2xl md:text-3xl font-bold text-center mb-4"
          >
            {services_cta.headline}
          </h2>

          <LocationPicker showHelper={true} />
          <CallToActionButtons location={location} />

          <p className="text-center p-6 md:p-0 text-base md:text-lg max-w-3xl text-gray-700 dark:text-gray-300">
            Based in Ocala and proudly serving The Villages, we bring
            enterprise-grade protection to everyday users. Our service is
            personal. Our pricing is transparent. Our goal is to keep your
            digital life secure.
          </p>
        </section>
      </PageContainer>
    </>
  );
}
