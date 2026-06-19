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

import { useRouter } from "next/router";
import { Navbar } from "./Nav";
import { Footer } from "./Footer";
import React, { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggler";

type LayoutProps = Readonly<{
  children?: ReactNode;
}>;

/**
 * Routes that render as full-viewport games. On these pages the floating
 * ThemeToggle and footer are skipped so the game owns the full viewport below
 * the sticky nav. The circuit background stays visible.
 */
const GAME_ROUTES: ReadonlySet<string> = new Set([
  "/awareness/digital-house",
  "/awareness/gridrunner",
]);

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const isGameRoute = GAME_ROUTES.has(router.pathname);

  return (
    <div
      id="main-scroll-container"
      className={
        isGameRoute
          ? "relative z-10 flex h-dvh w-full flex-col overflow-clip"
          : "relative w-full min-h-screen flex flex-col z-10 justify-between items-center"
      }
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent-fill focus:px-4 focus:py-2 focus:font-semibold focus:text-accent-contrast focus:shadow-lg"
      >
        Skip to main content
      </a>
      <header className="w-full sticky top-0 backdrop-blur-md bg-ground/40 z-50">
        <Navbar />
      </header>
      {/* ThemeToggle applies the `dark` class to <html>. Digital House mounts
          an inline toggle in its own header so the fixed control does not sit
          over the mobile device tray. */}
      {!isGameRoute && <ThemeToggle />}

      <div
        className="absolute inset-0 h-full w-full bg-[url('/img/circuit.png')] bg-center bg-repeat bg-scroll opacity-3.25 pointer-events-none z-0 md:bg-fixed"
        aria-hidden="true"
      />

      {children}
      {!isGameRoute && <Footer />}
    </div>
  );
};
