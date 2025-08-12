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

import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import companyInfo from "../../data/company-info.json";
import { supportedCities, useLocation } from "@/providers/location";

const { name } = companyInfo;

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Awareness", href: "/awareness" },
  { name: "Contact", href: "/contact" },
];

export function getNormalizedCityName(city: string | null): string | null {
  if (!city) return null;
  const lowerCity = city.toLowerCase();
  return Object.keys(supportedCities).find((c) => c === lowerCity) || null;
}
function RenderNavItems({
  navItems,
  pathname,
  location,
  isMobile = false,
}: Readonly<{
  navItems: { name: string; href: string }[];
  pathname: string;
  location: string | null;
  isMobile?: boolean;
}>) {
  // strip ?query, #hash, trailing slash; fallback to '/'
  const clean = (p: string) => {
    const noQ = p.split("#")[0].split("?")[0];
    const trimmed = noQ.replace(/\/+$/, "");
    return trimmed === "" ? "/" : trimmed;
  };

  const current = clean(pathname);

  return navItems.map(({ name, href }) => {
    // keep Services city-aware redirect
    if (name === "Services") {
      const city = getNormalizedCityName(location);
      href =
        city && supportedCities[city as keyof typeof supportedCities]
          ? supportedCities[city as keyof typeof supportedCities]
          : "/services";
    }

    const target = clean(href);
    const textColor = isMobile
      ? "text-gray-300"
      : "text-gray-800 dark:text-gray-200";
    // active if exact match, or if current is a child of target
    const isActive =
      target === "/"
        ? current === "/"
        : current === target || current.startsWith(`${target}/`);

    return (
      <li key={`${name}-${target}`}>
        <Link
          href={href}
          className={
            isActive
              ? "text-blue-500 dark:text-sky-400 font-semibold text-glow underline underline-offset-4"
              : `hover:text-blue-500 dark:hover:text-sky-400 ${textColor} hover:underline underline-offset-4 font-semibold`
          }
        >
          {name}
        </Link>
      </li>
    );
  });
}

function DesktopBar({
  pathname,
  location,
}: Readonly<{ pathname: string; location: string | null }>) {
  return (
    <ul
      id="desktop-bar"
      className="hidden md:flex space-x-24 text-lg w-auto m-0 lg:mr-16 md:mx-auto "
    >
      <RenderNavItems
        navItems={navItems}
        pathname={pathname}
        location={location}
        isMobile={false}
      />
    </ul>
  );
}

function MobileBar({
  pathname,
  location,
}: {
  pathname: string;
  location: string | null;
}) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close on route changes
  useEffect(() => {
    const handleRouteChange = () => setMenuOpen(false);
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router.events]);

  // HARD scroll lock (works for mouse wheel, touch, trackpad)
  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = window.scrollY;
    const { style } = document.body;

    // lock
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden"; // belt + suspenders
    // prevent overscroll/bounce
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      // unlock & restore position
      const y = Math.abs(parseInt(style.top || "0", 10)) || 0;
      style.position = "";
      style.top = "";
      style.left = "";
      style.right = "";
      style.width = "";
      style.overflow = "";
      document.documentElement.style.overscrollBehavior = "";
      window.scrollTo(0, y);
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <div className="md:hidden relative">
      <button
        onClick={toggleMenu}
        className="text-black dark:text-gray-300 hamburger hover:text-blue-500 dark:hover:sky-400 text-2xl"
        aria-expanded={menuOpen}
        aria-controls="mobile-drawer"
      >
        &#9776;
      </button>

      {/* Overlay */}
      <div
        onClick={toggleMenu}
        className={`fixed inset-0 bg-black/70  backdrop-blur-md transition-opacity duration-300 ${
          menuOpen ? "opacity-100 z-50" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Drawer */}
        <div
          id="mobile-drawer"
          onClick={(e) => e.stopPropagation()}
          className={`bg-gray-900/80 backdrop-blur-md dark:bg-black/80 w-2/3 max-w-xs h-full absolute left-0 top-0 transition-transform duration-300 ${
            menuOpen ? "translate-x-0 h-screen" : "-translate-x-full"
          }`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white text-3xl hover:text-blue-500 dark:hover:text-sky-400"
          >
            &times;
          </button>

          <ul className="flex flex-col space-y-6 p-4 dark:text-white">
            <RenderNavItems
              navItems={navItems}
              pathname={pathname}
              location={location}
              isMobile={true}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const { pathname } = useRouter();
  const { location } = useLocation(); // Initialize location detection

  return (
    <nav className="py-1 px-5 w-full md:sticky md:top-0 md:z-50 flex flex-wrap md:flex-row md:sticky-top justify-between items-center md:border-b md:border-gray-300 md:dark:border-gray-800 md:p-4">
      <Link
        href={"/"}
        className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-glow"
      >
        {name}&trade;
      </Link>
      <DesktopBar pathname={pathname} location={location} />
      <MobileBar pathname={pathname} location={location} />
    </nav>
  );
}
