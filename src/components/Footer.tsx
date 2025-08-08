import React from "react";
import Link from "next/link";
import companyInfo from "../../data/company-info.json";

const { copy, contact } = companyInfo;

export const Footer: React.FC = () => {
  return (
    <footer className="p-4 mt-12 text-gray-500 dark:text-gray-400 text-xs md:text-sm shrink-0 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-1 text-center">
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          {contact.phone && (
            <a href={`tel:${contact.phone}`} className="hover:underline">
              {contact.phone.replace("+1", "")}
            </a>
          )}
          {contact.email && (
            <>
              <span className="hidden sm:inline">•</span>
              <a href={`mailto:${contact.email}`} className="hover:underline">
                {contact.email}
              </a>
            </>
          )}
          {contact.address && (
            <>
              <span className="hidden sm:inline">•</span>
              <span>
                {`${contact.address.street}, ${contact.address.city}, ${contact.address.state} ${contact.address.zip}`}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-2 text-gray-400 dark:text-gray-500">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>

        <div className="mt-2 space-y-1 text-gray-400 dark:text-gray-500">
          {copy.map((line, i) => (
            <p key={i} className="text-[0.7rem] ">
              {line}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
};
