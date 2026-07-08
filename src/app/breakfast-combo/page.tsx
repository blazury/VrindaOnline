"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Cormorant_Garamond, Inter } from "next/font/google";

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

export default function BreakfastComboPage() {
  return (
    <main 
      className={`${cormorant.variable} ${inter.variable} overflow-x-hidden bg-[#f7f2e9] antialiased`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden bg-[#f7f2e9] px-4 py-16 sm:px-6 md:px-10 md:py-20">
        
        {/* Top Right Tag Image */}
        <div className="absolute right-2 top-20 z-30 w-[120px] sm:w-[160px] md:right-4 md:top-24 md:w-[215px] lg:top-28 lg:w-[300px]">
          <Image 
            src="/tag.png" 
            alt="Vrnda Tag" 
            width={300}
            height={300}
            priority
            className="object-contain"
          />
        </div>

        {/* Backdrop radial glows & gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#f7f2e9] to-[#ebdcb9]/40 opacity-90" />
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8c6239]/5 blur-3xl md:h-[700px] md:w-[700px]" />

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-10">
          
          {/* Left Text Box */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="-mt-6 pb-2">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#1f3f21]/60 transition-all duration-300 hover:text-[#1f3f21] sm:text-sm font-semibold"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
            </div>

            <div className="inline-flex rounded-full border border-[#8c6239]/15 bg-white/70 px-5 py-2 text-[11px] tracking-[0.28em] text-[#1f3f21] shadow-sm backdrop-blur sm:text-xs font-bold">
              SATTVIC • PURE • NOURISHING
            </div>

            <div className="space-y-6">
              <h1 
                className="text-[clamp(3.5rem,8vw,6rem)] leading-[0.95] tracking-tight text-[#1f3f21] sm:leading-[0.92] font-bold"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Healthy <span className="italic text-[#8c6239] font-normal">Breakfast</span><br />Combo
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#2c2c2c]/70 sm:text-lg lg:mx-0 font-medium">
                Thoughtfully curated breakfast combinations crafted to nourish your body, calm your mind, and energize your everyday rituals.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2 lg:justify-start font-semibold">
              <div className="rounded-full border border-[#8c6239]/10 bg-white/70 px-3 py-1.5 text-xs text-[#1f3f21]/80 shadow-sm backdrop-blur sm:text-sm">
                Fresh Ingredients
              </div>
              <div className="rounded-full border border-[#8c6239]/10 bg-white/70 px-3 py-1.5 text-xs text-[#1f3f21]/80 shadow-sm backdrop-blur sm:text-sm">
                Protein Rich
              </div>
              <div className="rounded-full border border-[#8c6239]/10 bg-white/70 px-3 py-1.5 text-xs text-[#1f3f21]/80 shadow-sm backdrop-blur sm:text-sm">
                Eco Conscious
              </div>
            </div>
          </div>

          {/* Right Product Image Showcase */}
          <div className="relative flex justify-center">
            <div className="absolute h-[350px] w-[350px] rounded-full bg-[#8c6239]/10 blur-3xl md:h-[500px] md:w-[500px]" />
            <div className="relative z-10 mx-auto w-full max-w-[460px] drop-shadow-[0_40px_90px_rgba(0,0,0,0.16)] sm:max-w-[700px] md:max-w-[980px] lg:translate-x-14">
              <Image 
                src="/breakfastcombo.png" 
                alt="Healthy Breakfast Combo" 
                width={980}
                height={980}
                priority
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: PLANS */}
      <section id="plans" className="relative overflow-hidden bg-gradient-to-b from-[#f7f2e9] via-white to-[#ebdcb9]/20 px-4 py-20 sm:px-6 md:px-10 md:py-28">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8c6239]/5 blur-3xl" />
        
        <div className="relative z-10 mx-auto max-w-7xl">
          
          {/* Section Header */}
          <div className="mb-10 text-center md:mb-12">
            <h2 
              className="text-[#1f3f21] text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Choose Your Wellness Plan
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#2c2c2c]/70 sm:text-lg font-medium">
              Flexible breakfast subscriptions crafted to support your wellness journey and everyday nourishment.
            </p>
          </div>

          {/* Delivery terms banner */}
          <div className="mb-10 text-center">
            <p className="mx-auto max-w-4xl text-sm leading-relaxed text-[#1f3f21]/75 sm:text-base font-semibold">
              🚚 Free delivery available within 3 km of MG Road, Mangalore
              <span className="mx-3 hidden sm:inline text-[#8c6239]/40">•</span>
              <br className="sm:hidden" />
              <span className="inline-block mt-2 sm:mt-0">🌿 Sundays are reserved as a flexible wellness day — no deliveries on Sundays</span>
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* Platinum Card */}
            <div className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#8c6239]/10 bg-white/80 shadow-xl backdrop-blur transition-all duration-500 hover:shadow-2xl ring-1 ring-[#8c6239]/20 shadow-2xl">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f7f2e9]">
                <Image 
                  src="/platinum.png" 
                  alt="Platinum Plan" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-8 p-8">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#8c6239] font-bold">Platinum Plan</p>
                  <div className="flex items-end gap-2">
                    <h3 
                      className="text-5xl text-[#1f3f21] font-bold"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      ₹4499
                    </h3>
                    <span className="pb-2 text-sm text-[#2c2c2c]/60 font-semibold">/ month</span>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  {[
                    "Fresh Fruits",
                    "Vegetables",
                    "Oatmeal",
                    "Dry Fruits",
                    "Leafy Greens",
                    "Sprouts",
                    "Salad"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8c6239]/10 text-sm text-[#8c6239] font-bold shrink-0">
                        ✓
                      </div>
                      <span className="text-[#2c2c2c]/80 font-semibold text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  className="mt-auto inline-flex w-full items-center justify-center rounded-2xl bg-[#1f3f21] px-6 py-5 text-sm uppercase tracking-[0.25em] text-white font-bold transition-all duration-300 hover:bg-[#8c6239]"
                  href="/register?plan=platinum"
                >
                  Choose Plan
                </Link>
              </div>
            </div>

            {/* Gold Card */}
            <div className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#8c6239]/10 bg-white/80 shadow-xl backdrop-blur transition-all duration-500 hover:shadow-2xl">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f7f2e9]">
                <Image 
                  src="/gold.png" 
                  alt="Gold Plan" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-8 p-8">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#8c6239] font-bold">Gold Plan</p>
                  <div className="flex items-end gap-2">
                    <h3 
                      className="text-5xl text-[#1f3f21] font-bold"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      ₹3699
                    </h3>
                    <span className="pb-2 text-sm text-[#2c2c2c]/60 font-semibold">/ month</span>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  {["Fresh Fruits", "Vegetables", "Oats", "Dry Fruits", "Sprouts"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8c6239]/10 text-sm text-[#8c6239] font-bold shrink-0">
                        ✓
                      </div>
                      <span className="text-[#2c2c2c]/80 font-semibold text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  className="mt-auto inline-flex w-full items-center justify-center rounded-2xl bg-[#1f3f21] px-6 py-5 text-sm uppercase tracking-[0.25em] text-white font-bold transition-all duration-300 hover:bg-[#8c6239]"
                  href="/register?plan=gold"
                >
                  Choose Plan
                </Link>
              </div>
            </div>

            {/* Silver Card */}
            <div className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#8c6239]/10 bg-white/80 shadow-xl backdrop-blur transition-all duration-500 hover:shadow-2xl">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#f7f2e9]">
                <Image 
                  src="/silver.png" 
                  alt="Silver Plan" 
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-1 flex-col space-y-8 p-8">
                <div className="space-y-3">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#8c6239] font-bold">Silver Plan</p>
                  <div className="flex items-end gap-2">
                    <h3 
                      className="text-5xl text-[#1f3f21] font-bold"
                      style={{ fontFamily: "var(--font-cormorant), serif" }}
                    >
                      ₹2999
                    </h3>
                    <span className="pb-2 text-sm text-[#2c2c2c]/60 font-semibold">/ month</span>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  {["Fresh Fruits", "Oats", "Sprouts"].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#8c6239]/10 text-sm text-[#8c6239] font-bold shrink-0">
                        ✓
                      </div>
                      <span className="text-[#2c2c2c]/80 font-semibold text-sm">{item}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  className="mt-auto inline-flex w-full items-center justify-center rounded-2xl bg-[#1f3f21] px-6 py-5 text-sm uppercase tracking-[0.25em] text-white font-bold transition-all duration-300 hover:bg-[#8c6239]"
                  href="/register?plan=silver"
                >
                  Choose Plan
                </Link>
              </div>
            </div>

          </div>

          {/* Social CTAs */}
          <div className="mt-20 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <a 
              href="https://wa.me/919481411722?text=Hi%20Vrnd%C4%81%2C%20I%20would%20like%20to%20know%20more%20about%20the%20Healthy%20Breakfast%20Combo." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-6 w-6 flex-shrink-0 fill-white">
                <path d="M16.02 3C8.83 3 3 8.74 3 15.83c0 2.5.73 4.94 2.1 7.03L3 29l6.36-2.05a13 13 0 0 0 6.66 1.83H16c7.18 0 13-5.74 13-12.83C29 8.74 23.2 3 16.02 3Zm0 23.52h-.01a10.8 10.8 0 0 1-5.5-1.5l-.4-.23-3.78 1.22 1.23-3.67-.26-.42a10.67 10.67 0 0 1-1.66-5.73c0-5.95 4.9-10.8 10.93-10.8 2.92 0 5.66 1.13 7.72 3.18a10.7 10.7 0 0 1 3.2 7.64c0 5.95-4.9 10.8-10.93 10.8Zm6.14-8.13c-.34-.17-2-.98-2.3-1.1-.3-.1-.53-.16-.75.17-.22.33-.86 1.1-1.06 1.32-.2.22-.4.25-.74.08-.34-.17-1.45-.53-2.76-1.68-1.02-.9-1.7-2-1.9-2.35-.2-.34-.02-.52.15-.68.15-.15.34-.4.5-.6.17-.2.22-.34.34-.57.1-.23.05-.42-.03-.6-.08-.17-.75-1.82-1.03-2.5-.27-.66-.55-.57-.75-.58h-.64c-.23 0-.6.08-.92.42-.32.34-1.2 1.18-1.2 2.88 0 1.7 1.24 3.35 1.42 3.58.18.23 2.44 3.72 5.92 5.22.82.35 1.46.57 1.96.72.82.26 1.56.22 2.14.13.65-.1 2.07-.84 2.36-1.65.3-.82.3-1.52.22-1.66-.1-.14-.3-.22-.64-.4Z" />
              </svg>
              <span>Contact Us on WhatsApp</span>
            </a>
            
            <a 
              href="https://www.instagram.com/vrndaofficial/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5 fill-white">
                <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5Zm0 2h8.5A3.75 3.75 0 0 1 20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4Zm8.88 1.5a.88.88 0 1 0 0 1.75.88.88 0 0 0 0-1.75ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z" />
              </svg>
              <span>Follow Us on Instagram</span>
            </a>
          </div>

        </div>
      </section>

      {/* SECTION 3: CORE PILLARS */}
      <section className="px-4 py-20 sm:px-6 md:px-10 md:py-28">
        <div className="mx-auto max-w-7xl">
          
          <div className="mb-14 text-center md:mb-16">
            <h2 
              className="text-[#1f3f21] text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-tight"
              style={{ fontFamily: "var(--font-cormorant), serif" }}
            >
              Nourishment Designed For Everyday Wellness
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#2c2c2c]/70 sm:text-lg font-medium">
              Carefully balanced ingredients selected to support sustainable health, energy, and mindful living.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            
            <div className="rounded-[32px] border border-[#8c6239]/10 bg-white/80 p-7 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-10">
              <h3 
                className="mb-4 text-3xl text-[#1f3f21] font-bold"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Fresh Ingredients
              </h3>
              <p className="leading-relaxed text-[#2c2c2c]/70 text-sm font-semibold">
                Prepared with carefully sourced wholesome ingredients.
              </p>
            </div>

            <div className="rounded-[32px] border border-[#8c6239]/10 bg-white/80 p-7 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-10">
              <h3 
                className="mb-4 text-3xl text-[#1f3f21] font-bold"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Customizable Meals
              </h3>
              <p className="leading-relaxed text-[#2c2c2c]/70 text-sm font-semibold">
                Tailored according to your goals and preferences.
              </p>
            </div>

            <div className="rounded-[32px] border border-[#8c6239]/10 bg-white/80 p-7 shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:p-10">
              <h3 
                className="mb-4 text-3xl text-[#1f3f21] font-bold"
                style={{ fontFamily: "var(--font-cormorant), serif" }}
              >
                Balanced Nutrition
              </h3>
              <p className="leading-relaxed text-[#2c2c2c]/70 text-sm font-semibold">
                Thoughtfully curated combinations for daily nourishment.
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
