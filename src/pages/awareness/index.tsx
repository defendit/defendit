import Link from "next/link";
import {
  ElderlyScamsList,
  PageContainer,
  SafetyTipsList,
  Meta,
} from "@/components";

export default function AwarenessPage() {
  return (
    <>
      <Meta
        title="Cybersecurity Awareness for Seniors | Defend I.T. Solutions"
        description="Free cybersecurity education and scam prevention tips for retirees and seniors in The Villages and Ocala, Florida."
        url="https://www.wedefendit.com/awareness"
        image="https://www.wedefendit.com/og-image.png"
        keywords="Cybersecurity, IT support, The Villages, Ocala, senior tech support, phishing scams, online safety for retirees, awareness training, cybersecurity education, elderly scams, tech help for seniors"
      />
      <PageContainer>
        <div className="w-full mx-auto px-4 sm:px-6">
          {/* Header */}
          <header className="text-center space-y-3 mt-12">
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              Cybersecurity Awareness
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 w-[90%] mx-auto px-8">
              Helping retirees and seniors stay safe online through clear,
              private, and practical education.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              No trackers. No data collection. Just helpful info.
            </p>
          </header>

          {/* Section: Latest Threats */}
          <section className="space-y-4 text-center mt-12">
            <SafetyTipsList />
            <ElderlyScamsList />
          </section>

          {/* Section: Contact CTA */}
          <section className="space-y-4 text-center border-t border-gray-300 dark:border-gray-700 pt-10 mt-16">
            <p className="text-md text-gray-600 dark:text-gray-400">
              Have questions or want to arrange a free* training session for
              your community?
            </p>
            <Link
              href="/contact"
              className="inline-block px-4 py-2 rounded bg-blue-600 dark:bg-sky-500 text-white font-medium shadow hover:bg-blue-700 dark:hover:bg-sky-600 transition mt-6"
            >
              Contact Us
            </Link>
          </section>

          <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              *Free training sessions are available for retirement communities
              and senior centers for groups of 25 or more. Individual
              consultations may incur a fee.
            </p>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
