/*
Copyright © 2025 Defend I.T. Solutions LLC. All Rights Reserved.

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

const elderly = data.elderly || [];

type ElderlyScamsListProps = {
  /** Show the internal header; set false if the page already has a section heading */
  showHeader?: boolean;
  /** Header text (used when showHeader is true) */
  title?: string;
  /** Optional extra classes for the outer section wrapper */
  className?: string;
};

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
            className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-200 leading-tight"
          >
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Learn about common scams targeting seniors and how to protect
            yourself or your loved ones.
          </p>
        </header>
      )}

      <div className={`grid grid-cols-1 gap-8 lg:grid-cols-2 `}>
        {elderly.map(
          ({ icon: iconName, title, description, prevention }, i) => {
            const Icon = getLucideIcon(iconName);
            return (
              <article
                key={`${iconName}-${i}`}
                className="flex flex-col bg-gray-100/20 dark:bg-slate-800/30 border border-gray-200 dark:border-gray-900 rounded-md shadow-lg dark:shadow-gray-900 transition p-6"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900 shadow-md shadow-red-300 dark:shadow-red-700">
                    <Icon
                      className="w-6 h-6 text-red-600 dark:text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="flex-grow text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-200 leading-tight m-auto">
                    {title}
                  </h3>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-6 flex-grow">
                  {description}
                </p>

                <div className="mb-2">
                  <h4 className="text-left text-gray-900 dark:text-gray-200 font-semibold mb-3">
                    Prevention
                  </h4>
                  <ul
                    role="list"
                    className="text-gray-700 dark:text-gray-300 text-sm space-y-2"
                  >
                    {prevention.map((tip: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icons.ShieldPlus
                          className="mt-[3px] flex-shrink-0 text-green-600 dark:text-emerald-500"
                          size={18}
                          aria-hidden="true"
                        />
                        <span className="text-left">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          }
        )}
      </div>
    </>
  );
};
