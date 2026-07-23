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

import React from "react";
import * as Icons from "lucide-react";
import data from "../../data/scams.json";
import { Card } from "./Card";

const elderly = data.elderly || [];

type ElderlyScamsListProps = Readonly<{
  /** Show the internal header; set false if the page already has a section heading */
  showHeader?: boolean;
  /** Header text (used when showHeader is true) */
  title?: string;
  /** Optional extra classes for the outer section wrapper */
  className?: string;
}>;

function toPascalCase(icon: string) {
  return icon
    .split("-")
    .map((p) => (p ? p[0].toUpperCase() + p.slice(1) : p))
    .join("");
}

function getLucideIcon(name: string) {
  const key = toPascalCase(name) as keyof typeof Icons;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (Icons[key] as React.ComponentType<any>) || Icons.AlertCircle;
}

export const ElderlyScamsList: React.FC<ElderlyScamsListProps> = ({
  showHeader = true,
  title = "Top Financial Scams Targeting Older Adults",
}) => {
  return (
    <>
      {showHeader && (
        <header className="text-center mb-10">
          <h2
            id="elderly-scams-heading"
            className="text-h2 tracking-h2 font-semibold text-ink"
          >
            {title}
          </h2>
          <p className="mt-2 text-base text-ink-muted max-w-readable mx-auto">
            Learn how common scams work, which warning signs to watch for, and
            what to do before sending money or sharing information.
          </p>
        </header>
      )}

      <div className={`grid grid-cols-1 gap-8 lg:grid-cols-2`}>
        {elderly.map(
          ({ icon: iconName, title, description, prevention }, i) => {
            const Icon = getLucideIcon(iconName);
            return (
              <Card
                as="article"
                key={`${iconName}-${i}`}
                wash
                className="relative flex flex-col overflow-hidden p-6"
              >
                <div className="mb-4 grid grid-cols-[4rem_minmax(0,1fr)_4rem] items-center gap-4">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border border-danger/40 bg-danger/10">
                    <Icon
                      className="w-8 h-8 text-danger"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-center text-lg sm:text-xl font-semibold text-ink leading-tight">
                    {title}
                  </h3>
                  <div aria-hidden="true" className="h-16 w-16" />
                </div>

                <p className="text-ink-muted text-sm sm:text-base mb-6 flex-grow leading-relaxed">
                  {description}
                </p>

                <div className="pt-4 border-t border-hairline">
                  <h4 className="text-left text-ink font-semibold mb-3 flex items-center gap-2">
                    <Icons.ShieldCheck className="w-5 h-5 text-success" />
                    How to Protect Yourself
                  </h4>
                  <ul
                    role="list"
                    className="text-ink-muted text-sm space-y-2"
                  >
                    {prevention.map((tip: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icons.ShieldPlus
                          className="mt-[3px] flex-shrink-0 text-success"
                          size={18}
                          aria-hidden="true"
                        />
                        <span className="text-left">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            );
          },
        )}
      </div>
    </>
  );
};
