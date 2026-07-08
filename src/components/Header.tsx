"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isLinkActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-brand-light/80 backdrop-blur-md border-b border-brand-brown/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Exact Branding Logo from /images/logo.jpeg */}
        <Link href="/" className="flex items-center group relative h-16 w-44">
          <Image
            src="/images/logo.jpeg"
            alt="Vṛndā Logo"
            fill
            sizes="176px"
            priority
            className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${
              isLinkActive("/") ? "text-brand-green border-b-2 border-brand-green pb-1" : "text-brand-dark/70 hover:text-brand-green"
            }`}
          >
            Home
          </Link>
          <Link 
            href="/products" 
            className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${
              isLinkActive("/products") ? "text-brand-green border-b-2 border-brand-green pb-1" : "text-brand-dark/70 hover:text-brand-green"
            }`}
          >
            Products
          </Link>
          <Link 
            href="/internship" 
            className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${
              isLinkActive("/internship") ? "text-brand-green border-b-2 border-brand-green pb-1" : "text-brand-dark/70 hover:text-brand-green"
            }`}
          >
            Internship
          </Link>
          <Link 
            href="/breakfast-combo" 
            className={`text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${
              isLinkActive("/breakfast-combo") ? "text-brand-green border-b-2 border-brand-green pb-1" : "text-brand-dark/70 hover:text-brand-green"
            }`}
          >
            Breakfast Combo
          </Link>
        </nav>

        {/* Action Button */}
        <div>
          <Link 
            href="/products" 
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border border-brand-green text-[10px] font-bold uppercase tracking-widest text-brand-green hover:bg-brand-green hover:text-brand-light transition-all duration-300"
          >
            Explore Store
          </Link>
        </div>

      </div>
    </header>
  );
}
