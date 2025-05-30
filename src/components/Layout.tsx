import { Navbar } from "./Nav";
import Link from "next/link";
import { Footer } from "./Footer";
import { Logo } from "./Icons";
import React, { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggler";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section
      id="main-scroll-container"
      className="relative w-full min-h-screen flex flex-col z-10 justify-between items-center"
    >
      <header className="w-full">
        <Navbar />
      </header>
      <ThemeToggle />
      <Link href="/">
        <Logo className="w-64 h-64 md:w-96 md:h-96 mb-4 text-gray-800 dark:text-sky-400  glow transition-all duration-700 animate-fade-in -mt-4" />
      </Link>

      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-cover bg-fixed opacity-3.25 dark:opacity-1.25 pointer-events-none z-0 w-full h-full"
        style={{
          backgroundImage: `url('/circuit.png')`,
        }}
        aria-hidden="true"
      />

      {children}
      <Footer />
    </section>
  );
};
