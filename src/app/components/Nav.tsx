"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV = [
  { id: 1, href: "/", title: "Home" },
  { id: 2, href: "/#about", title: "About" },
  { id: 3, href: "/#projects", title: "Projects" },
  { id: 4, href: "/#contact", title: "Contact" },
];

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-40 backdrop-blur-md bg-slate-950/70 shadow-md">
      <div className="flex justify-between items-center px-6 lg:px-16 py-4">
        
        {/* Logo */}
        <Link href="/">
          <Image src="/3.png" alt="logo" height={150} width={150} />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex gap-10">
  {NAV.map((navi) => (
    <Link
      key={navi.id}
      href={navi.href}
      className="text-white text-lg font-medium px-3 py-1 rounded-md transition-all duration-300 hover:text-cyan-400 "
    >
      {navi.title}
    </Link>
  ))}
</nav>
        {/* Contact + Mobile Toggle */}
        <div className="flex items-center gap-4">
       <Link href="/#contact">  <button className="shadow-[0_0_35px_rgba(34,211,238,0.5)] cursor-pointer py-2 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-xl transition-colors">
            Contact me
          </button></Link> 
          <button
            className="lg:hidden text-cyan-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-sm flex flex-col items-center gap-6 py-8 animate-fadeIn">
          {NAV.map((navig) => (
            <Link
              key={navig.id}
              href={navig.href}
              onClick={() => setIsOpen(false)}
              className="text-white text-lg font-medium hover:text-cyan-400 transition-colors"
            >
              {navig.title}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Nav;
