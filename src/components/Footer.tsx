import React from "react";
import Link from "next/link";
import companyInfo from "../../data/company-info.json";

const { copy } = companyInfo;
const Footer: React.FC = () => {
  return (
    <footer className="p-4 mt-24 text-gray-400 dark:text-gray-500 text-xs md:text-sm shrink-0">
      <div className="max-w-7xl mx-auto text-center">
        {copy.map((item, index) => (
          <p key={index}>{item}</p>
        ))}

        <nav className="flex gap-4 justify-center mt-2" aria-label="Legal">
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
