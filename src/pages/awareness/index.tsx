import { ElderlyScamsList, PageContainer } from "@/components";
import Link from "next/link";

export default function AwarenessPage() {
  return (
    <PageContainer>
      <div className="w-full mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
            Cybersecurity Awareness
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Protecting what you’ve worked hard for, through education,
            prevention, and personal support. This page is especially designed
            for retirees and seniors looking to stay safe online.
          </p>
        </header>

        {/* Section: Latest Threats */}
        <section className="space-y-4 text-center">
          <ElderlyScamsList />
        </section>

        {/* Section: Practical Tips */}
        {/* <section className="space-y-4 text-center mt-32">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
            Simple Steps for Staying Safe Online
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Learn how to create strong passwords, spot suspicious links, and
            keep your devices updated.
          </p>
          <Link
            href="#"
            className="inline-block text-blue-600 dark:text-sky-400 hover:underline text-sm"
          >
            Read Our Safety Guide
          </Link>
        </section> */}

        {/* Section: Resource Download */}
        {/* <section className="space-y-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
            Free Download: “10 Ways to Stay Safe Online”
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Download and share this easy-to-read safety checklist with friends
            and family.
          </p>
          <a
            href="/downloads/safety-checklist.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 rounded bg-blue-600 dark:bg-sky-500 text-white font-medium shadow hover:bg-blue-700 dark:hover:bg-sky-600 transition"
          >
            Download PDF
          </a>
        </section> */}

        {/* Section: Upcoming Events */}
        {/* <section className="space-y-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
            Upcoming Awareness Events
          </h2>
          <p className="text-base text-gray-600 dark:text-gray-400">
            We host free community talks, webinars, and one-on-one support
            sessions.
          </p>
          <Link
            href="/book"
            className="inline-block text-blue-600 dark:text-sky-400 hover:underline text-sm"
          >
            View Event Schedule or Book a Spot
          </Link>
        </section> */}

        {/* Section: Contact CTA */}
        <section className="space-y-4 text-center border-t border-gray-300 dark:border-gray-700 pt-10">
          <p className="text-md text-gray-600 dark:text-gray-400">
            Have questions or want to arrange a free* training session for your
            retirement community?
          </p>
          <Link
            href="/contact"
            className="inline-block px-4 py-2 rounded bg-blue-600 dark:bg-sky-500 text-white font-medium shadow hover:bg-blue-700 dark:hover:bg-sky-600 transition"
          >
            Contact Us
          </Link>
        </section>

        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            *Free training sessions are available for retirement communities and
            senior centers for groups of 25 or more. Individual consultations
            may incur a fee.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
