import Link from "next/link";
import { useEffect, useState } from "react";
import companyInfo from "../../../data/company-info.json";
import { BookOnline, PageContainer, Meta, CopyableCode } from "@/components";
import {
  Mail,
  Phone,
  ShieldCheck,
  MapPin,
  Fingerprint,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const { contact, name } = companyInfo;
const { phone, email, address, gpg } = contact;
const { street, city, state, zip } = address;
const { fingerprint, key_id, key_url, secure_email } = gpg;

function HeadingSection() {
  return (
    <header className="text-center space-y-2 my-4">
      <h1 className="text-4xl sm:text-5xl font-bold">Contact Us</h1>
      <h2 className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mt-2 mb-6">
        {name} provides remote and on-site support.
      </h2>
    </header>
  );
}

function ContactGrid() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16">
      {/* Phone */}
      <div className="flex flex-col items-center text-center space-y-2">
        <Phone className="w-6 h-6 text-blue-500 dark:text-sky-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Call or Text
        </h2>
        <a
          href={`tel:${phone}`}
          className="text-blue-600 dark:text-sky-400 hover:underline text-lg"
        >
          {phone.replace("+1", "")}
        </a>
      </div>

      {/* Email */}
      <div className="flex flex-col items-center text-center space-y-2">
        <Mail className="w-6 h-6 text-blue-500 dark:text-sky-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Standard Email
        </h2>
        <a
          href={`mailto:${email}`}
          className="text-blue-600 dark:text-sky-400 hover:underline text-sm"
        >
          {email}
        </a>
      </div>

      {/* Address */}
      <div className="flex flex-col items-center text-center space-y-2 sm:col-span-2">
        <MapPin className="w-6 h-6 text-blue-500 dark:text-sky-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Mailing Address
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          This is a mailing address only. We operate on-site or remotely.
        </p>
        <p className="text-base leading-tight select-all">
          <strong>{name}</strong>
          <br />
          {street}
          <br />
          {city}, {state} {zip}
        </p>
      </div>
    </section>
  );
}

function PgpBlock({
  showPGP,
  setShowPGP,
}: {
  showPGP: boolean;
  setShowPGP: (v: boolean) => void;
}) {
  return (
    <section id="pgp" className="text-center space-y-4">
      <p className="text-md text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
        Reach out securely below.
      </p>

      <button
        onClick={() => setShowPGP(!showPGP)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded bg-blue-600 dark:bg-sky-500 text-white font-medium shadow hover:bg-blue-700 dark:hover:bg-sky-600 transition"
        aria-expanded={showPGP}
        aria-controls="pgp-panel"
      >
        <ShieldCheck className="w-5 h-5" />
        Secure Contact (PGP)
        {showPGP ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {showPGP && (
        <div
          id="pgp-panel"
          className="mt-6 space-y-4 text-sm text-gray-700 dark:text-gray-300 max-w-xl mx-auto border border-gray-300 dark:border-gray-700 rounded-lg p-4"
        >
          <p>
            For sensitive inquiries, you may email us securely at:
            <br />
            <a
              href={`mailto:${secure_email}`}
              className="text-blue-600 dark:text-sky-400 hover:underline"
            >
              {secure_email}
            </a>
          </p>

          <a
            href={key_url}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="inline-block px-3 py-1 rounded bg-blue-600 dark:bg-sky-500 text-white font-medium shadow hover:bg-blue-700 dark:hover:bg-sky-600 transition"
          >
            Download Public PGP Key
          </a>

          <p>
            <strong>Key ID:</strong> <CopyableCode text={key_id} />
          </p>

          <div className="flex flex-col items-center gap-1 text-gray-500 dark:text-gray-400">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
              <Fingerprint className="w-4 h-4" />
              <CopyableCode text={fingerprint.replace(/\s+/g, "")} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ServiceAreaAndBooking() {
  return (
    <section className="mt-12 text-center space-y-4">
      <h2 className="text-3xl font-semibold">Our Service Area</h2>
      <p className="text-md text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
        We support Ocala, Belleview, The Villages, and surrounding Central
        Florida communities with on-site and remote IT services.
      </p>
      <BookOnline />
    </section>
  );
}

/* ------- page ------- */

export default function ContactPage() {
  const [showPGP, setShowPGP] = useState(false);

  // BreadcrumbList JSON-LD
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: "https://www.wedefendit.com/contact",
      },
    ],
  };

  // Auto-open PGP when ?secure=1 or #pgp is present
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
        title="Contact Defend I.T. Solutions | Ocala & The Villages Cybersecurity"
        description="Reach out to Defend I.T. Solutions for trusted, local cybersecurity and IT support in Ocala, The Villages, and Central Florida. Secure communication options available."
        url="https://www.wedefendit.com/contact"
        image="https://www.wedefendit.com/og-image.png"
        keywords="Contact Defend I.T. Solutions, Ocala IT support, The Villages cybersecurity, secure communication, PGP email, local tech support"
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <PageContainer>
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-12 bg-gray-50/10 dark:bg-slate-950/20 z-0 shadow-md">
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
              <li className="text-gray-400 dark:text-gray-500 truncate">
                <span aria-current="page">Contact</span>
              </li>
            </ol>
          </nav>

          <HeadingSection />
          <ContactGrid />
          <PgpBlock showPGP={showPGP} setShowPGP={setShowPGP} />
          <ServiceAreaAndBooking />
        </div>
      </PageContainer>
    </>
  );
}
