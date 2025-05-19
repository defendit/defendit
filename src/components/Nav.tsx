import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import companyInfo from "../../data/company-info.json";


const { name } = companyInfo;

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

function RenderNavItems({
  navItems,
  pathname,
}: Readonly<{ navItems: { name: string; href: string }[]; pathname: string }>) {
  return navItems.map(({ name, href }) => (
    <li key={href}>
      <Link
        href={href}
        className={`${
          pathname === href
            ? "text-blue-600 dark:text-sky-400 font-semibold text-glow hover:underline underline-offset-4"
            : "hover:text-blue-500 dark:hover:text-sky-400 text-gray-800 dark:text-gray-300 hover:underline underline-offset-4"
        }  `}
      >
        {name}
      </Link>
    </li>
  ));
}

function DesktopBar({ pathname }: Readonly<{ pathname: string }>) {
  return (
    <ul
      id="desktop-bar"
      className="hidden md:flex space-x-24 text-lg w-auto m-0 lg:mr-16 "
    >
      <RenderNavItems navItems={navItems} pathname={pathname} />
    </ul>
  );
}

function MobileBar({ pathname }: Readonly<{ pathname: string }>) {
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
          <ul className="flex flex-col space-y-6 p-4 text-white z-30">
            <RenderNavItems navItems={navItems} pathname={pathname} />
          </ul>
        </div>
      </div>
    </div>
  );
}

export  function Navbar() {
  const { pathname } = useRouter();

  return (
    <nav className="py-1 px-5 w-screen flex flex-wrap md:flex-row md:sticky-top justify-between items-center md:border-b md:border-gray-300 md:dark:border-gray-800 md:p-4">
      <Link href={'/'} className="hover:text-blue-600 dark:hover:text-blue-400 font-semibold text-glow">{name}&trade;</Link>
      <DesktopBar pathname={pathname} />
      <MobileBar pathname={pathname} />
    </nav>
  );
}
