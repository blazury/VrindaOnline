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

export default function PaymentSuccessScreen() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "gold";
  const paymentId = searchParams.get("payment_id") || "pay_mock12345";

  return (
    <main 
      className={`${cormorant.variable} ${inter.variable} min-h-screen bg-[#f7f2e9] flex items-center justify-center p-6 antialiased`}
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      {/* Centered Modal Card */}
      <div className="bg-white border border-[#8c6239]/10 rounded-[2.5rem] max-w-xl w-full p-10 md:p-14 shadow-2xl text-center relative space-y-6">
        
        {/* Green Check Circle */}
        <div className="w-20 h-20 bg-green-50 text-[#1f3f21] rounded-full flex items-center justify-center mx-auto border border-green-100">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="2.5" 
            stroke="currentColor" 
            className="w-8 h-8"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <h2 
          className="text-4xl text-[#1f3f21] font-bold tracking-tight"
          style={{ fontFamily: "var(--font-cormorant), serif" }}
        >
          Subscription Active
        </h2>

        {/* Explanation Paragraph */}
        <p className="text-sm leading-relaxed text-[#2c2c2c]/75 font-semibold max-w-md mx-auto">
          Thank you for subscribing! Your healthy breakfast combo subscription has been initialized. We will contact you on your registered phone number to confirm your first morning delivery details.
        </p>

        {/* Payment Metadata Display */}
        <div className="bg-[#f7f2e9]/50 border border-[#8c6239]/5 rounded-2xl p-4 max-w-xs mx-auto space-y-2 text-[10px] font-bold uppercase tracking-wider text-[#8c6239]">
          <div className="flex justify-between gap-4">
            <span>Selected Plan:</span>
            <span className="text-[#1f3f21]">{plan}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span>Reference ID:</span>
            <span className="text-[#1f3f21] normal-case">{paymentId}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 flex justify-center text-xs font-bold uppercase tracking-widest">
          <Link 
            href="/"
            className="px-8 py-4 bg-[#1f3f21] hover:bg-[#8c6239] text-white rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg text-center"
          >
            Return to Homepage
          </Link>
        </div>

      </div>
    </main>
  );
}
