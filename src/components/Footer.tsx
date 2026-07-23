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
import React from "react";
import companyInfo from "../../data/company-info.json";
import { Logo } from "./Icons";

const { copy, contact, description, copy_start_year } = companyInfo;

const services: { slug: string; label: string }[] = [
  { slug: "computer-repair", label: "Computer Repair" },
  { slug: "virus-removal", label: "Virus and Malware Removal" },
  { slug: "scam-protection", label: "Scam Protection" },
  { slug: "onsite-tech-support", label: "On-Site Tech Support" },
  { slug: "home-network-security", label: "Home Network Security" },
  { slug: "smart-home-setup", label: "Smart Home Setup" },
];

const company: { href: string; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/services/remote", label: "Remote Services" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/awareness", label: "Security Awareness" },
  { href: "/sigint", label: "SIGINT Dashboard" },
  { href: "/contact", label: "Contact" },
];

const formatCopyYear = (line: string) => {
  const currentYear = new Date().getFullYear();
  const startYear = copy_start_year || currentYear;
  const stamp =
    startYear >= currentYear ? `${currentYear}` : `${startYear}-${currentYear}`;
  return line.replace("{{year}}", stamp);
};

const Column: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div>
    <h2 className="text-eyebrow font-semibold uppercase tracking-eyebrow text-accent">
      {title}
    </h2>
    <ul className="mt-4 space-y-2.5">{children}</ul>
  </div>
);

const FooterLink: React.FC<{ href: string; label: string }> = ({
  href,
  label,
}) => (
  <li>
    <Link
      href={href}
      className="text-sm text-ink-muted transition hover:text-ink"
    >
      {label}
    </Link>
  </li>
);

export const Footer: React.FC = () => {
  const telHref = `tel:${contact.phone.replaceAll(/\D/g, "")}`;

  return (
    <footer className="w-full border-t border-hairline">
      <div className="mx-auto w-full max-w-6xl px-5 pb-8 pt-16 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="max-w-xs">
            <Link
              href="/"
              title="Defend I.T. Solutions Home"
              className="inline-flex items-center gap-2.5"
            >
              <Logo className="h-9 w-9 text-ink dark:text-accent" />
              <span className="text-base font-semibold text-ink">
                Defend I.T. Solutions
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {description}
            </p>
          </div>

          <Column title="Services">
            {services.map((s) => (
              <FooterLink
                key={s.slug}
                href={`/services/${s.slug}`}
                label={s.label}
              />
            ))}
            <FooterLink href="/services" label="View All Services" />
          </Column>

          <Column title="Company">
            {company.map((c) => (
              <FooterLink key={c.href} href={c.href} label={c.label} />
            ))}
          </Column>

          <Column title="Contact">
            <li>
              <a
                href={telHref}
                className="text-sm text-ink-muted transition hover:text-ink"
              >
                {contact.phone.replace("+1 ", "")}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="text-sm text-ink-muted transition hover:text-ink"
              >
                {contact.email}
              </a>
            </li>
          </Column>
        </div>

        {/* Bar */}
        <div className="mt-14 flex flex-col gap-3 border-t border-hairline pt-6 text-xs text-ink-dim sm:flex-row sm:items-center sm:justify-between">
          <p>{formatCopyYear(copy[0])}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="transition hover:text-ink">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-ink">
              Terms of Use
            </Link>
            <Link href="/privacy/sigint" className="transition hover:text-ink">
              SIGINT Privacy Policy
            </Link>
          </div>
        </div>
        <p className="mt-3 text-xs text-ink-dim">{copy[1]}</p>
      </div>
    </footer>
  );
};
