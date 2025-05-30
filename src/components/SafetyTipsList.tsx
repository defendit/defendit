import React from "react";
import * as Icons from "lucide-react";
import { top5 } from "../../data/safety-tips.json";

interface SafetyTip {
  icon: string;
  title: string;
  description: string;
}

export const SafetyTipsList: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto py-12 px-6 sm:px-10">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-slate-800 dark:text-slate-100">
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
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-md p-6 hover:shadow-xl transition"
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
    </section>
  );
};
