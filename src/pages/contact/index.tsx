import { BookOnline, PageContainer } from "@/components";
import companyInfo from "../../../data/company-info.json";
import { Mail, Phone, ShieldCheck, MapPin, Fingerprint } from "lucide-react";

const { contact, name } = companyInfo;
const { phone, email, address, gpg } = contact;
const { street, city, state, zip } = address;
const { fingerprint, key_id, key_url, secure_email } = gpg;

export default function ContactPage() {
  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-10">
        <header className="text-center space-y-2 -mt-10">
          <h1 className="text-4xl sm:text-5xl font-bold">Contact Us</h1>
          <p className="text-md text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            {name} is a service-based business offering on-site and remote
            support. We do not maintain a public storefront. Reach out securely
            below.
          </p>
        </header>

        <section className="mt-12 text-center">
          <h2 className="text-4xl font-semibold mb-2">Our Service Area</h2>
          <p className="text-md text-gray-600 dark:text-gray-400 mb-4">
            We provide on-site and remote support across Ocala, Belleview, The
            Villages, and surrounding Central Florida communities.
          </p>
        </section>

        <section className="flex flex-col items-center w-full space-y-10">
          {/* Phone */}
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-base font-medium text-gray-900 dark:text-white">
              <Phone className="w-5 h-5 text-blue-500 dark:text-sky-400" />
              Call or Text
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
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-base font-medium text-gray-900 dark:text-white">
              <Mail className="w-5 h-5 text-blue-500 dark:text-sky-400" />
              Standard Email
            </div>
            <a
              href={`mailto:${email}`}
              className="text-blue-600 dark:text-sky-400 hover:underline text-sm"
            >
              {email}
            </a>
          </div>

          <hr className="border-t border-gray-300 dark:border-gray-600 w-2/3" />

          {/* PGP */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-base font-medium text-gray-900 dark:text-white">
              <ShieldCheck className="w-5 h-5 text-blue-500 dark:text-sky-400" />
              Encrypted Communication (PGP)
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              For sensitive inquiries, you may email us securely.
            </p>
            <a
              href={`mailto:${secure_email}`}
              className="text-blue-600 dark:text-sky-400 hover:underline text-sm"
            >
              {secure_email}
            </a>
            <p>
              <a
                href={key_url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="inline-block px-3 py-1 rounded bg-blue-600 dark:bg-sky-500 text-white font-medium text-xs shadow hover:bg-blue-700 dark:hover:bg-sky-600 transition"
              >
                Download Public PGP Key
              </a>
            </p>
            <p className="text-xs">
              <strong>Key ID:</strong>{" "}
              <code className="select-all text-gray-600 dark:text-gray-400">
                {key_id}
              </code>
            </p>
            <div className="flex justify-center items-center gap-2 text-xs">
              <Fingerprint className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <code className="break-all">{fingerprint}</code>
            </div>
            <div className="text-xs mt-2 text-gray-500 dark:text-gray-400">
              Full Fingerprint:
              <br />
              <code className="break-all select-all">
                {fingerprint.replace(/\s+/g, "")}
              </code>
            </div>
          </div>

          <hr className="border-t border-gray-300 dark:border-gray-600 w-2/3" />

          {/* Address */}
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-2 text-base font-medium text-gray-900 dark:text-white">
              <MapPin className="w-5 h-5 text-blue-500 dark:text-sky-400" />
              Mailing Address
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              This is a mailing address only. We operate on-site or remotely.
            </p>
            <p className="text-sm mt-1 select-all">
              <strong>{name}</strong>
              <br />
              {street}
              <br />
              {city}, {state} {zip}
            </p>
          </div>
        </section>

        <BookOnline />
      </div>
    </PageContainer>
  );
}
