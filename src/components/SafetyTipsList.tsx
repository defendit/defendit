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
import data from "../../data/safety-tips.json";
import { Card } from "./Card";

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
        <h2 className="text-h2 tracking-h2 font-semibold text-ink">
          Start With Four Basic Habits
        </h2>
        <p className="mx-auto mt-3 max-w-readable text-lead text-ink-muted">
          These simple steps reduce the risk of common account, payment, and
          identity scams.
        </p>
      </header>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2">
        {(top5 as SafetyTip[]).map(({ icon, title, description }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const IconComponent = (Icons as any)[icon] || Icons.Shield;
          return (
            <Card key={title} wash className="relative overflow-hidden p-6">
              <div className="flex flex-col items-center mb-4">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-success/40 bg-success/10">
                  <IconComponent className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-lg font-semibold text-ink text-center">
                  {title}
                </h3>
              </div>
              <p className="text-ink-muted text-sm text-center leading-relaxed">
                {description}
              </p>
            </Card>
          );
        })}
      </div>
    </>
  );
};
