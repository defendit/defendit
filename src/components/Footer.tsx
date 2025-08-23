import Link from "next/link";
import React, { useState } from "react";
import companyInfo from "../../data/company-info.json";

const { copy, contact } = companyInfo;

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

const cities = ["ocala", "belleview", "the-villages"];

const formatLabel = (slug: string) =>
  slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");

const formatCity = (city: string) =>
  city.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());

/* ---------- Small Reusable Components ---------- */

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
      className="w-full flex items-center justify-between px-4 py-3 text-gray-800 dark:text-white text-sm"
      aria-expanded={openSection === id}
      onClick={() => setOpenSection(openSection === id ? null : id)}
    >
      <span className="font-semibold ">{title}</span>
      <span className="text-blue-500 dark:text-sky-400">
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
    <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">
      {title}
    </h4>
    <ul className="space-y-2">{children}</ul>
  </div>
);

const ServiceLinks: React.FC<{
  services: string[];
  isRemote?: boolean;
  isMobile?: boolean;
  openServiceSlug?: string | null;
  setOpenServiceSlug?: React.Dispatch<React.SetStateAction<string | null>>;
}> = ({
  services,
  isRemote = false,
  openServiceSlug,
  isMobile = false,
  setOpenServiceSlug,
}) => {
  const fontSizeClass = isMobile ? "text-xs" : "text-sm";
  return (
    <>
      {services.map((service) => (
        <li key={service}>
          {isRemote ? (
            <Link
              href={`/services/remote/${service}`}
              className={`text-blue-500 dark:text-sky-600 dark:hover:text-sky-500 hover:underline ${fontSizeClass}`}
            >
              {formatLabel(service)}
            </Link>
          ) : (
            <>
              <button
                className={`text-blue-500 dark:text-sky-600 dark:hover:text-sky-500 hover:underline ${fontSizeClass}`}
                title={`${formatLabel(service)} Services by City`}
                onClick={() =>
                  setOpenServiceSlug &&
                  setOpenServiceSlug(
                    openServiceSlug === service ? null : service
                  )
                }
              >
                {formatLabel(service)}
              </button>
              {openServiceSlug === service && (
                <ul className="ml-3 mt-2 space-y-1 text-gray-600  dark:text-gray-300 text-xs">
                  {cities.map((city) => (
                    <li key={`${city}-${service}`}>
                      <Link
                        className="hover:text-gray-500 dark:hover:text-gray-400 hover:underline"
                        href={`/services/${city}/${service}`}
                        title={`${formatLabel(service)} in ${formatCity(city)}`}
                      >
                        {formatCity(city)}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </li>
      ))}
    </>
  );
};

/* ---------- Main Footer ---------- */

export const Footer: React.FC = () => {
  const [openServiceSlug, setOpenServiceSlug] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<
    null | "services" | "remote" | "company" | "legal"
  >(null);

  return (
    <footer className="w-full max-w-8xl p-6 mt-12 text-gray-500 dark:text-gray-400 text-xs md:text-sm border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* ===== MOBILE: accordion ===== */}
        <div className="rounded-lg md:hidden divide-y divide-gray-800">
          <AccordionSection
            title="Services"
            id="services"
            openSection={openSection}
            setOpenSection={setOpenSection}
          >
            <ul className="space-y-2">
              <ServiceLinks
                isMobile
                services={commonServices}
                openServiceSlug={openServiceSlug}
                setOpenServiceSlug={setOpenServiceSlug}
              />
            </ul>
          </AccordionSection>

          <AccordionSection
            title="Remote Services"
            id="remote"
            openSection={openSection}
            setOpenSection={setOpenSection}
          >
            <ul className="space-y-2">
              <ServiceLinks services={remoteServices} isRemote isMobile />
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
                <Link href="/about" className="hover:underline text-xs">
                  About
                </Link>
              </li>
              <li>
                <Link href="/awareness" className="hover:underline text-xs">
                  Awareness
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline text-xs">
                  Contact
                </Link>
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
                <Link href="/privacy" className="hover:underline text-xs">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline text-xs">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </AccordionSection>
        </div>

        {/* ===== DESKTOP: four even columns ===== */}
        <div className="hidden md:block w-full max-w-7xl dark:bg-black/10 rounded-lg">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap flex-row justify-around items-start gap-10">
            <DesktopColumn title="Services">
              <ServiceLinks
                services={commonServices}
                openServiceSlug={openServiceSlug}
                setOpenServiceSlug={setOpenServiceSlug}
              />
            </DesktopColumn>

            <DesktopColumn title="Remote Services">
              <ServiceLinks services={remoteServices} isRemote />
            </DesktopColumn>

            <DesktopColumn title="Company">
              <li>
                <Link href="/about" className="hover:underline text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/awareness" className="hover:underline text-sm">
                  Awareness
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline text-sm">
                  Contact
                </Link>
              </li>
            </DesktopColumn>

            <DesktopColumn title="Legal">
              <li>
                <Link href="/privacy" className="hover:underline text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline text-sm">
                  Terms of Service
                </Link>
              </li>
            </DesktopColumn>
          </div>
        </div>

        {/* Contact Row */}
        {/* Contact Row: column on mobile, row on desktop */}
        <div className="flex flex-col items-center gap-2 text-xs text-center md:flex-row md:justify-center">
          {contact.phone && (
            <a href={`tel:${contact.phone.replace(/[^0-9]/g, "")}`}>
              {contact.phone.replace("+1", "")}
            </a>
          )}
          {contact.email && (
            <>
              <span className="px-1 whitespace-nowrap hidden md:inline">•</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </>
          )}
          {contact.address && (
            <>
              <span className="px-1 whitespace-nowrap hidden md:inline">•</span>
              <span>
                {`${contact.address.street}, ${contact.address.city}, ${contact.address.state} ${contact.address.zip}`}
              </span>
            </>
          )}
        </div>

        {/* Copyright */}
        <div className="text-center space-y-1 text-gray-400 dark:text-gray-500">
          {copy.map((line: string, i: number) => (
            <p key={i} className="text-[0.7rem]">
              {line}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
};
