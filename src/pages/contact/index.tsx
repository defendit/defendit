import Head from "next/head";
import { BookOnline, PageContainer } from "@/components";
import companyInfo from "../../../data/company-info.json";
import { Mail, Phone, ShieldCheck, MapPin, Fingerprint } from "lucide-react";

const { contact, name } = companyInfo;
const { phone, email, address, gpg } = contact;
const { street, city, state, zip } = address;
const { fingerprint, key_id, key_url, secure_email } = gpg;

export default function ContactPage() {
  return (
    <>
      <Head>
        <title>
          Contact Defend I.T. Solutions | Ocala & The Villages Cybersecurity
        </title>
        <meta
          name="description"
          content="Reach out to Defend I.T. Solutions for trusted, local cybersecurity and IT support in Ocala, The Villages, and Central Florida. Secure communication options available."
        />
        <meta property="og:title" content="Contact Defend I.T. Solutions" />
        <meta
          property="og:description"
          content="Get in touch with Defend I.T. for private, on-site cybersecurity support in Ocala and The Villages."
        />
        <meta property="og:url" content="https://www.wedefendit.com/contact" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.wedefendit.com/og-image.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Defend I.T. Solutions" />
        <meta
          name="twitter:description"
          content="Local cybersecurity and tech support in Ocala and The Villages, FL."
        />
        <meta
          name="twitter:image"
          content="https://www.wedefendit.com/og-image.png"
        />

        <link rel="canonical" href="https://www.wedefendit.com/contact" />
        <meta
          name="keywords"
          content="Contact Defend I.T. Solutions, Ocala IT support, The Villages cybersecurity, secure communication, PGP email, local tech support"
        />
      </Head>
      <PageContainer>
        <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
          <header className="text-center space-y-2 -mt-10">
            <h1 className="text-4xl sm:text-5xl font-bold">Contact Us</h1>
            <p className="text-md text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              {name} is a service-based business offering on-site and remote
              support. We do not maintain a public storefront. Reach out
              securely below.
            </p>
          </header>

          <section className="w-full space-y-10 sm:space-y-12">
            {/* Phone */}
            <div className="text-center space-y-2">
              <div className="flex flex-col items-center gap-1">
                <Phone className="w-5 h-5 text-blue-500 dark:text-sky-400" />
                <span className="text-xl font-medium text-gray-900 dark:text-white">
                  Call or Text
                </span>
              </div>
              <a
                id="phone"
                href={`tel:${phone}`}
                className="text-blue-600 dark:text-sky-400 hover:underline text-lg"
              >
                {phone}
              </a>
            </div>

            {/* Email */}
            <div className="text-center space-y-2">
              <div className="flex flex-col items-center gap-1">
                <Mail className="w-5 h-5 text-blue-500 dark:text-sky-400" />
                <span className="text-xl font-medium text-gray-900 dark:text-white">
                  Standard Email
                </span>
              </div>
              <a
                href={`mailto:${email}`}
                className="text-blue-600 dark:text-sky-400 hover:underline text-sm"
              >
                {email}
              </a>
            </div>

            <hr className="border-t border-gray-300 dark:border-gray-600 w-3/4 mx-auto" />

            {/* PGP */}
            <div className="text-center space-y-4">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-5 h-5 text-blue-500 dark:text-sky-400" />
                <span className="text-xl font-medium text-gray-900 dark:text-white">
                  Encrypted Communication (PGP)
                </span>
              </div>

              <p className="text-md text-gray-600 dark:text-gray-400">
                For sensitive inquiries, you may email us securely.
              </p>

              <a
                href={`mailto:${secure_email}`}
                className="text-blue-600 dark:text-sky-400 hover:underline "
              >
                {secure_email}
              </a>

              <p>
                <a
                  href={key_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="inline-block px-3 py-1 rounded bg-blue-600 dark:bg-sky-500 text-white font-medium mt-4 shadow hover:bg-blue-700 dark:hover:bg-sky-600 transition"
                >
                  Download Public PGP Key
                </a>
              </p>

              <p className="text-base">
                <strong>Key ID:</strong>{" "}
                <code className="select-all text-gray-600 dark:text-gray-400">
                  {key_id}
                </code>
              </p>

              <div className="flex flex-col items-center gap-1 text-base text-gray-500 dark:text-gray-400">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 wrap-normal">
                  <Fingerprint className="w-4 h-4" />
                  <code className="break-all">{fingerprint}</code>
                </div>
                <div className="text-sm mt-2 text-gray-500 dark:text-gray-400 break-words">
                  Full Fingerprint:
                  <br />
                  <code className="break-all select-all">
                    {fingerprint.replace(/\s+/g, "")}
                  </code>
                </div>
              </div>
            </div>

            <hr className="border-t border-gray-300 dark:border-gray-600 w-3/4 mx-auto" />

            {/* Address */}
            <div className="text-center space-y-2">
              <div className="flex flex-col items-center gap-1">
                <MapPin className="w-5 h-5 text-blue-500 dark:text-sky-400" />
                <span className="text-xl font-medium text-gray-900 dark:text-white">
                  Mailing Address
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                This is a mailing address only. We operate on-site or remotely.
              </p>
              <p className="text-base mt-1 select-all leading-tight">
                <strong>{name}</strong>
                <br />
                {street}
                <br />
                {city}, {state} {zip}
              </p>
            </div>
          </section>

          <section className="mt-12 text-center">
            <h2 className="text-4xl font-semibold mb-2">Our Service Area</h2>
            <p className="text-md text-gray-600 dark:text-gray-400 mb-4">
              We provide on-site and remote support across Ocala, Belleview, The
              Villages, and surrounding Central Florida communities.
            </p>

            <BookOnline />
          </section>
        </div>
      </PageContainer>
    </>
  );
}
