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
import { ShieldCheck, Wrench, House, Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import { localBusinessLd } from "@/lib/json-ld";
import companyInfo from "../../data/company-info.json";
import { Meta, PageContainer } from "@/components";
import { InteractiveTraining } from "@/components/InteractiveTraining";
import { Card } from "@/components/Card";

const { contact } = companyInfo;

type BenefitCardProps = Readonly<{
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}>;

function BenefitCard({ icon, title, description, link }: BenefitCardProps) {
  return (
    <Card
      as={Link}
      href={link}
      interactive
      wash
      className="group relative flex flex-col items-center overflow-hidden p-6 text-center"
    >
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border-accent bg-surface transition-transform duration-200 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-h3 tracking-h3 font-semibold text-ink mb-2">
        {title}
      </h3>
      <p className="text-ink-muted text-sm leading-relaxed">{description}</p>
      <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:underline">
        Learn more <ArrowRight className="w-4 h-4" />
      </span>
    </Card>
  );
}

function TrustBar() {
  const points = [
    "Florida LLC & Insured",
    "Local to Central Florida",
    "Clear Quotes Before Work Begins",
    "No Pressure Sales",
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-ink-muted py-6 border-y border-hairline">
      {points.map((point) => (
        <div key={point} className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-success" aria-hidden />
          <span>{point}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const benefits = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-accent" />,
      title: "Protect",
      description:
        "Get practical help with scam prevention, account safety, and safer home technology choices without the fear tactics.",
      link: "/services/scam-protection",
    },
    {
      icon: <Wrench className="w-8 h-8 text-accent" />,
      title: "Fix",
      description:
        "Clean up malware, repair slow or unstable computers, fix software problems, and recover from the kind of tech issues that disrupt everyday life.",
      link: "/services/computer-repair",
    },
    {
      icon: <House className="w-8 h-8 text-accent" />,
      title: "Support",
      description:
        "Get in-home help with Wi-Fi, printers, new devices, and day-to-day tech problems when you want one visit to sort things out.",
      link: "/services/onsite-tech-support",
    },
  ];

  const displayPhone = contact.phone.replace("+1", "");
  const telHref = `tel:${contact.phone.replaceAll(/\D/g, "")}`;

  return (
    <>
      <Meta
        title="Computer Repair, Virus Removal & Local Tech Support in Central Florida | Defend I.T. Solutions"
        description="Computer repair, virus removal, scam protection, Wi-Fi help, on-site tech support, and account safety for homeowners, retirees, and small businesses in Ocala, The Villages, and Belleview."
        image="https://www.wedefendit.com/og-image.png"
        url="https://www.wedefendit.com/"
        canonical="https://www.wedefendit.com/"
        keywords="computer repair Ocala FL, virus removal The Villages FL, scam protection Belleview FL, Wi-Fi help Central Florida, on-site tech support Ocala, password manager setup Central Florida, local tech support"
        structuredData={localBusinessLd}
      />

      <PageContainer>
        {/* Hero Section */}
        <header className="mx-auto max-w-5xl px-4 py-5 text-center sm:px-6 sm:py-8 md:py-10">
          <h1 className="mx-auto mb-4 max-w-4xl text-balance text-display tracking-display font-semibold text-ink">
            Cybersecurity and Tech Support for Homes and Small Businesses
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-lead text-ink-muted">
            Proudly serving Ocala, Belleview, and The Villages
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-base font-semibold text-accent-contrast shadow-lg transition-all hover:bg-accent-hover hover:shadow-xl sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              <Phone className="w-5 h-5" />
              Request Local Help
            </Link>
            <Link
              href="/services"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-hairline px-6 py-3.5 text-base font-semibold text-ink transition-all hover:border-accent sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
            >
              View Services
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </header>

        <TrustBar />

        {/* What We Do Section */}
        <section className="py-16 px-4 sm:py-20">
          <h2 className="text-h2 tracking-h2 font-semibold text-center text-ink mb-4">
            What We Do
          </h2>
          <p className="text-center text-ink-muted max-w-readable mx-auto mb-10 leading-relaxed">
            We help with everyday tech problems and the security issues that
            come with them. That means malware cleanup, scam help, Wi-Fi
            trouble, device setup, and safer systems for homes and small
            businesses without the jargon or pressure.
          </p>

          <div className="grid max-w-2xl gap-6 mx-auto lg:max-w-5xl lg:grid-cols-3">
            {benefits.map((benefit) => (
              <BenefitCard key={benefit.title} {...benefit} />
            ))}
          </div>
        </section>

        <section className="py-16 px-6 sm:py-20 max-w-6xl">
          <InteractiveTraining />
        </section>

        <section className="py-16 px-4 sm:py-20">
          <Card
            wash
            className="max-w-4xl mx-auto relative overflow-hidden px-6 py-7 sm:px-8 sm:py-8 lg:px-11 lg:pt-10 lg:pb-9"
          >
            <div className="max-w-3xl">
              <h2 className="text-h2 tracking-h2 font-semibold text-ink">
                Why Choose Defend I.T. Solutions?
              </h2>

              <p className="mt-6 max-w-readable text-lead text-ink-muted">
                Defend I.T. Solutions brings a security-minded approach to the
                kind of tech problems people actually run into. The work is
                local, straightforward, and built around clear recommendations
                instead of upsells or scare tactics.
              </p>

              <div className="mt-8 grid gap-x-10 gap-y-5 text-ink-muted md:grid-cols-2">
                <div className="space-y-5">
                  {[
                    "Local to Central Florida",
                    "Security-first recommendations",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className="text-accent text-xl flex-shrink-0"
                      >
                        •
                      </span>
                      <p className="text-base font-medium sm:text-lg">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-5">
                  {["Clear quotes before work begins", "No pressure sales"].map(
                    (item) => (
                      <div key={item} className="flex items-start gap-3">
                        <span
                          aria-hidden
                          className="text-accent text-xl flex-shrink-0"
                        >
                          •
                        </span>
                        <p className="text-base font-medium sm:text-lg">
                          {item}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-6 border-t border-hairline pt-6 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium">
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1 text-accent transition hover:underline"
                  >
                    About Defend I.T. Solutions
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-1 text-accent transition hover:underline"
                  >
                    View Services
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="flex flex-col items-start gap-2 md:items-end">
                  <a
                    href={telHref}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3.5 text-base font-semibold text-accent-contrast shadow-lg transition-all hover:bg-accent-hover hover:shadow-xl md:w-auto"
                  >
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    {displayPhone}
                  </a>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1 text-sm font-medium text-accent transition hover:underline"
                  >
                    More Contact Options
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </PageContainer>
    </>
  );
}
