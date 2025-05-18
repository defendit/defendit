import Navbar from "./Nav";
import Footer from "./Footer";
import { Logo } from "./Icons";
import React, { ReactNode } from "react";
import { ThemeToggle } from "./ThemeToggler";
import Link from "next/link";



interface LayoutProps {
  children?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section
      id="main-scroll-container"
      className="relative flex flex-col items-center justify-start z-10 min-w-[300px]"
    >
      <Navbar />
      <ThemeToggle/>
      <Link href="/">
      <Logo className="w-64 h-64 md:w-96 md:h-96 mb-4 text-gray-800 dark:text-sky-400  glow transition-all duration-700 animate-fade-in " />
      </Link>

      <div
      className="absolute inset-0 bg-no-repeat bg-center bg-cover opacity-7 pointer-events-none z-0"
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

export default Layout;
