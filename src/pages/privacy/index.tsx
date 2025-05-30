import Head from "next/head";
import { LegalPage } from "@/components";
import { contact } from "../../../data/company-info.json";

const { email, privacy_email, address } = contact;
const { street, city, state, zip } = address || {};

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Defend I.T. Solutions</title>
        <meta
          name="description"
          content="Learn how Defend I.T. Solutions protects your privacy. We do not collect, track, or sell your personal data — ever."
        />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="Privacy Policy | Defend I.T." />
        <meta
          property="og:description"
          content="We believe in education without intrusion. View our full privacy policy."
        />
        <meta property="og:url" content="https://www.wedefendit.com/privacy" />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content="https://www.wedefendit.com/og-image.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Privacy Policy | Defend I.T." />
        <meta
          name="twitter:description"
          content="Defend I.T. does not track or sell your data. See how we protect your privacy."
        />
        <meta
          name="twitter:image"
          content="https://www.wedefendit.com/og-image.png"
        />

        <link rel="canonical" href="https://www.wedefendit.com/privacy" />
        <meta
          name="keywords"
          content="Defend I.T. Solutions, privacy policy, data protection, cybersecurity, Ocala IT support, The Villages cybersecurity"
        />
      </Head>

      <LegalPage>
        <h1 className="text-xl sm:text-3xl font-bold text-center border-b pb-4 mb-6 uppercase tracking-wider">
          www.wedefendit.com Privacy Policy
        </h1>

        <p className="text-center mb-4">
          <strong>Type of website:</strong> Service-based business website
          offering IT support, cybersecurity services, and a security appliance
          for residential and small business clients.
          <br />
          <br />
          <strong>Effective date:</strong> 13th day of May, 2025
        </p>

        <p className="mb-6">
          www.wedefendit.com (the &quot;Site&quot;) is owned and operated by
          Defend I.T. Solutions&trade; LLC.
          <br />
          <br />
          Contact:{" "}
          <a href={`mailto:${email}`} className="text-blue-600 underline">
            {email}
          </a>
          <br />
          {street}, {city}, {state} {zip}
        </p>

        <h2 className="text-xl font-bold uppercase border-b my-4">Purpose</h2>
        <p>
          The purpose of this privacy policy (&quot;Privacy Policy&quot;) is to
          inform users of our Site of the following:
        </p>
        <ol className="list-decimal ml-6 my-2">
          <li>The personal data we will collect</li>
          <li>Use of collected data</li>
          <li>Who has access to the data collected</li>
          <li>The rights of Site users</li>
          <li>The Site&apos;s cookie policy</li>
        </ol>
        <p>
          This Privacy Policy applies in addition to the terms and conditions of
          our Site.
        </p>

        <h2 className="text-xl font-bold uppercase border-b my-4">Consent</h2>
        <p>By using our Site users agree that they consent to:</p>
        <ol className="list-decimal ml-6 my-2">
          <li>The conditions set out in this Privacy Policy</li>
          <li>
            The collection, use, and retention of the data listed in this
            Privacy Policy
          </li>
        </ol>

        <h2 className="text-xl font-bold uppercase border-b my-4">
          Personal Data We Collect
        </h2>
        <p>
          We only collect data that helps us achieve the purpose set out in this
          Privacy Policy.
        </p>

        <h3 className="font-semibold mt-4 mb-1 underline">
          Data Collected in a Non-Automatic Way
        </h3>
        <p>We may collect the following data:</p>
        <ul className="list-disc ml-6 my-2">
          <li>First and last name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Address</li>
          <li>Payment information</li>
          <li>Auto fill data</li>
        </ul>
        <p>This data may be collected using the following methods:</p>
        <ul className="list-disc ml-6 my-2">
          <li>Contact form submissions</li>
          <li>Service request forms</li>
          <li>Phone/email communications</li>
          <li>Invoicing and payment processing</li>
        </ul>

        <h2 className="text-xl font-bold uppercase border-b my-4">
          How We Use Personal Data
        </h2>
        <p>
          Data collected on our Site will only be used for the purposes
          specified in this Privacy Policy.
        </p>
        <ul className="list-disc ml-6 my-2">
          <li>To communicate with clients</li>
          <li>To schedule and deliver services</li>
          <li>To send invoices and process payments</li>
          <li>To maintain client service history</li>
          <li>
            To improve service offerings based on feedback or support trends
          </li>
        </ul>

        <h2 className="text-xl font-bold uppercase border-b my-4">
          Who We Share Personal Data With
        </h2>
        <h3 className="font-semibold mt-4 mb-1 underline">Employees</h3>
        <p>
          Data may be disclosed to staff who need access to fulfill services.
        </p>

        <h3 className="font-semibold mt-4 mb-1 underline">Other Disclosures</h3>
        <p>We may disclose data:</p>
        <ul className="list-disc ml-6 my-2">
          <li>If required by law</li>
          <li>For legal proceedings</li>
          <li>To protect legal rights</li>
          <li>To potential buyers in the event of a sale</li>
        </ul>

        <h2 className="text-xl font-bold uppercase border-b my-4">
          Data Storage Duration
        </h2>
        <p>
          Customer data is stored for seven years. You will be notified if
          stored longer.
        </p>

        <h2 className="text-xl font-bold uppercase border-b my-4">
          Data Protection
        </h2>
        <p>
          Data is encrypted at rest (AES-256) and in transit (HTTPS, SSH, etc.).
          <br />
          Optional PGP email is offered. Access is controlled via strong
          authentication.
        </p>
        <p>
          We cannot guarantee absolute security due to the inherent nature of
          the internet.
        </p>

        <h2 className="text-xl font-bold uppercase border-b my-4">Children</h2>
        <p>
          Minimum age: 18. We do not knowingly collect data from children under
          13. If discovered, it will be deleted.
        </p>

        <h2 className="text-xl font-bold uppercase border-b my-4">
          Your Rights
        </h2>
        <p>If you wish to view, modify, or delete your data, contact:</p>
        <p>
          Anthony Tropeano
          <br />
          <a
            href={`mailto:${privacy_email}`}
            className="text-blue-600 underline"
          >
            {privacy_email}
          </a>
          <br />
          {street}, {city}, {state} {zip}
        </p>

        <h2 className="text-xl font-bold uppercase border-b my-4">
          Cookie Policy
        </h2>
        <p>We do not use cookies. You may disable them in your browser.</p>

        <h2 className="text-xl font-bold uppercase border-b my-4">
          Additional Clauses
        </h2>

        <p>
          <strong>Service Scope:</strong> IT support, consulting, installation
          only as per agreement.
        </p>
        <p>
          <strong>Client Data:</strong> Stored securely, not shared or sold.
          Retained 7 years.
        </p>
        <p>
          <strong>Secure Communication:</strong> PGP or HTTPS-based as needed.
        </p>
        <p>
          <strong>Limitation of Liability:</strong> No responsibility for
          indirect damages.Liability limited to previous 30 days of service
          cost.
        </p>

        <h2 className="text-xl font-bold uppercase border-b my-4">
          Modifications
        </h2>
        <p>
          This Privacy Policy may change. Updates will be noted by updating the
          &quot;Effective Date.&quot; Users should review it periodically.
        </p>

        <h2 className="text-xl font-bold uppercase border-b my-4">Contact</h2>
        <p>For questions or concerns, contact:</p>
        <p>
          Anthony Tropeano
          <br />
          <a
            href={`mailto:${privacy_email}`}
            className="text-blue-600 underline"
          >
            {privacy_email}
          </a>
          <br />
          {street}, {city}, {state} {zip}
        </p>
      </LegalPage>
    </>
  );
}
