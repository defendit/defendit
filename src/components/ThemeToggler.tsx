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

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const iconMap = {
  light: "🌞",
  dark: "🌘",
};

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");

  const applyTheme = (t: Theme) => {
    document.documentElement.classList.toggle("dark", t === "dark");
  };

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme;
    setTheme(stored === "light" || stored === "dark" ? stored : "dark");
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme, mounted]);

  if (!mounted) return null;

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const icon = iconMap[theme];
  const next = theme === "light" ? "dark" : "light";

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="fixed bottom-1 left-2 z-[150] md:z-15 md:top-18 lg:top-2 md:right-4 md:bottom-auto md:left-auto p-2 rounded-full text-xl bg-white dark:bg-gray-800 shadow-md transition-colors dark:text-white text-black hover:cursor-pointer hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.5)] dark:hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]"
    >
      {icon}
    </button>
  );
}
