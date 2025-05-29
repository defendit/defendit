import { Phone, Mail } from "lucide-react";
import { contact, services_cta } from "../../data/company-info.json";

export function BookOnline() {
  return (
    <section
      id="schedule-service"
      className="max-w-xl mx-auto my-12 px-4 space-y-6 text-sm text-gray-700 dark:text-gray-300"
    >
      <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-md border border-gray-200 dark:border-gray-700 space-y-3">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Need to schedule service?
        </h2>

        <p>You can book a service call by phone, email, or Calendly</p>

        <ul className="space-y-1">
          <li className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-500 dark:text-sky-400" />
            <a
              href={`tel:+${contact.phone.replace(/[^0-9]/g, "")}`}
              className="hover:underline text-blue-600 dark:text-sky-400"
            >
              {contact.phone.replace("+1", "")}
            </a>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-500 dark:text-sky-400" />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`mailto:${contact.service_email}`}
              className="hover:underline text-blue-600 dark:text-sky-400"
            >
              {contact.service_email}
            </a>
          </li>
        </ul>

        <details className="group -mt-2">
          <summary className="cursor-pointer text-blue-600 dark:text-sky-400 hover:underline text-left">
            Book online with Calendly
          </summary>
          <div className="mt-3 border-t border-gray-300 dark:border-gray-600 pt-3 space-y-3 text-sm">
            <p className="text-left">
              You&apos;ll be redirected to Calendly to pick a time that works
              for you. By continuing, you agree to Calendly&apos;s terms and
              privacy policy.
            </p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={services_cta.booking_link}
              className="inline-block px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 dark:bg-sky-500 dark:hover:bg-sky-600 transition font-medium"
            >
              Continue to Booking
            </a>
          </div>
        </details>
      </div>
    </section>
  );
}
