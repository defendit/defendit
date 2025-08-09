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
import { useLocation } from "@/providers/location";
import { ShieldCheck, Network, Laptop2, UserCheck } from "lucide-react";
import { getNormalizedCityName, Meta, PageContainer } from "@/components";

const { name, tagline, description, services_cta } = companyInfo;

function CallToActionButtons({ location }: { location: string | null }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-evenly gap-4 mt-6 w-auto p-3 font-semibold text-sm md:text-xl break-keep">
      {services_cta.buttons.map((button, index) => {
        const btnClasses =
          "border border-black bg-blue-400 text-white dark:border-none dark:bg-gray-100 dark:text-black px-6 py-4 rounded-md hover:bg-blue-500 hover:border-blue-700 hover:dark:bg-slate-700 hover:text-gray-100 glow-hover";
        const viewServicesClasses =
          "border border-black dark:border-gray-200 text-black dark:text-white px-6 py-4 rounded-md hover:bg-blue-500 hover:text-white hover:dark:bg-sky-500/60  hover:border-blue-700 hover:dark:border-sky-600 glow-hover";
        return (
          <Link
            key={index}
            href={
              button.text === "View Services"
                ? `services/${getNormalizedCityName(location) ?? ""}` ||
                  "services/"
                : button.link
            }
            className={
              button.text === "View Services" ? viewServicesClasses : btnClasses
            }
          >
            {button.text}
          </Link>
        );
      })}
    </div>
  );
}

export default function Home() {
  const { location } = useLocation();
  const links = {
    cybersecurity: location
      ? `/services/${location}/custom-solutions`
      : "/services/the-villages/cusom-solutions`",
    network: location
      ? `/services/${location}/network-setup`
      : "/services/the-villages/network-setup",
    onsite: location
      ? `/services/${location}/custom-solutions`
      : "/services/the-villages/custom-solutions",
    personalized: location
      ? `/services/${location}/custom-solutions`
      : "/services/the-villages/custom-solutions",
  };

  const serviceLinks = [
    { text: "Cybersecurity", Icon: ShieldCheck, link: links.cybersecurity },
    { text: "Network Support", Icon: Network, link: links.network },
    { text: "On-Site Tech Support", Icon: Laptop2, link: links.onsite },
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
      />
      <PageContainer>
        <h1 className="text-4xl p-2 md:text-5xl font-bold text-center">
          {name}
        </h1>
        <p className="-mt-6 text-lg md:text-xl text-center">{tagline}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          {serviceLinks.map((service) => (
            <Link
              href={service.link}
              key={service.text}
              className="flex flex-col items-center text-center max-w-[160px] text-sm text-gray-700 dark:text-gray-300 hover:underline"
            >
              <service.Icon className="h-10 w-10 text-blue-400 dark:text-blue-300 hover:text-emerald-400 mb-2" />
              {service.text}
            </Link>
          ))}
        </div>

        <p className="text-base p-6 md:p-0 -mt-2 md:text-lg text-gray-800 dark:text-gray-300 text-center w-full max-w-2xl mx-auto ">
          {description}
        </p>

        <section className="relative z-10 flex flex-col items-center justify-center w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            {services_cta.headline}
          </h2>

          <CallToActionButtons location={location} />
          <p className="text-center p-6 md:p-0 text-base md:text-lg max-w-3xl text-gray-700 dark:text-gray-300 mt-4">
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
