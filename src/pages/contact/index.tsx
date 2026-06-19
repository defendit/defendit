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
import { useEffect, useState } from "react";
import { localBusinessLd } from "@/lib/json-ld";
import { ogImageUrl } from "@/lib/og";
import companyInfo from "../../../data/company-info.json";
import {
  Meta,
  BreadCrumbs,
  CopyableCode,
  PageContainer,
  ServiceAreaAndBooking,
} from "@/components";
import {
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  Fingerprint,
  ChevronDown,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";

const { contact, name, service_areas } = companyInfo;
const { phone, email, address, gpg, service_email } = contact;
const { street, city, state, zip } = address;
const { fingerprint, key_id, key_url, secure_email } = gpg;

function HeadingSection() {
  return (
    <header className="my-4 space-y-3 text-center">
      <h1 className="mx-auto max-w-[14ch] text-balance text-display tracking-display font-semibold text-ink sm:max-w-none">
        Contact Defend I.T. Solutions
      </h1>
      <h2 className="mx-auto mb-6 mt-2 max-w-readable text-lead text-ink-muted">
        Tell us what is going on, and we&apos;ll point you in the right
        direction.
      </h2>
    </header>
  );
}

function PrimaryContact() {
  return (
    <div className="relative flex flex-col items-center justify-center space-y-6 overflow-hidden rounded-feature border border-hairline bg-surface bg-[image:var(--wash)] p-8 text-center shadow-card">
      <Phone className="w-16 h-16 text-accent" />
      <div className="space-y-2">
        <h2 className="text-h2 tracking-h2 font-semibold text-ink">
          Call or Text Us
        </h2>
        <a
          href={`tel:${phone.replace(/[^0-9]/g, "")}`}
          className="block text-3xl font-bold text-accent hover:underline"
        >
          {phone.replace("+1", "")}
        </a>
        <p className="text-sm text-ink-muted">
          Available for calls and text messages
        </p>
      </div>
    </div>
  );
}

function ContactInfoCard() {
  return (
    <div className="relative space-y-6 overflow-hidden rounded-feature border border-hairline bg-surface bg-[image:var(--wash)] p-6 shadow-card">
      <h3 className="text-h3 tracking-h3 font-semibold text-ink mb-4">
        Other Ways to Reach Us
      </h3>

      <div className="space-y-4">
        {/* Standard Email */}
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-ink">
              Standard Email
            </h4>
            <a
              href={`mailto:${email}`}
              className="text-accent hover:underline text-sm break-all"
            >
              {email}
            </a>
          </div>
        </div>

        {/* Service Email */}
        <div className="flex items-start gap-3">
          <Mail className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-ink">
              Service Requests
            </h4>
            <a
              href={`mailto:${service_email}`}
              className="text-accent hover:underline text-sm break-all"
            >
              {service_email}
            </a>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-3 pt-2 border-t border-hairline">
          <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-ink mb-1">
              Mailing Address
            </h4>
            <p className="text-xs text-ink-dim mb-2">
              Mailing address only • We operate on-site or remotely
            </p>
            <address className="text-sm not-italic leading-relaxed text-ink-muted">
              <strong>{name}</strong>
              <br />
              {street}
              <br />
              {city}, {state} {zip}
            </address>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecureContactCard({
  showPGP,
  setShowPGP,
}: {
  showPGP: boolean;
  setShowPGP: (v: boolean) => void;
}) {
  return (
    <section
      id="pgp"
      className="relative overflow-hidden rounded-feature border border-hairline bg-surface bg-[image:var(--wash)] p-6 shadow-card"
    >
      <div className="flex items-start gap-4">
        <ShieldCheck className="w-8 h-8 text-accent flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-h3 tracking-h3 font-semibold text-ink mb-2">
            Need Secure Communication?
          </h3>
          <p className="text-sm text-ink-muted mb-4">
            For sensitive inquiries, we support PGP-encrypted email
            communication.
          </p>

          <button
            type="button"
            onClick={() => setShowPGP(!showPGP)}
            style={{ touchAction: "manipulation" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-accent-fill text-accent-contrast text-sm font-medium shadow transition-all hover:bg-accent-fill-hover touch-manipulation"
            aria-controls="pgp-panel"
            aria-expanded={showPGP}
          >
            {showPGP ? "Hide" : "Show"} PGP Details
            {showPGP ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showPGP && (
            <div
              id="pgp-panel"
              className="mt-6 space-y-4 rounded-card border border-hairline bg-surface p-4 text-sm text-ink-muted shadow-card"
            >
              <div>
                <p className="font-semibold mb-1">Secure Email Address:</p>
                <a
                  href={`mailto:${secure_email}`}
                  className="text-accent hover:underline break-all"
                >
                  {secure_email}
                </a>
              </div>

              <div>
                <a
                  href={key_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  style={{ touchAction: "manipulation" }}
                  className="inline-block rounded bg-accent-fill px-4 py-2 text-accent-contrast font-medium text-sm shadow transition-all hover:bg-accent-fill-hover touch-manipulation"
                >
                  Download Public PGP Key
                </a>
              </div>

              <div className="pt-2 border-t border-hairline">
                <p className="font-semibold mb-1">Key ID:</p>
                <CopyableCode text={key_id} />
              </div>

              <div className="pt-2 border-t border-hairline">
                <div className="flex items-center gap-2 mb-2">
                  <Fingerprint className="w-4 h-4" />
                  <p className="font-semibold">Fingerprint:</p>
                </div>
                <CopyableCode text={fingerprint.replace(/\s+/g, "")} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const canonical = "https://www.wedefendit.com/contact";

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
    { "@type": "ListItem", position: 2, name: "Contact", item: canonical },
  ],
};

const contactPageLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Defend I.T. Solutions",
  url: canonical,
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: ogImageUrl("Contact Defend I.T. Solutions"),
  },
  about: {
    ...localBusinessLd,
    areaServed: service_areas,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phone,
      contactType: "Customer Service",
      availableLanguage: "English",
      email: contact.email,
      serviceUrl: "https://www.wedefendit.com/services",
      url: canonical,
      areaServed: service_areas,
    },
  },
};

export default function ContactPage() {
  const [showPGP, setShowPGP] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (
      url.searchParams.get("secure") === "1" ||
      url.hash.replace("#", "") === "pgp"
    ) {
      setShowPGP(true);
      const el = document.getElementById("pgp");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <Meta
        url={canonical}
        canonical={canonical}
        title="Contact Defend I.T. Solutions | Ocala, The Villages & Belleview"
        description="Contact Defend I.T. Solutions for local computer repair, virus removal, scam protection, Wi-Fi help, and on-site tech support in Ocala, The Villages, and Belleview."
        keywords="contact computer repair Ocala FL, virus removal The Villages, scam protection Belleview FL, Wi-Fi help Central Florida, local tech support, secure contact PGP"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbLd, contactPageLd],
        }}
      />

      <PageContainer>
        <div className="max-w-6xl mx-auto w-full px-3 py-8 sm:px-4 sm:py-10 space-y-8 sm:space-y-10">
          <BreadCrumbs
            includeJsonLd={true}
            items={[{ name: "Home", href: "/" }, { name: "Contact" }]}
          />

          <HeadingSection />

          {/* Main Contact Section - Two Column Layout */}
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            <PrimaryContact />
            <ContactInfoCard />
          </div>

          {/* Secure Contact Section */}
          <SecureContactCard showPGP={showPGP} setShowPGP={setShowPGP} />

          {/* Contact Form */}
          <section className="relative overflow-hidden rounded-feature border border-hairline bg-surface bg-[image:var(--wash)] p-4 shadow-card sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8 text-accent flex-shrink-0" />
              <div>
                <h3 className="text-lg sm:text-h3 tracking-h3 font-semibold text-ink">
                  Send Us a Message
                </h3>
              </div>
            </div>
            <p className="text-sm text-ink-muted mb-6">
              Tell us what you need help with and we&apos;ll get back to you.
            </p>
            <ContactForm className="max-w-xl mx-auto" />
          </section>

          {/* Service Area */}
          <ServiceAreaAndBooking />
        </div>
      </PageContainer>
    </>
  );
}
