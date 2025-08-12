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

export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <main
      className={`font-sans relative h-full w-full flex flex-col items-center justify-start -mt-10 `}
    >
      <div className="relative z-5 flex flex-col items-center justify-center gap-8 p-1 sm:p-0">
        {children}
      </div>
    </main>
  );
}
