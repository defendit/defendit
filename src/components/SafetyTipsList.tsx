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
import data from "../../data/safety-tips.json";

const top5 = data.top5 || [];

interface SafetyTip {
  icon: string;
  title: string;
  description: string;
}
export const SafetyTipsList: React.FC = () => {
  return (
    <>
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-200">
          Ways to Stay Safe Online
        </h1>
        <p className="mt-3 text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          These best practices help protect your devices, identity, and personal
          data from cyber threats.
        </p>
      </header>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 ">
        {(top5 as SafetyTip[]).map(({ icon, title, description }, index) => {
          // eslint-disable-next-line
          const IconComponent = (Icons as any)[icon] || Icons.Shield;
          return (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md p-6"
            >
              <div className="flex items-center mb-4">
                <div className="bg-green-100 dark:bg-emerald-900 text-green-600 dark:text-emerald-300 p-3 rounded-full">
                  <IconComponent size={24} />
                </div>
                <h2 className="ml-4 text-lg font-semibold text-slate-800 dark:text-slate-100">
                  {title}
                </h2>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-sm text-left">
                {description}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};
