"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { 
  ShoppingBag, 
  Utensils, 
  Store, 
  Globe, 
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles
} from "lucide-react";

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

export default function Home() {
  return (
    <main 
      className={`${cormorant.variable} ${inter.variable} relative min-h-screen bg-transparent antialiased text-[#2c2c2c]`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      
      {/* Page-Specific Static Background Layer */}
      <div className="fixed inset-0 -z-10 bg-[url('/images/bg_combined.jpg')] bg-cover bg-center bg-fixed" />
      <div className="fixed inset-0 -z-10 bg-brand-light/20" />

      {/* Main Content Layout */}
      <div className="relative z-10 py-12 px-6 space-y-24">
        
        {/* Section 1: Hero Header */}
        <section className="min-h-[75vh] flex flex-col justify-center max-w-5xl mx-auto">
          <div className="relative text-center bg-white/80 border border-[#8c6239]/10 p-10 md:p-16 rounded-3xl shadow-xl space-y-6 backdrop-blur-md">
            {/* Replicated ISKCON Tag / Keychain */}
            <div className="absolute -top-10 sm:-top-12 md:-top-16 right-4 sm:right-6 md:right-10 lg:right-14 z-30 w-[100px] sm:w-[130px] md:w-[180px] lg:w-[220px] pointer-events-none select-none drop-shadow-md">
              <Image 
                src="/tag.png" 
                alt="Vrnda Tag" 
                width={220}
                height={220}
                priority
                className="object-contain animate-bounce-once"
              />
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8c6239] block">
              Purely Organic &mdash; Timeless Livelihood
            </span>
            <h1 
              className="text-4xl md:text-6xl font-bold text-[#1f3f21] leading-[1.15]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Nurturing Purity, <br />
              <span className="text-[#8c6239] italic font-normal">Restoring Balance</span>
            </h1>
            <p className="max-w-2xl mx-auto text-sm md:text-base text-[#2c2c2c]/75 leading-relaxed font-semibold">
              Vṛndā represents biological nourishment sourced from biodiverse cooperative farms. Experience traditional food products, artisanal slow-dining, and organic community internships.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4 font-semibold">
              <Link 
                href="/products" 
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#1f3f21] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#1f3f21]/90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                View Collection <ArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Section 2: Core Verticals */}
        <section className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <h2 
              className="text-3xl md:text-4xl font-bold text-[#1f3f21]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Our Five <span className="text-[#8c6239] italic font-normal">Core Verticals</span>
            </h2>
            <p className="text-xs uppercase tracking-wider text-[#8c6239] font-bold">Sustainable Operations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Vertical 1: Premium Food Products */}
            <div className="bg-white/80 border border-[#8c6239]/10 p-8 rounded-3xl shadow-md flex flex-col justify-between hover:border-[#8c6239]/30 transition-all duration-300 backdrop-blur-md">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1f3f21]/10 flex items-center justify-center text-[#1f3f21]">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 
                  className="text-lg font-bold text-[#1f3f21]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  1. Premium Food Products
                </h3>
                <p className="text-xs text-[#2c2c2c]/70 leading-relaxed font-semibold">
                  Single-origin, certified organic grocery essentials, traditional bilona ghee, raw wild honey, and natural superfood powders processed without chemicals.
                </p>
              </div>
              <Link href="/products" className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8c6239] hover:text-[#1f3f21] transition-colors">
                Explore Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Vertical 2: Restaurant & Café */}
            <div className="bg-white/80 border border-[#8c6239]/10 p-8 rounded-3xl shadow-md flex flex-col justify-between hover:border-[#8c6239]/30 transition-all duration-300 backdrop-blur-md">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1f3f21]/10 flex items-center justify-center text-[#1f3f21]">
                  <Utensils className="w-6 h-6" />
                </div>
                <h3 
                  className="text-lg font-bold text-[#1f3f21]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  2. Restaurant & Café
                </h3>
                <p className="text-xs text-[#2c2c2c]/70 leading-relaxed font-semibold">
                  An organic farm-to-table slow dining layout featuring stone-hearth breads, traditional millet bowls, and botanical infusions brewed in raw copperware.
                </p>
              </div>
              <a href="#cafe-details" className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8c6239] hover:text-[#1f3f21] transition-colors">
                Learn Dining <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Vertical 3: Retail Storefront */}
            <div className="bg-white/80 border border-[#8c6239]/10 p-8 rounded-3xl shadow-md flex flex-col justify-between hover:border-[#8c6239]/30 transition-all duration-300 backdrop-blur-md">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1f3f21]/10 flex items-center justify-center text-[#1f3f21]">
                  <Store className="w-6 h-6" />
                </div>
                <h3 
                  className="text-lg font-bold text-[#1f3f21]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  3. Experiential Retail
                </h3>
                <p className="text-xs text-[#2c2c2c]/70 leading-relaxed font-semibold">
                  Sensory zero-dispensing boutiques designed for touching, smelling, and custom blending spices, organic powders, and cold-pressed oils.
                </p>
              </div>
              <a href="#retail-details" className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8c6239] hover:text-[#1f3f21] transition-colors">
                Visit Boutiques <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Vertical 4: E-Commerce */}
            <div className="bg-white/80 border border-[#8c6239]/10 p-8 rounded-3xl shadow-md flex flex-col justify-between hover:border-[#8c6239]/30 transition-all duration-300 backdrop-blur-md">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1f3f21]/10 flex items-center justify-center text-[#1f3f21]">
                  <Globe className="w-6 h-6" />
                </div>
                <h3 
                  className="text-lg font-bold text-[#1f3f21]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  4. E-Commerce Platform
                </h3>
                <p className="text-xs text-[#2c2c2c]/70 leading-relaxed font-semibold">
                  Fast, zero-plastic direct shipping globally. Our trace-origin dashboard lets you trace the exact rural cooperative harvest dates of your items.
                </p>
              </div>
              <Link href="/products" className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8c6239] hover:text-[#1f3f21] transition-colors">
                Order Online <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Vertical 5: Industry Internship Program */}
            <div className="bg-white/80 border border-[#8c6239]/10 p-8 rounded-3xl shadow-md flex flex-col justify-between hover:border-[#8c6239]/30 transition-all duration-300 backdrop-blur-md md:col-span-2 lg:col-span-1">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#1f3f21]/10 flex items-center justify-center text-[#1f3f21]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 
                  className="text-lg font-bold text-[#1f3f21]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  5. Industry Internship
                </h3>
                <p className="text-xs text-[#2c2c2c]/70 leading-relaxed font-semibold">
                  A local training residency programs for agro-ecology, Bilona ghee preparation, eco-packaging design, and cooperative supply chains.
                </p>
              </div>
              <a href="#internship-details" className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#8c6239] hover:text-[#1f3f21] transition-colors">
                Apply Program <ArrowRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </section>

        {/* Section 3: Fine Product Grid */}
        <section id="verticals-showcase" className="max-w-6xl mx-auto">
          <div className="bg-white/80 border border-[#8c6239]/10 p-8 md:p-12 rounded-3xl shadow-xl space-y-10 backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8c6239]">Curated Selection</span>
                <h2 
                  className="text-2xl md:text-3xl font-bold text-[#1f3f21]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Traditional Organic Food Items
                </h2>
              </div>
              <Link 
                href="/products" 
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#1f3f21] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#1f3f21]/90 transition-all duration-300 shadow-sm font-semibold"
              >
                Shop All Products
              </Link>
            </div>

            {/* Showcase Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              
              {/* Ghee */}
              <div className="group relative bg-[#f7f2e9] border border-[#8c6239]/10 p-4 rounded-2xl overflow-hidden hover:border-[#8c6239]/30 transition-all duration-300 shadow-sm">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3">
                  <Image 
                    src="/images/ghee.jpg" 
                    alt="Vedic A2 Ghee" 
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 
                  className="text-sm font-bold text-[#1f3f21]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Vedic A2 Ghee
                </h3>
                <span className="text-[10px] text-[#8c6239] tracking-wider font-semibold uppercase block mt-1">Bilona Method</span>
                <Link href="/products/ghee" className="absolute inset-0 z-10" />
              </div>

              {/* Honey */}
              <div className="group relative bg-[#f7f2e9] border border-[#8c6239]/10 p-4 rounded-2xl overflow-hidden hover:border-[#8c6239]/30 transition-all duration-300 shadow-sm">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3">
                  <Image 
                    src="/images/honey.jpg" 
                    alt="Raw Himalayan Honey" 
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 
                  className="text-sm font-bold text-[#1f3f21]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Raw Honey
                </h3>
                <span className="text-[10px] text-[#8c6239] tracking-wider font-semibold uppercase block mt-1">Wild Harvested</span>
                <Link href="/products/honey" className="absolute inset-0 z-10" />
              </div>

              {/* Moringa */}
              <div className="group relative bg-[#f7f2e9] border border-[#8c6239]/10 p-4 rounded-2xl overflow-hidden hover:border-[#8c6239]/30 transition-all duration-300 shadow-sm">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3">
                  <Image 
                    src="/images/moringa.jpg" 
                    alt="Moringa Powder" 
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 
                  className="text-sm font-bold text-[#1f3f21]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Moringa Leaf
                </h3>
                <span className="text-[10px] text-[#8c6239] tracking-wider font-semibold uppercase block mt-1">Superfood Powder</span>
                <Link href="/products/moringa" className="absolute inset-0 z-10" />
              </div>

              {/* Coconut Oil */}
              <div className="group relative bg-[#f7f2e9] border border-[#8c6239]/10 p-4 rounded-2xl overflow-hidden hover:border-[#8c6239]/30 transition-all duration-300 shadow-sm">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3">
                  <Image 
                    src="/images/oil.jpg" 
                    alt="Cold Pressed Oil" 
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 
                  className="text-sm font-bold text-[#1f3f21]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Coconut Oil
                </h3>
                <span className="text-[10px] text-[#8c6239] tracking-wider font-semibold uppercase block mt-1">Cold Pressed</span>
                <Link href="/products/coconut-oil" className="absolute inset-0 z-10" />
              </div>

              {/* Premium Masala */}
              <div className="group relative bg-[#f7f2e9] border border-[#8c6239]/10 p-4 rounded-2xl overflow-hidden hover:border-[#8c6239]/30 transition-all duration-300 shadow-sm">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3">
                  <Image 
                    src="/images/masala.jpg" 
                    alt="Premium Masala" 
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 
                  className="text-sm font-bold text-[#1f3f21]"
                  style={{ fontFamily: "var(--font-cormorant), serif" }}
                >
                  Premium Masala
                </h3>
                <span className="text-[10px] text-[#8c6239] tracking-wider font-semibold uppercase block mt-1">Handcrafted Blend</span>
                <Link href="/products/premium-masala" className="absolute inset-0 z-10" />
              </div>

            </div>
          </div>
        </section>

        {/* Section 4: Café Details */}
        <section id="cafe-details" className="max-w-4xl mx-auto bg-white/80 border border-[#8c6239]/10 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur-md">
          <div className="space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8c6239]">Artisanal Dining</span>
            <h2 
              className="text-3xl font-bold text-[#1f3f21]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Slow Food Café & Restaurant
            </h2>
            <p className="text-sm text-[#2c2c2c]/75 leading-relaxed font-semibold">
              Step away from the fast-paced modern world and experience organic culinary heritage. We serve wood-fired pizzas, ancient grain sourdoughs, and traditional stone-hearth slow cooked curries. Our botanical blends are made of freshly dried roots, herbs, and flowers, brewed slowly in heavy brass pots and served in clay bowls.
            </p>
          </div>
        </section>

        {/* Section 4.5: Breakfast Combo Details */}
        <section id="breakfast-combo-promo" className="max-w-4xl mx-auto bg-white/80 border border-[#8c6239]/10 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur-md">
          <div className="space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8c6239]">Wellness Subscriptions</span>
            <h2 
              className="text-3xl font-bold text-[#1f3f21]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Healthy Breakfast Combo
            </h2>
            <p className="text-sm text-[#2c2c2c]/75 leading-relaxed font-semibold">
              Thoughtfully curated breakfast subscription plans containing organic fresh fruits, vegetables, oats, dry fruits, and sprouts. Delivered fresh daily to help you build nourishing, mindful morning rituals.
            </p>
            <div className="pt-2 font-semibold">
              <Link 
                href="/breakfast-combo" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1f3f21] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#1f3f21]/90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Explore Breakfast Plans
              </Link>
            </div>
          </div>
        </section>

        {/* Section 5: Retail Details */}
        <section id="retail-details" className="max-w-4xl mx-auto bg-white/80 border border-[#8c6239]/10 p-8 md:p-12 rounded-3xl shadow-xl backdrop-blur-md">
          <div className="space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8c6239]">Boutique Concept</span>
            <h2 
              className="text-3xl font-bold text-[#1f3f21]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Experiential Retail Concept Store
            </h2>
            <p className="text-sm text-[#2c2c2c]/75 leading-relaxed font-semibold">
              Vṛndā's storefronts are tactile apothecary sanctuaries. Our dispensaries are zero-waste silos made of raw timber, brass, and glass. You can custom blend your own cooking spices, herbal powders, and cold pressed oils, guided by organic health advisers.
            </p>
          </div>
        </section>

        {/* Section 6: Internship Details */}
        <section id="internship-details" className="max-w-4xl mx-auto bg-white/80 border border-[#8c6239]/10 p-8 md:p-12 rounded-3xl shadow-xl mb-12 backdrop-blur-md">
          <div className="space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8c6239]">Social Impact</span>
            <h2 
              className="text-3xl font-bold text-[#1f3f21]"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Industry Internship Residency
            </h2>
            <p className="text-sm text-[#2c2c2c]/75 leading-relaxed font-semibold">
              Our cooperative organizes structured internship programs for students, graduates, and growers. Interns undergo hands-on rotations in organic cultivation, natural seed banking, traditional bilona churning, ecological product design, and micro-enterprise management. We support and empower agrarian livelihoods.
            </p>
            <div className="pt-2 font-semibold">
              <Link 
                href="/internship?apply=true" 
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#1f3f21] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#1f3f21]/90 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Apply for Internship
              </Link>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
