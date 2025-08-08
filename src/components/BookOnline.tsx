import { Phone, Mail } from "lucide-react";
import { contact, services_cta } from "../../data/company-info.json";
import TrustStrip from "./TrustStrip";

export function BookOnline() {
  const tel = `+${contact.phone.replace(/[^0-9]/g, "")}`;
  const displayPhone = contact.phone.replace("+1", "");

  return (
    <section
      id="schedule-service"
      className="max-w-xl mx-auto my-12 px-4 text-left sm:text-center text-sm text-gray-700 dark:text-gray-300"
    >
      <div className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-slate-900/40 p-5 sm:p-6 shadow-sm">
        <header>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Need to schedule service?
          </h2>
          <TrustStrip />
        </header>

        <p className="mt-3">
          Book by phone, email, or use Calendly to pick a time.
        </p>

        <ul role="list" className="mt-4 space-y-2">
          <li className="flex items-center gap-2">
            <Phone
              className="w-4 h-4 text-blue-600 dark:text-sky-400"
              aria-hidden="true"
            />
            <a
              href={`tel:${tel}`}
              className="text-blue-600 dark:text-sky-400 hover:underline break-words"
              aria-label={`Call ${displayPhone}`}
            >
              {displayPhone}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Mail
              className="w-4 h-4 text-blue-600 dark:text-sky-400"
              aria-hidden="true"
            />
            <a
              href={`mailto:${contact.service_email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-sky-400 hover:underline break-words"
              aria-label={`Email ${contact.service_email}`}
            >
              {contact.service_email}
            </a>
          </li>
        </ul>

        <details className="group mt-3">
          <summary
            className="cursor-pointer text-blue-600 dark:text-sky-400 hover:underline list-none select-none"
            aria-controls="calendly-panel"
          >
            Book online with Calendly
          </summary>

          <div
            id="calendly-panel"
            className="mt-3 border-t border-gray-200 dark:border-gray-700 pt-3 space-y-3"
          >
            <p className="text-gray-600 dark:text-gray-400">
              You will be redirected to Calendly to choose a time. By
              continuing, you agree to Calendly&apos;s terms and privacy policy.
            </p>

            <a
              href={services_cta.booking_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full sm:w-auto text-center px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium transition dark:bg-sky-500 dark:hover:bg-sky-600"
            >
              Continue to Booking
            </a>
          </div>
        </details>
      </div>
    </section>
  );
}
