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

// Shared "How It Works" block for service detail pages. Pairs the how-it-works
// illustration with the three-step model (reach out, an on-site visit (remote
// follow-ups are only for clients already enrolled through an on-site visit),
// then the next step booked). Single source of truth, rendered by ServiceSlug.

import { ThemedImage } from "@/components/ThemedImage";

type Step = Readonly<{ title: string; body: string }>;

const STEPS: ReadonlyArray<Step> = [
  {
    title: "Tell us what is happening",
    body: "Call, text, or send a message with a brief description of the problem.",
  },
  {
    title: "Confirm the service",
    body: "We confirm whether you need an on-site visit, arranged pickup and drop-off, or remote support for an enrolled client.",
  },
  {
    title: "Schedule the work",
    body: "We explain the expected work and cost, then schedule the service that fits your situation.",
  },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-it-works" className="py-4">
      <div className="max-w-[42rem]">
        <h2
          id="how-it-works"
          className="text-h2 tracking-h2 font-semibold text-ink"
        >
          How It Works
        </h2>
        <p className="mt-4 text-ink-muted leading-relaxed">
          Tell us what is happening. We will help identify the right service and
          explain what comes next.
        </p>
      </div>

      <div className="mt-8 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <figure className="fade-image relative aspect-[16/9] w-full overflow-hidden">
          <ThemedImage
            dark="/img/services/how-it-works-dark.jpg"
            alt="Three steps: describe the problem, confirm the service, and schedule the work"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </figure>

        <ol className="space-y-6">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-border-accent text-sm font-semibold text-accent">
                {index + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
