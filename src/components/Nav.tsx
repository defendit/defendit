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

import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import companyInfo from "../../data/company-info.json";
import { SERVICE_AREAS } from "@/lib/service-areas";

const { name } = companyInfo;

type NavNode = Readonly<{
  name: string;
  href: string;
  children?: ReadonlyArray<NavNode>;
}>;

const serviceAreaChildren: ReadonlyArray<NavNode> = [
  { name: "All Areas", href: "/service-areas" },
  ...SERVICE_AREAS.map((area) => ({
    name: area.name,
    href: `/service-areas/${area.slug}`,
  })),
];

const navItems: ReadonlyArray<NavNode> = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  {
    name: "Services",
    href: "/services",
    children: [
      { name: "Overview", href: "/services" },
      { name: "Remote Services", href: "/services/remote" },
      { name: "Custom Solutions", href: "/services/custom-solutions" },
      { name: "Service Areas", href: "/service-areas", children: serviceAreaChildren },
    ],
  },
  { name: "SIGINT", href: "/sigint" },
  {
    name: "Awareness",
    href: "/awareness",
    children: [
      { name: "Overview", href: "/awareness" },
      { name: "The Digital House", href: "/awareness/digital-house" },
      { name: "GRIDRUNNER", href: "/awareness/gridrunner" },
    ],
  },
  { name: "Contact", href: "/contact" },
];

function cleanPath(p: string): string {
  const noQ = p.split("#")[0].split("?")[0];
  const trimmed = noQ.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function hrefMatches(target: string, current: string): boolean {
  const t = cleanPath(target);
  if (t === "/") return current === t;
  return current === t || current.startsWith(`${t}/`);
}

function hrefExact(target: string, current: string): boolean {
  return cleanPath(target) === current;
}

function nodeMatchesDeep(node: NavNode, current: string): boolean {
  if (hrefMatches(node.href, current)) return true;
  return node.children?.some((child) => nodeMatchesDeep(child, current)) ?? false;
}

const DROPDOWN_LINK_BASE =
  "block whitespace-nowrap rounded-md px-3 py-2 font-medium transition-colors";

// Open state for a hover/focus dropdown, plus the blur handler that closes it
// only when focus leaves the whole <li> subtree (not when moving between the
// trigger and its menu). Shared by the top-level item and the nested submenu.
function useFlyoutState() {
  const [open, setOpen] = useState(false);
  const onBlur = (e: React.FocusEvent<HTMLLIElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      setOpen(false);
    }
  };
  return { open, setOpen, onBlur };
}

