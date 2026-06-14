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
import React, { useState } from "react";
import companyInfo from "../../data/company-info.json";

const { copy, contact, copy_start_year } = companyInfo;

const commonServices = [
  "computer-repair",
  "custom-solutions",
  "data-recovery",
  "home-network-security",
  "network-setup",
  "onsite-tech-support",
  "password-management",
  "pc-upgrades",
  "scam-protection",
  "smart-home-setup",
  "software-troubleshooting",
  "virus-removal",
];

const remoteServices = [
  "remote-support-plan",
  "remote-support",
  "remote-privacy-hardening",
  "remote-security-assessment",
  "remote-tech-tutoring",
  "remote-training",
  "remote-virus-removal",
];

const formatLabel = (slug: string) =>
  slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

const formatCopyYear = (line: string) => {
  const currentYear = new Date().getFullYear();
  const startYear = copy_start_year || currentYear;

  if (startYear >= currentYear) {
    return line.replace("{{year}}", `${currentYear}`);
  }

  // otherwise, return a range
  return line.replace("{{year}}", `${startYear}-${currentYear}`);
};

const AccordionSection: React.FC<{
  title: string;
  id: "services" | "remote" | "company" | "legal";
  openSection: string | null;
  setOpenSection: React.Dispatch<
    React.SetStateAction<"services" | "remote" | "company" | "legal" | null>
  >;
  children: React.ReactNode;
}> = ({ title, id, openSection, setOpenSection, children }) => (
  <div>
    <button
      type="button"
      aria-expanded={openSection === id}
      className="w-full flex items-center justify-between px-4 py-3 text-ink text-sm"
      onClick={() => setOpenSection(openSection === id ? null : id)}
    >
      <span className="font-semibold">{title}</span>
      <span aria-hidden className="text-accent">
        {openSection === id ? "−" : "+"}
      </span>
    </button>
    {openSection === id && <div className="px-4 pb-3">{children}</div>}
  </div>
);

const DesktopColumn: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div>
    <h4 className="font-semibold mb-3 text-ink">{title}</h4>
    <ul className="space-y-2">{children}</ul>
  </div>
);

const ServiceLinks: React.FC<{
  services: string[];
  isMobile?: boolean;
  isRemote?: boolean;
}> = ({ services, isMobile = false, isRemote = false }) => {
  const fontSizeClass = isMobile ? "text-xs" : "text-sm";

  return (
    <>
      {services.map((service) => (
        <li key={service}>
          <Link
            href={`/services/${isRemote ? `remote/${service}` : service}`}
            className={`text-accent hover:underline ${fontSizeClass}`}
          >
            {formatLabel(service)}
          </Link>
          {!isRemote && service === "custom-solutions" && (
            <ul className="mt-2 ml-3 space-y-2 border-l border-hairline pl-3">
              <li>
                <Link
                  href="/services/custom-solutions/o-tether"
                  className={`text-accent hover:underline ${fontSizeClass}`}
                >
                  O-Tether Case Study
                </Link>
              </li>
            </ul>
          )}
        </li>
      ))}
    </>
  );
};

export const Footer: React.FC = () => {
  const [openSection, setOpenSection] = useState<
    null | "services" | "remote" | "company" | "legal"
  >(null);

  return (
    <footer className="w-full max-w-8xl p-6 mt-12 text-ink-dim text-xs md:text-sm border-t border-hairline">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="rounded-lg md:hidden divide-y divide-hairline">
          <AccordionSection
            title="Services"
            id="services"
            openSection={openSection}
            setOpenSection={setOpenSection}
          >
            <ul className="space-y-2">
              <ServiceLinks isMobile services={commonServices} />
            </ul>
          </AccordionSection>

          <AccordionSection
            title="Remote Services"
            id="remote"
            openSection={openSection}
            setOpenSection={setOpenSection}
          >
            <ul className="space-y-2">
              <ServiceLinks services={remoteServices} isMobile isRemote />
            </ul>
          </AccordionSection>

          <AccordionSection
            title="Company"
            id="company"
            openSection={openSection}
            setOpenSection={setOpenSection}
          >
            <ul className="space-y-2">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/sigint">SIGINT Dashboard</Link>
              </li>
              <li>
                <Link href="/awareness">Awareness</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </AccordionSection>

          <AccordionSection
            title="Legal"
            id="legal"
            openSection={openSection}
            setOpenSection={setOpenSection}
          >
            <ul className="space-y-2">
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/privacy/sigint">SIGINT Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
            </ul>
          </AccordionSection>
        </div>

        <div className="hidden md:block">
          <div className="px-6 py-4 flex justify-around gap-10">
            <DesktopColumn title="Services">
              <ServiceLinks services={commonServices} />
            </DesktopColumn>

            <DesktopColumn title="Remote Services">
              <ServiceLinks services={remoteServices} isRemote={true} />
            </DesktopColumn>

            <DesktopColumn title="Company">
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/sigint">SIGINT Dashboard</Link>
              </li>
              <li>
                <Link href="/awareness">Awareness</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </DesktopColumn>

            <DesktopColumn title="Legal">
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/privacy/sigint">SIGINT Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
            </DesktopColumn>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 text-xs text-center md:flex-row md:justify-center">
          {contact.phone && (
            <a href={`tel:${contact.phone.replaceAll(/[^0-9]/g, "")}`}>
              {contact.phone.replace("+1", "")}
            </a>
          )}
          {contact.email && (
            <>
              <span className="hidden md:inline px-1">•</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </>
          )}
          {contact.address && (
            <>
              <span className="hidden md:inline px-1">•</span>
              <span>
                {`${contact.address.street}, ${contact.address.city}, ${contact.address.state} ${contact.address.zip}`}
              </span>
            </>
          )}
        </div>

        <div className="text-center space-y-1 text-ink-dim">
          {copy.map((line: string, i: number) => (
            <p key={i} className="text-xs">
              {formatCopyYear(line)}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
};
