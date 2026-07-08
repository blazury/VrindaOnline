"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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

export default function PaymentFailedScreen() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "gold";

  return (
    <main 
      className={`${cormorant.variable} ${inter.variable} min-h-screen bg-[#f7f2e9] flex items-center justify-center p-6 antialiased`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Centered Modal Card */}
      <div className="bg-white border border-[#8c6239]/10 rounded-[2.5rem] max-w-xl w-full p-10 md:p-14 shadow-2xl text-center relative space-y-6">
        
        {/* Red X Circle */}
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-100">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="2.5" 
            stroke="currentColor" 
            className="w-8 h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        {/* Title */}
        <h2 
          className="text-4xl text-[#1f3f21] font-bold tracking-tight"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          Payment Failed
        </h2>

        {/* Explanation Paragraph */}
        <p className="text-sm leading-relaxed text-[#2c2c2c]/75 font-semibold max-w-md mx-auto">
          Your payment could not be completed. If any amount was deducted temporarily, it is usually refunded automatically by the bank within some time.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4 text-xs font-bold uppercase tracking-widest">
          
          {/* Try Again */}
          <Link 
            href={`/register?plan=${plan}`}
            className="w-full sm:w-auto px-8 py-4 bg-[#1f3f21] hover:bg-[#8c6239] text-white rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg text-center"
          >
            Try Again
          </Link>

          {/* Contact on WhatsApp */}
          <a 
            href={`https://wa.me/919481411722?text=Hi%20Vrnd%C4%81%2C%20my%20payment%20for%20the%20${plan}%20breakfast%20plan%20failed.%20Please%20help.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 border border-[#25D366] text-[#25D366] bg-transparent hover:bg-[#25D366]/5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="h-5 w-5 fill-[#25D366] shrink-0">
              <path d="M16.02 3C8.83 3 3 8.74 3 15.83c0 2.5.73 4.94 2.1 7.03L3 29l6.36-2.05a13 13 0 0 0 6.66 1.83H16c7.18 0 13-5.74 13-12.83C29 8.74 23.2 3 16.02 3Zm0 23.52h-.01a10.8 10.8 0 0 1-5.5-1.5l-.4-.23-3.78 1.22 1.23-3.67-.26-.42a10.67 10.67 0 0 1-1.66-5.73c0-5.95 4.9-10.8 10.93-10.8 2.92 0 5.66 1.13 7.72 3.18a10.7 10.7 0 0 1 3.2 7.64c0 5.95-4.9 10.8-10.93 10.8Zm6.14-8.13c-.34-.17-2-.98-2.3-1.1-.3-.1-.53-.16-.75.17-.22.33-.86 1.1-1.06 1.32-.2.22-.4.25-.74.08-.34-.17-1.45-.53-2.76-1.68-1.02-.9-1.7-2-1.9-2.35-.2-.34-.02-.52.15-.68.15-.15.34-.4.5-.6.17-.2.22-.34.34-.57.1-.23.05-.42-.03-.6-.08-.17-.75-1.82-1.03-2.5-.27-.66-.55-.57-.75-.58h-.64c-.23 0-.6.08-.92.42-.32.34-1.2 1.18-1.2 2.88 0 1.7 1.24 3.35 1.42 3.58.18.23 2.44 3.72 5.92 5.22.82.35 1.46.57 1.96.72.82.26 1.56.22 2.14.13.65-.1 2.07-.84 2.36-1.65.3-.82.3-1.52.22-1.66-.1-.14-.3-.22-.64-.4Z" />
            </svg>
            Contact Us on WhatsApp
          </a>

        </div>

      </div>
    </main>
  );
}