function DesktopDropdownItem({
  child,
  current,
  onChildClick,
}: Readonly<{ child: NavNode; current: string; onChildClick: () => void }>) {
  const { open, setOpen, onBlur } = useFlyoutState();
  const grandchildren = child.children ?? [];
  const hasChildren = grandchildren.length > 0;
  const active = hasChildren
    ? nodeMatchesDeep(child, current)
    : hrefExact(child.href, current);
  const linkClass = [
    DROPDOWN_LINK_BASE,
    active ? "text-accent" : "text-ink hover:text-accent",
  ].join(" ");

  if (!hasChildren) {
    return (
      <li>
        <Link
          href={child.href}
          title={`${child.name} - Defend I.T. Solutions`}
          onClick={onChildClick}
          className={linkClass}
        >
          {child.name}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={onBlur}
    >
      <div className="flex items-center justify-between gap-2 pr-2">
        <Link
          href={child.href}
          title={`${child.name} - Defend I.T. Solutions`}
          onClick={onChildClick}
          className={linkClass}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {child.name}
        </Link>
        <span aria-hidden className="text-xs text-ink">
          ▸
        </span>
      </div>
      <div
        className={`absolute left-full top-0 z-50 pl-2 transition-opacity duration-150 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="min-w-48 rounded-lg border border-hairline bg-ground p-1.5 shadow-lg">
          <ul className="flex flex-col text-sm">
            {grandchildren.map((grandchild) => {
              const grandActive = hrefExact(grandchild.href, current);
              return (
                <li key={grandchild.href}>
                  <Link
                    href={grandchild.href}
                    title={`${grandchild.name} - Defend I.T. Solutions`}
                    onClick={onChildClick}
                    className={[
                      DROPDOWN_LINK_BASE,
                      grandActive ? "text-accent" : "text-ink hover:text-accent",
                    ].join(" ")}
                  >
                    {grandchild.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </li>
  );
}

function DesktopNavItem({
  item,
  current,
}: Readonly<{ item: NavNode; current: string }>) {
  const { open, setOpen, onBlur } = useFlyoutState();
  // After clicking a child link the route changes and the layout reflows
  // (game routes hide the Logo + footer, which is a big shift). The cursor
  // can end up "newly inside" the parent <li> after the reflow and
  // mouseenter would re-trigger the dropdown. This cooldown ref suppresses
  // mouseenter for ~700ms after a click so navigation + reflow can settle.
  const cooldownRef = useRef(false);
  const active = nodeMatchesDeep(item, current);
  const baseClass = active
    ? "text-accent font-semibold underline underline-offset-4"
    : "hover:text-accent text-ink hover:underline underline-offset-4 font-semibold";

  if (!item.children || item.children.length === 0) {
    return (
      <li>
        <Link
          href={item.href}
          title={`${item.name} - Defend I.T. Solutions`}
          className={baseClass}
        >
          {item.name}
        </Link>
      </li>
    );
  }

  const handleMouseEnter = () => {
    if (cooldownRef.current) return;
    setOpen(true);
  };

  const handleChildClick = () => {
    setOpen(false);
    cooldownRef.current = true;
    globalThis.setTimeout(() => {
      cooldownRef.current = false;
    }, 700);
  };

  return (
    <li
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setOpen(false)}
      onFocus={handleMouseEnter}
      onBlur={onBlur}
    >
      <div className="inline-flex items-center gap-1">
        <Link
          href={item.href}
          title={`${item.name} - Defend I.T. Solutions`}
          className={baseClass}
          aria-haspopup="true"
          aria-expanded={open}
        >
          {item.name}
        </Link>
        <span
          aria-hidden
          className={`text-xs leading-none transition-transform duration-150 ${
            open ? "rotate-180" : ""
          } ${active ? "text-accent" : "text-ink"}`}
        >
          ▾
        </span>
      </div>
      <div
        className={`absolute left-0 top-full z-50 pt-3 transition-opacity duration-150 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="min-w-48 rounded-lg border border-hairline bg-ground p-1.5 shadow-lg">
          <ul className="flex flex-col text-sm">
            {item.children.map((child) => (
              <DesktopDropdownItem
                key={child.href}
                child={child}
                current={current}
                onChildClick={handleChildClick}
              />
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

function MobileDropdownItem({
  child,
  current,
}: Readonly<{ child: NavNode; current: string }>) {
  const grandchildren = child.children ?? [];
  const hasChildren = grandchildren.length > 0;
  const [open, setOpen] = useState<boolean>(() =>
    hasChildren ? nodeMatchesDeep(child, current) : false,
  );

  if (!hasChildren) {
    const active = hrefExact(child.href, current);
    return (
      <li>
        <Link
          href={child.href}
          title={`${child.name} - Defend I.T. Solutions`}
          className={
            active
              ? "text-accent font-semibold underline underline-offset-4"
              : "hover:text-accent text-ink hover:underline underline-offset-4 font-semibold"
          }
        >
          {child.name}
        </Link>
      </li>
    );
  }

  const branchActive = nodeMatchesDeep(child, current);

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={[
          "flex w-full items-center justify-between gap-3 font-semibold",
          branchActive ? "text-accent" : "text-ink hover:text-accent",
        ].join(" ")}
      >
        <span className={branchActive ? "underline underline-offset-4" : ""}>
          {child.name}
        </span>
        <span
          aria-hidden
          className={`text-xs transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>
      {open && (
        <ul className="mt-3 ml-2 space-y-3 border-l border-hairline pl-4">
          {grandchildren.map((grandchild) => {
            const grandActive = hrefExact(grandchild.href, current);
            return (
              <li key={grandchild.href}>
                <Link
                  href={grandchild.href}
                  title={`${grandchild.name} - Defend I.T. Solutions`}
                  className={
                    grandActive
                      ? "text-accent font-semibold underline underline-offset-4"
                      : "hover:text-accent text-ink hover:underline underline-offset-4 font-semibold"
                  }
                >
                  {grandchild.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

function MobileNavItem({
  item,
  current,
}: Readonly<{ item: NavNode; current: string }>) {
  const [open, setOpen] = useState<boolean>(() =>
    item.children ? nodeMatchesDeep(item, current) : false,
  );

  if (!item.children || item.children.length === 0) {
    const active = hrefMatches(item.href, current);
    return (
      <li>
        <Link
          href={item.href}
          title={`${item.name} - Defend I.T. Solutions`}
          className={
            active
              ? "text-accent font-semibold underline underline-offset-4"
              : "hover:text-accent text-ink hover:underline underline-offset-4 font-semibold"
          }
        >
          {item.name}
        </Link>
      </li>
    );
  }

  const branchActive = nodeMatchesDeep(item, current);

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={[
          "flex w-full items-center justify-between gap-3 font-semibold",
          branchActive ? "text-accent" : "text-ink hover:text-accent",
        ].join(" ")}
      >
        <span className={branchActive ? "underline underline-offset-4" : ""}>
          {item.name}
        </span>
        <span
          aria-hidden
          className={`text-xs transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        >
          ▾
        </span>
      </button>
      {open && (
        <ul className="mt-4 ml-2 space-y-4 border-l border-hairline pl-4">
          {item.children.map((child) => (
            <MobileDropdownItem key={child.href} child={child} current={current} />
          ))}
        </ul>
      )}
    </li>
  );
}

function RenderNavItems({
  navItems,
  pathname,
  isMobile = false,
}: Readonly<{
  navItems: ReadonlyArray<NavNode>;
  pathname: string;
  isMobile?: boolean;
}>) {
  const current = cleanPath(pathname);
  return navItems.map((item) =>
    isMobile ? (
      <MobileNavItem key={item.href} item={item} current={current} />
    ) : (
      <DesktopNavItem key={item.href} item={item} current={current} />
    ),
  );
}

function DesktopBar({ pathname }: Readonly<{ pathname: string }>) {
  return (
    <ul className="hidden lg:flex space-x-5 xl:space-x-10 text-base xl:text-lg m-0 lg:mr-16">
      <RenderNavItems navItems={navItems} pathname={pathname} />
    </ul>
  );
}

function MobileBar({ pathname }: Readonly<{ pathname: string }>) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => setMenuOpen(false);
    router.events.on("routeChangeStart", handleRouteChange);
    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [router.events]);

  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = window.scrollY;
    const { style } = document.body;

    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.left = "0";
    style.right = "0";
    style.width = "100%";
    style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";

    return () => {
      const y = Math.abs(Number.parseInt(style.top || "0", 10)) || 0;
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
    <div className="lg:hidden relative">
      <button
        type="button"
        onClick={toggleMenu}
        className="rounded-md p-2 text-2xl text-ink transition hover:bg-ink/5 hover:text-accent"
        aria-controls="mobile-drawer"
        aria-expanded={menuOpen}
        aria-label="Open menu"
      >
        &#9776;
      </button>

      <div
        onClick={toggleMenu}
        className={`fixed inset-0 transition-opacity duration-300 ${
          menuOpen ? "opacity-100 z-50" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          id="mobile-drawer"
          onClick={(e) => e.stopPropagation()}
          className={`absolute left-0 top-0 h-full w-[82vw] max-w-sm border-r border-hairline bg-ground/95 shadow-xl backdrop-blur-md transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={toggleMenu}
            aria-label="Close menu"
            className="absolute top-4 right-4 text-3xl text-ink hover:text-accent"
          >
            &times;
          </button>

          <ul className="flex flex-col space-y-6 p-5 pt-16 text-base bg-ground/95 max-h-[100dvh] overflow-y-auto overscroll-contain">
            <RenderNavItems
              navItems={navItems}
              pathname={pathname}
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

  return (
    <nav className="w-full lg:sticky lg:top-0 lg:z-50 lg:border-b lg:border-hairline">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-2 sm:px-6 lg:py-4">
        <Link
          href="/"
          title="Defend I.T. Solutions Home"
          className="max-w-[72vw] truncate text-sm font-semibold hover:text-accent sm:max-w-none sm:text-base"
        >
          {name}&trade;
        </Link>
        <DesktopBar pathname={pathname} />
        <MobileBar pathname={pathname} />
      </div>
    </nav>
  );
}
