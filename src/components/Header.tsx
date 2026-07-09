"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const pathname = usePathname();
  const { toggleCart, cartCount } = useCart();

  const isLinkActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-brand-light/80 backdrop-blur-md border-b border-brand-brown/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Exact Branding Logo from /images/logo.jpeg */}
        <Link href="/" className="flex items-center group relative h-[68px] w-28 rounded-2xl overflow-hidden border border-brand-brown/15 shadow-sm bg-white">
          <Image
            src="/images/logo.jpeg"
            alt="Vṛndā Logo"
            fill
            sizes="112px"
            priority
            className="object-contain p-1 transition-transform duration-300 group-hover:scale-105"
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

        {/* Action Button & Cart Indicator */}
        <div className="flex items-center gap-3">
          {/* Cart Toggle Icon */}
          <button
            onClick={() => toggleCart(true)}
            className="relative p-2.5 rounded-full hover:bg-brand-green/5 text-brand-dark/80 hover:text-brand-green transition-all duration-300 animate-fade-in"
            aria-label="Open cart drawer"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#8c6239] text-white text-[8px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

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
