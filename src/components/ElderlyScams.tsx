import React from "react";
import * as Icons from "lucide-react";
import { elderly } from "../../data/scams.json";

export const ElderlyScamsList: React.FC = () => {
  return (
    <section className="w-[95%] sm:w-[90%] mx-auto px-4 py-10 bg-gray-100/30 dark:bg-slate-800/50 rounded-md shadow-xl mt-6">
      <header className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
          Top Financial Scams Targeting Older Adults
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Learn about common scams targeting seniors and how to protect yourself
          or your loved ones.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3 ">
        {elderly.map(
          ({ icon: Icon, title, description, prevention }, index) => {
            const formattedName = Icon.split("-")
              .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
              .join("");
            const IconComponent =
              //eslint-disable-next-line
              (Icons as any)[formattedName] || Icons.AlertCircle;
            return (
              <article
                key={index}
                className="flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg dark:shadow-gray-900 transition p-6"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-red-100 dark:bg-red-900 shadow-md shadow-red-300 dark:shadow-red-700">
                    <IconComponent className="w-6 h-6 text-red-600 dark:text-red-400 " />
                  </div>
                  <h2 className="flex-grow text-lg sm:text-xl font-semibold text-gray-900 dark:text-white leading-tight">
                    {title}
                  </h2>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-6 flex-grow text-justify">
                  {description}
                </p>

                <div className="mb-6">
                  <h3 className="text-left text-gray-900 dark:text-white font-semibold mb-3">
                    Prevention
                  </h3>
                  <ul className="list-none text-gray-700 dark:text-gray-300 text-sm space-y-2">
                    {prevention.map((tip, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Icons.ShieldPlus
                          className="mt-[3px] flex-shrink-0 text-green-500 dark:text-emerald-600"
                          size={18}
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
    </section>
  );
};
