/*
Copyright © 2026 Defend I.T. Solutions LLC. All Rights Reserved.

This software and its source code are the proprietary property of
Defend I.T. Solutions LLC and are protected by United States and
international copyright laws. Unauthorized reproduction, distribution,
modification, display, or use of this software, in whole or in part, without the
prior written permission of Defend I.T. Solutions LLC, is strictly prohibited.

This software is provided for use only by authorized employees, contractors, or
licensees of Defend I.T. Solutions LLC and may not be disclosed to any third
party without express written consent.
*/

import { Card } from "./Card";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = Readonly<{
  items: FaqItem[];
  heading?: string;
  id?: string;
}>;

export function FaqSection({
  items,
  heading = "Frequently Asked Questions",
  id = "faq",
}: FaqSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="pt-6 sm:pt-8 border-t border-hairline" aria-labelledby={id}>
      <h2 id={id} className="text-h2 tracking-h2 font-semibold text-ink mb-4">
        {heading}
      </h2>
      <div className="mt-4 space-y-3">
        {items.map(({ question, answer }) => (
          <Card
            as="details"
            wash
            key={question}
            className="group relative overflow-hidden p-4"
          >
            <summary className="cursor-pointer font-medium flex items-center justify-between text-ink">
              <span className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 flex-shrink-0 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.25}
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {question}
              </span>
              <svg
                className="w-5 h-5 text-ink-dim transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.25}
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </summary>
            <p className="mt-3 pl-8 text-sm leading-relaxed text-ink-muted">
              {answer}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default FaqSection;
