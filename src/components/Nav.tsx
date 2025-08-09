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
}: Readonly<{
  navItems: { name: string; href: string }[];
  pathname: string;
  location: string | null;
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
        city && supportedCities[city] ? supportedCities[city] : "/services";
    }

    const target = clean(href);

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
              ? "text-blue-600 dark:text-sky-400 font-semibold text-glow hover:underline underline-offset-4"
              : "hover:text-blue-500 dark:hover:text-sky-400 text-gray-800 dark:text-gray-300 hover:underline underline-offset-4"
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
      className="hidden md:flex space-x-24 text-lg w-auto m-0 lg:mr-16 md:mx-auto"
    >
      <RenderNavItems
        navItems={navItems}
        pathname={pathname}
        location={location}
      />
    </ul>
  );
}

function MobileBar({
  pathname,
  location,
}: Readonly<{ pathname: string; location: string | null }>) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => setMenuOpen(false);
    router.events.on("routeChangeStart", handleRouteChange);
    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="md:hidden relative ">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="text-black dark:text-gray-300 hamburger hover:text-blue-500 dark:hover:sky-400 text-2xl"
      >
        &#9776;
      </button>

      {/* Drawer Overlay */}
      <div // NOSONAR
        onClick={toggleMenu} // Close on click outside
        className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${
          menuOpen ? " opacity-98 z-90" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Drawer Content */}
        <div // NOSONAR
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the drawer
          className={`bg-gray-200 dark:bg-black  w-1/3 max-w-xs h-full absolute left-0 top-0 transition-all duration-300 transform ${
            menuOpen ? "translate-x-0 z-20" : "-translate-x-full"
          }`}
        >
          {/* Close Button */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 dark:text-white text-3xl hover:text-blue-500 dark:hover:text-sky-400"
          >
            &times;
          </button>

          {/* Navigation Links */}
          <ul className="flex flex-col space-y-6 p-4 text-white z-30 ">
            <RenderNavItems
              navItems={navItems}
              pathname={pathname}
              location={location}
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

  useEffect(() => {
    console.log("User location from local storage:", location);
    console.log("");
  }, [location]);
  return (
    <nav className="py-1 px-5 w-screen flex flex-wrap md:flex-row md:sticky-top justify-between items-center md:border-b md:border-gray-300 md:dark:border-gray-800 md:p-4">
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
