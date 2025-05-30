import Head from "next/head";
import { useRouter } from "next/router";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { PageContainer } from "@/components";
import { contact } from "../../../data/company-info.json";

export default function ThankYouPage() {
  const [secondsLeft, setSecondsLeft] = useState(15);
  const router = useRouter();

  useEffect(() => {
    if (secondsLeft <= 0) {
      router.push("/");
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [secondsLeft, router]);

  return (
    <>
      <Head>
        <title>Thank You | Appointment Confirmed | Defend I.T. Solutions</title>
        <meta
          name="description"
          content="Your appointment with Defend I.T. Solutions has been confirmed. We look forward to assisting you with secure, in-person tech support."
        />
        <meta
          property="og:title"
          content="Appointment Confirmed | Defend I.T. Solutions"
        />
        <meta
          property="og:description"
          content="Thanks for booking with Defend I.T. Solutions. We'll be in touch soon!"
        />
        <meta
          property="og:url"
          content="https://www.wedefendit.com/thank-you"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://www.wedefendit.com/og-image.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Appointment Confirmed | Defend I.T. Solutions"
        />
        <meta
          name="twitter:description"
          content="Your appointment is set. We appreciate your trust in our local tech support services."
        />
        <meta
          name="twitter:image"
          content="https://www.wedefendit.com/og-image.png"
        />

        <link rel="canonical" href="https://www.wedefendit.com/thank-you" />
        <meta
          name="keywords"
          content="Thank You, Appointment Confirmed, Defend I.T. Solutions, Tech Support, The Villages, Ocala, Cybersecurity, Local IT Services"
        />
      </Head>
      <PageContainer>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center space-y-10">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Thank You for Booking!
          </h1>

          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Your appointment has been successfully scheduled. We appreciate your
            trust in our services and look forward to assisting you.
          </p>

          <div className="space-y-2">
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              If you have any questions or need to reschedule, please call us
              at:
            </p>
            <a
              href={`tel:+${contact.phone.replace(/[^0-9]/g, "")}`}
              className="text-base sm:text-lg text-blue-600 dark:text-sky-400 hover:underline break-words"
            >
              {contact.phone}
            </a>
          </div>

          <div className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Redirecting you to the homepage in{" "}
            <span
              className="inline-block text-xl font-semibold text-gray-900 dark:text-white min-w-[2ch] text-center"
              aria-live="polite"
            >
              {secondsLeft}
            </span>{" "}
            seconds...
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            If you are not redirected automatically,&nbsp;
            <button
              onClick={() => router.push("/")}
              className="text-blue-600 dark:text-sky-400 hover:underline"
            >
              click here
            </button>
            .
          </p>
        </div>
      </PageContainer>
    </>
  );
}
