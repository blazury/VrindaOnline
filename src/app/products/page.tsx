"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Cormorant_Garamond, Inter } from "next/font/google";
import ScrollCanvas from "@/components/ScrollCanvas";
import { ArrowRight, Leaf, Heart, Shield } from "lucide-react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function ProductsPage() {
  return (
    <main 
      className={`${cormorant.variable} ${inter.variable} relative min-h-screen bg-transparent select-none antialiased`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      
      {/* Scroll-scrub Canvas Background */}
      <ScrollCanvas />

      {/* Overlay Scroll Content */}
      <div className="relative z-10 -mt-[600vh] pointer-events-none">
        
        {/* Slide 1: Welcome & Overview */}
        <section className="h-screen flex flex-col justify-center px-6 pointer-events-auto">
          <div className="relative max-w-3xl mx-auto w-full text-center bg-white/80 border border-[#8c6239]/10 p-10 md:p-16 rounded-3xl shadow-xl space-y-4 backdrop-blur-md">
            {/* Replicated ISKCON Tag / Keychain */}
            <div className="absolute top-2.5 sm:top-3 md:-top-4 lg:-top-6 -right-4 sm:-right-5 md:-right-6 lg:-right-10 z-30 w-[90px] sm:w-[110px] md:w-[140px] lg:w-[170px] pointer-events-none select-none drop-shadow-md">
              <Image 
                src="/tag.png" 
                alt="Vrnda Tag" 
                width={170}
                height={170}
                priority
                className="object-contain animate-bounce-once"
              />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8c6239] block">
              Scroll to explore
            </span>
            <h1 
              className="text-3xl md:text-5xl font-bold text-[#1f3f21]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              The Vṛndā Collection
            </h1>
            <p className="text-xs md:text-sm text-[#2c2c2c]/70 leading-relaxed max-w-xl mx-auto font-semibold">
              Our products are harvested from biodiverse soils using ancient, chemical-free extraction standards. Scroll down to discover our ghee, honey, moringa, coconut oil, and handcrafted masala.
            </p>
            <div className="pt-2 flex justify-center gap-6 text-[11px] text-[#1f3f21]/80 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5" /> 100% Organic</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5" /> Raw & Pure</span>
              <span className="flex items-center gap-1.5"><Heart className="w-3.5 h-3.5" /> Cooperative</span>
            </div>
          </div>
        </section>

        {/* Slide 2: Cold Pressed Coconut Oil */}
        <section className="h-screen flex flex-col justify-center px-6 pointer-events-auto">
          <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/80 border border-[#8c6239]/10 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur-md">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#8c6239]/10">
              <Image 
                src="/images/oil.jpg" 
                alt="Cold Pressed Coconut Oil" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6239]">01 / Pure Fat</span>
              <h2 
                className="text-2xl md:text-3xl font-bold text-[#1f3f21]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Cold Pressed Coconut Oil
              </h2>
              <p className="text-xs text-[#2c2c2c]/70 leading-relaxed font-semibold">
                Extracted from mature organic coconuts using low-temperature expeller wood-presses (Kachi Ghani) to retain raw medium-chain fatty acids (Lauric acid).
              </p>
              <div className="pt-2 font-semibold">
                <Link 
                  href="/products/coconut-oil" 
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1f3f21] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#1f3f21]/90 transition-all duration-300"
                >
                  Explore Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 3: Vedic A2 Ghee */}
        <section className="h-screen flex flex-col justify-center px-6 pointer-events-auto">
          <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/80 border border-[#8c6239]/10 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur-md">
            <div className="space-y-4 order-2 md:order-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6239]">02 / Traditional Ghee</span>
              <h2 
                className="text-2xl md:text-3xl font-bold text-[#1f3f21]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Vedic A2 Ghee
              </h2>
              <p className="text-xs text-[#2c2c2c]/70 leading-relaxed font-semibold">
                Churned from curd using the traditional Bilona method, sourced from native A2 cows. Highly therapeutic, rich in butyric acid, and perfect for holistic nutrition.
              </p>
              <div className="pt-2 font-semibold">
                <Link 
                  href="/products/ghee" 
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1f3f21] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#1f3f21]/90 transition-all duration-300"
                >
                  Explore Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#8c6239]/10 order-1 md:order-2">
              <Image 
                src="/images/ghee.jpg" 
                alt="Vedic A2 Ghee" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Slide 4: Raw Himalayan Honey */}
        <section className="h-screen flex flex-col justify-center px-6 pointer-events-auto">
          <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/80 border border-[#8c6239]/10 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur-md">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#8c6239]/10">
              <Image 
                src="/images/honey.jpg" 
                alt="Raw Himalayan Honey" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6239]">03 / Active Wild Honey</span>
              <h2 
                className="text-2xl md:text-3xl font-bold text-[#1f3f21]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Raw Himalayan Honey
              </h2>
              <p className="text-xs text-[#2c2c2c]/70 leading-relaxed font-semibold">
                Harvested from deep deciduous forest hives by native foragers. Never micro-filtered or heated, keeping all organic active enzymes and wild pollen fully alive.
              </p>
              <div className="pt-2 font-semibold">
                <Link 
                  href="/products/honey" 
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1f3f21] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#1f3f21]/90 transition-all duration-300"
                >
                  Explore Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 5: Organic Moringa leaf powder */}
        <section className="h-screen flex flex-col justify-center px-6 pointer-events-auto">
          <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/80 border border-[#8c6239]/10 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur-md">
            <div className="space-y-4 order-2 md:order-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6239]">04 / Superfood</span>
              <h2 
                className="text-2xl md:text-3xl font-bold text-[#1f3f21]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Organic Moringa Leaf Powder
              </h2>
              <p className="text-xs text-[#2c2c2c]/70 leading-relaxed font-semibold">
                Fresh shade-dried organic drumstick leaves, stone-ground at low temperatures. Extremely rich in plant proteins, dietary fibers, calcium, and active iron.
              </p>
              <div className="pt-2 font-semibold">
                <Link 
                  href="/products/moringa" 
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1f3f21] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#1f3f21]/90 transition-all duration-300"
                >
                  Explore Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#8c6239]/10 order-1 md:order-2">
              <Image 
                src="/images/moringa.jpg" 
                alt="Organic Moringa Leaf Powder" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Slide 6: Handcrafted Premium Masala */}
        <section className="h-screen flex flex-col justify-center px-6 pointer-events-auto">
          <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white/80 border border-[#8c6239]/10 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur-md">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#8c6239]/10">
              <Image 
                src="/images/masala.jpg" 
                alt="Premium Malabar Masala" 
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8c6239]">05 / Aromatic Spices</span>
              <h2 
                className="text-2xl md:text-3xl font-bold text-[#1f3f21]"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Premium Malabar Masala
              </h2>
              <p className="text-xs text-[#2c2c2c]/70 leading-relaxed font-semibold">
                Slow wood-fire roasted whole spices ground using traditional granite stone mills to lock in delicate, aromatic oils.
              </p>
              <div className="pt-2 font-semibold">
                <Link 
                  href="/products/premium-masala" 
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1f3f21] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#1f3f21]/90 transition-all duration-300"
                >
                  Explore Details <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
